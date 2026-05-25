import { FaLinkedin, FaGithub, FaYoutube, FaGlobe } from "react-icons/fa";
import mcafeeLogo from "./assets/mcafee_logo.png";
import gskLogo from "./assets/gsk_logo.jpg";

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
  async function exportToPDF() {
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

      // PDF margins in mm (smaller margins to increase usable area)
      const margin = 8; // mm

      // Fit the canvas into the printable area while preserving aspect ratio.
      // Compute final width in mm and scale height accordingly.
      const finalWidth = pageWidth - margin * 2;
      const finalHeight = (canvas.height / canvas.width) * finalWidth;
      const marginX = margin;
      // Center vertically but keep at least `margin` from edges
      const marginY = Math.max((pageHeight - finalHeight) / 2, margin);

      pdf.addImage(pngData, 'PNG', marginX, marginY, finalWidth, finalHeight);
      // remove temporary wrapper
      document.body.removeChild(wrapper);
      pdf.save('cv.pdf');
    } catch (err) {
      console.error(err);
      alert('Error al generar PDF. Asegúrate de haber instalado html2canvas y jspdf (npm install html2canvas jspdf)');
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
        Descargar PDF
      </button>
      <header style={styles.header}>
        <h1 style={styles.title}>Francisco Álvarez González</h1>
        <p style={styles.subtitle}>📍 Verín (Ourense)</p>
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
          Analítico de Datos con experiencia en procesos ELT y con interés en la industria textil.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Habilidades</h2>
        <div style={styles.skills}>
          {['SQL', 'Python', 'Django', 'Databricks', 'HTML', 'Power BI', 'Excel'].map((s) => (
            <div key={s} style={styles.skillChip}>{s}</div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Experiencia laboral</h2>

        <div style={styles.job}>
          <h3 style={styles.jobTitle}>🚴 Cicloviajero — Verín, Tokio, Sydney, Verín</h3>
          <span>Marzo 2024 – Noviembre 2025 · 1 año y 8 meses</span>
          <ul>
            <li>41,500 km recorridos</li>
            <li>32 países</li>
            <li>Desarrollo de autonomía, resiliencia y adaptación continua</li>
          </ul>
        </div>

        <div style={{ ...styles.job, borderLeft: "4px solid #C60B1E" }}>
          <h3 style={styles.jobTitle}><img src={mcafeeLogo} alt="McAfee" style={styles.companyLogo} />Analítico de Datos — McAfee</h3>
          <span>Abril 2020 – Junio 2023 · 3 años y 1 mes</span>
          <ul>
            <li>Construcción de pipelines ELT conectando Databricks y Power BI</li>
            <li>Análisis de los datos de la telemetría del ordenador para identificar puntos de fricción entre el cliente y el software.</li>
            <li>Realización de estudios de nuestros usuarios (localización, comportamiento y estilo de vida).</li>
            <li>Análisis de tasas de activación, compra y desinstalación en canales de Retail, Directo y OEM.</li>
            <li>Desarrollo de previsiones diarias de ventas e identificación de nuevas oportunidades de mercado.</li>
            <li>Clasificación de los comentarios recibidos por nuestros usuarios.</li>
            <li>Automatización de análisis y procesos principalmente mediante Python.</li>
          </ul>
        </div>

        <div style={{ ...styles.job, borderLeft: "4px solid #F97316" }}>
          <h3 style={styles.jobTitle}><img src={gskLogo} alt="GSK" style={styles.companyLogo} />Gestor de materiales — GlaxoSmithKline</h3>
          <span>Enero 2015 – Mayo 2020 · 5 años y 4 meses</span>
          <ul>
            <li>Control y automatización de KPIs usando VBA (Excel)</li>
            <li>Gestión de cambios de artwork con las distintas fábricas del grupo</li>
            <li>Control de la cobertura de stock de componentes de embalaje impreso</li>
          </ul>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Formación académica</h2>
        <ul style={styles.noList}>
          <li>🎓 Curso en Ciencia de Datos — KSchool Madrid (2018)</li>
          <li>🎓 Ingeniería en Organización Industrial — Universidad del País Vasco (2012–2015)</li>
          <li>🎓 Ingeniería Técnica de Obras Públicas — Universidad de Salamanca (2007–2012)</li>
        </ul>
      </section>

      

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Idiomas</h2>
        <div style={styles.languages}>
          <LanguageBar label="🇪🇸 Castellano / Gallego" percent={100} color="#C60B1E" />
          <LanguageBar label="🇬🇧 Inglés" percent={85} color="#1E4DB7" />
          <LanguageBar label="🇵🇹 Portugués" percent={75} color="#007A3D" />
        </div>
      </section>
    </div>
  );
}

/* ===================== */
/* STYLES */
/* ===================== */

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

/* ===================== */
/* CUSTOM TAMBORINE ICON */
/* ===================== */

function TambourineIcon({ style }) {
  return (
    <svg
      style={style}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Tilt entire tambourine slightly */}
      <g transform="rotate(-18 12 12)">
        {/* Wooden rim */}
        <circle cx="12" cy="12" r="9" fill="#8B5E3C" />
        {/* Inner skin inset (shows the yellow drumhead) */}
        <circle cx="12" cy="12" r="7.6" fill="#FFD54A" />

        {/* Ferreñas / jingles: small gold discs positioned around rim */}
        <circle cx="5.2" cy="8.2" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />
        <circle cx="7.6" cy="5.0" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />
        <circle cx="11.6" cy="3.6" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />
        <circle cx="15.6" cy="5.0" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />
        <circle cx="18.0" cy="8.2" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />
        <circle cx="18.0" cy="15.8" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />
        <circle cx="15.6" cy="19.0" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />
        <circle cx="11.6" cy="20.4" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />
        <circle cx="7.6" cy="19.0" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />
        <circle cx="5.2" cy="15.8" r="0.9" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.08" />

        {/* Slight wood grain arc to suggest texture */}
        <path d="M5 12c1-2 4-4 7-4s6 2 7 4" stroke="#7A4F2F" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.9" />
      </g>
    </svg>
  );
}
