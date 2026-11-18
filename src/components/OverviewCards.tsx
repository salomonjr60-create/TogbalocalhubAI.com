import React from 'react';
import '../styles/OverviewCards.css';

interface CardData {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  isDemoData?: boolean;
}

interface OverviewCardsProps {
  cards: CardData[];
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ cards }) => {
  return (
    <div className="overview-section">
      <div className="section-header">
        <h2>Dashboard Overview</h2>
        <span className="demo-badge">📊 Demo Data</span>
      </div>
      <div className="overview-cards">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <span className="card-icon">{card.icon}</span>
              <div className={`trend-badge trend-${card.trend}`}>
                {card.trend === 'up' && '↑'}
                {card.trend === 'down' && '↓'}
                {card.trend === 'neutral' && '→'}
                {Math.abs(card.change)}%
              </div>
            </div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-value">{card.value}</p>
            <p className="card-subtitle">
              {card.trend === 'up' && 'Increased from last month'}
              {card.trend === 'down' && 'Decreased from last month'}
              {card.trend === 'neutral' && 'No change from last month'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;
