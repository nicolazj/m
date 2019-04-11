/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import { createLRU } from './LRU';

const Pending = 0;
const Resolved = 1;
const Rejected = 2;

function identityHashFn(input: any) {
  return input;
}

const CACHE_LIMIT = 500;
const lru = createLRU(CACHE_LIMIT);

const entries = new Map();

function accessResult(resource: any, fetch: any, input: any, key: any) {
  let entriesForResource = entries.get(resource);
  if (entriesForResource === undefined) {
    entriesForResource = new Map();
    entries.set(resource, entriesForResource);
  }
  let entry = entriesForResource.get(key);
  if (entry === undefined) {
    const thenable = fetch(input);
    thenable.then(
      (value: any) => {
        if (newResult.status === Pending) {
          const resolvedResult = newResult;
          resolvedResult.status = Resolved;
          resolvedResult.value = value;
        }
      },
      (error: any) => {
        if (newResult.status === Pending) {
          const rejectedResult = newResult;
          rejectedResult.status = Rejected;
          rejectedResult.value = error;
        }
      }
    );
    const newResult = {
      status: Pending,
      value: thenable,
    };
    const newEntry = lru.add(newResult, deleteEntry.bind(null, resource, key));
    entriesForResource.set(key, newEntry);
    return newResult;
  } else {
    return lru.access(entry);
  }
}

function deleteEntry(resource: any, key: any) {
  const entriesForResource = entries.get(resource);
  if (entriesForResource !== undefined) {
    entriesForResource.delete(key);
    if (entriesForResource.size === 0) {
      entries.delete(resource);
    }
  }
}

export function createResource(fetch: any) {
  const hashInput = identityHashFn;

  const resource = {
    read(input: any) {
      // react-cache currently doesn't rely on context, but it may in the
      // future, so we read anyway to prevent access outside of render.
      const key = hashInput(input);
      const result = accessResult(resource, fetch, input, key);
      switch (result.status) {
        case Pending: {
          const suspender = result.value;
          throw suspender;
        }
        case Resolved: {
          const value = result.value;
          return value;
        }
        case Rejected: {
          const error = result.value;
          throw error;
        }
        default:
          // Should be unreachable
          return undefined;
      }
    },

    preload(input: any) {
      // react-cache currently doesn't rely on context, but it may in the
      // future, so we read anyway to prevent access outside of render.
      const key = hashInput(input);
      accessResult(resource, fetch, input, key);
    },
  };
  return resource;
}
