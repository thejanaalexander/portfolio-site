import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import SplashScreen from './components/SplashScreen';
import SocialSidebar from './components/SocialSidebar';
import BackToTop from './components/BackToTop';
import SEO from './components/SEO';
import Home from './pages/Home';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RequireAuth from './components/RequireAuth';
import Footer from './components/Footer';
import BackgroundEffect from './components/BackgroundEffect';
import './App.scss';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    const mainEl = document.querySelector('.app-container main');
    if (mainEl) mainEl.scrollTo(0, 0);
  }, [location]);

  if (loading) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="app-container">
      <SEO />
      <BackgroundEffect />
      <CustomCursor />
      <Header />
      <SocialSidebar />
      <BackToTop />
      <main className={['/portfolio', '/admin', '/login', '/contact'].includes(location.pathname) || !['/', '/about', '/portfolio', '/contact', '/login', '/admin'].includes(location.pathname) ? 'no-snap' : ''}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><PortfolioPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
            <Route
              path="/admin"
              element={
                <PageTransition>
                  <RequireAuth>
                    <AdminPage />
                  </RequireAuth>
                </PageTransition>
              }
            />
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </main>
    </div>
  );
}

export default App;
