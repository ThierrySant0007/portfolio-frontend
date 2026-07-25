import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Senha padrão estática conforme o plano
    if (password === 'admin123') { 
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Senha incorreta.');
    }
  };

  return (
    <div className="pt-32 pb-20 flex items-center justify-center p-4 min-h-[80vh]">
      <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-[var(--text-strong)] mb-6 text-center">Acesso Restrito</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[var(--text-soft)] mb-2 text-sm">Senha de Administrador</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-strong)] focus:outline-none focus:border-[var(--blue-500)] transition-colors"
              placeholder="Digite a senha"
              required
            />
          </div>
          
          {error && <p className="text-[var(--red-400)] text-sm text-center">{error}</p>}
          
          <button
            type="submit"
            className="w-full btn-primary justify-center mt-4"
          >
            Entrar
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-[var(--text-soft)] hover:text-white text-sm transition-colors"
          >
            Voltar para o site
          </button>
        </div>
      </div>
    </div>
  );
}
