import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirs = [
    path.join(__dirname, '../src/content/story/loop-1'),
    path.join(__dirname, '../src/content/story/loop-2')
];

targetDirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (!file.endsWith('.md')) return;
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        const lines = content.split(/\r?\n/);
        let modified = false;
        const newLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];
            newLines.push(currentLine);
            
            if (i < lines.length - 1) {
                const nextLine = lines[i + 1];
                
                const isCurrentRef = currentLine.trim().startsWith('――夜、') || currentLine.trim().startsWith('――夜');
                const isCurrentDialogue = currentLine.startsWith('  ') && currentLine.trim().length > 0 && !currentLine.trim().startsWith('-') && !currentLine.trim().startsWith('[') && !currentLine.trim().startsWith('#');
                const isNextDialogue = nextLine.startsWith('  ') && nextLine.trim().length > 0 && !nextLine.trim().startsWith('-') && !nextLine.trim().startsWith('[') && !nextLine.trim().startsWith('#');
                
                if ((isCurrentRef || isCurrentDialogue) && isNextDialogue) {
                    const indent = nextLine.match(/^\s*/)[0];
                    newLines.push(indent);
                    modified = true;
                }
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
            console.log(`Updated: ${file}`);
        }
    });
});
