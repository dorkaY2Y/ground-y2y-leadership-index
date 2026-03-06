import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'Ground by Y2Y <ground@y2y.hu>';

interface DimensionReport {
  summary: string;
  strengths: string;
  advice: string;
  practice: string;
}

interface Dimension {
  dimensionId: string;
  name: string;
  score: number;
  level: string;
  color: string;
  report: DimensionReport;
}

interface EmailPayload {
  to: string;
  subject: string;
  profileName: string;
  profileDescription: string;
  overallScore: number;
  dimensions: Dimension[];
}

function buildHtmlEmail(data: EmailPayload): string {
  const dimensionSections = data.dimensions
    .map(
      (d) => `
    <!-- ${d.name} -->
    <div style="background-color: #131B2E; border: 1px solid #1E293B; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="color: #E2E8F0; font-weight: bold; font-size: 16px;">${d.name}</span>
      </div>
      <div style="margin-bottom: 16px;">
        <span style="color: ${d.color}; font-weight: bold; font-size: 24px;">${d.score.toFixed(1)}</span>
        <span style="color: #64748B; font-size: 13px;"> / 5.0</span>
        <span style="display: inline-block; margin-left: 12px; font-size: 11px; color: #94A3B8; background-color: #1E293B; padding: 2px 10px; border-radius: 4px;">${d.level}</span>
      </div>
      <div style="background-color: #1E293B; height: 6px; border-radius: 3px; margin-bottom: 20px;">
        <div style="background-color: ${d.color}; height: 6px; border-radius: 3px; width: ${(d.score / 5) * 100}%;"></div>
      </div>
      <p style="color: #CBD5E1; font-size: 14px; line-height: 1.7; margin: 0 0 16px;">
        ${d.report.summary}
      </p>
      <div style="background-color: #0B1120; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <p style="color: #94A3B8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Erősséged</p>
        <p style="color: #CBD5E1; font-size: 13px; line-height: 1.6; margin: 0;">${d.report.strengths}</p>
      </div>
      <div style="background-color: #0B1120; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <p style="color: #94A3B8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Tanácsunk</p>
        <p style="color: #CBD5E1; font-size: 13px; line-height: 1.6; margin: 0;">${d.report.advice}</p>
      </div>
      <div style="background-color: #0B112080; border: 1px solid #ded11420; border-radius: 8px; padding: 16px;">
        <p style="color: #ded114; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Gyakorlati tipp</p>
        <p style="color: #CBD5E1; font-size: 13px; line-height: 1.6; margin: 0;">${d.report.practice}</p>
      </div>
    </div>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #0B1120; font-family: 'Exo', Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #ded114; font-size: 32px; margin: 0; font-weight: bold;">Ground</h1>
      <p style="color: #64748B; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; margin: 4px 0 0;">by Y2Y</p>
    </div>

    <!-- Profile summary -->
    <div style="text-align: center; background-color: #131B2E; border: 1px solid #1E293B; border-radius: 12px; padding: 32px 24px; margin-bottom: 32px;">
      <p style="color: #64748B; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">A te profilod</p>
      <h2 style="color: #ded114; font-size: 24px; margin: 0 0 12px; font-weight: bold;">${data.profileName}</h2>
      <p style="color: #E2E8F0; font-size: 28px; font-weight: bold; margin: 0 0 4px;">
        ${data.overallScore.toFixed(1)} <span style="color: #64748B; font-size: 14px; font-weight: normal;">/ 5.0</span>
      </p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.6; margin: 16px auto 0; max-width: 440px;">
        ${data.profileDescription}
      </p>
    </div>

    <!-- Intro text -->
    <div style="margin-bottom: 24px;">
      <h3 style="color: #E2E8F0; font-size: 18px; margin: 0 0 8px;">A részletes riportod</h3>
      <p style="color: #94A3B8; font-size: 13px; line-height: 1.6; margin: 0;">
        Az alábbiakban mind a 6 dimenzióhoz személyre szabott elemzést találsz: mit jelent a te szinted, mik az erősségeid, min érdemes dolgoznod, és egy konkrét gyakorlati tippet, amit akár holnap elkezdhetsz.
      </p>
    </div>

    <!-- Dimension details -->
    ${dimensionSections}

    <!-- CTA -->
    <div style="text-align: center; background-color: #131B2E; border: 1px solid #ded11425; border-radius: 12px; padding: 28px; margin: 32px 0 24px;">
      <p style="color: #CBD5E1; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
        Szeretnéd, ha segítenénk a fejlődésben?
      </p>
      <a href="https://www.y2y.hu/kapcsolat"
         style="display: inline-block; background-color: #ded114; color: #0B1120; font-weight: bold; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px;">
        Beszélgessünk →
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid #1E293B30;">
      <p style="color: #475569; font-size: 10px; margin: 0 0 8px;">
        © 2026 Y2Y Hungary Kft. · Ground v1.0
      </p>
      <p style="color: #334155; font-size: 10px; margin: 0; line-height: 1.5;">
        SCARF modell (Rock, 2008) · Pszichológiai Biztonság (Edmondson, 1999) · Dual-Process Theory (Kahneman, 2011)
      </p>
      <p style="color: #334155; font-size: 10px; margin: 12px 0 0;">
        <a href="https://www.y2y.hu/leiratkozas" style="color: #475569; text-decoration: underline;">Leiratkozás</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), { status: 500 });
  }

  try {
    const payload: EmailPayload = await req.json();

    const html = buildHtmlEmail(payload);

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [payload.to],
        subject: payload.subject,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', errorText);
      return new Response(JSON.stringify({ error: 'Email send failed', details: errorText }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    }

    const result = await resendResponse.json();

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Edge function error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
});
