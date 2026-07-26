import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.08 }
    );

    // Observe currently existing .reveal elements
    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    };
    observeAll();

    // Watch for new .reveal elements added dynamically by React
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-strong)] font-sans selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      <Routes>
        {/* Rota Pública (Portfólio) */}
        <Route path="/" element={
          <main>
            <Hero />
            <Projects />
            <Education />
            <Contact />
          </main>
        } />
        
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota Admin Protegida */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
