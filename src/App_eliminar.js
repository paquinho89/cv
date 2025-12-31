import { useState } from "react";
import { FaLinkedin, FaGithub, FaYoutube, FaGlobe } from "react-icons/fa";
import mcafeeLogo from "./assets/mcafee_logo.png";
import gskLogo from "./assets/gsk_logo.jpg";

/* ===================== */
/* TRANSLATIONS */
/* ===================== */

const T = {
  es: {
    profile:
      "Analítico de Datos con experiencia en procesos ELT y con interés en la industria textil.",
    skills: "Habilidades",
    experience: "Experiencia laboral",
    education: "Formación académica",
    languages: "Idiomas",

    cyclistTitle: "🚴 Cicloviajero — Verín, Tokio, Sydney, Verín",
    cyclistBullets: [
      "41.500 km recorridos",
      "32 países",
      "Desarrollo de autonomía, resiliencia y adaptación continua",
    ],

    mcafeeTitle: "Analítico de Datos — McAfee",
    mcafeeBullets: [
      "Construcción de pipelines ELT conectando Databricks y Power BI",
      "Análisis de telemetría para detectar fricciones entre cliente y software",
      "Estudios de usuarios (localización, comportamiento y estilo de vida)",
      "Análisis de tasas de activación, compra y desinstalación",
      "Predicción diaria de ventas e identificación de nuevos mercados",
      "Clasificación de comentarios (Voz del Cliente)",
      "Automatización de procesos mediante Python",
    ],

    gskTitle: "Gestor de materiales — GlaxoSmithKline",
    gskBullets: [
      "Control y automatización de KPIs usando VBA (Excel)",
      "Gestión de cambios de artwork con fábricas del grupo",
      "Control de cobertura de stock de embalajes impresos",
    ],
  },

  en: {
    profile:
      "Data Analyst with experience in ELT processes and a strong interest in the textile industry.",
    skills: "Skills",
    experience: "Work Experience",
    education: "Education",
    languages: "Languages",

    cyclistTitle: "🚴 Bicycle traveler — Verín, Tokyo, Sydney, Verín",
    cyclistBullets: [
      "41,500 km traveled",
      "32 countries",
      "Development of autonomy, resilience, and continuous adaptation",
    ],

    mcafeeTitle: "Data Analyst — McAfee",
    mcafeeBullets: [
      "Built ELT pipelines connecting Databricks and Power BI",
      "Analyzed telemetry data to identify customer friction points",
      "Conducted user research (location, behavior, lifestyle)",
      "Analyzed activation, purchase, and uninstall rates",
      "Developed daily sales forecasts and identified new markets",
      "Implemented Voice of Customer analysis",
      "Automated processes using Python",
    ],

    gskTitle: "Materials Planner — GlaxoSmithKline",
    gskBullets: [
      "KPI control and automation using VBA (Excel)",
      "Artwork change management across manufacturing sites",
      "Stock coverage control of printed packaging components",
    ],
  },
};

/* ===================== */
/* APP */
/* ===================== */

export default function App() {
  return <CV />;
}

/* ===================== */
/* CV COMPONENT */
/* ===================== */

function CV() {
  const [lang, setLang] = useState("es");

  return (
    <div id="cv-root" style={styles.cv}>
      <header style={styles.header}>
        <h1 style={styles.title}>Francisco Álvarez González</h1>
        <p style={styles.subtitle}>📍 Verín (Ourense)</p>

        <div style={styles.contactLine}>
          📞 +34 687 494 294 · ✉️ paquinho89@gmail.com
          <div style={styles.socials}>
            <a href="https://www.linkedin.com/in/francisco-álvarez-b6b699b7" target="_blank" rel="noreferrer" style={styles.icon}><FaLinkedin /></a>
            <a href="https://github.com/paquinho89" target="_blank" rel="noreferrer" style={styles.icon}><FaGithub /></a>
            <a href="https://www.youtube.com/@paquinhobarreiros4799" target="_blank" rel="noreferrer" style={styles.icon}><FaYoutube /></a>

            {/* LANGUAGE BUTTON */}
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              style={styles.langBtn}
              title="Change language"
            >
              <FaGlobe /> {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      <section style={styles.section}>
        <p style={styles.intro}>{T[lang].profile}</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].skills}</h2>
        <div style={styles.skills}>
          {["SQL", "Python", "Databricks", "Power BI", "Excel", "Django"].map((s) => (
            <div key={s} style={styles.skillChip}>{s}</div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].experience}</h2>

        <Job title={T[lang].cyclistTitle} bullets={T[lang].cyclistBullets} />

        <Job
          title={<><img src={mcafeeLogo} alt="McAfee" style={styles.companyLogo} />{T[lang].mcafeeTitle}</>}
          bullets={T[lang].mcafeeBullets}
        />

        <Job
          title={<><img src={gskLogo} alt="GSK" style={styles.companyLogo} />{T[lang].gskTitle}</>}
          bullets={T[lang].gskBullets}
        />
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].education}Formación académica</h2>
        <ul style={styles.noList}>
          <li>🎓 Curso en Ciencia de Datos — KSchool Madrid (2018)</li>
          <li>🎓 Ingeniería en Organización Industrial — Universidad del País Vasco (2012–2015)</li>
          <li>🎓 Ingeniería Técnica de Obras Públicas — Universidad de Salamanca (2007–2012)</li>
        </ul>
      </section>

      

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].languages}Idiomas</h2>
        <div style={styles.languages}>
          <LanguageBar label="🇪🇸 Castellano / Gallego" percent={100} color="#F97316" />
          <LanguageBar label="🇬🇧 Inglés" percent={85} color="#1E4DB7" />
          <LanguageBar label="🇵🇹 Portugués" percent={75} color="#C60B1E" />
        </div>
      </section>
    </div>

  );
}

/* ===================== */
/* JOB COMPONENT */
/* ===================== */

function Job({ title, bullets }) {
  return (
    <div style={styles.job}>
      <h3 style={styles.jobTitle}>{title}</h3>
      <ul>
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </div>
  );
}

/* ===================== */
/* STYLES */
/* ===================== */

const styles = {
  cv: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  header: { textAlign: "center", marginBottom: "20px" },
  title: { margin: 0 },
  subtitle: { margin: 0, color: "#555" },
  contactLine: { fontSize: "14px", marginTop: "10px" },
  socials: { display: "inline-flex", gap: "10px", marginLeft: "10px" },
  icon: { fontSize: "18px", color: "#111" },
  langBtn: {
    border: "none",
    background: "#f1f5f9",
    padding: "4px 8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
  },
  section: { marginBottom: "22px" },
  sectionTitle: { borderBottom: "1px solid #eee", paddingBottom: "6px" },
  intro: { fontSize: "15px" },
  job: { background: "#f9fafb", padding: "14px", borderRadius: "10px", marginBottom: "14px" },
  jobTitle: { marginBottom: "6px" },
  companyLogo: { width: "32px", verticalAlign: "middle", marginRight: "8px" },
  skills: { display: "flex", gap: "10px", flexWrap: "wrap" },
  skillChip: { background: "#eef2ff", padding: "6px 12px", borderRadius: "999px" },
};
