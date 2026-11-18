// Content type definitions for AI Content Studio

export type ContentType = 
  | 'instagram-captions'
  | 'facebook-posts'
  | 'linkedin-posts'
  | 'blog-articles'
  | 'google-ads'
  | 'email-marketing'
  | 'product-descriptions'
  | 'website-content';

export type ToneOfVoice = 'professional' | 'friendly' | 'persuasive' | 'luxury' | 'informative';

export type ContentLength = 'short' | 'medium' | 'long';

export interface ContentTypeOption {
  id: ContentType;
  label: string;
  description: string;
  icon: string;
  characterLimit?: number;
  exampleLength: string;
}

export interface BusinessInfo {
  businessName: string;
  industry: string;
  productOrService: string;
  targetAudience: string;
  locationOrMarket: string;
}

export interface ContentSettings {
  toneOfVoice: ToneOfVoice;
  language: string;
  contentLength: ContentLength;
  callToAction: string;
}

// Backend API Request type (matches server/src/types.ts)
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

// Backend API Response type
export interface ContentGenerationResponse {
  success: boolean;
  content: string;
  isDemoData: boolean;
  contentType: string;
  timestamp: string;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
}

export interface GeneratedContent {
  id: string;
  generatedText: string;
  contentType: ContentType;
  toneOfVoice: ToneOfVoice;
  businessInfo: BusinessInfo;
  contentSettings: ContentSettings;
  generatedAt: Date;
  isDemoData: boolean;
  metadata?: {
    wordCount?: number;
    characterCount?: number;
    suggestedHashtags?: string[];
  };
}

export interface ContentFormData {
  contentType: ContentType | '';
  businessInfo: Partial<BusinessInfo>;
  settings: Partial<ContentSettings>;
}

export interface ContentGenerationState {
  isLoading: boolean;
  error: string | null;
  generatedContent: GeneratedContent | null;
  hasGenerated: boolean;
}
