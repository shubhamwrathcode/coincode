const fs = require('fs');
const file = './src/screens/private/HistoryPages/AssetHistory.tsx';
let code = fs.readFileSync(file, 'utf8');

let counter = 1;
const newStyles = [];

// Match simple style={{ ... }}
code = code.replace(/style=\{\{\s*([^}]+?)\s*\}\}/g, (match, inner) => {
    // some inner might have nested stuff, but simple ones are fine
    if (inner.includes('{') || inner.includes('?') || inner.includes('colors.black') || inner.includes('colors.white')) {
        // Wait, colors.xxx is fine since we imported colors
        if (inner.includes('{') || inner.includes('?')) return match; 
    }
    const styleName = `extractedStyle${counter++}`;
    newStyles.push(`    ${styleName}: {\n        ${inner.trim()}\n    },`);
    return `style={styles.${styleName}}`;
});

// Match style={[styles.something, { ... }]}
code = code.replace(/style=\{\[\s*(styles\.[a-zA-Z0-9_]+),\s*\{\s*([^}]+?)\s*\}\s*\]\}/g, (match, baseStyle, inner) => {
    if (inner.includes('{') || inner.includes('?')) return match; // skip complex
    const styleName = `extractedStyle${counter++}`;
    newStyles.push(`    ${styleName}: {\n        ${inner.trim()}\n    },`);
    return `style={[${baseStyle}, styles.${styleName}]}`;
});

code = code.replace('const styles = StyleSheet.create({', `const styles = StyleSheet.create({\n${newStyles.join('\n')}`);

fs.writeFileSync(file, code);
console.log('Done replacing inline styles', counter - 1);
