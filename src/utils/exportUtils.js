import { SECTIONS, QUESTIONS } from '../data/questionnaireData';

export function formatAnswerForDisplay(answer) {
  if (answer === undefined || answer === null || answer === '') {
    return '_Not answered yet_';
  }
  
  if (typeof answer === 'object' && !Array.isArray(answer)) {
    let result = '';
    
    // Handle selected options
    if (answer.selected) {
      if (Array.isArray(answer.selected)) {
        if (answer.selected.length === 0 && !answer.custom) return '_None selected_';
        if (answer.selected.length > 0) result += answer.selected.map(item => `• ${item}`).join('\n') + '\n\n';
      } else {
        result += `**Selected:** ${answer.selected}\n\n`;
      }
    }
    
    // Handle custom details
    if (answer.custom && answer.custom.trim().length > 0) {
      result += `**Additional Details:**\n${answer.custom}`;
    }
    
    if (result.trim().length === 0) return '_Not answered yet_';
    return result.trim();
  }

  if (Array.isArray(answer)) {
    if (answer.length === 0) return '_None selected_';
    return answer.map(item => `• ${item}`).join('\n');
  }
  
  return String(answer);
}

export function generateMarkdownReport(clientInfo, answers) {
  const totalQuestions = QUESTIONS.length;
  const answeredCount = QUESTIONS.filter(q => {
    const val = answers[q.id];
    if (!val) return false;
    if (typeof val === 'object' && !Array.isArray(val)) {
      if (val.selected && (Array.isArray(val.selected) ? val.selected.length > 0 : val.selected !== null)) return true;
      if (val.custom && val.custom.trim().length > 0) return true;
      return false;
    }
    if (Array.isArray(val)) return val.length > 0;
    return String(val).trim().length > 0;
  }).length;

  const percentage = Math.min(100, Math.round((answeredCount / totalQuestions) * 100));

  let md = `# Website Client Discovery Brief\n\n`;
  md += `**Client:** ${clientInfo.clientName || 'N/A'}  \n`;
  md += `**Company:** ${clientInfo.companyName || 'N/A'}  \n`;
  md += `**Current Website:** ${clientInfo.currentWebsite || 'N/A'}  \n`;
  md += `**Target Launch Date:** ${clientInfo.targetLaunchDate || 'N/A'}  \n`;
  md += `**Prepared By:** ${clientInfo.preparedBy || 'INCEPTION Discovery Engine'}  \n`;
  md += `**Generated Date:** ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}  \n`;
  md += `**Completion Status:** ${answeredCount} of ${totalQuestions} Questions Answered (${percentage}%)\n\n`;
  md += `---\n\n`;

  SECTIONS.forEach(section => {
    const sectionQuestions = QUESTIONS.filter(q => q.sectionId === section.id);
    if (sectionQuestions.length === 0) return;

    md += `## ${section.id === 9 ? 'Final Question' : `${section.id}. ${section.title}`}\n\n`;
    if (section.description) {
      md += `*${section.description}*\n\n`;
    }

    sectionQuestions.forEach(q => {
      const ans = answers[q.id];
      const displayVal = formatAnswerForDisplay(ans);

      md += `### ${q.num === 'Final' ? 'Final Question' : `${q.num}. ${q.title}`}\n\n`;
      md += `${displayVal}\n\n`;
    });

    md += `---\n\n`;
  });

  md += `\n*Discovery document generated via INCEPTION Discovery Engine.*`;
  return md;
}

export const TARGET_EMAIL = 'suzeadem2@gmail.com';

