import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { animated, useTransition } from 'react-spring';
import { isClient } from '../constants';
function is_cached(src: string) {
  var img = new Image();
  img.src = src;
  var complete = img.complete;
  img.src = '';
  console.log('cached', complete);
  return complete;
}

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

const LazyImage: React.FC<ImgProps> = props => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const showIfCached = useCallback(() => isClient && is_cached(props.src!), [props.src]);
  const [show, setShow] = useState(showIfCached);

  useEffect(() => {
    if (inView && !show) {
      const img = new Image();
      if (props.src) {
        img.onload = () => {
          setShow(true);
        };
        img.src = props.src;
      }
    }
  }, [inView]);

  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      {transitions.map(({ item, props: style }) =>
        item ? (
          <animated.img key={'loaded'} {...props} style={style} />
        ) : (
          <animated.div key={'unloaded'} ref={ref} className={props.className} style={style} />
        )
      )}
    </>
  );
};

export default LazyImage;
