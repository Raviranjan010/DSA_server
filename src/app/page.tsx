"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Code2, 
  BrainCircuit, 
  TerminalSquare, 
  Trophy,
  ArrowRight,
  BookOpen,
  Target,
  Zap,
  Users
} from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  const stats = [
    { icon: BookOpen, label: "Topics", value: "25+", color: "#8b5cf6" },
    { icon: Target, label: "Problems", value: "100+", color: "#3b82f6" },
    { icon: Zap, label: "AI Features", value: "5+", color: "#f59e0b" },
    { icon: Users, label: "Active Learners", value: "10K+", color: "#10b981" }
  ];

  const features = [
    {
      icon: BrainCircuit,
      title: "Gemini AI Assistant",
      description: "24/7 AI tutor that explains concepts, generates MCQs, and provides personalized hints tailored to your understanding level.",
      color: "#8b5cf6"
    },
    {
      icon: Code2,
      title: "Built-in IDE & Compiler",
      description: "Write, run, and test your code directly in the browser with real-time feedback and test case validation.",
      color: "#3b82f6"
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description: "Track your journey with detailed analytics, achievement badges, streak counters, and personalized recommendations.",
      color: "#f59e0b"
    }
  ];

  return (
    <main className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <TerminalSquare className={styles.featureIcon} size={28} style={{margin: 0}} />
          <span>DevForge<span className={styles.textGradient}>DSA</span></span>
        </div>
        <div className={styles.navLinks}>
          <Link href="/learn" className={styles.navLink}>Topics</Link>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
        </div>
        <Link href="/learn" className={styles.primaryButton} style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}>
          Start Learning
        </Link>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Master Data Structures & <br/>
          <span className="text-gradient">Algorithms, properly.</span>
        </motion.h1>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A premium, interactive platform designed to take you from a complete beginner to a 
          competitive programming expert. With built-in IDEs, dynamic visualizations, and AI assistance.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.heroButtons}
        >
          <Link href="/learn" className={styles.primaryButton}>
            Begin Your Journey <ArrowRight size={20} />
          </Link>
          <Link href="/dashboard" className={styles.secondaryButton}>
            View Dashboard
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className={styles.statsGrid}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <stat.icon size={24} className={styles.statIcon} style={{ color: stat.color }} />
              <div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <motion.div 
            key={feature.title}
            className={styles.featureCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <feature.icon size={40} className={styles.featureIcon} style={{ color: feature.color }} />
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDesc}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.ctaTitle}>Ready to Start Your DSA Journey?</h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of learners mastering data structures and algorithms with our comprehensive platform.
          </p>
          <Link href="/learn" className={styles.primaryButton}>
            Get Started Free <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
