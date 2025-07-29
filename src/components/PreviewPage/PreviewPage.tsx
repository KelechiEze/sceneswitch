import { useState, useEffect } from 'react';
import { Play, RotateCcw, Edit3, Volume2, Type, Music, Sparkles, Settings, Check, Search, Scissors, X, Pause, SkipBack, SkipForward } from 'lucide-react';
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
  const [musicSearch, setMusicSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showTrimmer, setShowTrimmer] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(30);
  const [showEditModal, setShowEditModal] = useState(false);
  const [videoTrimStart, setVideoTrimStart] = useState(0);
  const [videoTrimEnd, setVideoTrimEnd] = useState(45);

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

  const handleMusicSearch = async () => {
    if (!musicSearch.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        { id: 1, title: musicSearch, artist: 'Various Artists', duration: 180, thumbnail: '🎵' },
        { id: 2, title: `${musicSearch} (Remix)`, artist: 'DJ Mix', duration: 200, thumbnail: '🎶' },
        { id: 3, title: `${musicSearch} - Instrumental`, artist: 'Background Music', duration: 150, thumbnail: '🎼' }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleMusicSelect = (music: any) => {
    setSelectedMusic(music.title);
    setShowTrimmer(true);
    setTrimEnd(music.duration > 30 ? 30 : music.duration);
  };

  const handleEditScenes = () => {
    setShowEditModal(true);
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
                      
                      {showTrimmer && (
                        <div className="music-trimmer">
                          <div className="trimmer-header">
                            <Scissors className="trimmer-icon" />
                            <span>Trim: {selectedMusic}</span>
                            <button 
                              className="close-trimmer"
                              onClick={() => setShowTrimmer(false)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="trimmer-controls">
                            <div className="trim-range">
                              <input
                                type="range"
                                min="0"
                                max="180"
                                value={trimStart}
                                onChange={(e) => setTrimStart(Number(e.target.value))}
                                className="trim-slider start"
                              />
                              <input
                                type="range"
                                min="0"
                                max="180"
                                value={trimEnd}
                                onChange={(e) => setTrimEnd(Number(e.target.value))}
                                className="trim-slider end"
                              />
                            </div>
                            <div className="trim-info">
                              <span>Start: {formatTime(trimStart)}</span>
                              <span>End: {formatTime(trimEnd)}</span>
                              <span>Duration: {formatTime(trimEnd - trimStart)}</span>
                            </div>
                          </div>
                        </div>
                      )}
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
                onClick={handleEditScenes}
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
                  <label className="option-label">Search Music</label>
                  <div className="music-search">
                    <div className="search-input-container">
                      <input
                        type="text"
                        value={musicSearch}
                        onChange={(e) => setMusicSearch(e.target.value)}
                        placeholder="Search for any song..."
                        className="search-input"
                        onKeyPress={(e) => e.key === 'Enter' && handleMusicSearch()}
                      />
                      <button 
                        className="search-btn"
                        onClick={handleMusicSearch}
                        disabled={isSearching}
                      >
                        <Search className="search-icon" />
                      </button>
                    </div>
                    
                    {isSearching && (
                      <div className="search-loading">
                        <div className="loading-spinner"></div>
                        <span>Searching music...</span>
                      </div>
                    )}
                    
                    {searchResults.length > 0 && (
                      <div className="search-results">
                        {searchResults.map((result) => (
                          <button
                            key={result.id}
                            className="search-result"
                            onClick={() => handleMusicSelect(result)}
                          >
                            <span className="result-thumbnail">{result.thumbnail}</span>
                            <div className="result-info">
                              <span className="result-title">{result.title}</span>
                              <span className="result-artist">{result.artist}</span>
                            </div>
                            <span className="result-duration">{Math.floor(result.duration / 60)}:{(result.duration % 60).toString().padStart(2, '0')}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <label className="option-label">Preset Tracks</label>
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
      
      {/* Edit Scenes Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Edit Video Scenes</h2>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                <X className="close-icon" />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="scene-editor">
                <div className="video-timeline">
                  <div className="timeline-header">
                    <span>Video Timeline</span>
                    <div className="timeline-controls">
                      <button className="timeline-btn"><SkipBack size={16} /></button>
                      <button className="timeline-btn"><Pause size={16} /></button>
                      <button className="timeline-btn"><SkipForward size={16} /></button>
                    </div>
                  </div>
                  
                  <div className="timeline-track">
                    <div className="scene-block scene-1" style={{ width: '30%' }}>
                      <span>Scene 1</span>
                    </div>
                    <div className="scene-block scene-2" style={{ width: '40%' }}>
                      <span>Scene 2</span>
                    </div>
                    <div className="scene-block scene-3" style={{ width: '30%' }}>
                      <span>Scene 3</span>
                    </div>
                  </div>
                </div>
                
                <div className="video-trimmer">
                  <h3 className="trimmer-title">Video Trimming</h3>
                  <div className="trim-controls">
                    <div className="trim-range">
                      <label>Start: {formatTime(videoTrimStart)}</label>
                      <input
                        type="range"
                        min="0"
                        max="45"
                        value={videoTrimStart}
                        onChange={(e) => setVideoTrimStart(Number(e.target.value))}
                        className="video-trim-slider"
                      />
                    </div>
                    <div className="trim-range">
                      <label>End: {formatTime(videoTrimEnd)}</label>
                      <input
                        type="range"
                        min="0"
                        max="45"
                        value={videoTrimEnd}
                        onChange={(e) => setVideoTrimEnd(Number(e.target.value))}
                        className="video-trim-slider"
                      />
                    </div>
                  </div>
                  <div className="trim-preview">
                    Final Duration: {formatTime(videoTrimEnd - videoTrimStart)}
                  </div>
                </div>
                
                <div className="audio-trimmer">
                  <h3 className="trimmer-title">Audio Trimming</h3>
                  <div className="audio-waveform">
                    <div className="waveform-bars">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div 
                          key={i} 
                          className="waveform-bar" 
                          style={{ height: `${Math.random() * 60 + 20}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="trim-markers">
                      <div className="trim-marker start" style={{ left: `${(trimStart / 180) * 100}%` }}></div>
                      <div className="trim-marker end" style={{ left: `${(trimEnd / 180) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="modal-btn secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn primary"
                onClick={() => setShowEditModal(false)}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;