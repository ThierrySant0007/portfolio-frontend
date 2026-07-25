import { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies?: string;
  status?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const PLACEHOLDER_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
  <rect width='100%' height='100%' fill='#1e293b'/>
  <text x='50%' y='50%' font-family='Inter, sans-serif' font-size='20' fill='#64748b' text-anchor='middle' dy='.3em'>Imagem do projeto</text>
</svg>`);

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [render, setRender] = useState(isOpen);
  const [localProject, setLocalProject] = useState<Project | null>(project);

  // Mantém os dados do projeto para a animação de saída
  useEffect(() => {
    if (project) {
      setLocalProject(project);
    }
  }, [project]);

  // Efeito para garantir a animação e travar o scroll da página
  useEffect(() => {
    if (isOpen) {
      setRender(true);
      document.body.classList.add('modal-locked');
    } else {
      document.body.classList.remove('modal-locked');
      const timer = setTimeout(() => setRender(false), 400); // 400ms = tempo da animação
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Garantia de remoção do lock caso o componente desmonte abruptamente
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-locked');
    };
  }, []);

  if (!render || !localProject) return null;

  const techList = localProject.technologies ? localProject.technologies.split(',').map(t => t.trim()) : [];

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-panel" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Fechar" onClick={onClose}>✕</button>
        <button className="modal-back" onClick={onClose}>← Voltar aos projetos</button>
        
        <div className="modal-head">
          <div>
            <p className="tag">Projeto {localProject.status || 'Concluído'}</p>
          </div>
          <div className="modal-title-col">
            <h2 className="modal-title">{localProject.title}</h2>
            <p className="modal-summary">{localProject.description}</p>
            {techList.length > 0 && (
              <div className="modal-chip-row">
                {techList.map((tech, idx) => (
                  <span key={idx} className="chip">{tech}</span>
                ))}
              </div>
            )}
          </div>
          <div className="modal-aside">
            <div>
              <p className="meta-label">Ano</p>
              <p className="meta-value">{new Date().getFullYear()}</p>
            </div>
            {(localProject.githubUrl || localProject.projectUrl) && (
              <div>
                <p className="meta-label">Links</p>
                <div className="modal-links">
                  {localProject.githubUrl && (
                    <a href={localProject.githubUrl} className="card-link" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z"/></svg> Repositório
                    </a>
                  )}
                  {localProject.projectUrl && (
                    <a href={localProject.projectUrl} className="card-link primary" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"/></svg> Visitar
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <img src={localProject.imageUrl || PLACEHOLDER_IMG} alt={`Screenshot de ${localProject.title}`} className="modal-image" loading="lazy" />

      </div>
    </div>
  );
}
