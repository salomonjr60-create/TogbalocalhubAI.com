import type { ContentType, BusinessInfo, ContentSettings, GeneratedContent } from '../types/content';
import { ContentApiService } from './contentApiService';
import type { ContentGenerationRequest } from '../types/content';

/**
 * Content Generator Service
 * 
 * Connects to backend API for content generation.
 * The backend provides demo mode templates if no API key is configured.
 */

/**
 * Extract hashtags from generated content
 */
function extractHashtags(text: string): string[] {
  const matches = text.match(/#\w+/g) || [];
  return matches.map(tag => tag.replace('#', '')).slice(0, 5);
}

/**
 * Main content generation function
 * Calls backend API, with fallback demo mode in backend
 */
export async function generateContent(
  contentType: ContentType,
  businessInfo: BusinessInfo,
  contentSettings: ContentSettings
): Promise<GeneratedContent> {
  // Prepare API request
  const apiRequest: ContentGenerationRequest = {
    contentType: contentType.replace('-', '-'),
    businessName: businessInfo.businessName || '',
    industry: businessInfo.industry || '',
    productOrService: businessInfo.productOrService || '',
    targetAudience: businessInfo.targetAudience || '',
    location: businessInfo.locationOrMarket || '',
    toneOfVoice: contentSettings.toneOfVoice || 'professional',
    language: contentSettings.language || 'English',
    contentLength: contentSettings.contentLength || 'medium',
    callToAction: contentSettings.callToAction || '',
  };

  // Call backend API
  const apiResponse = await ContentApiService.generateContent(apiRequest);

  // Calculate metadata
  const wordCount = apiResponse.content.split(/\s+/).length;
  const characterCount = apiResponse.content.length;
  const suggestedHashtags = extractHashtags(apiResponse.content);

  return {
    id: `content-${Date.now()}`,
    generatedText: apiResponse.content,
    contentType,
    toneOfVoice: contentSettings.toneOfVoice,
    businessInfo,
    contentSettings,
    generatedAt: new Date(),
    isDemoData: apiResponse.isDemoData,
    metadata: {
      wordCount,
      characterCount,
      suggestedHashtags,
    },
  };
}
