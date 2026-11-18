import React, { useState } from 'react';
import ContentTypeSelector from './AIContentStudio/ContentTypeSelector';
import BusinessInfoForm from './AIContentStudio/BusinessInfoForm';
import ContentSettingsForm from './AIContentStudio/ContentSettingsForm';
import ContentOutput from './AIContentStudio/ContentOutput';
import type {
  ContentType,
  BusinessInfo,
  ContentSettings,
  GeneratedContent,
} from '../types/content';
import { generateContent } from '../services/contentGenerator';
import '../styles/AIContentStudio.css';

interface AIContentStudioProps {
  onNavigateToDashboard?: () => void;
}

const AIContentStudio: React.FC<AIContentStudioProps> = ({ onNavigateToDashboard }) => {
  const [selectedContentType, setSelectedContentType] = useState<ContentType | ''>('');
  const [businessInfo, setBusinessInfo] = useState<Partial<BusinessInfo>>({});
  const [contentSettings, setContentSettings] = useState<Partial<ContentSettings>>({
    toneOfVoice: 'professional',
    language: 'english',
    contentLength: 'medium',
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBusinessInfoChange = (field: keyof BusinessInfo, value: string) => {
    setBusinessInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSettingsChange = (field: keyof ContentSettings, value: string) => {
    setContentSettings((prev) => ({
      ...prev,
      [field]: value as any,
    }));
  };

  const isFormValid = () => {
    return (
      selectedContentType &&
      businessInfo.businessName &&
      businessInfo.industry &&
      businessInfo.productOrService &&
      businessInfo.targetAudience &&
      businessInfo.locationOrMarket &&
      contentSettings.toneOfVoice &&
      contentSettings.language &&
      contentSettings.contentLength &&
      contentSettings.callToAction
    );
  };

  const handleGenerateContent = async () => {
    if (!isFormValid()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const content = await generateContent(
        selectedContentType as ContentType,
        businessInfo as BusinessInfo,
        contentSettings as ContentSettings
      );

      setGeneratedContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);
    setError(null);

    try {
      const content = await generateContent(
        selectedContentType as ContentType,
        businessInfo as BusinessInfo,
        contentSettings as ContentSettings
      );

      setGeneratedContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to regenerate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    console.log('Content copied to clipboard');
  };

  const handleEdit = () => {
    if (generatedContent) {
      console.log('Edit mode for content:', generatedContent.generatedText);
    }
  };

  const handleSave = () => {
    if (generatedContent) {
      console.log('Saved content to projects:', generatedContent);
    }
  };

  return (
    <div className="ai-content-studio">
      <div className="studio-container">
        <div className="studio-header">
          <div className="header-content">
            <h1>AI Content Studio</h1>
            <p className="header-subtitle">
              Create professional marketing content powered by AI
            </p>
          </div>
          {onNavigateToDashboard && (
            <button className="back-button" onClick={onNavigateToDashboard}>
              ← Back to Dashboard
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
            <button
              className="error-close"
              onClick={() => setError(null)}
            >
              ✕
            </button>
          </div>
        )}

        <div className="studio-layout">
          <div className="studio-form-section">
            <div className="form-container">
              <ContentTypeSelector
                selectedType={selectedContentType}
                onSelectType={setSelectedContentType}
              />
            </div>

            <div className="form-container">
              <BusinessInfoForm
                businessInfo={businessInfo}
                onChange={handleBusinessInfoChange}
              />
            </div>

            <div className="form-container">
              <ContentSettingsForm
                settings={contentSettings}
                onChange={handleSettingsChange}
              />
            </div>

            <div className="form-actions">
              <button
                className={`generate-button ${!isFormValid() ? 'disabled' : ''}`}
                onClick={handleGenerateContent}
                disabled={isLoading || !isFormValid()}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-mini"></span>
                    Generating...
                  </>
                ) : (
                  <>✨ Generate Content</>
                )}
              </button>
              <p className="form-hint">
                {!isFormValid()
                  ? '👆 Fill in all required fields to generate content'
                  : '✓ Ready to generate'}
              </p>
            </div>
          </div>

          <div className="studio-output-section">
            <ContentOutput
              content={generatedContent}
              isLoading={isLoading}
              onRegenerate={handleRegenerate}
              onCopy={handleCopy}
              onEdit={handleEdit}
              onSave={handleSave}
            />
          </div>
        </div>

        <div className="studio-footer">
          <p>
            🧪 <strong>Demo Mode:</strong> This is a demonstration. Generated content is placeholder
            text. Future versions will integrate with Google Gemini API for real AI content generation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIContentStudio;
