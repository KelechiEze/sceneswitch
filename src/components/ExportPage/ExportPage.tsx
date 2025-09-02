import { useState } from 'react';
import { Download, Instagram, Video, Smartphone, AlertTriangle, Check, Share2, Sparkles, X, Crown, Zap, Star, Shield, CheckCircle } from 'lucide-react';
import './ExportPage.css';

interface ExportPageProps {
  onBack: () => void;
}

interface UpgradePlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  bestValue?: boolean;
}

const ExportPage = ({ onBack }: ExportPageProps) => {
  const [selectedFormat, setSelectedFormat] = useState('instagram');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

  const upgradePlans: UpgradePlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 4.99,
      originalPrice: 9.99,
      period: 'month',
      description: 'Perfect for casual creators getting started',
      features: [
        'No watermark on exports',
        'HD 1080p quality',
        '5 exports per month',
        'Basic effects library',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 12.99,
      originalPrice: 24.99,
      period: 'month',
      description: 'Everything you need for professional content',
      features: [
        'No watermark on exports',
        '4K Ultra HD quality',
        'Unlimited exports',
        'Premium effects library',
        'Advanced AI editing tools',
        'Priority support',
        'Custom branding options'
      ],
      popular: true
    },
    {
      id: 'agency',
      name: 'Agency',
      price: 29.99,
      originalPrice: 59.99,
      period: 'month',
      description: 'For teams and professional agencies',
      features: [
        'Everything in Pro plan',
        '10 team members',
        'Commercial usage rights',
        'White-label solution',
        'API access',
        'Dedicated account manager',
        'Custom AI model training'
      ],
      bestValue: true
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

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      const selectedPlanData = upgradePlans.find(plan => plan.id === selectedPlan);
      
      // Initialize Flutterwave payment
      if (typeof window !== 'undefined' && (window as any).FlutterwaveCheckout) {
        const flutterwaveConfig = {
          public_key: 'FLWPUBK_TEST-bb3802d6b13b255f4740653c0b2c75bc-X', // Replace with your Flutterwave public key
          tx_ref: `sceneswitch-${Date.now()}`,
          amount: selectedPlanData?.price || 12.99,
          currency: 'USD',
          payment_options: 'card, banktransfer, ussd',
          customer: {
            email: 'user@example.com', // You would get this from user data
            name: 'SceneSwitch User',
          },
          customizations: {
            title: 'SceneSwitch Pro Upgrade',
            description: `Upgrade to ${selectedPlanData?.name} Plan`,
            logo: 'https://yourdomain.com/logo.png',
          },
          callback: function(response: any) {
            setIsProcessingPayment(false);
            if (response.status === 'successful') {
              alert('Payment successful! Your account has been upgraded.');
              setShowUpgradeModal(false);
            } else {
              alert('Payment failed. Please try again.');
            }
          },
          onclose: function() {
            setIsProcessingPayment(false);
          }
        };

        (window as any).FlutterwaveCheckout(flutterwaveConfig);
      } else {
        // Fallback if Flutterwave isn't loaded
        setTimeout(() => {
          setIsProcessingPayment(false);
          alert('Payment processed successfully! (This is a demo)');
          setShowUpgradeModal(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessingPayment(false);
      alert('An error occurred during payment. Please try again.');
    }
  };

  // Load Flutterwave script
  if (typeof window !== 'undefined' && !(window as any).FlutterwaveCheckout) {
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    document.body.appendChild(script);
  }

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
              <button className="upgrade-btn" onClick={handleUpgradeClick}>
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

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="modal-overlay" onClick={() => !isProcessingPayment && setShowUpgradeModal(false)}>
          <div className="upgrade-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <Crown className="modal-title-icon" />
                Upgrade Your Plan
              </h2>
              <button 
                className="modal-close"
                onClick={() => !isProcessingPayment && setShowUpgradeModal(false)}
                disabled={isProcessingPayment}
              >
                <X className="close-icon" />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="plans-grid">
                {upgradePlans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`plan-card ${plan.popular ? 'plan-card-popular' : ''} ${plan.bestValue ? 'plan-card-best' : ''}`}
                  >
                    {plan.popular && (
                      <div className="plan-badge popular">
                        <Star className="badge-icon" />
                        Most Popular
                      </div>
                    )}
                    {plan.bestValue && (
                      <div className="plan-badge best-value">
                        <Zap className="badge-icon" />
                        Best Value
                      </div>
                    )}
                    
                    <div className="plan-header">
                      <h3 className="plan-name">{plan.name}</h3>
                      <div className="plan-price">
                        <span className="price-amount">${plan.price}</span>
                        <span className="price-period">/{plan.period}</span>
                        {plan.originalPrice && (
                          <span className="original-price">${plan.originalPrice}</span>
                        )}
                      </div>
                      <p className="plan-description">{plan.description}</p>
                    </div>
                    
                    <div className="plan-features">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <CheckCircle className="feature-icon" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      className={`plan-select-btn ${selectedPlan === plan.id ? 'plan-selected' : ''}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? (
                        <>
                          <Check className="select-icon" />
                          Selected
                        </>
                      ) : (
                        'Select Plan'
                      )}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="security-notice">
                <Shield className="security-icon" />
                <span>Your payment is secure and encrypted. We use Flutterwave for secure payment processing.</span>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="modal-btn secondary"
                onClick={() => setShowUpgradeModal(false)}
                disabled={isProcessingPayment}
              >
                Cancel
              </button>
              <button 
                className="modal-btn primary payment-btn"
                onClick={handlePayment}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Sparkles className="payment-icon" />
                    Pay Now - ${upgradePlans.find(p => p.id === selectedPlan)?.price}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportPage;