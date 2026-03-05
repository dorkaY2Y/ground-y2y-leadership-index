const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'submissions.json');

const readDatabase = () => {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify({ submissions: [] }, null, 2));
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { submissions: [] };
  }
};

const writeDatabase = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
  }
};

const saveEmailSubmission = (email, scores) => {
  const db = readDatabase();
  const submission = {
    id: db.submissions.length + 1,
    email: email,
    scores: scores,
    submitted_at: new Date().toISOString(),
    email_sent: true
  };
  db.submissions.push(submission);
  writeDatabase(db);
  return submission;
};

const getAllSubmissions = () => {
  const db = readDatabase();
  return db.submissions.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
};

const getSubmissionsByEmail = (email) => {
  const db = readDatabase();
  return db.submissions
    .filter(s => s.email === email)
    .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
};

module.exports = {
  saveEmailSubmission,
  getAllSubmissions,
  getSubmissionsByEmail
};
