import React from 'react';
import '../../styles/GameCard.css'; // Import CSS for styling


//Data Needed for this component
//   const gameData = {
//   sport: "Basketball",
//   title: "Sunday Morning 3v3",
//   time: new Date("2024-10-27T10:00:00"),
//   location: "Central Park Court",
//   currentPlayers: 4,
//   maxPlayers: 6,
//   skillLevel: "Intermediate",
//   hostName: "Loan Smith",
//   hostRating: 4.8
// };

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-card__gradient-overlay" />
      
      <div className="game-card__content">
        <div className="game-card__sport-badge">
          {game.sport}
          <div className="game-card__skill-level">{game.skillLevel}</div>
        </div>

        <div className="game-card__main-info">
          <h1 className="game-card__title">{game.title}</h1>
          
          <div className="game-card__host">
            <div className="game-card__host-avatar">
              {game.hostPhoto ? (
                <img src={game.hostPhoto} alt={game.hostName} />
              ) : (
                <div>{game.hostName[0]}</div>
              )}
            </div>
            <div className="game-card__host-info">
              <span>Hosted by {game.hostName}</span>
              {game.hostRating && (
                <div className="game-card__host-rating">
                  ★ {game.hostRating.toFixed(1)}
                </div>
              )}
            </div>
          </div>

          <div className="game-card__details">
            <div className="game-card__detail">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8"/>
                <path d="M12 8v4l2 2"/>
              </svg>
              <span>{new Date(game.time).toLocaleString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}</span>
            </div>

            <div className="game-card__detail">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{game.location}</span>
            </div>

            <div className="game-card__detail">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
              <span>{game.currentPlayers} / {game.maxPlayers} Players</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;