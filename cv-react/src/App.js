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
      "Viaje en bicicleta desde Verín a Tokio y desde Sydney a Verín. 41.500 km y 601 días donde he desarrollado mi autonomía, mi resilencia y mi contínua adaptación al cambio: <a href=\"https://youtube.com/@terrameiga_bike?si=rwSnhNh8WsPJG465\" target=\"_blank\" rel=\"noopener noreferrer\">terrameiga.bike</a>",
      "Vendimias en Francia",
    ],

    mcafeeTitle: "Analítico de Datos — McAfee",
    mcafeeTime: "Abril 2020 – Junio 2023 · 3 años y 1 mes",
    mcafeeBullets: [
      "Hacer los datos accesibles y útiles para los equipos de marketing.",
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
      "Principal punto de contacto para el proyecto de Serialización del empaquetado en España",
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
      "Traveling by bicycle from Verín to Tokyo and then from Sydney to Verín. A trip of 41,500km and 601 days where I developed my autonomy, resilience and continuous adaptation: <a href=\"https://youtube.com/@terrameiga_bike?si=rwSnhNh8WsPJG465\" target=\"_blank\" rel=\"noopener noreferrer\">terrameiga.bike</a>",
      "Harvesting grapes in France",
    ],

    mcafeeTitle: "Data Analyst — McAfee",
    mcafeeTime: "April 2020 – June 2023 · 3 years and 1 month",
    mcafeeBullets: [
      "Making data accessible and actionable for marketing teams",
      "Process automation",
      "Analysis of computer telemetry to identify friction points between the user and the software",
      "Customer analysis for US market (location, behavior, social class, lifestyle, income, way of living etc.)",
      "Analysis of activation, purchase, and uninstall rates across different distribution channels: Retail, Direct, and OEM",
      "Daily sales forecasting and identification of new markets",
      "Classification and analysis of user feedback",
    ],

    gskTitle: "Pack Management — GlaxoSmithKline",
    gskTime: "January 2015 – March 2020 · 5 years and 4 months",
    gskBullets: [
      "KPI control and automation using VBA (Excel)",
      "Package management changes across regulatory agencies and manufacturing sites",
      "Leading the Serialization project in Spain",
      "Managing the Data in the department"
    ],
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
    // Usa o caminho correto tanto em localhost como em produção (GitHub Pages)
    const pdfPath = (process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '') + '/CV_Francisco_Alvarez.pdf';
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
        <p style={styles.contactLine}></p>
      </header>
      {/* ...restante do conteúdo do CV... */}
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

