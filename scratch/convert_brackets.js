import fs from 'fs';
import path from 'path';

const storyDir = 'd:/antigravity/fool/src/content/story';

function getFilesRecursively(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFilesRecursively(filePath));
        } else if (filePath.endsWith('.md')) {
            results.push(filePath);
        }
    });
    return results;
}

function convertBrackets() {
    const files = getFilesRecursively(storyDir);
    let totalFilesProcessed = 0;
    let totalLinesConverted = 0;

    files.forEach(filePath => {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split(/\r?\n/);
        let modified = false;

        const newLines = lines.map((line, idx) => {
            // 行頭のスペース（あれば）+「 で始まり、」で終わる
            const match = line.match(/^(\s*)「(.*)」$/);
            if (match) {
                const indent = match[1];
                let lineContent = match[2];
                
                // 『 と 』 を 一重の 「 と 」 に置換
                lineContent = lineContent.replace(/『/g, '「').replace(/』/g, '」');
                
                totalLinesConverted++;
                modified = true;
                return indent + lineContent;
            }
            return line;
        });

        if (modified) {
            fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
            totalFilesProcessed++;
        }
    });

    console.log(`処理完了: ${totalFilesProcessed} 個のファイルを変更し、${totalLinesConverted} 行のセリフを書き換えました。`);
}

convertBrackets();
