const fs = require('fs');
const path = require('path');

const baseDir = 'd:/antigravity/fool/src/content/story';

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('【正位置】')) return;
  
  // 【正位置】を削除
  const newContent = content.replace(/【正位置】/g, '');
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Removed orientation tags in: ${filePath}`);
}

// 走査
['loop-1', 'loop-2'].forEach(dirName => {
  const dirPath = path.join(baseDir, dirName);
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    if (file.endsWith('.md')) {
      processFile(path.join(dirPath, file));
    }
  });
});
