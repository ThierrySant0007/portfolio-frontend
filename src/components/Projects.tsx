import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  technologies: string;
  status: string;
}

const STATIC_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Limpador de RAM e Otimizador',
    description: 'Aplicativo desktop completo construído para gerenciamento e otimização de sistemas Windows. Permite a limpeza eficiente da memória RAM (Standby List) e remoção de arquivos temporários do sistema operacional, contando também com uma interface de usuário.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    projectUrl: '#',
    githubUrl: 'https://github.com/ThierrySant0007/Memory-cache-cleaner',
    technologies: 'Electron.js, Node.js, TypeScript, Windows API',
    status: 'Concluído'
  },
  {
    id: 2,
    title: 'Discord Bot Integrado ao Gemini AI',
    description: 'Um Bot para o Discord que utiliza o poder do Google Gemini. Ele foi desenvolvido para detectar quando é mencionado nos canais e fornecer respostas geradas por inteligência artificial em tempo real, automatizando o auxílio aos usuários do servidor.',
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=1000',
    projectUrl: '#',
    githubUrl: 'https://github.com/ThierrySant0007/discord-gemini-bot',
    technologies: 'Node.js, TypeScript, Discord.js, Gemini AI API',
    status: 'Concluído'
  },
  {
    id: 4,
    title: 'API RESTful Portfólio',
    description: 'Sistema Backend completo desenvolvido em Java para o gerenciamento dinâmico deste próprio portfólio. Expõe endpoints seguros para operações CRUD de projetos, implementando o padrão de arquitetura Controller-Service-Repository com integração direta ao MySQL.',
    imageUrl: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&q=80&w=1000',
    projectUrl: '#',
    githubUrl: 'https://github.com/thierrybr0007/portfolio-backend',
    technologies: 'Java, Spring Boot, Spring Data JPA, MySQL',
    status: 'Concluído'
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Adiciona classe de reveal animado
    setTimeout(() => {
      document.getElementById('projects')?.classList.add('in');
    }, 100);
  }, []);

  return (
    <>
      <section id="projects" className="section wrapper reveal">
        <div className="section-head">
          <p className="eyebrow">Meus Projetos</p>
          <div className="section-title-col">
            <h2 className="section-title">Projetos</h2>
            <span className="title-rule"></span>
          </div>
        </div>

        <div className="cards-grid">
          {STATIC_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              projectUrl={project.projectUrl}
              githubUrl={project.githubUrl}
              technologies={project.technologies}
              status={project.status}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Renderização do Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
