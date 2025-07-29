import { useState } from 'react';
import Navigation from '../components/Navigation/Navigation';
import HomePage from '../components/HomePage/HomePage';
import UploadPage from '../components/UploadPage/UploadPage';
import PreviewPage from '../components/PreviewPage/PreviewPage';
import ExportPage from '../components/ExportPage/ExportPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onGetStarted={() => setCurrentPage('upload')} />;
      case 'upload':
        return <UploadPage onNext={() => setCurrentPage('preview')} />;
      case 'preview':
        return <PreviewPage onNext={() => setCurrentPage('export')} />;
      case 'export':
        return <ExportPage onBack={() => setCurrentPage('preview')} />;
      default:
        return <HomePage onGetStarted={() => setCurrentPage('upload')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="relative">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Index;
