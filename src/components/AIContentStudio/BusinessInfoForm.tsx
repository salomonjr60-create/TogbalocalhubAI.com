import React from 'react';
import type { BusinessInfo } from '../../types/content';
import '../../styles/AIContentStudio/BusinessInfoForm.css';

interface BusinessInfoFormProps {
  businessInfo: Partial<BusinessInfo>;
  onChange: (field: keyof BusinessInfo, value: string) => void;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({
  businessInfo,
  onChange,
}) => {
  return (
    <div className="business-info-form">
      <div className="form-header">
        <h3>Business Information</h3>
        <p className="form-subtitle">Tell us about your business</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="businessName">Business Name *</label>
          <input
            id="businessName"
            type="text"
            placeholder="e.g., Acme Digital Marketing"
            value={businessInfo.businessName || ''}
            onChange={(e) => onChange('businessName', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry *</label>
          <input
            id="industry"
            type="text"
            placeholder="e.g., Digital Marketing, E-commerce, SaaS"
            value={businessInfo.industry || ''}
            onChange={(e) => onChange('industry', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productOrService">Product or Service *</label>
          <input
            id="productOrService"
            type="text"
            placeholder="e.g., Social Media Management, Web Design"
            value={businessInfo.productOrService || ''}
            onChange={(e) => onChange('productOrService', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetAudience">Target Audience *</label>
          <input
            id="targetAudience"
            type="text"
            placeholder="e.g., Small Business Owners, Tech Startups"
            value={businessInfo.targetAudience || ''}
            onChange={(e) => onChange('targetAudience', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="locationOrMarket">Location or Target Market *</label>
          <input
            id="locationOrMarket"
            type="text"
            placeholder="e.g., North America, Global, UK, Singapore"
            value={businessInfo.locationOrMarket || ''}
            onChange={(e) => onChange('locationOrMarket', e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-info">
        <p>💡 These details help create more relevant and personalized content for your audience.</p>
      </div>
    </div>
  );
};

export default BusinessInfoForm;
