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
  CheckCircle,
  Loader
} from 'lucide-react';
import './UploadPage.css';

interface UploadPageProps {
  onNext: (editedVideos: EditedVideo[]) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  file: File;
}

interface EditedVideo {
  id: string;
  name: string;
  url: string;
  effect: string;
}

interface ApiResponse {
  id: string;
  status: string;
  output?: string;
  error?: string;
}

const UploadPage = ({ onNext }: UploadPageProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // In a real application, this would be stored securely
  const API_KEY = 'your_runwayml_api_key_here'; // Replace with your actual API key

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
          type: file.type,
          file: file
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

  // Function to upload file to a temporary storage (mock implementation)
  const uploadToTempStorage = async (file: File): Promise<string> => {
    // In a real application, you would upload to cloud storage like S3
    // and return the URL. For demo purposes, we'll create a blob URL
    return URL.createObjectURL(file);
  };

  // Function to apply AI effect using RunwayML API
  const applyAIEffect = async (videoUrl: string, effect: string): Promise<string> => {
    // This is a simplified version of the RunwayML API call
    // You would need to adjust based on the specific API requirements
    
    const response = await fetch('https://api.runwayml.com/v1/effects/apply', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: videoUrl,
        effect: effect,
        // Additional parameters based on the specific effect
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    
    // Poll for result (in a real app, you might use WebSockets or webhooks)
    return await pollForResult(data.id);
  };

  // Poll for the result of the AI processing
  const pollForResult = async (jobId: string): Promise<string> => {
    const maxAttempts = 30;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const response = await fetch(`https://api.runwayml.com/v1/jobs/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.status === 'completed' && data.output) {
        return data.output;
      } else if (data.status === 'failed') {
        throw new Error(data.error || 'Processing failed');
      }
      
      attempts++;
      setProgress(Math.min(95, (attempts / maxAttempts) * 100)); // Update progress
    }
    
    throw new Error('Processing timeout');
  };

  // Process videos with selected effects
  const processVideos = async () => {
    if (uploadedFiles.length < 2 || selectedEffects.length === 0) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      const editedVideos: EditedVideo[] = [];
      
      // Process each file with each selected effect
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const tempUrl = await uploadToTempStorage(file.file);
        
        for (let j = 0; j < selectedEffects.length; j++) {
          const effect = selectedEffects[j];
          setProgress(((i * selectedEffects.length + j) / (uploadedFiles.length * selectedEffects.length)) * 80);
          
          try {
            const outputUrl = await applyAIEffect(tempUrl, effect);
            
            editedVideos.push({
              id: `${file.id}-${effect}`,
              name: `${file.name} (${effect})`,
              url: outputUrl,
              effect: effect
            });
          } catch (error) {
            console.error(`Failed to process ${file.name} with effect ${effect}:`, error);
            // Continue with other processing even if one fails
          }
        }
      }
      
      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        onNext(editedVideos);
      }, 1000);
      
    } catch (error) {
      console.error('Processing failed:', error);
      setError('Failed to process videos. Please try again.');
      setIsProcessing(false);
    }
  };

  const canProceed = uploadedFiles.length >= 2 && selectedEffects.length > 0 && !isProcessing;

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
          className={`upload-area ${isDragging ? 'upload-area-dragging' : ''} ${isProcessing ? 'upload-area-disabled' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={isProcessing ? undefined : handleFileInputClick}
        >
          <div className="upload-content">
            {isProcessing ? (
              <>
                <div className="processing-spinner">
                  <Loader className="spinner-icon" />
                </div>
                <h3 className="upload-text">Processing your videos...</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="upload-subtext">{Math.round(progress)}% complete</p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".mp4,.mov,video/mp4,video/quicktime"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="upload-input"
            disabled={isProcessing}
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
                      disabled={isProcessing}
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
                  disabled={isProcessing}
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
            <li className={selectedEffects.length > 0 ? 'requirement-met' : ''}>
              <div className="requirement-indicator"></div>
              Select at least 1 effect
            </li>
          </ul>
        </div>

        {/* Next Button */}
        <div className="upload-actions">
          <button 
            className={`next-btn ${canProceed ? 'next-btn-enabled' : 'next-btn-disabled'}`}
            onClick={processVideos}
            disabled={!canProceed}
          >
            {isProcessing ? (
              <Loader className="next-icon spinning" />
            ) : (
              <Video className="next-icon" />
            )}
            <span>{isProcessing ? 'Processing...' : 'Next: Auto Edit'}</span>
            <div className="btn-shimmer"></div>
          </button>
          
          {!canProceed && !isProcessing && (
            <p className="upload-hint">
              {uploadedFiles.length < 2 
                ? 'Upload at least 2 videos to continue' 
                : 'Select at least 1 effect to continue'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;