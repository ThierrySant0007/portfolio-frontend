import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { handleScrollClick as scrollTo } from '../utils/smoothScroll';

export default function Hero() {
  return (
    <section id="home" className="intro wrapper">
      <div className="intro-grid">
        <div className="intro-main">
          <span className="badge">
            <span className="status-dot"></span>Disponível para novas oportunidades
          </span>
          <h1>
            Do conceito à implementação <em>Construindo soluções Full Stack</em>
          </h1>
          <p className="intro-sub">
            Atuo no desenvolvimento de aplicações web completas, criando interfaces modernas, APIs escaláveis e integrações com bancos de dados. Tenho experiência com React, TypeScript, Node.js, Java, SQL e metodologias que priorizam código limpo, performance e manutenção.
          </p>
          <div className="intro-actions">
            <a href="#projects" className="btn-primary" onClick={(e) => scrollTo('projects', e)}>Ver projetos</a>
            <div className="social-row">
              <a href="https://github.com/ThierrySant0007" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub" title="GitHub">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/thierry-santos-pereira-2b4609232/" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn" title="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="mailto:thierrybr0007@gmail.com" className="icon-btn" aria-label="Email" title="E-mail">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
