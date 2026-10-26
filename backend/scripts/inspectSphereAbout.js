const fs = require('fs');
const content = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-ide/brain/c80671cb-2c2d-4482-bb6c-44aaa6ad739c/.system_generated/steps/251/content.md', 'utf-8');

const s3 = content.indexOf('id="section-3"');
if (s3 !== -1) {
  console.log('--- SECTION 3 ---');
  console.log(content.substring(s3, s3 + 1500));
}

const s5 = content.indexOf('id="section-5"');
if (s5 !== -1) {
  console.log('--- SECTION 5 ---');
  console.log(content.substring(s5, s5 + 1500));
}

const cta = content.indexOf('id="global-cta"');
if (cta !== -1) {
  console.log('--- GLOBAL CTA ---');
  console.log(content.substring(cta, cta + 1500));
}
