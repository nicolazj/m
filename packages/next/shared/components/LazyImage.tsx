import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { animated, useTransition } from 'react-spring';
import { isClient } from '../constants';
function is_cached(src: string) {
  const img = new Image();
  img.src = src;
  const complete = img.complete;
  img.src = '';
  return complete;
}

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

const LazyImage: React.FC<ImgProps> = props => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const [show, setShow] = useState(() => isClient && is_cached(props.src!));

  useEffect(() => {
    let canceled = false;
    if (inView && !show) {
      const img = new Image();
      if (props.src) {
        img.onload = () => {
          if (!canceled) {
            setShow(true);
          }
        };
        img.src = props.src;
      }
    }
    return () => {
      canceled = true;
    };
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
