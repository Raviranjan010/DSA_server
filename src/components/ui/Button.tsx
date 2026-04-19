import { motion, HTMLMotionProps } from "framer-motion";
import styles from "./Button.module.css";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  isLoading = false,
  className = "",
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.loading}>Loading...</span>
      ) : (
        children
      )}
    </motion.button>
  );
}
