import { useState } from "react";
import { FaLinkedin, FaGithub, FaYoutube, FaGlobe } from "react-icons/fa";
import mcafeeLogo from "./assets/mcafee_logo.png";
import gskLogo from "./assets/gsk_logo.jpg";

/* ===================== */
/* TRANSLATIONS */
/* ===================== */

const T = {
  es: {
    pdf_text: "Descargar PDF",
    pdf_downloading: "descargando pdf",
    location: "📍 Verín (Ourense - España)",
    profile:
      "Analítico de Datos con experiencia en procesos ELT.",
    skills: "Habilidades",
    experience: "Experiencia laboral",
    education: "Formación académica",
    educationBullets: [
      "🎓 Curso en Ciencia de Datos — KSchool Madrid (2018)",
      "🎓 Ingeniería en Organización Industrial — Universidad del País Vasco (2012–2015)",
      "🎓 Ingeniería Técnica de Obras Públicas — Universidad de Salamanca (2007–2012)",
    ],
    languages: "Idiomas",
    languageBullets: [
      "🇪🇸 Castellano / Gallego",
      "🇬🇧 Inglés",
      "🇵🇹 Portugués",
    ],
    cyclistTitle: "🚴 Cicloviajero — Verín, Tokio, Sydney, Verín",
    cyclistTime: "Marzo 2024 – Noviembre 2025 · 1 año y 8 meses",
    cyclistBullets: [
      "41.500 km recorridos",
      "32 países",
      "Desarrollo de autonomía, resiliencia y adaptación continua",
    ],

    mcafeeTitle: "Analítico de Datos — McAfee",
    mcafeeTime: "Abril 2020 – Junio 2023 · 3 años y 1 mes",
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
    gskTime: "Enero 2015 – Mayo 2020 · 5 años y 4 meses",
    gskBullets: [
      "Control y automatización de KPIs usando VBA (Excel)",
      "Gestión de cambios de artwork con fábricas del grupo",
      "Control de cobertura de stock de embalajes impresos",
    ],
  },

  en: {
    pdf_text: "Download PDF",
    pdf_downloading: "downloading pdf",
    location: "📍 Verín (Ourense - Spain)",
    profile:
      "Data Analyst with experience in ELT processes.",
    skills: "Skills",
    experience: "Work Experience",
    education: "Education",
    educationBullets: [
      "🎓 Data Science — KSchool Madrid (2018)",
      "🎓 Industrial Engineering — University of the Basque Country (2012–2015)",
      "🎓 Technical Engineering in Public Works — University of Salamanca (2007–2012)",
    ],
    languages: "Languages",
    languageBullets: [
      "🇪🇸 Spanish / Galician",
      "🇬🇧 English",
      "🇵🇹 Portuguese",
    ],

    cyclistTitle: "🚴 Bicycle traveler — Verín, Tokyo, Sydney, Verín",
    cyclistTime: "March 2024 – November 2025 · 1 year and 8 months",
    cyclistBullets: [
      "41,500 km traveled",
      "32 countries",
      "Development of autonomy, resilience, and continuous adaptation",
    ],

    mcafeeTitle: "Data Analyst — McAfee",
    mcafeeTime: "April 2020 – June 2023 · 3 years and 1 month",
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
    gskTime: "January 2015 – May 2020 · 5 years and 4 months",
    gskBullets: [
      "KPI control and automation using VBA (Excel)",
      "Artwork change management across manufacturing sites",
      "Stock coverage control of printed packaging components",
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
  const [lang, setLang] = useState("es");
  async function exportToPDF() {
    // show simple feedback to user because PDF generation can take some seconds
    const btn = document.querySelector('.no-print');
    const originalText = btn ? btn.textContent : '';
    if (btn) {
      btn.textContent = T[lang].pdf_downloading;
      btn.disabled = true;
    }

    // add spinner + indeterminate progress bar (CSS injected once)
    if (!document.getElementById('pdf-spinner-styles')) {
      const style = document.createElement('style');
      style.id = 'pdf-spinner-styles';
      style.textContent = `
        @keyframes pdf-spin { to { transform: rotate(360deg); } }
        @keyframes pdf-progress-move { 0% { left: -40%; } 100% { left: 100%; } }
        .pdf-spinner { display:inline-block; width:14px; height:14px; border:2px solid rgba(255,255,255,0.4); border-top-color:#fff; border-radius:50%; animation:pdf-spin 0.9s linear infinite; margin-left:8px; vertical-align:middle; }
        .pdf-progress-bar { position:fixed; top:0; left:0; height:4px; width:100%; pointer-events:none; z-index:99999; }
        .pdf-progress-bar > .stripe { position:absolute; top:0; left:-40%; height:100%; width:40%; background:linear-gradient(90deg,#06b6d4,#60a5fa); animation:pdf-progress-move 1.6s linear infinite; }
      `;
      document.head.appendChild(style);
    }
    let spinnerEl = null;
    let progressEl = null;
    if (btn) {
      spinnerEl = document.createElement('span');
      spinnerEl.className = 'pdf-spinner';
      btn.appendChild(spinnerEl);
    }
    progressEl = document.createElement('div');
    progressEl.className = 'pdf-progress-bar';
    const stripe = document.createElement('div');
    stripe.className = 'stripe';
    progressEl.appendChild(stripe);
    document.body.appendChild(progressEl);

    try {
      const html2canvasModule = await import('html2canvas');
      const { jsPDF } = await import('jspdf');
      const html2canvas = html2canvasModule.default || html2canvasModule;

      const cv = document.getElementById('cv-root');
      if (!cv) throw new Error('CV element not found');

      // Create a clean clone to render onto white background and strip shadows/print-only elements
      const clone = cv.cloneNode(true);
      // hide interactive/no-print elements
      clone.querySelectorAll('.no-print').forEach((n) => n.remove());

      // remove box shadows and filters from all cloned elements for a clean print look
      clone.querySelectorAll('*').forEach((el) => {
        try {
          el.style.boxShadow = 'none';
          el.style.filter = 'none';
          el.style.textShadow = 'none';
        } catch (e) {}
      });

      // Ensure background is white
      clone.style.background = '#ffffff';
      clone.style.borderRadius = '0';

      // Wrap clone so html2canvas measures correctly
      const wrapper = document.createElement('div');
      wrapper.style.background = '#ffffff';
      // smaller wrapper padding so content can use most of the A4 area
      wrapper.style.padding = '8px';
      wrapper.style.display = 'inline-block';
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Increase scale for higher-resolution capture (crisper output)
      const scale = 5; // higher = sharper, but slower and larger memory use
      const canvas = await html2canvas(wrapper, { scale, useCORS: true, backgroundColor: '#ffffff', scrollY: -window.scrollY });

      // Use PNG for lossless quality
      const pngData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // PDF margins in mm
      const margin = 6; // smaller margins to use more space
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      // final image dimensions in mm when scaled to fit width
      let imgWidthMm = usableWidth;
      let imgHeightMm = (canvas.height / canvas.width) * imgWidthMm;

      // If the rendered image is taller than an A4 page, scale it down to fit a single page
      if (imgHeightMm > usableHeight) {
        const fitScale = usableHeight / imgHeightMm;
        imgWidthMm = imgWidthMm * fitScale;
        imgHeightMm = usableHeight;
      }

      // Center the image horizontally and place at top margin
      const marginX = Math.max((pageWidth - imgWidthMm) / 2, margin);
      const marginY = margin;
      pdf.addImage(pngData, 'PNG', marginX, marginY, imgWidthMm, imgHeightMm);

      // remove temporary wrapper
      document.body.removeChild(wrapper);
      pdf.save('cv.pdf');
    } catch (err) {
      console.error(err);
      alert('Error al generar PDF. Asegúrate de haber instalado html2canvas y jspdf (npm install html2canvas jspdf)');
    } finally {
      if (btn) {
        btn.textContent = originalText || 'Descargar PDF';
        btn.disabled = false;
        if (spinnerEl && spinnerEl.parentNode) spinnerEl.parentNode.removeChild(spinnerEl);
      }
      if (progressEl && progressEl.parentNode) progressEl.parentNode.removeChild(progressEl);
    }
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
      <header style={styles.header}>
        <button
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          style={{...styles.language_button,
                  backgroundColor: lang === "en" ? "#1E4DB7" : "#F97316",
          }}
          title="Change language"
        >
          <FaGlobe style={{ fontSize: "14px" }} />
          {lang === "en" ? "EN" : "ES"}
        </button>

        <h1 style={styles.title}>Francisco Álvarez González</h1>
        <p style={styles.subtitle}>{T[lang].location}</p>
        <p style={styles.contactLine}>
          📞 +34 687 494 294 · ✉️ paquinho89@gmail.com ·
          <div style={styles.socials}>
            <a
              href="https://www.linkedin.com/in/francisco-álvarez-b6b699b7"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/paquinho89"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
            >
              <FaGithub />
            </a>

            <a
              href="https://www.youtube.com/@paquinhobarreiros4799"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
            >
              <FaYoutube />
            </a>
          </div>
        </p>
      </header>

      <section style={styles.section}>
        <p style={styles.intro}>
          {T[lang].profile}
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].skills}</h2>
        <div style={styles.skills}>
          {['SQL', 'Python', 'Django','Git', 'Databricks', 'HTML', 'Power BI', 'Excel'].map((s) => (
            <div key={s} style={styles.skillChip}>{s}</div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{T[lang].experience}</h2>

        <div style={styles.job}>
          <h3 style={styles.jobTitle}>{T[lang].cyclistTitle}</h3>
          <span>{T[lang].cyclistTime}</span>
          <ul>
            <li>{T[lang].cyclistBullets[0]}</li>
            <li>{T[lang].cyclistBullets[1]}</li>
            <li>{T[lang].cyclistBullets[2]}</li>
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
            <li>{T[lang].gskBullets[0]}</li>
            <li>{T[lang].gskBullets[1]}</li>
            <li>{T[lang].gskBullets[2]}</li>
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
/* STYLES */
/* ===================== */

const styles = {
  language_button:{
    position: "relative",
    top: "16px",
    left: "16px",

    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(0,0,0,0.12)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
    transition: "all 200ms ease",
  },
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
    borderLeft: "4px solid #1E4DB7",
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
};

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

