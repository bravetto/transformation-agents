const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create fallback directory if it doesn't exist
const fallbackDir = path.join(__dirname, '../public/images/fallbacks');
if (!fs.existsSync(fallbackDir)) {
  fs.mkdirSync(fallbackDir, { recursive: true });
  console.log('Created fallback directory');
}

// Define roles and their colors
const roles = [
  { name: 'lightworker', bgColor: '#8B5CF6', textColor: '#FFFFFF' },
  { name: 'messenger', bgColor: '#2563EB', textColor: '#FFFFFF' },
  { name: 'witness', bgColor: '#10B981', textColor: '#FFFFFF' },
  { name: 'guardian', bgColor: '#F59E0B', textColor: '#FFFFFF' },
  { name: 'default', bgColor: '#3B82F6', textColor: '#FFFFFF' },
];

// Create a fallback image for each role
roles.forEach(role => {
  // Create a canvas (1000x1000)
  const width = 1000;
  const height = 1000;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = role.bgColor;
  ctx.fillRect(0, 0, width, height);

  // Add a pattern or texture
  ctx.fillStyle = role.textColor;
  ctx.globalAlpha = 0.05;
  
  // Create a sacred geometry pattern
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.4;
  
  // Draw circles for Flower of Life pattern
  for (let i = 0; i < 7; i++) {
    const angle = (Math.PI * 2 / 6) * i;
    const x = centerX + Math.cos(angle) * radius * 0.5;
    const y = centerY + Math.sin(angle) * radius * 0.5;
    
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw center circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Reset alpha
  ctx.globalAlpha = 1;
  
  // Add role text
  ctx.fillStyle = role.textColor;
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(role.name.toUpperCase(), centerX, centerY);
  
  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(fallbackDir, `${role.name}-fallback.jpg`), buffer);
  console.log(`Created fallback image for ${role.name}`);
});

console.log('All fallback images created successfully!'); 