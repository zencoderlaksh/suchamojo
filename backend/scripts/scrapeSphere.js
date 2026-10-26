const https = require('https');
https.get('https://www.spheredigitalrecruitment.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const start = data.indexOf('img-links img-links--alt');
    if (start !== -1) {
      console.log(data.substring(start - 200, start + 3500));
    }
  });
});
