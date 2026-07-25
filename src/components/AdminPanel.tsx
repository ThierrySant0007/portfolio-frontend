import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  technologies: string;
  status: string;
}

const ALL_TECHNOLOGIES = [
  "Java", "Spring Boot", "React", "Node.js", "TypeScript", "JavaScript", 
  "Python", "C#", ".NET", "PHP", "Laravel", "Ruby", "Rails", "Go", "Rust", 
  "C++", "Swift", "Kotlin", "HTML", "CSS", "Tailwind CSS", "Bootstrap", 
  "Sass", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle", "Redis", 
  "Firebase", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", 
  "Git", "Linux"
];

export default function AdminPanel() {
  const navigate = useNavigate();
  
  // Estado da lista de projetos
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Estado do formulário
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    status: 'Concluído'
  });
  
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Buscar projetos ao carregar a página
  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const res = await fetch('http://localhost:8080/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Erro ao carregar projetos:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTechChange = (tech: string) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter(t => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      projectUrl: '',
      githubUrl: '',
      status: 'Concluído'
    });
    setSelectedTechs([]);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      projectUrl: project.projectUrl || '',
      githubUrl: project.githubUrl || '',
      status: project.status || 'Concluído'
    });
    
    // Converte a string de tecnologias de volta para um array
    const techs = project.technologies 
      ? project.technologies.split(',').map(t => t.trim()) 
      : [];
    setSelectedTechs(techs);
    
    // Scroll suave para o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMessage({ text: 'Modo de edição ativado. Altere os campos e salve.', type: 'info' });
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o projeto "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Falha ao deletar projeto');

      setMessage({ text: 'Projeto excluído com sucesso!', type: 'success' });
      fetchProjects(); // Recarrega a lista
      
      // Se estava editando o projeto que foi deletado, limpa o formulário
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Erro ao excluir projeto.', type: 'error' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const projectData = {
      ...formData,
      technologies: selectedTechs.join(', ')
    };

    try {
      const url = editingId 
        ? `http://localhost:8080/api/projects/${editingId}`
        : 'http://localhost:8080/api/projects';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error('Falha ao salvar projeto');

      setMessage({ text: editingId ? 'Projeto atualizado com sucesso!' : 'Projeto criado com sucesso!', type: 'success' });
      
      resetForm();
      fetchProjects(); // Recarrega a lista de projetos atualizada
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Erro ao salvar projeto. Verifique se o backend está rodando.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section wrapper" style={{ paddingTop: '8rem' }}>
      <div className="section-head mb-8 border-b border-[var(--border)] pb-4">
        <div className="section-title-col">
          <h1 className="section-title">Painel Administrativo</h1>
          <span className="title-rule mt-2"></span>
        </div>
        <div className="flex gap-4 self-start mt-4 lg:mt-0 justify-end col-span-2">
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[var(--slate-800)] hover:bg-[var(--slate-700)] rounded-lg transition-colors text-sm text-white border border-[var(--border)]"
          >
            Ver Portfólio
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm border border-red-500/20"
          >
            Sair
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-lg ${
          message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
          message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
          'bg-blue-500/10 text-blue-400 border border-blue-500/20'
        }`}>
          {message.text}
        </div>
      )}

      {/* Formulário de Criação/Edição */}
      <form onSubmit={handleSubmit} className={`bg-[var(--card-bg)] border ${editingId ? 'border-yellow-500/50 shadow-yellow-500/10' : 'border-[var(--border)]'} rounded-2xl p-6 md:p-8 shadow-xl mb-12 relative overflow-hidden`}>
        {editingId && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--blue-400)]">
            {editingId ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
          </h2>
          {editingId && (
            <button 
              type="button" 
              onClick={resetForm}
              className="flex items-center gap-1 text-sm text-[var(--text-soft)] hover:text-white transition-colors"
            >
              <X size={16} /> Cancelar edição
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[var(--text-soft)] mb-2 text-sm">Título do Projeto *</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-strong)] focus:outline-none focus:border-[var(--blue-500)]" placeholder="Ex: E-commerce de Roupas" />
          </div>
          
          <div>
            <label className="block text-[var(--text-soft)] mb-2 text-sm">Status</label>
            <select name="status" value={formData.status} onChange={handleInputChange}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-strong)] focus:outline-none focus:border-[var(--blue-500)]">
              <option value="Concluído">Concluído</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Planejado">Planejado</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[var(--text-soft)] mb-2 text-sm">Descrição *</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={4}
            className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-strong)] focus:outline-none focus:border-[var(--blue-500)]" placeholder="Descreva o que é o projeto..."></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-[var(--text-soft)] mb-2 text-sm">URL da Imagem</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-strong)] focus:outline-none focus:border-[var(--blue-500)]" placeholder="https://..." />
          </div>
          
          <div>
            <label className="block text-[var(--text-soft)] mb-2 text-sm">URL do Projeto (Deploy)</label>
            <input type="text" name="projectUrl" value={formData.projectUrl} onChange={handleInputChange}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-strong)] focus:outline-none focus:border-[var(--blue-500)]" placeholder="https://..." />
          </div>

          <div>
            <label className="block text-[var(--text-soft)] mb-2 text-sm">URL do GitHub</label>
            <input type="text" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-strong)] focus:outline-none focus:border-[var(--blue-500)]" placeholder="https://github.com/..." />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-[var(--slate-300)] mb-4 font-medium border-b border-[var(--border)] pb-2">Tecnologias Utilizadas</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-64 overflow-y-auto p-3 border border-[var(--border)] rounded-lg bg-[var(--bg)]">
            {ALL_TECHNOLOGIES.map(tech => (
              <label key={tech} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-[var(--card-bg)] rounded-md transition-colors border border-transparent hover:border-[var(--border)]">
                <input type="checkbox" checked={selectedTechs.includes(tech)} onChange={() => handleTechChange(tech)}
                  className="w-4 h-4 rounded bg-[var(--bg)] border-[var(--slate-600)] text-[var(--blue-500)] focus:ring-[var(--blue-500)]" />
                <span className="text-sm text-[var(--slate-300)]">{tech}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}
          className={`w-full ${editingId ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'btn-primary'} justify-center py-3 rounded-lg flex items-center gap-2`}>
          {loading ? 'Salvando...' : editingId ? 'Atualizar Projeto' : 'Salvar Projeto'}
        </button>
      </form>

      {/* Listagem de Projetos */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Projetos Cadastrados</h2>
        
        {loadingProjects ? (
          <div className="text-[var(--text-soft)] p-8 text-center border border-[var(--border)] border-dashed rounded-xl">
            Carregando projetos...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-[var(--text-soft)] p-8 text-center border border-[var(--border)] border-dashed rounded-xl">
            Nenhum projeto cadastrado ainda. Use o formulário acima para adicionar o primeiro!
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map(project => (
              <div key={project.id} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center hover:border-[var(--slate-600)] transition-colors">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-[var(--text-soft)] text-sm mt-1 line-clamp-1">{project.description}</p>
                  <div className="chip-row mt-3">
                    {project.technologies?.split(',').map((tech, idx) => (
                      <span key={idx} className="chip">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:ml-4 self-end sm:self-auto">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="p-2 bg-[var(--slate-800)] text-yellow-400 hover:bg-[var(--slate-700)] rounded-lg transition-colors border border-transparent hover:border-[var(--border)]"
                    title="Editar projeto"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id, project.title)}
                    className="p-2 bg-[var(--slate-800)] text-red-400 hover:bg-red-900/40 rounded-lg transition-colors border border-transparent hover:border-red-900/40"
                    title="Excluir projeto"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
