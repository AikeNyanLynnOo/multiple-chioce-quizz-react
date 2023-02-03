export const gridDrawerVariants = {
  close: {
    y: -1000,
    transition: {
      duration: 0.3,
      type: "spring",
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 60,
    },
  },
};

export const quizItemVariants = {
  initial: {
    x: 1000,
  },
  animate: {
    x: 10,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 60,
    },
  },
};
