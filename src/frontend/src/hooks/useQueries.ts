import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AnalysisResult } from '../backend';

export function useAnalyzeJobPosting(jobId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<AnalysisResult>({
    queryKey: ['jobAnalysis', jobId?.toString()],
    queryFn: async () => {
      if (!actor || jobId === null) {
        throw new Error('Actor not initialized or job ID not provided');
      }
      return actor.analyzeJobPosting(jobId);
    },
    enabled: !!actor && !isFetching && jobId !== null,
    retry: 2,
  });
}
