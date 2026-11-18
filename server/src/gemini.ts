import { GoogleGenerativeAI } from '@google/generative-ai';
import { ContentGenerationRequest, ContentGenerationResponse } from './types.js';

const MODEL_NAME = 'gemini-pro';
const DEMO_MODE_NOTICE =
  '\n\n[DEMO MODE: This is placeholder content. Connect a real Gemini API key for actual AI generation.]';

class GeminiService {
  private client: GoogleGenerativeAI | null = null;
  private isDemoMode: boolean = true;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.client = new GoogleGenerativeAI(apiKey);
      this.isDemoMode = false;
    } else {
      console.warn(
        '⚠️  GEMINI_API_KEY not configured. Running in demo mode. Set GEMINI_API_KEY environment variable to enable real AI generation.'
      );
      this.isDemoMode = true;
    }
  }

  private buildPrompt(request: ContentGenerationRequest): string {
    const basePrompt = `Generate ${request.contentType.replace('-', ' ')} for the following business:

Business Name: ${request.businessName}
Industry: ${request.industry}
Product/Service: ${request.productOrService}
Target Audience: ${request.targetAudience}
${request.location ? `Location: ${request.location}` : ''}
Tone of Voice: ${request.toneOfVoice}
Content Length: ${request.contentLength || 'medium'}
${request.callToAction ? `Call to Action: ${request.callToAction}` : ''}

Generate compelling, professional content that resonates with the target audience. 
The content should reflect the specified tone and length preferences.`;

    return basePrompt;
  }

  private getDemoContent(request: ContentGenerationRequest): string {
    const demoTemplates: Record<string, (req: ContentGenerationRequest) => string> = {
      'instagram-captions': (req) =>
        `${req.businessName} - Elevating ${req.industry} Excellence\n\nDiscover the power of premium ${req.productOrService}. Designed for ${req.targetAudience} who demand the best.\n\n✨ Limited Time Offer\n${req.callToAction || 'Explore Now →'}${DEMO_MODE_NOTICE}`,
      'facebook-posts': (req) =>
        `🎯 Attention ${req.targetAudience}!\n\nExperience the difference with ${req.businessName}'s premium ${req.productOrService}. Trusted by industry leaders in ${req.industry}.\n\n${req.callToAction || 'Learn More Today'}${DEMO_MODE_NOTICE}`,
      'linkedin-posts': (req) =>
        `Professional Insight: The Future of ${req.industry}\n\nAt ${req.businessName}, we're transforming how businesses engage with ${req.productOrService}. Our solutions are tailored for forward-thinking professionals like you.\n\n${req.callToAction || 'Connect with us'}${DEMO_MODE_NOTICE}`,
      'blog-articles': (req) =>
        `# The Complete Guide to ${req.productOrService} in ${req.industry}\n\nIn this comprehensive article, we explore how ${req.businessName} is revolutionizing the ${req.industry} landscape. Perfect for ${req.targetAudience} seeking cutting-edge solutions.\n\n${req.callToAction || 'Read the full article'}${DEMO_MODE_NOTICE}`,
      'google-ads': (req) =>
        `${req.businessName} - Premium ${req.productOrService}\nHeadline: Excellence in ${req.industry}\nDescription: Discover why ${req.targetAudience} choose us. ${req.callToAction || 'Get Started Now'}${DEMO_MODE_NOTICE}`,
      'email-marketing': (req) =>
        `Subject: Transform Your ${req.industry} with ${req.businessName}\n\nDear Valued Client,\n\nWe're excited to introduce our latest ${req.productOrService} designed specifically for ${req.targetAudience}.\n\n${req.callToAction || 'Claim Your Free Trial'}${DEMO_MODE_NOTICE}`,
      'product-descriptions': (req) =>
        `${req.businessName} ${req.productOrService}\n\nCrafted for discerning ${req.targetAudience} in the ${req.industry} sector. Our premium offering combines innovation with reliability.\n\n${req.callToAction || 'Discover the Difference'}${DEMO_MODE_NOTICE}`,
      'website-content': (req) =>
        `Welcome to ${req.businessName}\n\nWe specialize in innovative ${req.productOrService} solutions for ${req.targetAudience} throughout ${req.location || 'the market'}. Leading the ${req.industry} with premium quality and exceptional service.\n\n${req.callToAction || 'Begin Your Journey'}${DEMO_MODE_NOTICE}`,
    };

    return (
      demoTemplates[request.contentType]?.(request) ||
      `Generated content for ${request.contentType} in ${request.industry}.${DEMO_MODE_NOTICE}`
    );
  }

  async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    try {
      if (this.isDemoMode || !this.client) {
        return {
          success: true,
          content: this.getDemoContent(request),
          isDemoData: true,
          contentType: request.contentType,
          timestamp: new Date().toISOString(),
        };
      }

      // Real Gemini API call
      const model = this.client.getGenerativeModel({ model: MODEL_NAME });
      const prompt = this.buildPrompt(request);

      const result = await model.generateContent(prompt);
      const response = result.response;
      const generatedText = response.text();

      return {
        success: true,
        content: generatedText,
        isDemoData: false,
        contentType: request.contentType,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error during content generation';

      console.error('Content generation error:', errorMessage);

      return {
        success: false,
        content: '',
        isDemoData: false,
        contentType: request.contentType,
        timestamp: new Date().toISOString(),
        error: errorMessage,
      };
    }
  }

  isInDemoMode(): boolean {
    return this.isDemoMode;
  }
}

export const geminiService = new GeminiService();
