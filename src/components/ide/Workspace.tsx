"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Play } from "lucide-react";
import Editor from "@monaco-editor/react";
import { DSAProblem } from "@/data/dsaTopics";
import { useProgress } from "@/hooks/useProgress";
import styles from "./Workspace.module.css";

interface WorkspaceProps {
  topicId: string;
  problem: DSAProblem;
}

export default function Workspace({ topicId, problem }: WorkspaceProps) {
  const [code, setCode] = useState(problem.starterCode);
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const { markProblemSolved } = useProgress();

  const handleRunCode = () => {
    try {
      let logOutput = "";
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        logOutput += args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(" ") + "\n";
      };
      
      const execute = new Function(code + "\n return 'Code parsed successfully.';");
      const result = execute();
      
      console.log = originalConsoleLog;

      setIsError(false);
      setOutput((logOutput ? "Logs:\n" + logOutput + "\n" : "") + "Result: " + result);
      
      // Mark as solved on successful run (MVP logic)
      markProblemSolved(problem.id);
    } catch (err: any) {
      setIsError(true);
      setOutput(err.toString());
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Pane - Problem Details */}
      <div className={styles.leftPane}>
        <Link href={`/learn/${topicId}`} className={styles.backLink}>
          <ChevronLeft size={20} /> Back to Topic
        </Link>
        <h1 className={styles.title}>{problem.title}</h1>
        <span className={`${styles.difficulty} ${
          problem.difficulty === "Easy" ? styles.difficultyEasy :
          problem.difficulty === "Medium" ? styles.difficultyMedium :
          styles.difficultyHard
        }`}>
          {problem.difficulty}
        </span>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Problem Statement</h2>
          <p className={styles.statement}>{problem.statement}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Example</h2>
          <pre className={styles.preBlock}>{problem.example}</pre>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Approach Hints</h2>
          <p className={styles.statement} style={{ color: "var(--text-secondary)" }}>{problem.approach}</p>
        </div>
      </div>

      {/* Right Pane - IDE Workspace */}
      <div className={styles.rightPane}>
        <div className={styles.editorHeader}>
          <div className={styles.languageSelect}>JavaScript (Node)</div>
          <button className={styles.runButton} onClick={handleRunCode}>
            <Play size={16} /> Run Code
          </button>
        </div>
        
        <div className={styles.editorContainer}>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* Output Panel */}
        <div className={styles.outputPanel}>
          <h3>Console Output</h3>
          <pre className={isError ? styles.outputError : styles.outputSuccess}>
            {output || "Run code to see output..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
