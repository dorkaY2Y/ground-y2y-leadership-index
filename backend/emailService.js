const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const DIMENSIONS = [
  { id: "self", label: "Önismeret", icon: "🧠" },
  { id: "emotional", label: "Érzelmi intelligencia", icon: "❤️" },
  { id: "communication", label: "Kommunikáció", icon: "💬" },
  { id: "decision", label: "Döntéshozatal", icon: "🎯" },
  { id: "vision", label: "Vízió és stratégia", icon: "🔭" },
  { id: "team", label: "Csapatépítés", icon: "🤝" },
  { id: "change", label: "Változáskezelés", icon: "🔄" },
  { id: "ethics", label: "Etika és integritás", icon: "⚖️" }
];

const getScoreLevel = (score) => {
  if (score >= 4.5) return { level: "Kiváló", color: "#10B981" };
  if (score >= 3.5) return { level: "Jó", color: "#3B82F6" };
  if (score >= 2.5) return { level: "Fejleszthető", color: "#F59E0B" };
  return { level: "Kezdő", color: "#EF4444" };
};

const generateEmailHTML = (email, scores) => {
  const scoreRows = DIMENSIONS.map((dim, idx) => {
    const score = scores[idx] || 0;
    const { level, color } = getScoreLevel(score);
    const percentage = (score / 5) * 100;
    
    return `
      <tr>
        <td style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 24px;">${dim.icon}</span>
            <strong style="color: #1e293b;">${dim.label}</strong>
          </div>
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <strong style="color: #1e293b; font-size: 18px;">${score.toFixed(1)}</strong>
          <span style="color: #64748b; font-size: 14px;">/5.0</span>
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="background: #f1f5f9; border-radius: 8px; height: 24px; overflow: hidden;">
            <div style="background: ${color}; height: 100%; width: ${percentage}%; transition: width 0.3s;"></div>
          </div>
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <span style="background: ${color}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
            ${level}
          </span>
        </td>
      </tr>
    `;
  }).join('');

  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const { level: overallLevel, color: overallColor } = getScoreLevel(avgScore);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Y2Y Leadership Readiness Index - Eredményeid</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2d5bff 0%, #00c2a8 100%); border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 32px;">
      <h1 style="color: white; margin: 0 0 12px 0; font-size: 32px; font-weight: 700;">
        🎯 Leadership Readiness Index
      </h1>
      <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">
        A te személyre szabott vezetői fejlődési riportod
      </p>
    </div>

    <!-- Overall Score -->
    <div style="background: white; border-radius: 16px; padding: 32px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 24px;">Összesített eredményed</h2>
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 64px; font-weight: 700; color: ${overallColor}; margin-bottom: 8px;">
          ${avgScore.toFixed(1)}
        </div>
        <div style="font-size: 18px; color: #64748b; margin-bottom: 16px;">/ 5.0</div>
        <span style="background: ${overallColor}; color: white; padding: 8px 24px; border-radius: 16px; font-size: 16px; font-weight: 600; display: inline-block;">
          ${overallLevel}
        </span>
      </div>
    </div>

    <!-- Detailed Scores -->
    <div style="background: white; border-radius: 16px; padding: 32px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <h2 style="color: #1e293b; margin: 0 0 24px 0; font-size: 24px;">Részletes eredmények</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f8fafc;">
            <th style="padding: 12px 16px; text-align: left; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Dimenzió</th>
            <th style="padding: 12px 16px; text-align: center; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Pontszám</th>
            <th style="padding: 12px 16px; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Vizualizáció</th>
            <th style="padding: 12px 16px; text-align: center; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Szint</th>
          </tr>
        </thead>
        <tbody>
          ${scoreRows}
        </tbody>
      </table>
    </div>

    <!-- Next Steps -->
    <div style="background: linear-gradient(135deg, rgba(45,91,255,0.1) 0%, rgba(0,194,168,0.1) 100%); border: 2px solid rgba(45,91,255,0.3); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
      <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 24px;">📈 Következő lépések</h2>
      <p style="color: #475569; line-height: 1.6; margin: 0 0 16px 0;">
        Gratulálunk az értékelés elvégzéséhez! Ez az első lépés a vezetői fejlődésed útján.
      </p>
      <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 24px;">
        <li>Elemezd a gyengébb területeidet és tűzz ki konkrét fejlődési célokat</li>
        <li>Kérj visszajelzést kollégáidtól és mentoroktól</li>
        <li>Vegyél részt vezetőfejlesztő programokon</li>
        <li>Ismételd meg az értékelést 3-6 hónap múlva a fejlődésed nyomon követéséhez</li>
      </ul>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 24px; color: #94a3b8; font-size: 14px;">
      <p style="margin: 0 0 8px 0;">
        <strong style="color: #1e293b;">Y2Y Leadership Development</strong>
      </p>
      <p style="margin: 0;">
        Kérdésed van? Írj nekünk: <a href="mailto:dorka@y2y.hu" style="color: #2d5bff; text-decoration: none;">dorka@y2y.hu</a>
      </p>
    </div>

  </div>
</body>
</html>
  `;
};

const sendResultEmail = async (userEmail, scores) => {
  const htmlContent = generateEmailHTML(userEmail, scores);
  
  const mailOptions = {
    from: `"Y2Y Leadership" <${process.env.EMAIL_FROM}>`,
    to: userEmail,
    subject: '🎯 A te Leadership Readiness Index eredményeid',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
};

const sendNotificationEmail = async (userEmail, scores) => {
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  const mailOptions = {
    from: `"Y2Y Leadership System" <${process.env.EMAIL_FROM}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Új Leadership Index kitöltés: ${userEmail}`,
    html: `
      <h2>Új kitöltés érkezett</h2>
      <p><strong>Email:</strong> ${userEmail}</p>
      <p><strong>Átlagos pontszám:</strong> ${avgScore.toFixed(2)} / 5.0</p>
      <p><strong>Időpont:</strong> ${new Date().toLocaleString('hu-HU')}</p>
      <hr>
      <h3>Részletes pontszámok:</h3>
      <ul>
        ${DIMENSIONS.map((dim, idx) => `
          <li><strong>${dim.icon} ${dim.label}:</strong> ${scores[idx]?.toFixed(1) || 0} / 5.0</li>
        `).join('')}
      </ul>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendResultEmail,
  sendNotificationEmail
};
