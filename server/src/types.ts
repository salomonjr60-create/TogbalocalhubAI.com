export interface ContentGenerationRequest {
  contentType: string;
  businessName: string;
  industry: string;
  productOrService: string;
  targetAudience: string;
  location: string;
  toneOfVoice: string;
  language: string;
  contentLength: string;
  callToAction: string;
}

export interface ContentGenerationResponse {
  success: boolean;
  content: string;
  isDemoData: boolean;
  contentType: string;
  timestamp: string;
  error?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
