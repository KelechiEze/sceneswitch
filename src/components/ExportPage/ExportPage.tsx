import { useState } from 'react';
import { Download, Instagram, Video, Smartphone, AlertTriangle, Check, Share2, Sparkles } from 'lucide-react';
import './ExportPage.css';

interface ExportPageProps {
  onBack: () => void;
}

const ExportPage = ({ onBack }: ExportPageProps) => {
  const [selectedFormat, setSelectedFormat] = useState('instagram');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const formats = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      ratio: '9:16',
      description: 'Perfect for Instagram Reels and Stories',
      size: '1080x1920'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Smartphone,
      ratio: '9:16',
      description: 'Optimized for TikTok vertical videos',
      size: '1080x1920'
    },
    {
      id: 'youtube',
      name: 'YouTube Shorts',
      icon: Video,
      ratio: '9:16',
      description: 'Perfect for YouTube Shorts format',
      size: '1080x1920'
    }
  ];

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
    }, 3000);
  };

  const handleDownload = () => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `sceneswitch-edit-${selectedFormat}.mp4`;
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My SceneSwitch Video',
        text: 'Check out this amazing video I created with SceneSwitch!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="export-page">
      <div className="export-container">
        <div className="export-header">
          <h1 className="export-title">Export Your Video</h1>
          <p className="export-description">
            Choose your platform and download your perfectly edited video
          </p>
        </div>

        <div className="export-content">
          {/* Video Preview */}
          <div className="video-preview-section">
            <div className="preview-container">
              <div className="video-frame">
                <div className="video-preview-placeholder">
                  <Sparkles className="preview-icon" />
                  <span className="preview-text">Your Final Edit</span>
                  <span className="preview-duration">0:45</span>
                </div>
                
                <div className="watermark-notice">
                  <AlertTriangle className="watermark-icon" />
                  <span>Free plan includes watermark</span>
                </div>
              </div>
              
              <div className="video-details">
                <div className="detail-row">
                  <span className="detail-label">Format:</span>
                  <span className="detail-value">{formats.find(f => f.id === selectedFormat)?.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Resolution:</span>
                  <span className="detail-value">{formats.find(f => f.id === selectedFormat)?.size}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Quality:</span>
                  <span className="detail-value">HD 1080p</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Size:</span>
                  <span className="detail-value">~12.5 MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="export-options-section">
            <h3 className="options-title">Choose Export Format</h3>
            
            <div className="format-grid">
              {formats.map((format) => {
                const IconComponent = format.icon;
                return (
                  <button
                    key={format.id}
                    className={`format-option ${selectedFormat === format.id ? 'format-option-active' : ''}`}
                    onClick={() => setSelectedFormat(format.id)}
                  >
                    <div className="format-icon-container">
                      <IconComponent className="format-icon" />
                    </div>
                    <div className="format-info">
                      <h4 className="format-name">{format.name}</h4>
                      <p className="format-description">{format.description}</p>
                      <div className="format-specs">
                        <span className="spec-tag">{format.ratio}</span>
                        <span className="spec-tag">{format.size}</span>
                      </div>
                    </div>
                    {selectedFormat === format.id && (
                      <div className="format-check">
                        <Check className="check-icon" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Watermark Notice */}
            <div className="watermark-info">
              <div className="info-header">
                <AlertTriangle className="info-icon" />
                <span className="info-title">Free Plan Notice</span>
              </div>
              <p className="info-text">
                Videos exported on the free plan include a small SceneSwitch watermark. 
                Upgrade to Pro to remove the watermark and unlock premium features.
              </p>
              <button className="upgrade-btn">
                <Sparkles className="upgrade-icon" />
                <span>Upgrade to Pro</span>
              </button>
            </div>

            {/* Export Actions */}
            <div className="export-actions">
              {!exportComplete ? (
                <button 
                  className={`export-btn ${isExporting ? 'export-btn-loading' : ''}`}
                  onClick={handleExport}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <Download className="export-icon" />
                      <span>Export Video</span>
                    </>
                  )}
                  <div className="btn-shimmer"></div>
                </button>
              ) : (
                <div className="export-complete">
                  <div className="success-message">
                    <Check className="success-icon" />
                    <span>Export Complete!</span>
                  </div>
                  
                  <div className="final-actions">
                    <button className="download-btn" onClick={handleDownload}>
                      <Download className="download-icon" />
                      <span>Download Video</span>
                    </button>
                    
                    <button className="share-btn" onClick={handleShare}>
                      <Share2 className="share-icon" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Back Button */}
            <button className="back-btn" onClick={onBack}>
              <span>← Back to Preview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;