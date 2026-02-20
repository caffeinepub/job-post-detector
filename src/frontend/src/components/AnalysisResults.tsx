import { AlertTriangle, CheckCircle, RefreshCw, Mail, Building2, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import CompanyInfoDisplay from './CompanyInfoDisplay';
import type { AnalysisResult } from '../backend';

interface AnalysisResultsProps {
  result?: AnalysisResult;
  isLoading: boolean;
  error: Error | null;
  onReset: () => void;
}

export default function AnalysisResults({ result, isLoading, error, onReset }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive" className="border-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Analysis Failed</AlertTitle>
          <AlertDescription>
            {error.message || 'An error occurred while analyzing the job posting.'}
          </AlertDescription>
        </Alert>
        <Button onClick={onReset} variant="outline" className="w-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Another Job Posting
        </Button>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const isFraudulent = result.isPotentiallyFraudulent;
  const confidence = Number(result.confidenceScore);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 relative">
        <div className="inline-block">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-success via-vibrant-teal to-secondary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
            Analysis Complete
          </h2>
          <Sparkles className="absolute -top-2 -right-8 h-6 w-6 text-warning animate-pulse-glow" />
        </div>
        <p className="text-muted-foreground text-lg">
          Review the results below to understand potential fraud indicators
        </p>
      </div>

      {/* Main Classification Result */}
      <Card className={`border-4 shadow-glow-lg transition-all duration-300 ${
        isFraudulent 
          ? 'border-destructive bg-gradient-to-br from-destructive/5 via-transparent to-warning/5' 
          : 'border-success bg-gradient-to-br from-success/5 via-transparent to-vibrant-teal/5'
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {isFraudulent ? (
                <div className="p-3 rounded-2xl bg-gradient-to-br from-destructive to-warning shadow-lg">
                  <img 
                    src="/assets/generated/alert-icon.dim_128x128.png" 
                    alt="Alert" 
                    className="h-16 w-16"
                  />
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-gradient-success shadow-lg">
                  <img 
                    src="/assets/generated/security-icon.dim_128x128.png" 
                    alt="Verified" 
                    className="h-16 w-16"
                  />
                </div>
              )}
              <div>
                <CardTitle className={`text-3xl font-bold ${isFraudulent ? 'text-destructive' : 'text-success'}`}>
                  {isFraudulent ? 'Potentially Fake' : 'Appears Genuine'}
                </CardTitle>
                <CardDescription className="text-base mt-1 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Confidence Score: {confidence}%
                </CardDescription>
              </div>
            </div>
            <Badge 
              variant={isFraudulent ? 'destructive' : 'default'} 
              className={`text-2xl px-6 py-3 font-bold shadow-lg ${
                isFraudulent 
                  ? 'bg-gradient-to-r from-destructive to-warning' 
                  : 'bg-gradient-success'
              }`}
            >
              {confidence}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isFraudulent ? (
            <Alert variant="destructive" className="border-2 border-destructive bg-gradient-to-r from-destructive/10 to-warning/10">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="text-lg font-bold">Warning</AlertTitle>
              <AlertDescription className="text-base">
                This job posting shows signs of potential fraud. Please exercise caution and verify
                the company independently before sharing personal information or proceeding with the application.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-2 border-success bg-gradient-to-r from-success/10 to-vibrant-teal/10">
              <CheckCircle className="h-5 w-5 text-success" />
              <AlertTitle className="text-lg font-bold text-success">Looks Good</AlertTitle>
              <AlertDescription className="text-base text-success-foreground">
                This job posting appears legitimate based on our analysis. However, always verify
                company details independently and be cautious with personal information.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Analysis Factors */}
      {result.reasons.length > 0 && (
        <Card className="border-2 border-vibrant-blue/30 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-vibrant-blue/5 to-vibrant-teal/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <div className="p-2 rounded-xl bg-gradient-to-br from-vibrant-blue to-vibrant-teal">
                <Shield className="h-6 w-6 text-white" />
              </div>
              Analysis Factors
            </CardTitle>
            <CardDescription className="text-base">
              Key indicators identified during the analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {result.reasons.map((reason, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-transparent border-l-4 border-vibrant-pink hover:shadow-md transition-all duration-300"
                >
                  <div className={`p-2 rounded-lg ${
                    index % 3 === 0 ? 'bg-vibrant-pink/20' :
                    index % 3 === 1 ? 'bg-vibrant-blue/20' :
                    'bg-vibrant-teal/20'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      index % 3 === 0 ? 'text-vibrant-pink' :
                      index % 3 === 1 ? 'text-vibrant-blue' :
                      'text-vibrant-teal'
                    }`} />
                  </div>
                  <span className="text-base font-medium flex-1">{reason}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Email Verification */}
      {result.verifiedEmailDomain && (
        <Card className="border-2 border-secondary/30 shadow-lg">
          <CardHeader className="bg-gradient-secondary/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 rounded-xl bg-gradient-secondary">
                <Mail className="h-5 w-5 text-white" />
              </div>
              Email Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-vibrant-teal/10 border-2 border-secondary/30">
              <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg text-secondary">Verified Domain</p>
                <p className="text-base text-muted-foreground">
                  Email domain <span className="font-bold text-secondary">{result.verifiedEmailDomain}</span> appears to be legitimate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Company Information */}
      {result.companyInfo && (
        <Card className="border-2 border-success/30 shadow-lg">
          <CardHeader className="bg-gradient-success/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 rounded-xl bg-gradient-success">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <CompanyInfoDisplay companyInfo={result.companyInfo} />
          </CardContent>
        </Card>
      )}

      <Button 
        onClick={onReset} 
        variant="outline" 
        className="w-full border-2 border-primary hover:bg-gradient-primary hover:text-white transition-all duration-300 h-12 text-base font-semibold shadow-md hover:shadow-glow"
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        Analyze Another Job Posting
      </Button>
    </div>
  );
}
