import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { dropIn } from 'utils/helper/motion';
import styles from './modal.module.css';

interface IModalContainer {
  children: React.ReactNode;
  classNames?: string;
  isModelOpen: boolean;
}

function ModalContainer({
  children,
  classNames = '',
  isModelOpen = false,
}: IModalContainer): JSX.Element {
  return (
    <AnimatePresence initial={false} mode="wait">
      {isModelOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={`${styles.modal} ${classNames}`}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalContainer;
