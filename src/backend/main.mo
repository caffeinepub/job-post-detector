import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";

actor {
  type JobPosting = {
    id : Nat;
    title : Text;
    description : Text;
    companyName : Text;
    contactEmail : Text;
    salary : ?Nat;
    postingDate : Time.Time;
  };

  type AnalysisResult = {
    isPotentiallyFraudulent : Bool;
    confidenceScore : Nat;
    reasons : [Text];
    verifiedEmailDomain : ?Text;
    companyInfo : ?CompanyInfo;
  };

  type CompanyInfo = {
    name : Text;
    industry : Text;
    isVerified : Bool;
  };

  let jobPostings = Map.empty<Nat, JobPosting>();
  var nextJobId = 0;

  public shared ({ caller }) func submitJobPosting(title : Text, description : Text, companyName : Text, contactEmail : Text, salary : ?Nat) : async Nat {
    let jobId = nextJobId;
    let jobPosting : JobPosting = {
      id = jobId;
      title;
      description;
      companyName;
      contactEmail;
      salary;
      postingDate = Time.now();
    };

    jobPostings.add(jobId, jobPosting);
    nextJobId += 1;
    jobId;
  };

  public query ({ caller }) func analyzeJobPosting(jobId : Nat) : async AnalysisResult {
    let jobPosting = jobPostings.get(jobId);
    switch (jobPosting) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) {
        let emailDomain = verifyEmailDomain(job.contactEmail);
        let companyInfo = lookupCompanyInfo(job.companyName);
        let (isFraud, confidence, reasons) = detectFraudIndicators(job);

        {
          isPotentiallyFraudulent = isFraud;
          confidenceScore = confidence;
          reasons;
          verifiedEmailDomain = emailDomain;
          companyInfo;
        };
      };
    };
  };

  func verifyEmailDomain(email : Text) : ?Text {
    let freeEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com"];
    let emailParts = email.split(#char '@').toArray();
    if (emailParts.size() != 2) {
      return null;
    };

    let domain = emailParts[1];
    let isFreeDomain = freeEmailDomains.any(func(d) { d == domain });

    if (isFreeDomain) {
      null;
    } else {
      ?domain;
    };
  };

  func lookupCompanyInfo(companyName : Text) : ?CompanyInfo {
    let knownCompanies = [
      {
        name = "Acme Corp";
        industry = "Technology";
        isVerified = true;
      },
      {
        name = "Global Industries";
        industry = "Manufacturing";
        isVerified = true;
      },
    ];

    let matchedCompany = knownCompanies.find(func(c) { Text.equal(c.name, companyName) });
    matchedCompany;
  };

  func detectFraudIndicators(job : JobPosting) : (Bool, Nat, [Text]) {
    var fraudScore = 0;
    var reasons : [Text] = [];

    switch (job.salary) {
      case (?salary) {
        if (salary > 10_000_000) {
          fraudScore += 1;
          reasons := reasons.concat(["Unrealistically high salary"]);
        };
      };
      case (null) {};
    };

    if (job.description.size() < 50) {
      fraudScore += 1;
      reasons := reasons.concat(["Very short job description"]);
    };

    if (job.description.contains(#text "urgent") or job.description.contains(#text "immediate")) {
      fraudScore += 1;
      reasons := reasons.concat(["Use of urgency tactics"]);
    };

    let isFraud = fraudScore > 2;
    let confidence = fraudScore * 25;
    (isFraud, confidence, reasons);
  };
};
