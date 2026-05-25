import { useState } from "react";
import { FaLinkedin, FaGithub, FaYoutube, FaGlobe } from "react-icons/fa";
import mcafeeLogo from "./assets/mcafee_logo.png";
import gskLogo from "./assets/gsk_logo.jpg";
import brasindaLogo from "./assets/brasinda_logo.png";

/* ===================== */
/* TRANSLATIONS */
/* ===================== */

const T = {
  es: {
    pdf_text: "Descargar PDF",
    pdf_downloading: "descargando pdf",
    location: "📍 Verín (Ourense - España)",
    profile:
      "Ingeniero con casi 9 años de experiencia laboral, en los que se incluye 3 años trabajando como Analítico de Datos para una de las empresas referentes en el sector del antivirus. Después de desarrollar mis proyectos personales, busco nuevos desafíos para seguir creciendo y aprendiendo junto a los mejores equipos.",
    skills: "Habilidades",
    experience: "Experiencia",
    education: "Formación académica",
    educationBullets: [
      "🎓 Máster en Ciencia de Datos — KSchool Madrid (2018)",
      "🎓 Ingeniería en Organización Industrial — Universidad del País Vasco (2012–2015)",
      "🎓 Ingeniería Técnica de Obras Públicas — Universidad de Salamanca (2007–2012)",
    ],
    languages: "Idiomas",
    languageBullets: [
      "🇪🇸 Castellano / Gallego",
      "🇬🇧 Inglés",
      "🇵🇹 Portugués",
    ],
    cyclistTitle: "Proyectos personales",
    cyclistTime: "Junio 2023 – Actualidad",
    cyclistBullets: [
      "Desarrollo de un producto SaaS para ayudar a la gestión de eventos. El frontend está hecho con React y el Backend con Django: <a href=\"https://brasinda.com\" target=\"_blank\" rel=\"noopener noreferrer\">brasinda.com</a>",
      "Viaje en bicicleta desde Verín a Tokio y desde Sydney a Verín. 41.500 km y 601 días donde he desarrollado mi autonomía, mi resilencia y mi continua adaptación al cambio: <a href=\"https://youtube.com/@terrameiga_bike?si=rwSnhNh8WsPJG465\" target=\"_blank\" rel=\"noopener noreferrer\">terrameiga.bike</a>",
      "Vendimias en Francia",
    ],

    mcafeeTitle: "Analítico de Datos — McAfee",
    mcafeeTime: "Abril 2020 – Junio 2023 · 3 años y 1 mes",
    mcafeeBullets: [
      "Hacer los datos accesibles y útiles para los equipos de marketing",
      "Automatización de procesos y carga de datos",
      "Análisis de la telemetría del ordenador para detectar puntos de fricción entre el usuario y el software",
      "Estudio de los clientes para el mercado estadounidense (localización, comportamiento, clase social, estilo de vida, ingresos...)",
      "Análisis de tasas de activación, compra y desinstalación en los disintos canales de distribución: Retail, Directo y OEM ",
      "Predicción diaria de ventas e identificación de nuevos mercados",
      "Clasificación y análisis de los comentarios recibidos por los usuarios",
    ],

    gskTitle: "Gestor de materiales — GlaxoSmithKline",
    gskTime: "Enero 2015 – Marzo 2020 · 5 años y 4 meses",
    gskBullets: [
      "Control y automatización de KPIs usando VBA (Excel)",
      "Gestión de cambios en el empaquetado entre las fábricas del grupo y las agencias reguladoras",
      "Principal punto de contacto para el proyecto de la Serialización del empaquetado en España",
      "Gestión de los datos en el departamento"
    ],
  },

  en: {
    pdf_text: "Download PDF",
    pdf_downloading: "downloading pdf",
    location: "📍 Verín (Ourense - Spain)",
    profile:
      "Engineer with nearly 9 years of experience, including 3 years in Data Analytics at a cybersecurity company. After building my own projects during a career break, I’m now looking for new challenges to keep learning and growing with great teams.",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    educationBullets: [
      "🎓 Data Science Master Program — KSchool Madrid (2018)",
      "🎓 Industrial Management Engineering — University of the Basque Country (2012–2015)",
      "🎓 Civil Engineering — University of Salamanca (2007–2012)",
    ],
    languages: "Languages",
    languageBullets: [
      "🇪🇸 Spanish / Galician",
      "🇬🇧 English",
      "🇵🇹 Portuguese",
    ],

    cyclistTitle: "Developing personal projects",
    cyclistTime: "June 2023 – Present",
    cyclistBullets: [
      "Creating a SaaS product to help people manage their events. The frontend is built with React and the backend with Django: <a href=\"https://brasinda.com\" target=\"_blank\" rel=\"noopener noreferrer\">brasinda.com</a>",
      "Traveling by bicycle from Verín to Tokyo and then returning from Sydney to Verín. A journey of 41,500 km and 601 days where I developed my autonomy, resilience and continuous adaptation: <a href=\"https://youtube.com/@terrameiga_bike?si=rwSnhNh8WsPJG465\" target=\"_blank\" rel=\"noopener noreferrer\">terrameiga.bike</a>",
      "Harvesting grapes in France",
    ],

    mcafeeTitle: "Data Analyst — McAfee",
    mcafeeTime: "April 2020 – June 2023 · 3 years and 1 month",
    mcafeeBullets: [
      "Making data accessible and actionable for marketing teams",
      "Process automation",
      "Analysis of computer telemetry to identify friction points between the user and the software",
      "Customer analysis for US market (location, behavior, social class, lifestyle, income, way of living etc.)",
      "Analysis of activation, purchase, and uninstall rates across different distribution channels: Retail, Direct and OEM",
      "Daily sales forecasting and identification of new markets",
      "Classification and analysis of user feedback",
    ],

    gskTitle: "Pack Management — GlaxoSmithKline",
    gskTime: "January 2015 – March 2020 · 5 years and 4 months",
    gskBullets: [
      "KPI control and automation using VBA (Excel)",
      "Pack management changes across regulatory agencies and manufacturing sites",
      "Leading the Serialization project in Spain",
      "Managing the Data in the department"
    ],
  },
};


