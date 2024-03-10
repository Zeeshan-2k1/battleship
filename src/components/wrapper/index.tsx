import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { TSlideAnimationDirection, slideAnimation } from 'utils/helper/motion';
import { EPage } from 'utils/constants';
import { useGlobalStateSelector } from 'hooks';

interface IWrapper {
  children: React.ReactNode;
  toGo: TSlideAnimationDirection;
  selectedPage: EPage;
}
function Wrapper({ children, toGo, selectedPage }: IWrapper): JSX.Element {
  const { page } = useGlobalStateSelector();
  return (
    <AnimatePresence>
      {page === selectedPage && (
        <motion.section
          initial={slideAnimation(toGo).initial}
          animate={slideAnimation(toGo).animate}
          exit={slideAnimation(toGo).exit}
          className="page-layout relative"
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Wrapper;
