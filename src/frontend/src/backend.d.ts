import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AnalysisResult {
    isPotentiallyFraudulent: boolean;
    reasons: Array<string>;
    confidenceScore: bigint;
    companyInfo?: CompanyInfo;
    verifiedEmailDomain?: string;
}
export interface CompanyInfo {
    name: string;
    isVerified: boolean;
    industry: string;
}
export interface backendInterface {
    analyzeJobPosting(jobId: bigint): Promise<AnalysisResult>;
    submitJobPosting(title: string, description: string, companyName: string, contactEmail: string, salary: bigint | null): Promise<bigint>;
}
