import { CheckCircle, Building2, Briefcase, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { CompanyInfo } from '../backend';

interface CompanyInfoDisplayProps {
  companyInfo: CompanyInfo;
}

export default function CompanyInfoDisplay({ companyInfo }: CompanyInfoDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-success/10 via-vibrant-teal/10 to-transparent border-2 border-success/30 hover:shadow-lg transition-all duration-300">
        {companyInfo.isVerified ? (
          <div className="p-3 rounded-xl bg-gradient-success shadow-md">
            <img 
              src="/assets/generated/security-icon.dim_128x128.png" 
              alt="Verified" 
              className="h-12 w-12"
            />
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-gradient-to-br from-muted to-muted/50">
            <Building2 className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-success to-vibrant-teal bg-clip-text text-transparent">
              {companyInfo.name}
            </h3>
            {companyInfo.isVerified && (
              <Badge className="bg-gradient-success text-white border-0 shadow-md px-3 py-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-base">
            <div className="p-1.5 rounded-lg bg-vibrant-blue/20">
              <Briefcase className="h-5 w-5 text-vibrant-blue" />
            </div>
            <span className="font-semibold text-vibrant-blue">{companyInfo.industry}</span>
          </div>
        </div>
        {companyInfo.isVerified && (
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-warning fill-warning" />
            <Star className="h-5 w-5 text-warning fill-warning" />
            <Star className="h-5 w-5 text-warning fill-warning" />
            <Star className="h-5 w-5 text-warning fill-warning" />
            <Star className="h-5 w-5 text-warning fill-warning" />
          </div>
        )}
      </div>

      {companyInfo.isVerified ? (
        <div className="p-4 rounded-xl bg-gradient-to-r from-success/5 to-vibrant-teal/5 border-l-4 border-success">
          <p className="text-base text-foreground font-medium flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
            This company is verified in our database and appears to be a legitimate organization.
          </p>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-gradient-to-r from-warning/5 to-accent/5 border-l-4 border-warning">
          <p className="text-base text-foreground font-medium flex items-center gap-2">
            <Building2 className="h-5 w-5 text-warning flex-shrink-0" />
            Company information found but not yet verified. Please conduct additional research.
          </p>
        </div>
      )}
    </div>
  );
}
