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
