import { useState, useEffect } from 'react';
import { Play, RotateCcw, Edit3, Volume2, Type, Music, Sparkles, Settings, Check } from 'lucide-react';
import './PreviewPage.css';

interface PreviewPageProps {
  onNext: () => void;
}

const PreviewPage = ({ onNext }: PreviewPageProps) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [selectedFont, setSelectedFont] = useState('Modern');
  const [selectedMusic, setSelectedMusic] = useState('Chill Beat');
  const [showSettings, setShowSettings] = useState(false);

  const fontOptions = ['Modern', 'Bold', 'Elegant', 'Playful', 'Minimal'];
  const musicOptions = ['Chill Beat', 'TikTok Trendy', 'Upbeat Vibe', 'Lo-Fi Calm', 'Epic Build'];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleRegenerate = () => {
    setIsProcessing(true);
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="preview-page">
      <div className="preview-container">
        <div className="preview-header">
          <h1 className="preview-title">Preview Your Auto-Edited Clip</h1>
          <p className="preview-description">
            Watch your AI-generated edit and customize the final touches
          </p>
        </div>

        <div className="preview-content">
          {/* Video Preview Section */}
          <div className="video-section">
            <div className="video-container">
              {isProcessing ? (
                <div className="processing-overlay">
                  <div className="processing-content">
                    <div className="ai-brain">
                      <Sparkles className="ai-icon" />
                      <div className="brain-waves">
                        <div className="wave wave-1"></div>
                        <div className="wave wave-2"></div>
                        <div className="wave wave-3"></div>
                        <div className="wave wave-4"></div>
                      </div>
                    </div>
                    <h3 className="processing-title">AI is crafting your perfect edit</h3>
                    <p className="processing-subtitle">Analyzing scenes and creating transitions...</p>
                    
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{progress}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="video-player">
                  <div className="video-placeholder">
                    <Play className="play-icon" />
                    <div className="video-info">
                      <span className="video-title">Your Epic Edit</span>
                      <span className="video-duration">{formatTime(45)}</span>
                    </div>
                  </div>
                  
                  {captionsEnabled && (
                    <div className="video-captions">
                      <span className={`caption-text caption-${selectedFont.toLowerCase()}`}>
                        "This is how you create amazing content with SceneSwitch"
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="video-controls">
              <button 
                className="control-btn regenerate-btn"
                onClick={handleRegenerate}
                disabled={isProcessing}
              >
                <RotateCcw className="control-icon" />
                <span>Regenerate</span>
              </button>
              
              <button 
                className="control-btn edit-btn"
                disabled={isProcessing}
              >
                <Edit3 className="control-icon" />
                <span>Edit Scenes</span>
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="settings-panel">
            <div className="settings-header">
              <h3 className="settings-title">
                <Settings className="settings-icon" />
                Customize Your Video
              </h3>
            </div>

            <div className="settings-content">
              {/* Captions Section */}
              <div className="setting-section">
                <div className="setting-header">
                  <Type className="section-icon" />
                  <span className="section-title">Captions</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={captionsEnabled}
                      onChange={(e) => setCaptionsEnabled(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                {captionsEnabled && (
                  <div className="setting-options">
                    <label className="option-label">Font Style</label>
                    <div className="font-grid">
                      {fontOptions.map((font) => (
                        <button
                          key={font}
                          className={`font-option ${selectedFont === font ? 'font-option-active' : ''}`}
                          onClick={() => setSelectedFont(font)}
                        >
                          <span className={`font-preview font-${font.toLowerCase()}`}>Aa</span>
                          <span className="font-name">{font}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Music Section */}
              <div className="setting-section">
                <div className="setting-header">
                  <Music className="section-icon" />
                  <span className="section-title">Background Music</span>
                  <Volume2 className="volume-icon" />
                </div>
                
                <div className="setting-options">
                  <label className="option-label">Choose Track</label>
                  <div className="music-list">
                    {musicOptions.map((music) => (
                      <button
                        key={music}
                        className={`music-option ${selectedMusic === music ? 'music-option-active' : ''}`}
                        onClick={() => setSelectedMusic(music)}
                      >
                        <div className="music-info">
                          <span className="music-name">{music}</span>
                          <div className="music-waveform">
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                          </div>
                        </div>
                        {selectedMusic === music && (
                          <Check className="check-icon" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Export Settings Preview */}
              <div className="setting-section">
                <div className="setting-header">
                  <Sparkles className="section-icon" />
                  <span className="section-title">Export Preview</span>
                </div>
                
                <div className="export-preview">
                  <div className="preview-stats">
                    <div className="stat">
                      <span className="stat-label">Duration</span>
                      <span className="stat-value">0:45</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Quality</span>
                      <span className="stat-value">1080p</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Format</span>
                      <span className="stat-value">MP4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="preview-actions">
          <button 
            className={`continue-btn ${!isProcessing ? 'continue-btn-enabled' : 'continue-btn-disabled'}`}
            onClick={onNext}
            disabled={isProcessing}
          >
            <Play className="continue-icon" />
            <span>Continue to Export</span>
            <div className="btn-shimmer"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;