const styles = {
  cv: {
    maxWidth: "880px",
    margin: "40px auto",
    padding: "28px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    lineHeight: 1.65,
    borderRadius: "14px",
    background: "linear-gradient(180deg, #f7fafc 0%, #ffffff 100%)",
    boxShadow: "0 10px 30px rgba(20,20,40,0.08)",
  },
  header: {
    textAlign: "center",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    marginBottom: "12px",
    paddingBottom: "8px",
  },
  title: {
    fontSize: "24px",
    margin: "0 0 6px 0",
    color: "#0f172a",
    letterSpacing: "0.2px",
  },
  subtitle: {
    margin: "0",
    color: "#475569",
    fontSize: "14px",
  },
  contactLine: {
    marginTop: "8px",
    color: "#334155",
    fontSize: "13px",
  },
  pdfButton: {
    position: "fixed",
    right: "20px",
    top: "18px",
    zIndex: 9999,
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(16,24,40,0.12)",
    fontSize: "13px",
  },
  job: {
    marginBottom: "18px",
    background: "#ffffff",
    padding: "14px 16px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
    borderLeft: "4px solid #60a5fa",
  },
  companyLogo: {
    width: "36px",
    height: "auto",
    verticalAlign: "middle",
    marginRight: "8px",
  },
  section: {
    marginBottom: "18px",
    padding: "6px 2px",
  },
  intro: {
    marginTop: "6px",
    marginBottom: "6px",
    fontSize: "15px",
    color: "#334155",
  },
  noList: {
    listStyle: "none",
    paddingLeft: 0,
    margin: 0,
  },
  iconSmall: {
    fontSize: "16px",
    marginRight: "8px",
    color: "#0f172a",
    verticalAlign: "middle",
  },
  sectionTitle: {
    fontSize: "18px",
    margin: "0 0 10px 0",
    color: "#0b1220",
    paddingBottom: "6px",
    borderBottom: "1px dashed rgba(15,23,42,0.06)",
  },
  jobTitle: {
    fontSize: "18px",
    margin: "0 0 8px 0",
    color: "#0b1220",
  },
  languages: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  skills: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  skillChip: {
    background: "linear-gradient(180deg, #ffffff, #f8fafc)",
    border: "1px solid rgba(15,23,42,0.06)",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    color: "#0b1220",
    boxShadow: "0 4px 10px rgba(16,24,40,0.03)",
  },
  languageRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  languageLabel: {
    width: "160px",
    fontSize: "14px",
    color: "#0f172a",
  },
  languageBar: {
    width: "320px",
    height: "12px",
    background: "linear-gradient(90deg, #eef2ff, #f1f5f9)",
    borderRadius: "999px",
    overflow: "hidden",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
  },
  languageFill: {
    height: "100%",
    background: "linear-gradient(90deg,#60a5fa,#06b6d4)",
    borderRadius: "999px",
    transition: "width 600ms ease",
  },
  socials: {
    display: "inline-flex",
    gap: "10px",
    marginLeft: "8px",
    verticalAlign: "middle",
  },
  icon: {
    fontSize: "18px",
    color: "#111827",
    textDecoration: "none",
  },
  link: {
    marginLeft: "5px",
    textDecoration: "none",
    color: "#0077b5",
    fontWeight: "bold",
  },
  language_button: {
    position: "fixed",
    right: "200px",
    top: "18px",
    zIndex: 9999,

    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(0,0,0,0.12)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
    transition: "all 200ms ease",
  },
};

