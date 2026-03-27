const sendWithResend = async ({ to, subject, html }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return 'disabled';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend failed with status ${response.status}`);
  }

  return 'sent';
};

const userConfirmationTemplate = ({ name, calendar }) => `
  <p>Hi ${name},</p>
  <p>Your consultation request is confirmed.</p>
  <p>What happens next: we review your context and align the conversation to your goals.</p>
  ${
    calendar.redirectToCalendar && calendar.redirectUrl
      ? `<p>Book your slot here: <a href="${calendar.redirectUrl}">Schedule Free Consultation</a></p>`
      : '<p>Our team will reach out shortly with next available steps.</p>'
  }
  <p>Thanks,<br/>SuchAMojo</p>
`;

const ownerNotificationTemplate = ({ lead }) => `
  <h3>New Consultation Lead</h3>
  <p><strong>Name:</strong> ${lead.name}</p>
  <p><strong>Email:</strong> ${lead.email}</p>
  <p><strong>Phone:</strong> ${lead.phone || '-'}</p>
  <p><strong>Page source:</strong> ${lead.sourcePage}</p>
  <p><strong>Service interest:</strong> ${lead.serviceInterest}</p>
  <p><strong>Audience:</strong> ${lead.audience || 'General'}</p>
  <p><strong>Offer:</strong> ${lead.offer || 'Standard'}</p>
  <p><strong>SEBI Registered:</strong> ${lead.sebiRegistered === null ? 'Unknown' : lead.sebiRegistered}</p>
  <p><strong>Quick summary:</strong> ${lead.quickSummary}</p>
  <p><strong>Calendar decision:</strong> ${lead.calendar.reason}</p>
`;

const sendLeadEmails = async ({ lead, calendar }) => {
  const result = { user: 'disabled', owner: 'disabled' };
  const ownerEmail = process.env.INTERNAL_NOTIFICATION_EMAIL;

  try {
    result.user = await sendWithResend({
      to: lead.email,
      subject: 'Consultation request received',
      html: userConfirmationTemplate({ name: lead.name, calendar }),
    });
  } catch (error) {
    console.error('User email error:', error.message);
    result.user = 'failed';
  }

  if (!ownerEmail) {
    return result;
  }

  try {
    result.owner = await sendWithResend({
      to: ownerEmail,
      subject: `New lead: ${lead.name} (${lead.sourcePage})`,
      html: ownerNotificationTemplate({ lead }),
    });
  } catch (error) {
    console.error('Owner email error:', error.message);
    result.owner = 'failed';
  }

  return result;
};

module.exports = {
  sendLeadEmails,
};
