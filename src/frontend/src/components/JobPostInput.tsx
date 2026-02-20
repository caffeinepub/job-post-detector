import { useState } from 'react';
import { Upload, FileText, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useJobSubmission } from '../hooks/useJobSubmission';
import { toast } from 'sonner';

interface JobPostInputProps {
  onJobSubmitted: (jobId: bigint) => void;
}

export default function JobPostInput({ onJobSubmitted }: JobPostInputProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { submitJob, isSubmitting, error } = useJobSubmission();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      toast.success('Image uploaded successfully');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !companyName.trim() || !contactEmail.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const salaryValue = salary ? BigInt(parseInt(salary)) : null;

    try {
      const jobId = await submitJob({
        title,
        description,
        companyName,
        contactEmail,
        salary: salaryValue,
      });
      toast.success('Job posting submitted for analysis');
      onJobSubmitted(jobId);
    } catch (err) {
      toast.error('Failed to submit job posting');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 relative">
        <div className="inline-block">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-vibrant-blue to-secondary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
            Analyze a Job Posting
          </h2>
          <Sparkles className="absolute -top-2 -right-8 h-6 w-6 text-accent animate-pulse-glow" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Enter the details of a job posting to check for potential fraud indicators. Our system analyzes
          multiple factors including email domains, company information, and content patterns.
        </p>
      </div>

      <Card className="border-2 border-primary/20 shadow-glow hover:shadow-glow-lg transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-primary/5 via-vibrant-blue/5 to-secondary/5 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <FileText className="h-6 w-6 text-white" />
            </div>
            Job Posting Details
          </CardTitle>
          <CardDescription className="text-base">
            Provide as much information as possible for accurate analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-semibold text-primary">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Software Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border-2 border-secondary/30 focus:border-secondary focus:ring-secondary transition-all duration-300 text-base h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-base font-semibold text-vibrant-blue">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="e.g., Acme Corp"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="border-2 border-vibrant-teal/30 focus:border-vibrant-teal focus:ring-vibrant-teal transition-all duration-300 text-base h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-vibrant-teal">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g., hr@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="border-2 border-success/30 focus:border-success focus:ring-success transition-all duration-300 text-base h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-base font-semibold text-accent">Salary (Annual in USD)</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="e.g., 120000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="border-2 border-warning/30 focus:border-warning focus:ring-warning transition-all duration-300 text-base h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold text-vibrant-pink">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Paste the full job description here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  required
                  className="resize-none border-2 border-vibrant-pink/30 focus:border-vibrant-pink focus:ring-vibrant-pink transition-all duration-300 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-base font-semibold text-secondary">Upload Job Posting Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer border-2 border-secondary/30 focus:border-secondary transition-all duration-300"
                  />
                  {imageFile && (
                    <div className="flex items-center gap-2 text-sm text-success font-semibold bg-success/10 px-3 py-2 rounded-lg">
                      <Upload className="h-4 w-4" />
                      <span>{imageFile.name}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload a screenshot or image of the job posting (max 5MB)
                </p>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="border-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full gradient-primary hover:opacity-90 transition-all duration-300 text-lg h-14 font-bold shadow-lg hover:shadow-glow"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Analyze Job Posting
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
