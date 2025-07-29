import { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Video, 
  FileVideo, 
  AlertCircle, 
  Check, 
  Tv,
  Sparkles,
  Palette,
  Cherry,
  Theater,
  Frown,
  CloudRain,
  Cpu,
  Camera,
  Tv2,
  Cloud,
  Zap,
  File,
  CheckCircle
} from 'lucide-react';
import './UploadPage.css';

interface UploadPageProps {
  onNext: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

const UploadPage = ({ onNext }: UploadPageProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const effectOptions = [
    { id: 'retro', name: 'Retro',  icon: <Tv className="effect-icon" />, description: 'Vintage 80s vibe' },
    { id: 'animated', name: 'Animated', icon: <Sparkles className="effect-icon" />, description: 'Dynamic transitions' },
    { id: 'cartoon', name: 'Cartoon', icon: <Palette className="effect-icon" />, description: 'Fun and colorful' },
    { id: 'anime', name: 'Anime', icon: <Cherry className="effect-icon" />, description: 'Japanese animation style' },
    { id: 'toonies', name: 'Toonies', icon: <Theater className="effect-icon" />, description: 'Classic cartoon look' },
    { id: 'sad', name: 'Sad', icon: <Frown className="effect-icon" />, description: 'Emotional and moody' },
    { id: 'rainy', name: 'Rainy', icon: <CloudRain className="effect-icon" />, description: 'Atmospheric weather' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: <Cpu className="effect-icon" />, description: 'Futuristic neon' },
    { id: 'vintage', name: 'Vintage', icon: <Camera className="effect-icon" />, description: 'Old film aesthetic' },
    { id: 'glitch', name: 'Glitch', icon: <Tv2 className="effect-icon" />, description: 'Digital distortion' },
    { id: 'dreamy', name: 'Dreamy', icon: <Cloud className="effect-icon" />, description: 'Soft and ethereal' },
    { id: 'epic', name: 'Epic', icon: <Zap className="effect-icon" />, description: 'Dramatic and powerful' }
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['video/mp4', 'video/mov', 'video/quicktime'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!validTypes.includes(file.type)) {
      setError('Only MP4 and MOV files are supported');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 100MB');
      return false;
    }

    return true;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    setError('');
    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        const uploadedFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type
        };
        newFiles.push(uploadedFile);
      }
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const toggleEffect = (effectId: string) => {
    setSelectedEffects(prev => 
      prev.includes(effectId) 
        ? prev.filter(id => id !== effectId)
        : [...prev, effectId]
    );
  };

  const canProceed = uploadedFiles.length >= 2;

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <h1 className="upload-title">Upload Your Video Clips</h1>
          <p className="upload-description">
            Add multiple video angles to create your perfect edit. Upload at least 2 videos to continue.
          </p>
        </div>

        {/* Upload Area */}
        <div 
          className={`upload-area ${isDragging ? 'upload-area-dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileInputClick}
        >
          <div className="upload-content">
            <div className="upload-icon-container">
              <Upload className="upload-icon" />
              <div className="upload-pulse"></div>
            </div>
            
            <h3 className="upload-text">
              {isDragging ? 'Drop your files here' : 'Drop your video files here'}
            </h3>
            <p className="upload-subtext">
              or <span className="upload-link">click to browse</span>
            </p>
            
            <div className="upload-formats">
              <span className="format-tag"><File className="format-icon" /> MP4</span>
              <span className="format-tag"><File className="format-icon" /> MOV</span>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".mp4,.mov,video/mp4,video/quicktime"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="upload-input"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <AlertCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h3 className="files-title">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            
            <div className="files-list">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={file.id} 
                  className={`file-item file-item-${index}`}
                >
                  <div className="file-info">
                    <div className="file-icon-container">
                      <FileVideo className="file-icon" />
                    </div>
                    <div className="file-details">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{file.size}</span>
                    </div>
                  </div>
                  
                  <div className="file-actions">
                    <div className="file-status">
                      <CheckCircle className="check-icon" />
                      <span>Ready</span>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="remove-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Effects Selection */}
        {uploadedFiles.length > 0 && (
          <div className="effects-section">
            <h3 className="effects-title">
              Choose Your Style Effects
              <span className="effects-subtitle">Help AI understand your creative vision</span>
            </h3>
            
            <div className="effects-grid">
              {effectOptions.map((effect, index) => (
                <button
                  key={effect.id}
                  className={`effect-card ${selectedEffects.includes(effect.id) ? 'effect-card-selected' : ''}`}
                  onClick={() => toggleEffect(effect.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="effect-icon-container">{effect.icon}</div>
                  <div className="effect-info">
                    <span className="effect-name">{effect.name}</span>
                    <span className="effect-description">{effect.description}</span>
                  </div>
                  <div className="effect-check">
                    <Check className="effect-check-icon" />
                  </div>
                </button>
              ))}
            </div>
            
            {selectedEffects.length > 0 && (
              <div className="selected-effects">
                <span className="selected-count">{selectedEffects.length} effect{selectedEffects.length !== 1 ? 's' : ''} selected</span>
              </div>
            )}
          </div>
        )}

        {/* Requirements */}
        <div className="requirements">
          <h4 className="requirements-title">Requirements:</h4>
          <ul className="requirements-list">
            <li className={uploadedFiles.length >= 2 ? 'requirement-met' : ''}>
              <div className="requirement-indicator"></div>
              Upload at least 2 video clips
            </li>
            <li className="requirement-met">
              <div className="requirement-indicator"></div>
              Maximum file size: 100MB
            </li>
            <li className="requirement-met">
              <div className="requirement-indicator"></div>
              Supported formats: MP4, MOV
            </li>
          </ul>
        </div>

        {/* Next Button */}
        <div className="upload-actions">
          <button 
            className={`next-btn ${canProceed ? 'next-btn-enabled' : 'next-btn-disabled'}`}
            onClick={onNext}
            disabled={!canProceed}
          >
            <Video className="next-icon" />
            <span>Next: Auto Edit</span>
            <div className="btn-shimmer"></div>
          </button>
          
          {!canProceed && (
            <p className="upload-hint">
              Upload at least 2 videos to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;