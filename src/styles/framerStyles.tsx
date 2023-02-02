export const gridDrawerVariants = {
  close: {
    x: -1000,
    transition: {
      duration: 0.2,
      type: "spring",
    //   stiffness: 20,
    },
  },
  open: {
    x: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 60,
    },
  },
};
