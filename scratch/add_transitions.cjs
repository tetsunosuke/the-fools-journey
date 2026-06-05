const fs = require('fs');
const path = require('path');

const baseDir = 'd:/antigravity/fool/src/content/story';

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  
  // 最初の非タグ・非空行を探す
  let targetIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith('[')) continue;
    
    targetIndex = i;
    break;
  }
  
  if (targetIndex === -1) return;
  
  const textLine = lines[targetIndex].trim();
  // 「（X日目」や「X日目」で始まっているか判定
  const dayMatch = textLine.match(/^[（――\s]*(\d+)日目/);
  if (dayMatch) {
    const dayNum = dayMatch[1];
    
    // すでに [transition:] があればスキップ
    if (content.includes('[transition:')) {
      console.log(`Already has transition: ${filePath}`);
      return;
    }
    
    // 先頭に [transition: X] を挿入
    // 最初の空行やタグ行の間に挿入するのが美しい
    // ここでは単純に配列の先頭（lines[0]の直前など）に挿入する
    // view や arcana のタグが並んでいるので、その並び（最初の[の並びの最後）に追加する
    let insertIndex = 0;
    while (insertIndex < lines.length) {
      const line = lines[insertIndex].trim();
      if (line.startsWith('[')) {
        insertIndex++;
      } else {
        break;
      }
    }
    
    // 挿入
    lines.splice(insertIndex, 0, `[transition: ${dayNum}]`);
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Added [transition: ${dayNum}] to ${filePath}`);
  }
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
