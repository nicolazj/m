import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { animated, useTransition } from 'react-spring';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

const LazyImage: React.FC<ImgProps> = props => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView && !show) {
      const img = window.document.createElement('img');
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
