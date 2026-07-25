import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`} id="nav">
      <div className="wrapper nav-inner">
        <a href="/#home" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <span className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          </span>
          <span className="logo-text">Thierry Santos Pereira</span>
        </a>
        <div className="nav-meta">
          <span className="status-dot"></span>Brasil, RJ<br />Desenvolvedor Full Stack
        </div>
        <div className="nav-links">
          <a href="/#home">Início</a>
          <a href="/#projects">Projetos</a>
          <a href="/#education">Educação</a>
        </div>
        
        <a href="/#contato" className="nav-contact desktop-contact">Contato</a>

        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <a href="/#home" onClick={() => setMobileMenuOpen(false)}>Início</a>
          <a href="/#projects" onClick={() => setMobileMenuOpen(false)}>Projetos</a>
          <a href="/#education" onClick={() => setMobileMenuOpen(false)}>Educação</a>
          <a href="/#contato" onClick={() => setMobileMenuOpen(false)}>Contato</a>
        </div>
      </div>
    </nav>
  );
}
