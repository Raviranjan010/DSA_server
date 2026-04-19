import styles from "./Badge.module.css";

interface BadgeProps {
  variant?: "easy" | "medium" | "hard" | "default" | "topic";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
