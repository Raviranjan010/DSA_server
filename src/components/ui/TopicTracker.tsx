"use client";

import { useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";

export default function TopicTracker({ topicId }: { topicId: string }) {
  const { markTopicRead, isLoaded } = useProgress();

  useEffect(() => {
    if (isLoaded) {
      markTopicRead(topicId);
    }
  }, [topicId, isLoaded]); // eslint-disable-line

  return null;
}
