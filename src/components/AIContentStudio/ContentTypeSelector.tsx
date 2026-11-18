import React from 'react';
import type { ContentType, ContentTypeOption } from '../../types/content';
import '../../styles/AIContentStudio/ContentTypeSelector.css';

interface ContentTypeSelectorProps {
  selectedType: ContentType | '';
  onSelectType: (type: ContentType) => void;
}

const contentTypeOptions: ContentTypeOption[] = [
  {
    id: 'instagram-captions',
    label: 'Instagram Caption',
    description: 'Engaging social media captions',
    icon: '📸',
    characterLimit: 2200,
    exampleLength: '100-150 characters',
  },
  {
    id: 'facebook-posts',
    label: 'Facebook Post',
    description: 'Engaging Facebook content',
    icon: '👥',
    characterLimit: 63206,
    exampleLength: '200-300 characters',
  },
  {
    id: 'linkedin-posts',
    label: 'LinkedIn Post',
    description: 'Professional LinkedIn content',
    icon: '💼',
    characterLimit: 3000,
    exampleLength: '250-400 characters',
  },
  {
    id: 'blog-articles',
    label: 'Blog Article',
    description: 'Full-length blog posts',
    icon: '📝',
    exampleLength: '1000+ words',
  },
  {
    id: 'google-ads',
    label: 'Google Ads',
    description: 'Headlines and descriptions',
    icon: '🔍',
    exampleLength: '30-90 characters',
  },
  {
    id: 'email-marketing',
    label: 'Email Marketing',
    description: 'Professional email campaigns',
    icon: '✉️',
    exampleLength: '200-500 words',
  },
  {
    id: 'product-descriptions',
    label: 'Product Description',
    description: 'E-commerce product content',
    icon: '📦',
    exampleLength: '100-300 words',
  },
  {
    id: 'website-content',
    label: 'Website Content',
    description: 'Pages and web copy',
    icon: '🌐',
    exampleLength: '300+ words',
  },
];

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="content-type-selector">
      <div className="selector-header">
        <h3>Content Type</h3>
        <p className="selector-subtitle">Choose what you want to create</p>
      </div>

      <div className="content-types-grid">
        {contentTypeOptions.map((option) => (
          <button
            key={option.id}
            className={`content-type-card ${selectedType === option.id ? 'active' : ''}`}
            onClick={() => onSelectType(option.id)}
          >
            <div className="card-icon">{option.icon}</div>
            <h4 className="card-label">{option.label}</h4>
            <p className="card-description">{option.description}</p>
            {option.characterLimit && (
              <p className="card-limit">Max: {option.characterLimit.toLocaleString()} chars</p>
            )}
            <p className="card-example">~{option.exampleLength}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentTypeSelector;
