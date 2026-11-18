import { ContentGenerationRequest, ValidationResult, ValidationError } from './types.js';

const REQUIRED_FIELDS: (keyof ContentGenerationRequest)[] = [
  'contentType',
  'businessName',
  'industry',
  'productOrService',
  'targetAudience',
  'toneOfVoice',
  'language',
];

const VALID_CONTENT_TYPES = [
  'instagram-captions',
  'facebook-posts',
  'linkedin-posts',
  'blog-articles',
  'google-ads',
  'email-marketing',
  'product-descriptions',
  'website-content',
];

const VALID_TONES = [
  'professional',
  'friendly',
  'persuasive',
  'luxury',
  'informative',
];

const VALID_LANGUAGES = [
  'english',
  'spanish',
  'french',
  'german',
  'portuguese',
  'italian',
  'chinese',
  'japanese',
];

const VALID_LENGTHS = [
  'short',
  'medium',
  'long',
];

export function validateContentRequest(
  request: Partial<ContentGenerationRequest>
): ValidationResult {
  const errors: ValidationError[] = [];

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!request[field] || (typeof request[field] === 'string' && !request[field]?.trim())) {
      errors.push({
        field,
        message: `${field} is required`,
      });
    }
  }

  // Validate content type
  if (request.contentType && !VALID_CONTENT_TYPES.includes(request.contentType)) {
    errors.push({
      field: 'contentType',
      message: `Invalid content type. Must be one of: ${VALID_CONTENT_TYPES.join(', ')}`,
    });
  }

  // Validate tone of voice
  if (request.toneOfVoice && !VALID_TONES.includes(request.toneOfVoice)) {
    errors.push({
      field: 'toneOfVoice',
      message: `Invalid tone of voice. Must be one of: ${VALID_TONES.join(', ')}`,
    });
  }

  // Validate language
  if (request.language && !VALID_LANGUAGES.includes(request.language)) {
    errors.push({
      field: 'language',
      message: `Invalid language. Must be one of: ${VALID_LANGUAGES.join(', ')}`,
    });
  }

  // Validate content length if provided
  if (request.contentLength && !VALID_LENGTHS.includes(request.contentLength)) {
    errors.push({
      field: 'contentLength',
      message: `Invalid content length. Must be one of: ${VALID_LENGTHS.join(', ')}`,
    });
  }

  // Check string field lengths to prevent abuse
  const stringFields: (keyof ContentGenerationRequest)[] = [
    'businessName',
    'industry',
    'productOrService',
    'targetAudience',
    'location',
  ];

  for (const field of stringFields) {
    const value = request[field];
    if (typeof value === 'string') {
      if (value.length > 500) {
        errors.push({
          field,
          message: `${field} must be less than 500 characters`,
        });
      }
      if (value.length < 2 && value.trim().length > 0) {
        errors.push({
          field,
          message: `${field} must be at least 2 characters`,
        });
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
