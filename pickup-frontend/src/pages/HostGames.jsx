import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/host.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';


const SPORTS = [
  { id: 'basketball', name: 'Basketball', icon: '🏀', defaultMax: 10, defaultMin: 6 },
  { id: 'soccer', name: 'Soccer', icon: '⚽', defaultMax: 14, defaultMin: 8 },
  { id: 'tennis', name: 'Tennis', icon: '🎾', defaultMax: 4, defaultMin: 2 },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐', defaultMax: 12, defaultMin: 6 },
  { id: 'baseball', name: 'Baseball', icon: '⚾', defaultMax: 18, defaultMin: 14 },
  { id: 'football', name: 'Football', icon: '🏈', defaultMax: 14, defaultMin: 10 }
];

const HostGameForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    // You can access user details here
    console.log('User email:', user.email);
    console.log('User display name:', user.displayName);
    console.log('User ID:', user.uid);
  }, [user, navigate]);






  const [formData, setFormData] = useState({
    sport: '',
    title: '',
    description: '',
    schedule: {
      startTime: '',
      endTime: ''
    },
    location: {
      address: '',
      venue: '',
      locationType: 'outdoor'
    },
    skillLevel: 'intermediate',
    maxPlayers: '',
    minPlayers: '',
    equipment: '',
    fee: 0,
    autoJoin: true
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleSportChange = (sportId) => {
    const sport = SPORTS.find(s => s.id === sportId);
    setFormData(prev => ({
      ...prev,
      sport: sportId,
      maxPlayers: sport.defaultMax,
      minPlayers: sport.defaultMin
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.sport) newErrors.sport = 'Please select a sport';
    if (!formData.title?.trim()) newErrors.title = 'Please enter a title';
    if (!formData.schedule.startTime) newErrors.startTime = 'Please select a start time';
    if (!formData.schedule.endTime) newErrors.endTime = 'Please select an end time';
    if (!formData.location.address?.trim()) newErrors.address = 'Please enter an address';
    if (formData.minPlayers > formData.maxPlayers) {
      newErrors.players = 'Minimum players cannot exceed maximum players';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Add timestamps and current player count
      const finalData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentPlayers: 1, // Host is first player
        status: 'active'
      };
      console.log('Submitting game:', finalData);
      // Handle your form submission here
    }
  };


  return (
    <>
    <Navbar/>
    <div className="host-game-container">
      <form onSubmit={handleSubmit} className="host-game-form">
        {/* Smart Progress Indicator */}
        <div className="form-progress">
          {[1, 2, 3].map((num) => (
            <div 
              key={num}
              className={`progress-step ${step >= num ? 'active' : ''}`}
              onClick={() => setStep(num)}
            >
              <div className="step-number">{num}</div>
              <div className="step-label">
                {num === 1 ? 'Game Info' : num === 2 ? 'Schedule & Location' : 'Details'}
              </div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="form-section">
            <h2>Game Information 🎮</h2>
            
            <div className="sports-grid">
              {SPORTS.map(sport => (
                <button
                  key={sport.id}
                  type="button"
                  onClick={() => handleSportChange(sport.id)}
                  className={`sport-button ${formData.sport === sport.id ? 'selected' : ''}`}
                >
                  <span className="sport-icon">{sport.icon}</span>
                  <span>{sport.name}</span>
                </button>
              ))}
            </div>
            {errors.sport && <span className="error">{errors.sport}</span>}

            <div className="input-group">
              <label>Game Title</label>
              <input
                type="text"
                placeholder="Give your game a memorable name"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea
                placeholder="Add any special rules, requirements, or notes"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                rows={4}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-section">
            <h2>Schedule & Location 📍</h2>
            
            <div className="time-group">
              <div className="input-group">
                <label>Start Time</label>
                <input
                  type="datetime-local"
                  value={formData.schedule.startTime}
                  onChange={e => setFormData({
                    ...formData,
                    schedule: {...formData.schedule, startTime: e.target.value}
                  })}
                  className={errors.startTime ? 'error' : ''}
                />
                {errors.startTime && <span className="error">{errors.startTime}</span>}
              </div>

              <div className="input-group">
                <label>End Time</label>
                <input
                  type="datetime-local"
                  value={formData.schedule.endTime}
                  onChange={e => setFormData({
                    ...formData,
                    schedule: {...formData.schedule, endTime: e.target.value}
                  })}
                  className={errors.endTime ? 'error' : ''}
                />
                {errors.endTime && <span className="error">{errors.endTime}</span>}
              </div>
            </div>

            <div className="input-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter the game location address"
                value={formData.location.address}
                onChange={e => setFormData({
                  ...formData,
                  location: {...formData.location, address: e.target.value}
                })}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>

            <div className="input-group">
              <label>Venue Name</label>
              <input
                type="text"
                placeholder="e.g., Central Park Court #3"
                value={formData.location.venue}
                onChange={e => setFormData({
                  ...formData,
                  location: {...formData.location, venue: e.target.value}
                })}
              />
            </div>

            <div className="input-group">
              <label>Location Type</label>
              <div className="toggle-group">
                <button
                  type="button"
                  className={`toggle-button ${formData.location.locationType === 'indoor' ? 'active' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    location: {...formData.location, locationType: 'indoor'}
                  })}
                >
                  Indoor
                </button>
                <button
                  type="button"
                  className={`toggle-button ${formData.location.locationType === 'outdoor' ? 'active' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    location: {...formData.location, locationType: 'outdoor'}
                  })}
                >
                  Outdoor
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-section">
            <h2>Game Details 🎯</h2>

            <div className="input-group">
              <label>Skill Level</label>
              <select
                value={formData.skillLevel}
                onChange={e => setFormData({...formData, skillLevel: e.target.value})}
              >
                <option value="beginner">Beginner - Just for fun!</option>
                <option value="intermediate">Intermediate - Some experience</option>
                <option value="advanced">Advanced - Competitive play</option>
              </select>
            </div>

            <div className="players-group">
              <div className="input-group">
                <label>Min Players</label>
                <input
                  type="number"
                  value={formData.minPlayers}
                  onChange={e => setFormData({...formData, minPlayers: parseInt(e.target.value)})}
                  min="2"
                />
              </div>

              <div className="input-group">
                <label>Max Players</label>
                <input
                  type="number"
                  value={formData.maxPlayers}
                  onChange={e => setFormData({...formData, maxPlayers: parseInt(e.target.value)})}
                  min={formData.minPlayers}
                />
              </div>
            </div>
            {errors.players && <span className="error">{errors.players}</span>}

            <div className="input-group">
              <label>Required Equipment</label>
              <input
                type="text"
                placeholder="What should players bring?"
                value={formData.equipment}
                onChange={e => setFormData({...formData, equipment: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label>Game Fee ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.fee}
                onChange={e => setFormData({...formData, fee: parseFloat(e.target.value)})}
              />
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.autoJoin}
                  onChange={e => setFormData({...formData, autoJoin: e.target.checked})}
                />
                Allow players to join automatically
              </label>
            </div>
          </div>
        )}

        <div className="form-actions">
          {step > 1 && (
            <button 
              type="button" 
              className="secondary-button"
              onClick={() => setStep(prev => prev - 1)}
            >
              Back
            </button>
          )}
          
          {step < 3 ? (
            <button 
              type="button" 
              className="primary-button"
              onClick={() => setStep(prev => prev + 1)}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="primary-button">
              Create Game
            </button>
          )}
        </div>
      </form>
    </div>
     <Footer/>
    </>
  );
};

export default HostGameForm;