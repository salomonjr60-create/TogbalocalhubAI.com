import React, { useState } from 'react';
import type { GeneratedContent } from '../../types/content';
import '../../styles/AIContentStudio/ContentOutput.css';

interface ContentOutputProps {
  content: GeneratedContent | null;
  isLoading: boolean;
  onRegenerate: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onSave: () => void;
}

const ContentOutput: React.FC<ContentOutputProps> = ({
  content,
  isLoading,
  onRegenerate,
  onCopy,
  onEdit,
  onSave,
}) => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleCopy = () => {
    if (content?.generatedText) {
      navigator.clipboard.writeText(content.generatedText);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
      onCopy();
    }
  };

  if (!content && !isLoading) {
    return (
      <div className="content-output empty-state">
        <div className="empty-state-icon">🎨</div>
        <h4>No Content Generated Yet</h4>
        <p>Fill in the form and click "Generate Content" to create your content.</p>
      </div>
    );
  }

  return (
    <div className="content-output">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Generating your content...</p>
        </div>
      )}

      {content && (
        <>
          <div className="output-header">
            <div className="output-info">
              <h3>Generated Content</h3>
              {content.isDemoData && (
                <span className="demo-badge">🧪 Demo Mode</span>
              )}
            </div>
            <div className="output-meta">
              <span className="content-type">{content.contentType}</span>
              <span className="tone-badge">{content.toneOfVoice}</span>
            </div>
          </div>

          <div className="output-content">
            <div className="content-text">
              {content.generatedText.split('\n').map((line: string, index: number) => (
                <p key={index}>{line || <br />}</p>
              ))}
            </div>

            {content.metadata && (
              <div className="content-metadata">
                <div className="metadata-item">
                  <span className="metadata-label">Word Count:</span>
                  <span className="metadata-value">
                    {content.metadata.wordCount || 'N/A'}
                  </span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Character Count:</span>
                  <span className="metadata-value">
                    {content.metadata.characterCount || 'N/A'}
                  </span>
                </div>
                {content.metadata.suggestedHashtags && (
                  <div className="metadata-item full-width">
                    <span className="metadata-label">Suggested Hashtags:</span>
                    <div className="hashtags">
                      {content.metadata.suggestedHashtags.map((tag: string, index: number) => (
                        <span key={index} className="hashtag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="output-actions">
            <button
              className="action-button primary-button"
              onClick={handleCopy}
              disabled={isLoading}
            >
              {copyFeedback ? (
                <>✓ Copied to Clipboard</>
              ) : (
                <>📋 Copy Content</>
              )}
            </button>
            <button
              className="action-button secondary-button"
              onClick={onRegenerate}
              disabled={isLoading}
            >
              🔄 Regenerate
            </button>
            <button
              className="action-button secondary-button"
              onClick={onEdit}
              disabled={isLoading}
            >
              ✏️ Edit
            </button>
            <button
              className="action-button success-button"
              onClick={onSave}
              disabled={isLoading}
            >
              💾 Save to Projects
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentOutput;
