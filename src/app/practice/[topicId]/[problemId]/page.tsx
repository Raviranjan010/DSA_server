import { notFound } from "next/navigation";
import { topics } from "@/data/dsaTopics";
import Workspace from "@/components/ide/Workspace";

export function generateStaticParams() {
  const paths: { topicId: string; problemId: string }[] = [];
  topics.forEach((topic) => {
    topic.problems.forEach((problem) => {
      paths.push({
        topicId: topic.id,
        problemId: problem.id,
      });
    });
  });
  return paths;
}

export default async function PracticePage({ params }: { params: Promise<{ topicId: string; problemId: string }> }) {
  const { topicId, problemId } = await params;
  const topic = topics.find((t) => t.id === topicId);
  if (!topic) notFound();

  const problem = topic.problems.find((p) => p.id === problemId);
  if (!problem) notFound();

  return <Workspace topicId={topicId} problem={problem} />;
}
