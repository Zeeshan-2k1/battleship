import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { TSlideAnimationDirection, slideAnimation } from 'utils/helper/motion';
import { EPage } from 'utils/constants';
import { useGlobalStateSelector } from '../../hooks';

interface IWrapper {
  children: React.ReactNode;
  toGo: TSlideAnimationDirection;
  selectedPage: EPage;
}
const Wrapper: React.FC<IWrapper> = ({ children, toGo, selectedPage }) => {
  const { page } = useGlobalStateSelector();
  return (
    <AnimatePresence>
      {page === selectedPage && (
        <motion.section
          {...slideAnimation(toGo)}
          className="page-layout relative"
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Wrapper;
