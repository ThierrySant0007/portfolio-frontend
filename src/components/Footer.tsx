import { Link } from 'react-router-dom';
import { Mail, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer id="contato">
      <div className="wrapper footer-inner">
        <div className="footer-year">
          © {new Date().getFullYear()} · Desenvolvido com React e Java
          <Link to="/admin" className="opacity-30 hover:opacity-100 transition-opacity ml-2 text-xs" title="Painel Administrativo">
            🔒 Admin
          </Link>
        </div>
        <div className="footer-socials">
          <a href="https://github.com/ThierrySant0007" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub" title="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/thierry-santos-pereira-2b4609232/" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn" title="LinkedIn">
            <FaLinkedin size={20} />
          </a>
          <a href="mailto:thierrybr0007@gmail.com" className="icon-btn" aria-label="Email" title="E-mail">
            <Mail size={20} />
          </a>
          <a href="/curriculo.pdf" download="Thierry_Santos_Curriculo.pdf" className="icon-btn" aria-label="Download CV" title="Baixar Currículo">
            <Download size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
