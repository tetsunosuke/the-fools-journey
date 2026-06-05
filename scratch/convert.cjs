const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const baseDir = 'd:/antigravity/fool/src/content/story';

function convertFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // フロントマターの分割
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    console.log(`Skip (no frontmatter): ${filePath}`);
    return;
  }
  
  const yamlStr = match[1];
  const body = match[2].trim();
  
  let data;
  try {
    data = yaml.load(yamlStr);
  } catch (e) {
    console.error(`YAML parse error in ${filePath}:`, e);
    return;
  }
  
  let newContent = '';
  
  // 1. メタタグを本文先頭に埋め込む
  if (data.view) {
    newContent += `[view: ${data.view}]\n`;
  }
  if (data.arcana) {
    newContent += `[arcana: ${data.arcana}]\n`;
  }
  if (data.speaker && data.speaker !== 'ナレーション') {
    newContent += `[speaker: ${data.speaker}]\n`;
  }
  if (data.choiceIllusion) {
    newContent += `[choiceIllusion: true]\n`;
  }
  if (data.focusImage) {
    newContent += `[focusImage: ${data.focusImage}]\n`;
  }
  if (data.focusTitle) {
    newContent += `[focusTitle: ${data.focusTitle}]\n`;
  }
  
  // メタタグの後に1行空ける
  if (newContent.length > 0) {
    newContent += '\n';
  }
  
  // 2. 本文を追加
  newContent += body;
  
  // 3. 選択肢（choices）があれば追加
  if (data.choices && data.choices.length > 0) {
    newContent += '\n\n# --- 以下、選択肢分岐 ---\n';
    
    data.choices.forEach(choice => {
      newContent += `\n- 選択肢: ${choice.title}\n`;
      
      // オプションフラグの抽出
      const options = [];
      if (choice.id !== undefined) {
        options.push(`id=${choice.id}`);
      }
      if (choice.upright) options.push('upright');
      if (choice.correct) options.push('correct');
      // 明示的に correct: false がある場合
      if (choice.correct === false || choice.correct === 'false') options.push('incorrect');
      if (choice.skipFocus) options.push('skipFocus');
      
      if (options.length > 0) {
        newContent += `  [option: ${options.join(', ')}]\n`;
      }
      
      // desc をインデントを保持して追加（またはトリムして適切なインデントで追加）
      if (choice.desc) {
        const descLines = choice.desc.trim().split('\n');
        const indentedDesc = descLines.map(line => `  ${line}`).join('\n');
        newContent += `\n${indentedDesc}\n`;
      }
    });
  }
  
  fs.writeFileSync(filePath, newContent.trim() + '\n', 'utf8');
  console.log(`Converted: ${filePath}`);
}

// 走査
['loop-1', 'loop-2'].forEach(dirName => {
  const dirPath = path.join(baseDir, dirName);
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    if (file.endsWith('.md')) {
      convertFile(path.join(dirPath, file));
    }
  });
});
