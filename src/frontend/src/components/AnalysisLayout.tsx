import { Shield, Sparkles } from 'lucide-react';

interface AnalysisLayoutProps {
  children: React.ReactNode;
}

export default function AnalysisLayout({ children }: AnalysisLayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'job-post-detector';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b-4 border-primary/20 bg-gradient-to-r from-primary/5 via-vibrant-blue/5 to-secondary/5 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow animate-pulse-glow">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-vibrant-blue to-secondary bg-clip-text text-transparent">
                  Job Post Detector
                </h1>
                <Sparkles className="h-6 w-6 text-accent animate-pulse-glow" />
              </div>
              <p className="text-base text-muted-foreground font-medium">
                Verify job postings and protect yourself from fraud
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t-4 border-primary/20 bg-gradient-to-r from-secondary/5 via-vibrant-teal/5 to-success/5 mt-auto shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-base">
            <p className="text-foreground font-medium">
              © {currentYear} Job Post Detector. Built with{' '}
              <span className="inline-block animate-pulse-glow">
                <span className="text-2xl text-vibrant-pink">❤️</span>
              </span>
              {' '}using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold bg-gradient-to-r from-primary via-vibrant-blue to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
