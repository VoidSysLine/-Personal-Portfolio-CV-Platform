import type { ReactNode } from 'react';
import { getProfile, getCareerEntries, getEducationEntries, getCertificateEntries } from '@/lib/dataLoader';
import { formatPeriod } from '@/lib/dateUtils';
import type { Locale } from '@/types/common';

interface PrintableCVProps {
  locale: Locale;
}

export function PrintableCV({ locale }: PrintableCVProps): ReactNode {
  const profile = getProfile();
  const career = getCareerEntries();
  const education = getEducationEntries();
  const certificates = getCertificateEntries();

  const presentLabel = locale === 'de' ? 'Heute' : 'Present';
  const labels = {
    personalInfo: locale === 'de' ? 'Persönliche Daten' : 'Personal Information',
    workExperience: locale === 'de' ? 'Berufserfahrung' : 'Work Experience',
    education: locale === 'de' ? 'Bildung' : 'Education',
    skills: locale === 'de' ? 'Kompetenzen' : 'Skills',
    certificates: locale === 'de' ? 'Zertifikate' : 'Certificates',
    email: 'E-Mail',
    location: locale === 'de' ? 'Standort' : 'Location',
  };

  return (
    <div className="printable-cv" style={{
      maxWidth: '210mm',
      margin: '0 auto',
      padding: '20mm',
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '10.5pt',
      lineHeight: '1.5',
      color: '#000',
      backgroundColor: '#fff',
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #1e293b', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '22pt', fontWeight: 700, margin: 0, color: '#0f172a' }}>
          {profile.name}
        </h1>
        <p style={{ fontSize: '12pt', color: '#475569', marginTop: '4px' }}>
          {profile.title[locale]}
        </p>
        <p style={{ fontSize: '9pt', color: '#64748b', marginTop: '8px' }}>
          {profile.email} · {profile.location[locale]}
          {profile.social.linkedin && ` · ${profile.social.linkedin}`}
        </p>
      </header>

      {/* Work Experience */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '13pt', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px' }}>
          {labels.workExperience}
        </h2>
        {career.map(entry => (
          <div key={entry.id} style={{ marginBottom: '14px', pageBreakInside: 'avoid' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '10.5pt' }}>{entry.role[locale]}</strong>
              <span style={{ fontSize: '9pt', color: '#64748b' }}>
                {formatPeriod(entry.period.start, entry.period.end, locale, presentLabel)}
              </span>
            </div>
            <p style={{ fontSize: '10pt', color: '#2563eb', margin: '2px 0' }}>
              {entry.company[locale]} — {entry.location[locale]}
            </p>
            <ul style={{ margin: '4px 0 0 16px', fontSize: '9.5pt', color: '#334155' }}>
              {entry.description[locale].map((item, i) => (
                <li key={i} style={{ marginBottom: '2px' }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '13pt', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px' }}>
          {labels.education}
        </h2>
        {education.map(entry => (
          <div key={entry.id} style={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '10.5pt' }}>{entry.degree[locale]}</strong>
              <span style={{ fontSize: '9pt', color: '#64748b' }}>
                {formatPeriod(entry.period.start, entry.period.end, locale, presentLabel)}
              </span>
            </div>
            <p style={{ fontSize: '10pt', color: '#2563eb', margin: '2px 0' }}>
              {entry.institution[locale]}
              {entry.grade && ` — ${locale === 'de' ? 'Note' : 'Grade'}: ${entry.grade}`}
            </p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '13pt', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px' }}>
          {labels.skills}
        </h2>
        {profile.skills.map((group, index) => (
          <div key={index} style={{ marginBottom: '6px' }}>
            <strong style={{ fontSize: '10pt' }}>{group.category[locale]}:</strong>{' '}
            <span style={{ fontSize: '9.5pt', color: '#334155' }}>
              {group.items.join(', ')}
            </span>
          </div>
        ))}
      </section>

      {/* Certificates */}
      {certificates.length > 0 && (
        <section>
          <h2 style={{ fontSize: '13pt', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px' }}>
            {labels.certificates}
          </h2>
          {certificates.map(cert => (
            <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10pt' }}>
                {cert.title[locale]} — <span style={{ color: '#475569' }}>{cert.issuer[locale]}</span>
              </span>
              <span style={{ fontSize: '9pt', color: '#64748b' }}>{cert.date}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
