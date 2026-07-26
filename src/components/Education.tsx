
const educationItems = [
  { period: "2026 — 2028", title: "Análise e Desenvolvimento de Sistemas", description: "Tecnólogo focado em desenvolvimento de sistemas, arquitetura de software e engenharia de dados.", category: "Tecnólogo" },
  { period: "2026 — 2026", title: "Desenvolvimento Orientado a Objetos com Java e Spring Boot", description: "Certificação focada na criação de APIs RESTful seguras e escaláveis.", category: "Certificação" },
  { period: "2023 — 2024", title: "Desenvolvimento Web Full Stack", description: "Bootcamp intensivo focado no desenvolvimento web com tecnologias modernas back-end e front-end.", category: "Curso Técnico" },
];

export default function Education() {
  return (
    <section className="section wrapper reveal" id="education">
      <div className="section-head">
        <p className="eyebrow">Educação — Minha formação</p>
        <div className="section-title-col">
          <h2 className="section-title">Educação</h2>
          <span className="title-rule"></span>
        </div>
      </div>

      <div className="edu-list">
        {educationItems.map((item, index) => (
          <article key={index} className="edu-item">
            <div className="edu-row">
              <p className="tag">{item.period}</p>
              <h3>{item.title}</h3>
              <p className="desc">{item.description}</p>
              <p className="tag category">{item.category}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
