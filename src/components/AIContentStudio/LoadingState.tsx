import React from 'react';
import '../../styles/AIContentStudio/LoadingState.css';

interface LoadingStateProps {
  message?: string;
  contentType?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Generating your content...',
  contentType,
}) => {
  return (
    <div className="loading-state">
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>

        <div className="loading-text">
          <h3>{message}</h3>
          {contentType && (
            <p>Creating {contentType.replace('-', ' ')}...</p>
          )}
        </div>

        <div className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
