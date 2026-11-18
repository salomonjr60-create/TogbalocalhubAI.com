import type { ContentType, ToneOfVoice, BusinessInfo, ContentSettings, GeneratedContent } from '../types/content';

/**
 * Demo Content Generator - TEMPORARY PLACEHOLDER
 * 
 * This service generates demo content for the AI Content Studio.
 * Ready for future integration with Google Gemini API.
 * 
 * To integrate Gemini API:
 * 1. Install: npm install @google/generative-ai
 * 2. Add API key to environment variables
 * 3. Replace generateDemoContent() with actual Gemini API call
 * 4. Update generateContent() to use the API
 */

const demoContentTemplates: Record<ContentType, Record<ToneOfVoice, (info: BusinessInfo, settings: ContentSettings) => string>> = {
  'instagram-caption': {
    professional: (info, settings) => 
      `📱 Elevate your brand experience with ${info.productOrService}\n\nCrafted for ${info.targetAudience} in ${info.locationOrMarket}\n\n✨ ${info.businessName}\n\n${settings.callToAction}`,
    friendly: (info, settings) => 
      `Hey! 👋 Check out what ${info.businessName} is doing!\n\nWe're bringing amazing ${info.productOrService} to ${info.targetAudience}\n\nLet's connect! ${settings.callToAction}`,
    persuasive: (info, settings) => 
      `Don't miss out! 🚀\n\n${info.businessName} is revolutionizing ${info.industry}\n\nJoin thousands of satisfied ${info.targetAudience}\n\n${settings.callToAction}`,
    luxury: (info, settings) => 
      `Discover Excellence\n\n${info.businessName} presents: ${info.productOrService}\n\nExclusively designed for the most discerning ${info.targetAudience}\n\n${settings.callToAction}`,
    informative: (info, settings) => 
      `Learn how ${info.businessName} transforms ${info.industry}\n\n${info.productOrService} benefits for ${info.targetAudience}:\n• Premium quality\n• Proven results\n\n${settings.callToAction}`,
  },
  'facebook-post': {
    professional: (info, settings) => 
      `${info.businessName} is proud to serve ${info.targetAudience} with premium ${info.productOrService}.\n\nBased in ${info.locationOrMarket}, we're committed to excellence in the ${info.industry} industry.\n\n${settings.callToAction}`,
    friendly: (info, settings) => 
      `Hey team! 👋\n\nWe're excited to share that ${info.businessName} is now offering amazing ${info.productOrService} to everyone in ${info.locationOrMarket}!\n\nWhether you're part of our ${info.targetAudience} community or curious about ${info.industry}, we'd love to connect with you!\n\n${settings.callToAction}`,
    persuasive: (info, settings) => 
      `🎯 Are you ready to transform your ${info.industry} experience?\n\n${info.businessName} is revolutionizing how ${info.targetAudience} access ${info.productOrService}.\n\nSee what others in ${info.locationOrMarket} already know:\n\n${settings.callToAction}`,
    luxury: (info, settings) => 
      `Introducing a new standard of elegance\n\n${info.businessName} presents an exclusive collection of ${info.productOrService}, curated for the most sophisticated ${info.targetAudience}.\n\nAvailable exclusively in ${info.locationOrMarket}.\n\n${settings.callToAction}`,
    informative: (info, settings) => 
      `Discover what makes ${info.businessName} different\n\nServing the ${info.industry} space for discerning ${info.targetAudience}:\n• Expert crafted ${info.productOrService}\n• Trusted by thousands\n• Based in ${info.locationOrMarket}\n\n${settings.callToAction}`,
  },
  'linkedin-post': {
    professional: (info, settings) => 
      `Excited to share insights on ${info.industry} innovation!\n\n${info.businessName} is transforming how organizations deliver ${info.productOrService} to ${info.targetAudience}.\n\nOur approach combines industry expertise with cutting-edge solutions, serving clients across ${info.locationOrMarket}.\n\n${settings.callToAction}`,
    friendly: (info, settings) => 
      `Great to connect with fellow professionals in ${info.industry}!\n\nAt ${info.businessName}, we're passionate about making ${info.productOrService} more accessible and effective for ${info.targetAudience}.\n\nIf you're in ${info.locationOrMarket}, let's talk!\n\n${settings.callToAction}`,
    persuasive: (info, settings) => 
      `Discover how ${info.businessName} is redefining ${info.industry} standards\n\nOur innovative ${info.productOrService} solutions are trusted by leading ${info.targetAudience} organizations.\n\nReady to elevate your approach?\n\n${settings.callToAction}`,
    luxury: (info, settings) => 
      `The pinnacle of ${info.industry} excellence\n\n${info.businessName} sets the gold standard for premium ${info.productOrService} delivery to elite ${info.targetAudience} clients.\n\nExclusively serving ${info.locationOrMarket}.\n\n${settings.callToAction}`,
    informative: (info, settings) => 
      `Insights on ${info.industry} trends and ${info.productOrService} innovation\n\n${info.businessName} is pioneering solutions for ${info.targetAudience}. Here's what we've learned:\n• Industry expertise\n• Proven methodologies\n• Client success stories\n\n${settings.callToAction}`,
  },
  'blog-article': {
    professional: (info, settings) => 
      `The Complete Guide to ${info.productOrService} in ${info.industry}\n\nIn today's competitive landscape, ${info.targetAudience} need reliable solutions for ${info.productOrService}. At ${info.businessName}, based in ${info.locationOrMarket}, we've developed a comprehensive approach.\n\nKey Benefits:\n1. Enhanced efficiency\n2. Proven ROI\n3. Industry-leading support\n\n${settings.callToAction}`,
    friendly: (info, settings) => 
      `Everything You Need to Know About ${info.productOrService}\n\nHey ${info.targetAudience}! Let's talk about something we're really passionate about: ${info.productOrService}.\n\n${info.businessName} has been serving the ${info.industry} community in ${info.locationOrMarket}, and we've learned a thing or two along the way.\n\nFrom practical tips to industry insights, here's our complete guide.\n\n${settings.callToAction}`,
    persuasive: (info, settings) => 
      `Why ${info.businessName}'s ${info.productOrService} Solution is a Game-Changer\n\nTired of mediocre ${info.productOrService}? ${info.targetAudience} across ${info.locationOrMarket} are discovering why ${info.businessName} is the preferred choice in ${info.industry}.\n\nThis isn't just another product—it's a transformation.\n\n${settings.callToAction}`,
    luxury: (info, settings) => 
      `The Art and Science of Premium ${info.productOrService}\n\n${info.businessName} presents an exclusive exploration of excellence in ${info.industry}.\n\nDesigned exclusively for ${info.targetAudience} who demand the finest, our ${info.productOrService} represents the pinnacle of craftsmanship.\n\nAvailable in ${info.locationOrMarket}.\n\n${settings.callToAction}`,
    informative: (info, settings) => 
      `${info.productOrService} Best Practices for ${info.industry} Professionals\n\n${info.businessName} shares comprehensive insights for ${info.targetAudience}:\n\n1. Understanding ${info.productOrService}\n2. Implementation strategies\n3. Measuring success\n4. Industry trends\n5. Future outlook\n\nBased on our experience serving ${info.locationOrMarket}.\n\n${settings.callToAction}`,
  },
  'google-ads': {
    professional: (info, settings) => 
      `Headline: Discover Premium ${info.productOrService} Solutions\nHeadline: Trusted by ${info.targetAudience} in ${info.locationOrMarket}\nHeadline: Industry-Leading ${info.businessName} Expertise\n\nDescription: ${info.businessName} delivers excellence in ${info.industry}. Transform your approach with our proven ${info.productOrService}. ${settings.callToAction}`,
    friendly: (info, settings) => 
      `Headline: Ready for Amazing ${info.productOrService}?\nHeadline: ${info.businessName} Makes It Easy\nHeadline: Join Happy ${info.targetAudience} Everywhere\n\nDescription: Looking for great ${info.productOrService} in ${info.locationOrMarket}? We've got you covered! Thousands trust ${info.businessName} for quality and service. ${settings.callToAction}`,
    persuasive: (info, settings) => 
      `Headline: Stop Settling for Less\nHeadline: Get ${info.productOrService} That Delivers\nHeadline: Join the ${info.businessName} Revolution\n\nDescription: ${info.targetAudience} in ${info.locationOrMarket} are switching to ${info.businessName}. See why our ${info.productOrService} is the market leader. Limited time offer! ${settings.callToAction}`,
    luxury: (info, settings) => 
      `Headline: Exclusive ${info.productOrService} Excellence\nHeadline: Luxury Redefined by ${info.businessName}\nHeadline: Elegance for Discerning ${info.targetAudience}\n\nDescription: Discover the pinnacle of ${info.industry} sophistication. ${info.businessName}'s premium ${info.productOrService} available exclusively in ${info.locationOrMarket}. ${settings.callToAction}`,
    informative: (info, settings) => 
      `Headline: Everything About ${info.productOrService}\nHeadline: Expert Insights from ${info.businessName}\nHeadline: Serving ${info.industry} Since Day One\n\nDescription: Comprehensive guide to ${info.productOrService} for ${info.targetAudience}. ${info.businessName} shares proven strategies and expert advice. Based in ${info.locationOrMarket}. ${settings.callToAction}`,
  },
  'marketing-email': {
    professional: (info, settings) => 
      `Subject: Discover ${info.businessName}'s ${info.productOrService} Solutions\n\nDear ${info.targetAudience},\n\n${info.businessName} is pleased to introduce our premium ${info.productOrService} offering, specifically designed for the ${info.industry} professional.\n\nExperience the difference that comes from years of industry expertise.\n\n${settings.callToAction}\n\nBest regards,\n${info.businessName} Team`,
    friendly: (info, settings) => 
      `Subject: Hey! ${info.businessName} Has Something Special for You\n\nHi ${info.targetAudience}!\n\nWe're excited to share ${info.businessName}'s latest ${info.productOrService}—designed with you in mind.\n\nWhether you're in ${info.locationOrMarket} or beyond, we think you'll love it.\n\n${settings.callToAction}\n\nCheers,\n${info.businessName}`,
    persuasive: (info, settings) => 
      `Subject: Limited Time: Transform Your ${info.industry} Practice\n\nHello ${info.targetAudience},\n\nFinding the right ${info.productOrService} can be challenging. That's why ${info.businessName} created our breakthrough solution.\n\nSee how hundreds in ${info.locationOrMarket} have already transformed their approach.\n\n${settings.callToAction}\n\n${info.businessName}`,
    luxury: (info, settings) => 
      `Subject: Exclusive Invitation: ${info.businessName} Presents Excellence\n\nMost Valued ${info.targetAudience},\n\nYou're invited to experience the pinnacle of ${info.productOrService} luxury.\n\n${info.businessName} presents an exclusive collection for the most discerning professionals in ${info.industry}.\n\n${settings.callToAction}\n\nWith elegance,\n${info.businessName}`,
    informative: (info, settings) => 
      `Subject: Your Guide to ${info.productOrService} Success\n\nDear ${info.targetAudience},\n\n${info.businessName} is sharing comprehensive insights about ${info.productOrService} for ${info.industry} professionals.\n\nThis guide covers everything you need to know, based on our experience serving ${info.locationOrMarket}.\n\n${settings.callToAction}\n\n${info.businessName}`,
  },
  'product-description': {
    professional: (info, settings) => 
      `${info.businessName} ${info.productOrService}\n\nElevate your ${info.industry} practice with our professionally-engineered solution.\n\nDesigned for: ${info.targetAudience}\nLocation: ${info.locationOrMarket}\n\nFeatures:\n• Professional-grade quality\n• Industry-leading support\n• Proven results\n• Expert consultation included\n\n${settings.callToAction}`,
    friendly: (info, settings) => 
      `Introducing ${info.businessName}'s ${info.productOrService}!\n\nWe created this with ${info.targetAudience} in mind. It's the perfect solution for anyone in ${info.locationOrMarket} who wants amazing ${info.industry} results without the complexity.\n\nWhat You Get:\n• Easy to use\n• Awesome support\n• Great value\n• Community of users\n\n${settings.callToAction}`,
    persuasive: (info, settings) => 
      `The Ultimate ${info.productOrService} Solution\n\n${info.businessName} presents the breakthrough that ${info.targetAudience} have been waiting for.\n\nWhy choose us?\n• Market leader in ${info.industry}\n• Trusted by thousands in ${info.locationOrMarket}\n• Guaranteed results\n• Money-back guarantee\n\n${settings.callToAction}`,
    luxury: (info, settings) => 
      `${info.businessName} ${info.productOrService}: The Gold Standard\n\nExclusively crafted for ${info.targetAudience} who demand excellence.\n\nEach piece represents the pinnacle of ${info.industry} sophistication.\n\nAvailable exclusively in ${info.locationOrMarket}\n\nCharacteristics:\n• Hand-selected materials\n• Expert craftsmanship\n• Lifetime quality guarantee\n• Personal concierge service\n\n${settings.callToAction}`,
    informative: (info, settings) => 
      `${info.businessName} ${info.productOrService}: Complete Specifications\n\nTechnical Details for ${info.targetAudience}:\n\nAbout This Product:\n${info.productOrService} is engineered for the ${info.industry} space, serving the needs of professionals in ${info.locationOrMarket}.\n\nKey Information:\n• Industry compliant\n• Third-party certified\n• Full documentation included\n• Expert support available\n\n${settings.callToAction}`,
  },
  'website-content': {
    professional: (info, settings) => 
      `Welcome to ${info.businessName}\n\nServing ${info.targetAudience} in ${info.locationOrMarket} with premium ${info.productOrService} solutions.\n\nAbout Us\n${info.businessName} is a leading provider in the ${info.industry} space. With years of expertise, we deliver professional-grade solutions.\n\nOur Services\nComprehensive ${info.productOrService} solutions tailored for the modern ${info.industry} professional.\n\n${settings.callToAction}`,
    friendly: (info, settings) => 
      `Hi! Welcome to ${info.businessName}\n\nWe're thrilled to help ${info.targetAudience} in ${info.locationOrMarket} find amazing ${info.productOrService}!\n\nWhat We Do\nSimple. We make ${info.industry} easier with our incredible ${info.productOrService}. No complicated jargon—just real solutions that work.\n\nWhy Choose Us?\n• We care about your success\n• Great customer support\n• Best value in the market\n\n${settings.callToAction}`,
    persuasive: (info, settings) => 
      `Transform Your ${info.industry} Today with ${info.businessName}\n\nJoin ${info.targetAudience} across ${info.locationOrMarket} who've already switched to our revolutionary ${info.productOrService}.\n\nSee the Results\n• 95% customer satisfaction\n• 10x faster implementation\n• Guaranteed ROI increase\n\n${settings.callToAction}`,
    luxury: (info, settings) => 
      `The Epitome of ${info.industry} Excellence\n\n${info.businessName} welcomes the most discerning ${info.targetAudience}.\n\nOur Heritage\nCrafting premium ${info.productOrService} for sophisticated clients in ${info.locationOrMarket}.\n\nThe Experience\nEach interaction with ${info.businessName} represents the gold standard of service excellence.\n\n${settings.callToAction}`,
    informative: (info, settings) => 
      `${info.businessName}: Your Guide to ${info.productOrService}\n\nComprehensive Resources for ${info.targetAudience}\n\nUndersranding ${info.productOrService}\nLearn how ${info.businessName} approaches ${info.industry} solutions for clients in ${info.locationOrMarket}.\n\nTopics Covered\n• Best practices\n• Implementation guide\n• Case studies\n• FAQ and support\n\n${settings.callToAction}`,
  },
};

