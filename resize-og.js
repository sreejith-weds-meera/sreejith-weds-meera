const sharp = require('sharp');
const fs = require('fs');

const input = './images/og_image.png';
const output = './images/og_image_1200x630.jpg';

(async () => {
  try {
    if (!fs.existsSync(input)) throw new Error('Input image not found: ' + input);
    await sharp(input)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 85 })
      .toFile(output);
    console.log('Created', output);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
