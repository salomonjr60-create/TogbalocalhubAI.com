import React from 'react';
import type { ToneOfVoice, ContentLength, ContentSettings } from '../../types/content';
import '../../styles/AIContentStudio/ContentSettingsForm.css';

interface ContentSettingsFormProps {
  settings: Partial<ContentSettings>;
  onChange: (field: keyof ContentSettings, value: string) => void;
}

const tones: { value: ToneOfVoice; label: string; icon: string }[] = [
  { value: 'professional', label: 'Professional', icon: '💼' },
  { value: 'friendly', label: 'Friendly', icon: '😊' },
  { value: 'persuasive', label: 'Persuasive', icon: '🎯' },
  { value: 'luxury', label: 'Luxury', icon: '✨' },
  { value: 'informative', label: 'Informative', icon: '📚' },
];

const contentLengths: { value: ContentLength; label: string; description: string }[] = [
  { value: 'short', label: 'Short', description: 'Concise and punchy' },
  { value: 'medium', label: 'Medium', description: 'Balanced content' },
  { value: 'long', label: 'Long', description: 'Detailed and comprehensive' },
];

const languages = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'French', value: 'french' },
  { label: 'German', value: 'german' },
  { label: 'Portuguese', value: 'portuguese' },
  { label: 'Italian', value: 'italian' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Japanese', value: 'japanese' },
];

const ContentSettingsForm: React.FC<ContentSettingsFormProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="content-settings-form">
      <div className="form-header">
        <h3>Content Settings</h3>
        <p className="form-subtitle">Customize how your content sounds and feels</p>
      </div>

      {/* Tone of Voice */}
      <div className="settings-group">
        <label>Tone of Voice *</label>
        <div className="tone-buttons">
          {tones.map((tone) => (
            <button
              key={tone.value}
              className={`tone-button ${settings.toneOfVoice === tone.value ? 'active' : ''}`}
              onClick={() => onChange('toneOfVoice', tone.value)}
              title={tone.label}
            >
              <span className="tone-icon">{tone.icon}</span>
              <span className="tone-label">{tone.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="settings-group">
        <label htmlFor="language">Language *</label>
        <select
          id="language"
          value={settings.language || ''}
          onChange={(e) => onChange('language', e.target.value)}
          className="form-select"
        >
          <option value="">Select a language</option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Content Length */}
      <div className="settings-group">
        <label>Content Length *</label>
        <div className="length-buttons">
          {contentLengths.map((length) => (
            <button
              key={length.value}
              className={`length-button ${settings.contentLength === length.value ? 'active' : ''}`}
              onClick={() => onChange('contentLength', length.value)}
            >
              <span className="length-label">{length.label}</span>
              <span className="length-description">{length.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="settings-group">
        <label htmlFor="callToAction">Call to Action *</label>
        <input
          id="callToAction"
          type="text"
          placeholder="e.g., Learn more, Shop now, Sign up, Get started, Download today"
          value={settings.callToAction || ''}
          onChange={(e) => onChange('callToAction', e.target.value)}
          className="form-input"
        />
        <p className="input-hint">The action you want your audience to take</p>
      </div>
    </div>
  );
};

export default ContentSettingsForm;
