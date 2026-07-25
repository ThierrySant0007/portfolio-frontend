interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies?: string;
  status?: string;
}

const PLACEHOLDER_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
  <rect width='100%' height='100%' fill='#1e293b'/>
  <text x='50%' y='50%' font-family='Inter, sans-serif' font-size='20' fill='#64748b' text-anchor='middle' dy='.3em'>Imagem do projeto</text>
</svg>`);

export default function ProjectCard({
  title,
  description,
  imageUrl,
  projectUrl,
  githubUrl,
  technologies,
  status,
  onClick,
}: ProjectCardProps & { onClick?: () => void }) {
  
  const techList = technologies ? technologies.split(',').map(t => t.trim()) : [];

  return (
    <article className="card" onClick={onClick}>
      <button type="button" className="card-media" aria-label={`Ver detalhes de ${title}`}>
        <img src={imageUrl || PLACEHOLDER_IMG} alt={`Imagem de ${title}`} loading="lazy" />
        {status && <span className="status-pill">{status}</span>}
      </button>
      <div className="card-body">
        <div className="card-meta">
          <span>{new Date().getFullYear()}</span>
        </div>
        <button type="button" className="card-title">{title}</button>
        <p className="card-desc">{description}</p>
        
        {techList.length > 0 && (
          <div className="chip-row">
            {techList.map((tech, i) => (
              <span key={i} className="chip">{tech}</span>
            ))}
          </div>
        )}
        
        <div className="card-links">
          {githubUrl && (
            <a href={githubUrl} className="card-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z"/></svg> Repositório
            </a>
          )}
          {projectUrl && (
            <a href={projectUrl} className="card-link primary" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"/></svg> Ver projeto
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
