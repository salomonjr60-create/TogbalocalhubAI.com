import React from 'react';
import '../styles/QuickAccessTools.css';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface QuickAccessToolsProps {
  tools: Tool[];
}

const QuickAccessTools: React.FC<QuickAccessToolsProps> = ({ tools }) => {
  return (
    <div className="quick-access">
      <div className="section-header">
        <h2>Quick Access Tools</h2>
      </div>

      <div className="tools-grid">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className="tool-card"
            style={{ borderTopColor: tool.color }}
          >
            <div className="tool-icon" style={{ backgroundColor: `${tool.color}20` }}>
              {tool.icon}
            </div>
            <h3 className="tool-name">{tool.name}</h3>
            <p className="tool-description">{tool.description}</p>
            <span className="tool-action">Launch →</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessTools;
