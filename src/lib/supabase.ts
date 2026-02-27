import { createClient } from '@supabase/supabase-js';
import { ProfileResult } from '../utils/scoring';
import { getDimensionReport } from '../data/reportTexts';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xfqjqxkkvvcmjraibzfp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmcWpxeGtrdnZjbWpyYWliemZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxODU5MDEsImV4cCI6MjA4Nzc2MTkwMX0.2BJyWckw75VV1T_ozB0GPOcf8aBPIQ0VVyGmzeUfmzM';
const emailApiUrl = import.meta.env.VITE_EMAIL_API_URL || 'https://xfqjqxkkvvcmjraibzfp.supabase.co/functions/v1/hyper-handler';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

interface LeadData {
  email: string;
  overall_score: number;
  profile_name: string;
  dimension_scores: Record<string, number>;
  raw_answers: Record<number, number>;
}

export async function saveLead(data: LeadData): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured. Saving to localStorage as fallback.');
    saveToLocalStorage(data);
    return true;
  }

  try {
    const { error } = await supabase.from('email_submissions').insert([{
      email: data.email,
      overall_score: data.overall_score,
      profile_name: data.profile_name,
      dimension_scores: data.dimension_scores,
    }]);
    if (error) {
      console.error('Supabase insert error:', error);
      saveToLocalStorage(data);
      return true;
    }
    return true;
  } catch (err) {
    console.error('Supabase connection error:', err);
    saveToLocalStorage(data);
    return true;
  }
}

export async function sendResultEmail(email: string, result: ProfileResult): Promise<boolean> {
  if (!emailApiUrl) {
    console.warn('Email API URL not configured (VITE_EMAIL_API_URL). Skipping email send.');
    return true;
  }

  try {
    const response = await fetch(emailApiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        to: email,
        subject: 'Ground by Y2Y — A te személyes vezetői riportod',
        profileName: result.profileName,
        profileDescription: result.profileDescription,
        overallScore: result.overallScore,
        dimensions: result.dimensionScores.map((d) => ({
          dimensionId: d.dimensionId,
          name: d.name,
          score: d.score,
          level: d.level,
          color: d.color,
          report: getDimensionReport(d.dimensionId, d.score),
        })),
      }),
    });

    if (!response.ok) {
      console.error('Email API error:', response.status, await response.text());
      return false;
    }

    return true;
  } catch (err) {
    console.error('Email send failed:', err);
    return false;
  }
}

function saveToLocalStorage(data: LeadData) {
  try {
    const existing = JSON.parse(localStorage.getItem('ground_leads_fallback') || '[]');
    existing.push({ ...data, created_at: new Date().toISOString() });
    localStorage.setItem('ground_leads_fallback', JSON.stringify(existing));
    console.log('Lead saved to localStorage as fallback.');
  } catch (err) {
    console.error('localStorage save failed:', err);
  }
}
