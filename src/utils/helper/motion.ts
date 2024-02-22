export const transition = { type: 'spring', duration: 0.8 };
export type TSlideAnimationDirection = 'left' | 'up' | 'down' | 'right';
export const slideAnimation = (direction: TSlideAnimationDirection) => {
  return {
    initial: {
      x: direction === 'left' ? '-110%' : direction === 'right' ? '110%' : 0,
      y: direction === 'up' ? '110%' : direction === 'down' ? '-110%' : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === 'left' ? '-110%' : direction === 'right' ? '110%' : 0,
      y: direction === 'up' ? '110%' : direction === 'down' ? '-110%' : 0,
      transition: { ...transition, delay: 0 },
    },
  };
};

export const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};
