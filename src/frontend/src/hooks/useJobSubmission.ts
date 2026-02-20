import { useState } from 'react';
import { useActor } from './useActor';

interface JobSubmissionData {
  title: string;
  description: string;
  companyName: string;
  contactEmail: string;
  salary: bigint | null;
}

export function useJobSubmission() {
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitJob = async (data: JobSubmissionData): Promise<bigint> => {
    if (!actor) {
      throw new Error('Actor not initialized');
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const jobId = await actor.submitJobPosting(
        data.title,
        data.description,
        data.companyName,
        data.contactEmail,
        data.salary
      );
      return jobId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit job posting';
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitJob,
    isSubmitting,
    error,
  };
}
