import type { ContentGenerationRequest, ContentGenerationResponse } from '../types/content';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_ENDPOINT = `${API_BASE_URL}/api/generate-content`;

export class ContentApiService {
  static async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    try {
      console.log('Sending request to:', API_ENDPOINT);
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          content: '',
          isDemoData: false,
          contentType: request.contentType,
          timestamp: new Date().toISOString(),
          error: errorData.error || `Server error: ${response.statusText}`,
          errors: errorData.errors,
        };
      }

      const data = await response.json();
      return data as ContentGenerationResponse;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to connect to content generation service';

      console.error('API error:', errorMessage);

      return {
        success: false,
        content: '',
        isDemoData: false,
        contentType: request.contentType,
        timestamp: new Date().toISOString(),
        error: `Connection error: ${errorMessage}`,
      };
    }
  }

  static async checkApiHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default ContentApiService;
