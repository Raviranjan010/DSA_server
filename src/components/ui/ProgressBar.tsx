import { motion } from "framer-motion";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number;
  height?: number;
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({ 
  progress, 
  height = 8, 
  showLabel = false,
  animated = true 
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={styles.container}>
      <div className={styles.track} style={{ height }}>
        {animated ? (
          <motion.div
            className={styles.fill}
            initial={{ width: 0 }}
            animate={{ width: `${clampedProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ height }}
          />
        ) : (
          <div className={styles.fill} style={{ width: `${clampedProgress}%`, height }} />
        )}
      </div>
      {showLabel && (
        <div className={styles.label}>{Math.round(clampedProgress)}%</div>
      )}
    </div>
  );
}
