import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AnalysisLayout from './components/AnalysisLayout';
import JobPostInput from './components/JobPostInput';
import AnalysisResults from './components/AnalysisResults';
import { useJobAnalysis } from './hooks/useJobAnalysis';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function AppContent() {
  const [submittedJobId, setSubmittedJobId] = useState<bigint | null>(null);
  const { data: analysisResult, isLoading, error } = useJobAnalysis(submittedJobId);

  const handleJobSubmitted = (jobId: bigint) => {
    setSubmittedJobId(jobId);
  };

  const handleReset = () => {
    setSubmittedJobId(null);
  };

  return (
    <AnalysisLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!submittedJobId ? (
          <JobPostInput onJobSubmitted={handleJobSubmitted} />
        ) : (
          <AnalysisResults
            result={analysisResult}
            isLoading={isLoading}
            error={error}
            onReset={handleReset}
          />
        )}
      </div>
    </AnalysisLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppContent />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
