"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutList, Link as LinkIcon, ArrowRight, ChevronLeft } from "lucide-react";
import { topics } from "@/data/dsaTopics";
import styles from "./page.module.css";

// Helper to render correct icon
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "LayoutList": return <LayoutList size={24} />;
    case "Link": return <LinkIcon size={24} />;
    default: return <LayoutList size={24} />;
  }
};

export default function LearnPage() {
  return (
    <main className={styles.container}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/" style={{ color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ChevronLeft size={20} /> Back to Home
        </Link>
      </div>

      <div className={styles.header}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          DSA <span className="text-gradient">Syllabus</span>
        </motion.h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
          Select a topic to start learning, from absolute basics to advanced algorithms.
        </p>
      </div>

      <div className={styles.grid}>
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/learn/${topic.id}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  {renderIcon(topic.icon)}
                </div>
                <h2 className={styles.cardTitle}>{topic.title}</h2>
              </div>
              <p className={styles.description}>{topic.description}</p>
              <div className={styles.exploreButton}>
                Explore Concept <ArrowRight size={18} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
