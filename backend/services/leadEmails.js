const nodemailer = require("nodemailer");

/* ============================================================
   EMAIL SENDER SETUP
   Priority: Nodemailer (SMTP) → Resend API → disabled
   ============================================================ */

const createNodemailerTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
};

const sendWithNodemailer = async ({ to, subject, html }) => {
  const transporter = createNodemailerTransporter();
  if (!transporter) return "disabled";

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  if (!from) return "disabled";

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });

  return "sent";
};

const sendWithResend = async ({ to, subject, html }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return "disabled";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
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

  return "sent";
};

/* ============================================================
   TEMPLATES
   ============================================================
   NOTE: Replace the userConfirmationTemplate() body below
   with your own branded HTML template when you receive it.
   Keep the function signature unchanged.
   ============================================================ */

const userConfirmationTemplate = ({ name, calendar }) => {
  const bookingLink =
    calendar.redirectToCalendar && calendar.redirectUrl ?
      `<p style="margin:18px 0;"><a href="${calendar.redirectUrl}" style="background:#f97316;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;font-weight:600;">Schedule Free Consultation</a></p>`
    : `<p style="margin:18px 0;color:#475569;">Our team will reach out shortly with the next available slot.</p>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Consultation Request Received</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:#0f172a;padding:32px 24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">SuchaMojo</h1>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Personal Branding India</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 24px;color:#1e293b;">
              <p style="margin:0 0 12px;font-size:16px;font-weight:600;">Hi ${name},</p>
              <p style="margin:0 0 16px;line-height:1.6;color:#475569;">Thank you for reaching out. Your consultation request has been received and our team is already reviewing your context.</p>
              <p style="margin:0 0 16px;line-height:1.6;color:#475569;">We align every conversation to your goals — so the next step is intentional, not generic.</p>
              ${bookingLink}
              <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">If you have any questions, simply reply to this email.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#f1f5f9;padding:20px 24px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#64748b;">© ${new Date().getFullYear()} SuchaMojo. All rights reserved.</p>
              <p style="margin:6px 0 0;font-size:11px;color:#94a3b8;">New Delhi, India</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const ownerNotificationTemplate = ({ lead }) => `
  <h3>New Consultation Lead</h3>
  <p><strong>Name:</strong> ${lead.name}</p>
  <p><strong>Email:</strong> ${lead.email}</p>
  <p><strong>Phone:</strong> ${lead.phone || "-"}</p>
  <p><strong>Page source:</strong> ${lead.sourcePage}</p>
  <p><strong>Service interest:</strong> ${lead.serviceInterest}</p>
  <p><strong>Audience:</strong> ${lead.audience || "General"}</p>
  <p><strong>Offer:</strong> ${lead.offer || "Standard"}</p>
  <p><strong>SEBI Registered:</strong> ${lead.sebiRegistered === null ? "Unknown" : lead.sebiRegistered}</p>
  <p><strong>Quick summary:</strong> ${lead.quickSummary}</p>
  <p><strong>Calendar decision:</strong> ${lead.calendar.reason}</p>
`;

/* ============================================================
   MAIN EXPORT
   ============================================================ */

const sendLeadEmails = async ({ lead, calendar }) => {
  const result = { user: "disabled", owner: "disabled" };
  const ownerEmail = process.env.INTERNAL_NOTIFICATION_EMAIL;

  // Determine sender strategy
  const hasNodemailer = !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
  const hasResend = !!(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);

  const sendEmail = async (payload) => {
    if (hasNodemailer) {
      return sendWithNodemailer(payload);
    }
    if (hasResend) {
      return sendWithResend(payload);
    }
    return "disabled";
  };

  // Send user confirmation
  try {
    result.user = await sendEmail({
      to: lead.email,
      subject: "Consultation request received — SuchaMojo",
      html: userConfirmationTemplate({ name: lead.name, calendar }),
    });
  } catch (error) {
    console.error("User email error:", error.message);
    result.user = "failed";
  }

  // Send owner notification
  if (!ownerEmail) {
    return result;
  }

  try {
    result.owner = await sendEmail({
      to: ownerEmail,
      subject: `New lead: ${lead.name} (${lead.sourcePage})`,
      html: ownerNotificationTemplate({ lead }),
    });
  } catch (error) {
    console.error("Owner email error:", error.message);
    result.owner = "failed";
  }

  return result;
};

module.exports = {
  sendLeadEmails,
};