function App() {
  return (
    <CV />
  );
}

export default App;

/* ===================== */
/* CV COMPONENT */
/* ===================== */

function CV() {
  const [lang, setLang] = useState("en");
  function exportToPDF() {
    // Caminho relativo SEMPRE funciona em localhost e produção
    let pdfPath = '/CV_Francisco_Alvarez.pdf';
    if (window.location.pathname.startsWith('/cv')) {
      pdfPath = '/cv/CV_Francisco_Alvarez.pdf';
    }
    const link = document.createElement('a');
    link.href = pdfPath;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    link.download = 'CV_Francisco_Alvarez.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div id="cv-root" style={styles.cv}>
      <h1>PROBA DEPLOY 25/05/2026 cv-react</h1>
      <style>{`@media print { .no-print { display: none !important; } @page { size: A4; margin: 12mm; } body { -webkit-print-color-adjust: exact; } }`}</style>
      <button
        className="no-print"
        onClick={exportToPDF}
        style={styles.pdfButton}
      >
        {T[lang].pdf_text}
      </button>
      <button
        onClick={() => setLang(lang === "es" ? "en" : "es")}
        style={{
          ...styles.language_button,
          backgroundColor: lang === "en" ? "#1E4DB7" : "#F97316",
        }}
        title="Change language"
      >
        <FaGlobe style={{ fontSize: "14px" }} />
        {lang === "en" ? "Language EN" : "Idioma ES"}
      </button>
      <header style={styles.header}>


        <h1 style={styles.title}>Francisco Álvarez González</h1>
        <p style={styles.subtitle}>{T[lang].location}</p>
        <p style={styles.contactLine}>
          📞 +34 687 494 294 · ✉️ paquinho89@gmail.com
        </p>
        <div style={styles.socials}>
          <a
            href="https://www.linkedin.com/in/francisco-álvarez-b6b699b7"
            target="_blank"
            rel="noreferrer"
            style={styles.icon}
          >
            <FaLinkedin style={{ fontSize: 20, color: "#0077b5" }} />
          </a>

          <a
            href="https://github.com/paquinho89?tab=repositories"
            target="_blank"
            rel="noreferrer"
            style={styles.icon}
          >
            <FaGithub style={{ fontSize: 20, color: "#24292e" }} />
          </a>

          <a
            href="https://www.youtube.com/@paquinhobarreiros4799"
            target="_blank"
            rel="noreferrer"
            style={styles.icon}
          >
            <FaYoutube style={{ fontSize: 20, color: "#FF0000" }} />
          </a>
        </div>
      </header>

      <section style={styles.section}>
        <p style={styles.intro}>
          {T[lang].profile}
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].skills}</h2>
        <div style={styles.skills}>
          {['SQL', 'Python', 'Django', 'Git', 'Databricks', 'HTML', 'React', 'Power BI', 'Excel'].map((s) => (
            <div key={s} style={styles.skillChip}>{s}</div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].experience}</h2>

        <div style={{ ...styles.job, borderLeft: "4px solid #ff0093" }}>
          <h3 style={styles.jobTitle}><img src={brasindaLogo} alt="Brasinda" style={styles.companyLogo} />{T[lang].cyclistTitle}</h3>
          <span>{T[lang].cyclistTime}</span>
          <ul>
            <li dangerouslySetInnerHTML={{ __html: T[lang].cyclistBullets[0] }} />
            <li dangerouslySetInnerHTML={{ __html: T[lang].cyclistBullets[1] }} />
            {T[lang].cyclistBullets[2] && <li>{T[lang].cyclistBullets[2]}</li>}
          </ul>
        </div>

        <div style={{ ...styles.job, borderLeft: "4px solid #C60B1E" }}>
          <h3 style={styles.jobTitle}><img src={mcafeeLogo} alt="McAfee" style={styles.companyLogo} />{T[lang].mcafeeTitle}</h3>
          <span>{T[lang].mcafeeTime}</span>
          <ul>
            <li>{T[lang].mcafeeBullets[0]}</li>
            <li>{T[lang].mcafeeBullets[1]}</li>
            <li>{T[lang].mcafeeBullets[2]}</li>
            <li>{T[lang].mcafeeBullets[3]}</li>
            <li>{T[lang].mcafeeBullets[4]}</li>
            <li>{T[lang].mcafeeBullets[5]}</li>
            <li>{T[lang].mcafeeBullets[6]}</li>
          </ul>
        </div>

        <div style={{ ...styles.job, borderLeft: "4px solid #F97316" }}>
          <h3 style={styles.jobTitle}><img src={gskLogo} alt="GSK" style={styles.companyLogo} />{T[lang].gskTitle}</h3>
          <span>{T[lang].gskTime}</span>
          <ul>
            {T[lang].gskBullets.map((b, i) => b && <li key={i}>{b}</li>)}
          </ul>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].education}</h2>
        <ul style={styles.noList}>
          <li>{T[lang].educationBullets[0]}</li>
          <li>{T[lang].educationBullets[1]}</li>
          <li>{T[lang].educationBullets[2]}</li>
        </ul>
      </section>



      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].languages}</h2>
        <div style={styles.languages}>
          <LanguageBar label={T[lang].languageBullets[0]} percent={100} color="#F97316" />
          <LanguageBar label={T[lang].languageBullets[1]} percent={85} color="#1E4DB7" />
          <LanguageBar label={T[lang].languageBullets[2]} percent={75} color="#C60B1E" />
        </div>
      </section>
    </div>
  );
}

/* ===================== */
/* LANGUAGE BAR COMPONENT */
/* ===================== */

function LanguageBar({ label, percent, color }) {
  // Helper: lighten a hex color by percent (0-100)
  function shadeHex(hex, percent) {
    const h = hex.replace('#', '');
    const num = parseInt(h, 16);
    let r = (num >> 16) + Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
    let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  }

  const base = color || '#60a5fa';
  const light = shadeHex(base, 40);
  const fillStyle = {
    ...styles.languageFill,
    width: `${percent}%`,
    background: `linear-gradient(90deg, rgba(255,255,255,0.9) 0%, ${light} 28%, ${base} 100%)`,
  };

  return (
    <div style={styles.languageRow}>
      <div style={styles.languageLabel}>{label}</div>
      <div style={styles.languageBar} aria-label={`${label} ${percent}%`}>
        <div style={fillStyle} />
      </div>
    </div>
  );
}

