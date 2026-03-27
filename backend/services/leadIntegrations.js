const postToWebhook = async (url, payload) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`);
  }
};

const sendToNotionWebhook = async (payload) => {
  if (!process.env.NOTION_WEBHOOK_URL) return 'disabled';
  await postToWebhook(process.env.NOTION_WEBHOOK_URL, payload);
  return 'sent';
};

const sendToNotionDatabase = async (payload) => {
  const notionApiKey = process.env.NOTION_API_KEY;
  const notionDatabaseId = process.env.NOTION_DATABASE_ID;
  if (!notionApiKey || !notionDatabaseId) return 'disabled';

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: notionDatabaseId },
      properties: {
        Name: { title: [{ text: { content: payload.name } }] },
        Email: { email: payload.email },
        Phone: { rich_text: [{ text: { content: payload.phone || '-' } }] },
        Category: { select: { name: payload.category } },
        SourcePage: { rich_text: [{ text: { content: payload.sourcePage } }] },
        ServiceInterest: { rich_text: [{ text: { content: payload.serviceInterest } }] },
        Audience: { rich_text: [{ text: { content: payload.audience || 'General' } }] },
        Offer: { rich_text: [{ text: { content: payload.offer || 'Standard' } }] },
        SebiRegistered: {
          rich_text: [{ text: { content: payload.sebiRegistered === null ? 'Unknown' : String(payload.sebiRegistered) } }],
        },
        PageTag: { multi_select: [{ name: payload.pageTag }] },
        QualificationTier: { select: { name: payload.qualificationTier } },
        DeviceType: { select: { name: payload.deviceType } },
        SubmittedAt: { date: { start: payload.submittedAt } },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Notion API failed with status ${response.status}`);
  }

  return 'sent';
};

const sendToGoogleSheetsWebhook = async (payload) => {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return 'disabled';
  await postToWebhook(process.env.GOOGLE_SHEETS_WEBHOOK_URL, payload);
  return 'sent';
};

const sendToCrmWebhook = async (payload) => {
  if (!process.env.CRM_WEBHOOK_URL) return 'disabled';
  await postToWebhook(process.env.CRM_WEBHOOK_URL, payload);
  return 'sent';
};

const dispatchLeadIntegrations = async (payload) => {
  const result = {
    notion: 'disabled',
    googleSheets: 'disabled',
    crm: 'disabled',
  };

  try {
    result.notion = await sendToNotionDatabase(payload);
    if (result.notion === 'disabled') {
      result.notion = await sendToNotionWebhook(payload);
    }
  } catch (error) {
    console.error('Notion integration error:', error.message);
    result.notion = 'failed';
  }

  try {
    result.googleSheets = await sendToGoogleSheetsWebhook(payload);
  } catch (error) {
    console.error('Google Sheets integration error:', error.message);
    result.googleSheets = 'failed';
  }

  try {
    result.crm = await sendToCrmWebhook(payload);
  } catch (error) {
    console.error('CRM integration error:', error.message);
    result.crm = 'failed';
  }

  return result;
};

module.exports = {
  dispatchLeadIntegrations,
};
