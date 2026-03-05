const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { saveEmailSubmission, getAllSubmissions } = require('./database');
const { sendResultEmail, sendNotificationEmail } = require('./emailService');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Túl sok kérés. Kérlek próbáld újra 15 perc múlva.' }
});

app.use('/api/', limiter);

app.post('/api/submit-results', async (req, res) => {
  try {
    const { email, scores } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Érvénytelen email cím' });
    }

    if (!scores || !Array.isArray(scores) || scores.length !== 8) {
      return res.status(400).json({ error: 'Érvénytelen pontszámok' });
    }

    saveEmailSubmission(email, scores);

    await Promise.all([
      sendResultEmail(email, scores),
      sendNotificationEmail(email, scores)
    ]);

    res.json({ 
      success: true, 
      message: 'Email sikeresen elküldve!' 
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ 
      error: 'Hiba történt az email küldése során. Kérlek próbáld újra később.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = getAllSubmissions();
    res.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Hiba történt az adatok lekérdezése során' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service configured for ${process.env.EMAIL_USER}`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
});
