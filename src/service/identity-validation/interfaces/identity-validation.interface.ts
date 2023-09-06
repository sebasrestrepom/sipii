export interface IdentityValidation {
  document: number;
  documentPhoto: Express.Multer.File;
  selfiePhoto: Express.Multer.File;
  dateOfBirth: Date;
  dateDocumentIssuance: Date;
  gender: string;
  maritalStatus: string;
  householdComposition: string;
  sons: number;
  economicDependents: number;
  levelStudy: string;
  houseStratum: number;
  discoveryChannel: string;
  occupation: string;
  job: string;
  yearsExperience: number;
  companyType: string;
  companyName: string;
  contractType: string;
  monthlyIncome: number;
  bankName: string;
  bankAccount: number;
}