export function generatePlainTextReport(clientInfo, answers) {
  const totalQuestions = QUESTIONS.length;
  const answeredCount = QUESTIONS.filter(q => {
    const val = answers[q.id];
    if (!val) return false;
    if (typeof val === 'object' && !Array.isArray(val)) {
      if (val.selected && (Array.isArray(val.selected) ? val.selected.length > 0 : val.selected !== null)) return true;
      if (val.custom && val.custom.trim().length > 0) return true;
      return false;
    }
    if (Array.isArray(val)) return val.length > 0;
    return String(val).trim().length > 0;
  }).length;

  const percentage = Math.min(100, Math.round((answeredCount / totalQuestions) * 100));

  let text = `=======================================================\n`;
  text += `   INCEPTION WEBSITE CLIENT DISCOVERY BRIEF\n`;
  text += `=======================================================\n\n`;
  text += `CLIENT METADATA:\n`;
  text += `• Client Contact: ${clientInfo.clientName || 'N/A'}\n`;
  text += `• Client Email: ${clientInfo.email || 'N/A'}\n`;
  text += `• Company / Org: ${clientInfo.companyName || 'N/A'}\n`;
  text += `• Current Website: ${clientInfo.currentWebsite || 'N/A'}\n`;
  text += `• Industry / Sector: ${clientInfo.industry || 'N/A'}\n`;
  text += `• Target Launch: ${clientInfo.targetLaunchDate || 'N/A'}\n`;
  text += `• Prepared By: ${clientInfo.preparedBy || 'INCEPTION Discovery Engine'}\n`;
  text += `• Generated Date: ${new Date().toLocaleString()}\n`;
  text += `• Completion Rate: ${answeredCount} / ${totalQuestions} (${percentage}%)\n`;
  if (clientInfo.notes) {
    text += `• Additional Notes: ${clientInfo.notes}\n`;
  }
  text += `\n-------------------------------------------------------\n\n`;

  SECTIONS.forEach(section => {
    const sectionQuestions = QUESTIONS.filter(q => q.sectionId === section.id);
    if (sectionQuestions.length === 0) return;

    text += `[SECTION ${section.id === 9 ? '★ FINAL' : section.id}: ${section.title.toUpperCase()}]\n\n`;

    sectionQuestions.forEach(q => {
      const ans = answers[q.id];
      const displayVal = formatAnswerForDisplay(ans);

      text += `Q: ${q.num === 'Final' ? 'Final Question' : `${q.num}. ${q.title}`}\n`;
      text += `A: ${displayVal.replace(/\*\*/g, '').replace(/\*/g, '')}\n\n`;
    });

    text += `-------------------------------------------------------\n\n`;
  });

  return text;
}

export function generateMailtoUrl(clientInfo, answers) {
  const subject = encodeURIComponent(`[Discovery Brief] ${clientInfo.companyName || clientInfo.clientName || 'New Project'} - INCEPTION`);
  const bodyText = generatePlainTextReport(clientInfo, answers);
  return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
}

export async function sendDiscoveryEmail(clientInfo, answers, senderDetails = {}) {
  const markdownContent = generateMarkdownReport(clientInfo, answers);
  const plainTextContent = generatePlainTextReport(clientInfo, answers);
  const senderEmail = senderDetails.email || clientInfo.email || '';
  const senderName = senderDetails.name || clientInfo.clientName || clientInfo.companyName || 'Discovery Respondent';

  const payload = {
    _subject: `🚀 [INCEPTION Discovery Brief] ${clientInfo.companyName || clientInfo.clientName || 'New Project Submission'}`,
    _replyto: senderEmail || undefined,
    _template: 'table',
    clientName: clientInfo.clientName || 'N/A',
    clientEmail: senderEmail || 'N/A',
    companyName: clientInfo.companyName || 'N/A',
    currentWebsite: clientInfo.currentWebsite || 'N/A',
    targetLaunchDate: clientInfo.targetLaunchDate || 'N/A',
    industry: clientInfo.industry || 'N/A',
    preparedBy: clientInfo.preparedBy || 'INCEPTION Discovery Engine',
    submissionDate: new Date().toLocaleString(),
    discoverySummary: plainTextContent,
    rawMarkdownReport: markdownContent
  };

  const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok || (data.success !== "true" && data.success !== true && !data.message)) {
    throw new Error(data.message || 'Failed to submit discovery brief via email.');
  }

  return data;
}

export function downloadFile(filename, content, type = 'text/markdown') {
  const blob = new Blob([content], { type: `${type};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
