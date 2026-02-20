import { useAnalyzeJobPosting } from './useQueries';

export function useJobAnalysis(jobId: bigint | null) {
  const { data, isLoading, error } = useAnalyzeJobPosting(jobId);

  return {
    data,
    isLoading,
    error: error as Error | null,
  };
}
