const fs = require('fs');
const path = require('path');

// Profile data with initials and colors
const profiles = [
  { 
    filename: 'jahmere-webb.jpg',
    initials: 'JW',
    name: 'JAHmere Webb',
    bgColor: '#5B21B6', // Purple
    textColor: '#FFFFFF'
  },
  { 
    filename: 'jordan-dungy.jpg',
    initials: 'JD',
    name: 'Jordan Dungy',
    bgColor: '#1E3A8A', // Blue
    textColor: '#FFFFFF'
  },
  { 
    filename: 'michael-mataluni.jpg',
    initials: 'MM',
    name: 'Michael Mataluni',
    bgColor: '#059669', // Green
    textColor: '#FFFFFF'
  },
  { 
    filename: 'coach-dungy.jpg',
    initials: 'TD',
    name: 'Tony Dungy',
    bgColor: '#DC2626', // Red
    textColor: '#FFFFFF'
  },
  { 
    filename: 'jay-forte.jpg',
    initials: 'JF',
    name: 'Jay Forte',
    bgColor: '#F59E0B', // Amber
    textColor: '#FFFFFF'
  }
];

// Create SVG placeholder
function createSVGPlaceholder(profile) {
  return `
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="${profile.bgColor}"/>
  <circle cx="400" cy="400" r="350" fill="${profile.bgColor}" stroke="${profile.textColor}" stroke-width="20" opacity="0.3"/>
  <text x="400" y="420" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="${profile.textColor}" text-anchor="middle">
    ${profile.initials}
  </text>
  <text x="400" y="520" font-family="Arial, sans-serif" font-size="48" fill="${profile.textColor}" text-anchor="middle" opacity="0.8">
    ${profile.name}
  </text>
  <text x="400" y="700" font-family="Arial, sans-serif" font-size="32" fill="${profile.textColor}" text-anchor="middle" opacity="0.6">
    PLACEHOLDER IMAGE
  </text>
</svg>`;
}

// Ensure directory exists
const profilesDir = path.join(__dirname, '..', 'public', 'images', 'profiles');
if (!fs.existsSync(profilesDir)) {
  fs.mkdirSync(profilesDir, { recursive: true });
}

// Create placeholder images
profiles.forEach(profile => {
  const svgContent = createSVGPlaceholder(profile);
  const svgPath = path.join(profilesDir, profile.filename.replace('.jpg', '.svg'));
  
  // Write SVG file
  fs.writeFileSync(svgPath, svgContent.trim());
  console.log(`Created placeholder: ${profile.filename.replace('.jpg', '.svg')}`);
});

// Also create placeholder signature images
const signaturesDir = path.join(__dirname, '..', 'public', 'images', 'signatures');
if (!fs.existsSync(signaturesDir)) {
  fs.mkdirSync(signaturesDir, { recursive: true });
}

// Create signature placeholders
const signatures = [
  'jahmere-webb.png',
  'michael-mataluni.png',
  'jay-forte.png'
];

signatures.forEach(filename => {
  const name = filename.replace('.png', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const svgContent = `
<svg width="400" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="150" fill="transparent"/>
  <text x="200" y="75" font-family="Brush Script MT, cursive" font-size="48" fill="#1F2937" text-anchor="middle" font-style="italic">
    ${name}
  </text>
  <path d="M 50 100 Q 200 80 350 100" stroke="#1F2937" stroke-width="2" fill="none" opacity="0.5"/>
</svg>`;
  
  const svgPath = path.join(signaturesDir, filename.replace('.png', '.svg'));
  fs.writeFileSync(svgPath, svgContent.trim());
  console.log(`Created signature placeholder: ${filename.replace('.png', '.svg')}`);
});

// Create placeholder video thumbnails
const videoThumbnailsDir = path.join(__dirname, '..', 'public', 'images', 'video-thumbnails');
if (!fs.existsSync(videoThumbnailsDir)) {
  fs.mkdirSync(videoThumbnailsDir, { recursive: true });
}

const videoThumbnails = [
  { filename: 'dungy-leadership.jpg', title: 'Leadership Lessons' },
  { filename: 'mataluni-tech-bridge.jpg', title: 'Technology as a Bridge' }
];

videoThumbnails.forEach(video => {
  const svgContent = `
<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="720" fill="#1F2937"/>
  <rect x="40" y="40" width="1200" height="640" fill="#374151" rx="20"/>
  <polygon points="590,360 690,310 690,410" fill="#FFFFFF" opacity="0.8"/>
  <text x="640" y="500" font-family="Arial, sans-serif" font-size="48" fill="#FFFFFF" text-anchor="middle">
    ${video.title}
  </text>
  <text x="640" y="560" font-family="Arial, sans-serif" font-size="24" fill="#FFFFFF" text-anchor="middle" opacity="0.6">
    Video Placeholder
  </text>
</svg>`;
  
  const svgPath = path.join(videoThumbnailsDir, video.filename.replace('.jpg', '.svg'));
  fs.writeFileSync(svgPath, svgContent.trim());
  console.log(`Created video thumbnail placeholder: ${video.filename.replace('.jpg', '.svg')}`);
});

console.log('\nAll placeholder images created successfully!');
console.log('\nNote: These are SVG files. When you add real images, use the exact filenames:');
profiles.forEach(p => console.log(`  - ${p.filename}`));
console.log('\nSignatures:');
signatures.forEach(s => console.log(`  - ${s}`));
console.log('\nVideo thumbnails:');
videoThumbnails.forEach(v => console.log(`  - ${v.filename}`)); 