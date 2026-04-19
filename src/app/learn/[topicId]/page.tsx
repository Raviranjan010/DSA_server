import { notFound } from "next/navigation";
import Link from "next/link";
import { topics, getNextTopic, getPrevTopic } from "@/data/dsaTopics";
import { ChevronLeft, ChevronRight, Brain, Lightbulb, BookOpen, Search, ShieldAlert, Cpu, Award } from "lucide-react";
import TopicTracker from "@/components/ui/TopicTracker";
import styles from "./page.module.css";

export function generateStaticParams() {
  return topics.map((topic) => ({
    topicId: topic.id,
  }));
}

export default async function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    notFound();
  }

  const nextTopic = getNextTopic(topic.order);
  const prevTopic = getPrevTopic(topic.order);

  return (
    <main className={styles.container}>
      <TopicTracker topicId={topicId} />
      
      {/* Breadcrumb / Back Link */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <Link href="/learn" className={styles.backLink}>
          <ChevronLeft size={20} /> Back to Syllabus
        </Link>
        <span style={{ color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>
          {topic.groupId} Level
        </span>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>{topic.title}</h1>
        <p className={styles.description}>{topic.description}</p>
      </header>

      {/* 1. Introduction */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><BookOpen size={24} /> 1. Introduction</h2>
        <div style={{ marginBottom: "1rem" }}>
          <strong>What is it?</strong>
          <p className={styles.sectionContent}>{topic.introduction.whatIsIt}</p>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Why is it used?</strong>
          <p className={styles.sectionContent}>{topic.introduction.whyUsed}</p>
        </div>
        <div style={{ background: "rgba(139, 92, 246, 0.1)", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid var(--accent-secondary)" }}>
          <strong><Lightbulb size={18} style={{ display: "inline", marginBottom: "-3px" }} /> Real-World Analogy:</strong>
          <p style={{ marginTop: "0.5rem" }}>{topic.introduction.realWorldAnalogy}</p>
        </div>
      </section>

      {/* 2. Visual & Concept */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><Search size={24} /> 2. Concept & Visualization</h2>
        <p className={styles.sectionContent}>{topic.concept.explanation}</p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "1rem", color: "var(--text-secondary)" }}>
          {topic.concept.stepByStep.map((step, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>{step}</li>
          ))}
        </ul>
        <div style={{ background: "#000", padding: "1rem", borderRadius: "8px", fontFamily: "monospace", marginTop: "1rem", color: "#4ade80" }}>
          <div>{topic.visualExplanation.diagramDescription}</div>
          <div style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>{topic.visualExplanation.exampleVisualization}</div>
        </div>
      </section>

      {/* 3. Working Mechanism & Code */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><Cpu size={24} /> 3. Working Mechanism</h2>
        <p className={styles.sectionContent}>{topic.workingMechanism.internalWorking}</p>
        <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
          <strong>Pseudocode:</strong>
          <pre style={{ background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "8px", marginTop: "0.5rem", overflowX: "auto" }}>
            {topic.workingMechanism.pseudocode}
          </pre>
        </div>
        <div>
          <strong>Implementation ({topic.workingMechanism.codeImplementation.language}):</strong>
          <pre style={{ background: "#1e1e1e", padding: "1rem", borderRadius: "8px", marginTop: "0.5rem", overflowX: "auto" }}>
            <code>{topic.workingMechanism.codeImplementation.code}</code>
          </pre>
        </div>
      </section>

      {/* 4. Deep Dive (Dry Run & Complexity) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><Brain size={24} /> 4. Dry Run & Complexity</h2>
        <div style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px dashed var(--border-hover)", borderRadius: "8px" }}>
          <strong>Step-by-step Dry Run:</strong>
          <p className={styles.sectionContent} style={{ marginTop: "0.5rem" }}>{topic.dryRun}</p>
        </div>
        
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <strong style={{ color: "#f87171" }}>Time Complexity:</strong> {topic.complexity.time}
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <strong style={{ color: "#60a5fa" }}>Space Complexity:</strong> {topic.complexity.space}
          </div>
        </div>
        <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
          {topic.complexity.explanation}
        </p>
      </section>

      {/* 5. Gotchas & Tips */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><ShieldAlert size={24} /> 5. Gotchas & Techniques</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <strong style={{ color: "#f87171" }}>Common Mistakes</strong>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", color: "var(--text-secondary)" }}>
              {topic.commonMistakes.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
          <div>
            <strong style={{ color: "#fbbf24" }}>Memory & Tips</strong>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", color: "var(--text-secondary)" }}>
              {topic.tipsAndTricks.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Practice Module */}
      <h2 className={styles.problemsHeader}><Award size={28} style={{ display: "inline" }}/> Put it into Practice</h2>
      <div style={{ marginBottom: "4rem" }}>
        {topic.problems.map((problem) => (
          <div key={problem.id} className={styles.problemCard}>
            <div>
              <h3 className={styles.problemTitle}>{problem.title}</h3>
              <span className={`${styles.difficulty} ${
                problem.difficulty === "Easy" ? styles.difficultyEasy :
                problem.difficulty === "Medium" ? styles.difficultyMedium :
                styles.difficultyHard
              }`}>
                {problem.difficulty}
              </span>
            </div>
            <Link href={`/practice/${topic.id}/${problem.id}`} className={styles.solveButton}>
              Solve Problem in IDE
            </Link>
          </div>
        ))}
      </div>

      {/* Interlinking Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
        {prevTopic ? (
          <Link href={`/learn/${prevTopic.id}`} className={styles.solveButton} style={{ background: "transparent", border: "1px solid var(--border-color)" }}>
            <ChevronLeft size={18} style={{ display: "inline", verticalAlign: "middle" }}/> Previous: {prevTopic.title}
          </Link>
        ) : <div />}
        
        {nextTopic ? (
          <Link href={`/learn/${nextTopic.id}`} className={styles.solveButton} style={{ background: "var(--gradient-primary)" }}>
            Next: {nextTopic.title} <ChevronRight size={18} style={{ display: "inline", verticalAlign: "middle" }}/>
          </Link>
        ) : <div />}
      </div>
    </main>
  );
}
