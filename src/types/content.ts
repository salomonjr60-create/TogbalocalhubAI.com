// Content type definitions for AI Content Studio

export type ContentType = 
  | 'instagram-caption'
  | 'facebook-post'
  | 'linkedin-post'
  | 'blog-article'
  | 'google-ads'
  | 'marketing-email'
  | 'product-description'
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

export interface ContentGenerationRequest {
  contentType: ContentType;
  businessInfo: BusinessInfo;
  contentSettings: ContentSettings;
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
