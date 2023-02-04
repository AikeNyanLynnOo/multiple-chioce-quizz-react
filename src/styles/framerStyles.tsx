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
  // animate to Right
  toRight_initial: { x: "100vw", y: "500", translateY: "-50%" },
  toRight_animate: {
    x: "0%",
    y: "0%",
    translateX: "-50%",
    translateY: "-50%",
    transition: {
      delay: 0.3,
      duration: 0.8,
      type: "spring",
    },
  },
  toRight_exit: {
    x: -300,
    y: 500,
    opacity: 0,
    transition: {
      delay: 0.2,
      duration: 0.6,
    },
  },
  // animate to Left
  toLeft_initial: { x: "-100vw", y: "500", translateY: "-50%" },
  toLeft_animate: {
    x: "0%",
    y: "0%",
    translateX: "-50%",
    translateY: "-50%",
    transition: {
      delay: 0.3,
      duration: 0.8,
      type: "spring",
    },
  },
  toLeft_exit: {
    x: 300,
    y: 500,
    opacity: 0,
    transition: {
      delay: 0.2,
      duration: 0.6,
    },
  },
};
