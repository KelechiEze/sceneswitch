import { Play, Video, Scissors, Brain, Music, ArrowRight, Sparkles } from 'lucide-react';
import './HomePage.css';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage = ({ onGetStarted }: HomePageProps) => {
  const features = [
    {
      icon: Video,
      title: 'Multi-Angle Input',
      description: 'Upload multiple video angles and let AI merge them seamlessly'
    },
    {
      icon: Scissors,
      title: 'Smart Edits',
      description: 'AI automatically cuts and transitions between your best shots'
    },
    {
      icon: Brain,
      title: 'Auto-Captions',
      description: 'Generate accurate captions with perfect timing automatically'
    },
    {
      icon: Music,
      title: 'Music Sync',
      description: 'Sync your video perfectly with trending background music'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles className="badge-icon" />
              <span>AI-Powered Video Editing</span>
            </div>
            
            <h1 className="hero-title">
              AI-Powered
              <span className="hero-highlight"> Multi-Angle </span>
              Video Editing for
              <span className="hero-highlight"> Creators</span>
            </h1>
            
            <p className="hero-description">
              Transform multiple video clips into stunning social media content with our 
              intelligent editing AI. Perfect cuts, seamless transitions, and auto-generated 
              captions in minutes, not hours.
            </p>
            
            <div className="hero-actions">
              <button className="cta-button" onClick={onGetStarted}>
                <Play className="cta-icon" />
                <span>Get Started</span>
                <ArrowRight className="cta-arrow" />
              </button>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Videos Created</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Time Saved</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="video-preview">
              <div className="video-frame video-frame-1">
                <div className="video-placeholder">
                  <Video className="video-icon" />
                  <span>Angle 1</span>
                </div>
              </div>
              <div className="video-frame video-frame-2">
                <div className="video-placeholder">
                  <Video className="video-icon" />
                  <span>Angle 2</span>
                </div>
              </div>
              <div className="video-frame video-frame-3">
                <div className="video-placeholder">
                  <Video className="video-icon" />
                  <span>Angle 3</span>
                </div>
              </div>
              <div className="ai-processing">
                <Brain className="ai-icon" />
                <div className="ai-waves">
                  <div className="wave wave-1"></div>
                  <div className="wave wave-2"></div>
                  <div className="wave wave-3"></div>
                </div>
              </div>
              <div className="final-video">
                <div className="final-placeholder">
                  <Sparkles className="final-icon" />
                  <span>Final Edit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Powerful Features for Creators</h2>
            <p className="features-description">
              Everything you need to create engaging social media content
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`feature-card feature-card-${index + 1}`}
                >
                  <div className="feature-icon-container">
                    <IconComponent className="feature-icon" />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Create Amazing Videos?</h2>
            <p className="cta-description">
              Join thousands of creators who are already using SceneSwitch to level up their content
            </p>
            <button className="cta-button-secondary" onClick={onGetStarted}>
              <Play className="cta-icon" />
              <span>Start Creating Now</span>
              <ArrowRight className="cta-arrow" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;