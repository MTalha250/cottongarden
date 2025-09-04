// Global animation variants and utilities for consistent animations across the website
export const globalAnimations = {
  // Page transition animations
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" },
  },

  // Fade in animation
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Slide up animation
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Scale in animation
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  // Container with staggered children
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  // Stagger child items
  staggerChild: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },

  // Hover scale animation
  hoverScale: {
    whileHover: { scale: 1.05 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },

  // Hover lift animation
  hoverLift: {
    whileHover: { y: -5, scale: 1.02 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },

  // Button hover animation
  buttonHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },

  // Icon hover animation
  iconHover: {
    whileHover: { scale: 1.1, rotate: 5 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },

  // Navbar animations
  navbarSlideDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Footer slide up
  footerSlideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  },

  // Card animations
  cardHover: {
    whileHover: {
      y: -8,
      scale: 1.02,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },

  // Loading animation
  loading: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },

  // Floating animation for decorative elements
  floating: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Pulse animation
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

// Viewport settings for scroll-triggered animations
export const viewportSettings = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -100px 0px",
};

// Common easing functions
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1],
  snappy: [0.4, 0, 0.2, 1],
  gentle: [0.25, 0.46, 0.45, 0.94],
};