/**
 * Generate demo content based on request
 * This creates realistic placeholder content to demonstrate the UI
 */
function generateDemoContent(
  contentType: ContentType,
  businessInfo: BusinessInfo,
  settings: ContentSettings
): string {
  const templates = demoContentTemplates[contentType];
  const toneTemplates = templates[settings.toneOfVoice];
  
  if (toneTemplates) {
    return toneTemplates(businessInfo, settings);
  }
  
  return `Generated ${contentType} content for ${businessInfo.businessName}`;
}

/**
 * Extract hashtags from generated content
 */
function extractHashtags(text: string): string[] {
  const matches = text.match(/#\w+/g) || [];
  return matches.map(tag => tag.replace('#', '')).slice(0, 5);
}

/**
 * Main content generation function
 * Ready for Gemini API integration
 */
export async function generateContent(
  contentType: ContentType,
  businessInfo: BusinessInfo,
  contentSettings: ContentSettings
): Promise<GeneratedContent> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const generatedText = generateDemoContent(contentType, businessInfo, contentSettings);
  
  // Calculate metadata
  const wordCount = generatedText.split(/\s+/).length;
  const characterCount = generatedText.length;
  const suggestedHashtags = extractHashtags(generatedText);

  return {
    id: `content-${Date.now()}`,
    generatedText,
    contentType,
    toneOfVoice: contentSettings.toneOfVoice,
    businessInfo,
    contentSettings,
    generatedAt: new Date(),
    isDemoData: true,
    metadata: {
      wordCount,
      characterCount,
      suggestedHashtags,
    },
  };
}

/**
 * Future Gemini API Integration Template
 * Uncomment and configure when ready to connect to actual AI
 */
/*
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function generateContentWithGemini(
  contentType: ContentType,
  businessInfo: BusinessInfo,
  settings: ContentSettings
): Promise<GeneratedContent> {
  const prompt = buildPromptForGemini(contentType, businessInfo, settings);
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const generatedContent = response.text();

  return {
    id: `content-${Date.now()}`,
    content: generatedContent,
    contentType,
    businessInfo,
    settings,
    generatedAt: new Date(),
    isDemoData: false,
  };
}

function buildPromptForGemini(
  contentType: ContentType,
  businessInfo: BusinessInfo,
  settings: ContentSettings
): string {
  return `Create a ${contentType} with the following details...`;
}
*/
