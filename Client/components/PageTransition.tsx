import { motion } from "framer-motion";
import { globalAnimations } from "@/lib/animations";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div className={className} {...globalAnimations.pageTransition}>
      {children}
    </motion.div>
  );
};

export default PageTransition;
