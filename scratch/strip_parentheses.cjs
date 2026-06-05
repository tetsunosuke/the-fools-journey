const fs = require('fs');
const path = require('path');

const baseDir = 'd:/antigravity/fool/src/content/story';

function cleanLine(line, isDialogueLine) {
  let cleaned = line.trim();
  if (!cleaned) return line;
  
  // 地の文（非セリフ行）の場合
  if (!isDialogueLine) {
    // 外側の（）を外す
    if (cleaned.startsWith('（') && cleaned.endsWith('）')) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    // 外側の「」を外す
    if (cleaned.startsWith('「') && cleaned.endsWith('」')) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    // ネスト用（例：（「...」））
    if (cleaned.startsWith('（') && cleaned.endsWith('）')) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    if (cleaned.startsWith('「') && cleaned.endsWith('」')) {
      cleaned = cleaned.slice(1, -1).trim();
    }
  } else {
    // セリフ行だが、全体が（）で囲まれている心の声なら外す
    if (cleaned.startsWith('（') && cleaned.endsWith('）')) {
      cleaned = cleaned.slice(1, -1).trim();
    }
  }
  
  // 元の行のインデントを維持
  const match = line.match(/^(\s*)/);
  const indent = match ? match[1] : '';
  return indent + cleaned;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  
  let currentSpeaker = 'ナレーション';
  const newLines = lines.map(line => {
    const trimmed = line.trim();
    
    // スピーカータグの検出
    const speakerMatch = trimmed.match(/^\[speaker:\s*(.*?)\s*\]$/);
    if (speakerMatch) {
      currentSpeaker = speakerMatch[1];
      return line;
    }
    
    // 特殊行やタグ、ヘッダーはそのまま
    if (!trimmed || (trimmed.startsWith('[') && trimmed.endsWith(']')) || trimmed.startsWith('#') || trimmed.startsWith('- 選択肢:')) {
      if (trimmed.startsWith('- 選択肢:')) {
        currentSpeaker = 'ナレーション';
      }
      return line;
    }
    
    const isDialogueLine = (currentSpeaker !== 'ナレーション' && currentSpeaker !== 'SYSTEM');
    return cleanLine(line, isDialogueLine);
  });
  
  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`Cleaned: ${filePath}`);
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
