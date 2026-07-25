import { Link } from 'react-router-dom';

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
          <a href="https://github.com" className="icon-btn" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z"/></svg>
          </a>
          <a href="https://linkedin.com" className="icon-btn" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.24H4.5V23H.5V8.24zM8.5 8.24h3.83v2.02h.05c.53-1 1.85-2.06 3.8-2.06 4.07 0 4.82 2.68 4.82 6.16V23h-4V15c0-1.9-.03-4.35-2.65-4.35-2.65 0-3.06 2.07-3.06 4.21V23h-4V8.24z"/></svg>
          </a>
          <a href="mailto:voce@email.com" className="icon-btn" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
