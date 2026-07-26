import { useState } from 'react';
import { Mail, Download, Copy, Send, Check, ChevronDown, Code, Clock, Globe, CheckCircle2, FileText, Users } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
const faqs = [
  { icon: Code, question: 'Quais minhas principais tecnologias?', answer: 'Trabalho primariamente com React, Node.js, Spring Boot, e TypeScript. Também utilizo TailwindCSS e MySQL para grande parte dos meus projetos.' },
  { icon: Clock, question: 'Você também trabalha em projetos simples?', answer: 'Sim, atendo desde landing pages simples até sistemas completos. Cada projeto recebe a mesma atenção aos detalhes e qualidade.' },
  { icon: Globe, question: 'Só trabalha com desenvolvimento web?', answer: 'Foco principalmente no web, mas também possuo conhecimento para atuar na integração de APIs e arquitetura de back-end.' },
  { icon: CheckCircle2, question: 'O que você entrega no final do projeto?', answer: 'Entrego o código fonte completo, documentação de como rodar o projeto localmente, e auxílio opcional no deploy da aplicação.' },
  { icon: FileText, question: 'Você trabalha sob contrato?', answer: 'Sim, podemos estabelecer um contrato PJ para maior segurança e transparência de ambas as partes durante o desenvolvimento.' },
  { icon: Users, question: 'Você sabe trabalhar em equipe ou apenas individualmente?', answer: 'Tenho bastante experiência atuando em times ágeis, com versionamento Git e code reviews, e também consigo assumir projetos solo com tranquilidade.' },
];

function FAQItem({ icon: Icon, question, answer }: { icon: any, question: string, answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)] last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full py-4 flex justify-between items-center text-left text-sm text-[var(--slate-300)] hover:text-white transition-colors"
      >
        <span className="flex items-center gap-3">
          <Icon size={16} className="text-[var(--text-faint)] flex-shrink-0" />
          <span className="font-medium">{question}</span>
        </span>
        <ChevronDown size={16} className={`transform transition-transform duration-300 text-[var(--text-faint)] flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-[var(--text-soft)] pl-7 pr-4 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('thierrybr0007@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '302aa44e-7516-45de-aa1d-3f33c690f2e5',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'Nova mensagem do Portfólio - ' + formData.name
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitResult({ type: 'success', text: 'Mensagem enviada com sucesso! Entrarei em contato em breve.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitResult({ type: 'error', text: 'Erro ao enviar mensagem. Verifique a chave da API e tente novamente.' });
      }
    } catch (error) {
      setSubmitResult({ type: 'error', text: 'Erro de conexão. Tente novamente mais tarde.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitResult(null), 8000);
    }
  };

  return (
    <section id="contato" className="section wrapper reveal">
      <div className="text-center mb-12">
        <div className="badge mx-auto mb-6">
          <Mail size={14} /> Contatos
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-3 tracking-tight">
          Me mostre <em className="font-serif text-[var(--slate-300)] font-medium">suas ideias</em>
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
          Vamos trabalhar juntos?
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16">
        {/* Coluna Esquerda */}
        <div className="flex flex-col gap-8">
          {/* Card de Perfil */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src="https://github.com/ThierrySant0007.png"
                  alt="Thierry Santos"
                  className="w-16 h-16 rounded-full object-cover border border-[var(--slate-700)] shadow-inner"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-[var(--card-bg)] rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Disponível
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white leading-tight">Thierry Santos</h4>
                <p className="text-sm text-[var(--text-soft)] mt-0.5">Desenvolvedor Fullstack</p>
              </div>
              <div className="text-left sm:text-right mt-2 sm:mt-0 text-xs text-[var(--text-faint)] flex flex-row sm:flex-col items-center sm:items-end gap-1.5">
                <Globe size={14} className="inline sm:mb-1" />
                <span>Rio de Janeiro, RJ</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[var(--border)]">
              <a href="https://github.com/ThierrySant0007" target="_blank" rel="noopener noreferrer" className="icon-btn flex-1 sm:flex-none" aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href="mailto:thierrybr0007@gmail.com" className="icon-btn flex-1 sm:flex-none" aria-label="Email">
                <Mail size={18} />
              </a>
              <a href="/curriculo.pdf" download="Thierry_Santos_Curriculo.pdf" className="icon-btn flex-1 sm:flex-none" aria-label="Download CV" title="Baixar Currículo">
                <Download size={18} />
              </a>
            </div>
          </div>

          {/* Accordion FAQ */}
          <div className="flex flex-col mt-2">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} icon={faq.icon} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 md:p-10 shadow-lg">
          <h4 className="text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-3 mb-6">
            <span className="text-2xl">👋</span> Fale Comigo
          </h4>
          <p className="text-[var(--text-soft)] text-sm mb-8 leading-relaxed text-center sm:text-left">
            Estou disponível para <strong className="text-white font-medium">conversar sobre projetos, ideias, oportunidades ou apenas uma conversa amistosa</strong>. Estou ansioso para ouvir suas ideias e trabalhar juntos para criar soluções incríveis.
          </p>

          {/* Email Copy */}
          <div className="bg-[var(--bg)] border border-[var(--slate-800)] rounded-xl p-4 flex justify-between items-center mb-8 group hover:border-[var(--slate-600)] transition-colors">
            <div>
              <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider mb-1 font-semibold">Meu E-mail</p>
              <p className="text-sm font-medium text-white">thierrybr0007@gmail.com</p>
            </div>
            <button
              onClick={handleCopy}
              className="p-2.5 bg-[var(--slate-800)] hover:bg-[var(--slate-700)] rounded-lg text-[var(--slate-300)] hover:text-white transition-colors"
              aria-label="Copiar email"
              title="Copiar e-mail"
            >
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8 opacity-60">
            <div className="h-px bg-[var(--border)] flex-1"></div>
            <span className="text-[10px] text-[var(--text-faint)] uppercase tracking-widest font-semibold">ou</span>
            <div className="h-px bg-[var(--border)] flex-1"></div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nome *"
                className="w-full bg-[var(--bg)] border border-[var(--slate-800)] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[var(--blue-500)] focus:ring-1 focus:ring-[var(--blue-500)] transition-all disabled:opacity-50"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-mail *"
                className="w-full bg-[var(--bg)] border border-[var(--slate-800)] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[var(--blue-500)] focus:ring-1 focus:ring-[var(--blue-500)] transition-all disabled:opacity-50"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Mensagem *"
                rows={4}
                className="w-full bg-[var(--bg)] border border-[var(--slate-800)] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[var(--blue-500)] focus:ring-1 focus:ring-[var(--blue-500)] transition-all resize-none disabled:opacity-50"
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            {submitResult && (
              <div className={`p-3 rounded-lg text-sm border ${submitResult.type === 'success'
                  ? 'bg-green-500/10 text-green-400 border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                {submitResult.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} /> Enviar
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
