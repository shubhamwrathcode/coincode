const fs = require('fs');
const file = './src/screens/private/HistoryPages/AssetHistory.tsx';
let code = fs.readFileSync(file, 'utf8');

// Find all extractedStyles that contain "order."
const stylesRegex = /(extractedStyle\d+):\s*\{\s*([^}]+order\.[^}]+)\s*\}/g;
let match;
const toFix = [];

while ((match = stylesRegex.exec(code)) !== null) {
    toFix.push({ name: match[1], content: match[2].trim() });
}

console.log('To fix:', toFix);

for (const fix of toFix) {
    // Replace style={styles.extractedStyleX} with style={{ content }}
    const singleStyleRegex = new RegExp(`style=\\{styles\\.${fix.name}\\}`, 'g');
    code = code.replace(singleStyleRegex, `style={{ ${fix.content} }}`);

    // Replace style={[..., styles.extractedStyleX]} with style={[..., { content }]}
    const arrayStyleRegex = new RegExp(`style=\\{\\[([^\\]]+),\\s*styles\\.${fix.name}\\]\\}`, 'g');
    code = code.replace(arrayStyleRegex, `style={[$1, { ${fix.content} }]}`);
    
    // Remove from StyleSheet.create
    const rmRegex = new RegExp(`\\s*${fix.name}:\\s*\\{[^}]+\\},?`, 'g');
    code = code.replace(rmRegex, '');
}

fs.writeFileSync(file, code);
console.log('Fixed', toFix.length, 'styles');
