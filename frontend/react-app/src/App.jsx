import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import SplashScreen from './components/SplashScreen';
import SEO from './components/SEO';
import BackgroundEffect from './components/BackgroundEffect';
import './App.scss';

// Lazy load non-critical components
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const SocialSidebar = lazy(() => import('./components/SocialSidebar'));
const BackToTop = lazy(() => import('./components/BackToTop'));
const Footer = lazy(() => import('./components/Footer'));

// Lazy load page components (code splitting per route)
const PageTransition = lazy(() => import('./components/PageTransition'));
const Home = lazy(() => import('./pages/Home'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const RequireAuth = lazy(() => import('./components/RequireAuth'));

// Minimal loading fallback
const PageLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255,255,255,0.1)',
      borderTop: '3px solid #d628d9',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
);

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
      <Suspense fallback={null}>
        <CustomCursor />
        <SocialSidebar />
        <BackToTop />
      </Suspense>
      <Header />
      <main className={['/portfolio', '/admin', '/login', '/contact'].includes(location.pathname) || !['/', '/about', '/portfolio', '/contact', '/login', '/admin'].includes(location.pathname) ? 'no-snap' : ''}>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </main>
    </div>
  );
}

export default App;
