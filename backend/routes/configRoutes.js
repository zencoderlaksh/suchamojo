const express = require('express');

const router = express.Router();

router.get('/tracking', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  return res.status(200).json({
    ga4MeasurementId: process.env.GA4_MEASUREMENT_ID || '',
    events: {
      scheduleFreeConsultationClick: 'schedule_free_consultation_click',
      formSubmitted: 'form_submitted',
      calendarBookingCompleted: 'calendar_booking_completed',
    },
  });
});

module.exports = router;
