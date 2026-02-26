const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'demo-corporate.html');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
    "--corp-primary: #0f172a;": "--corp-primary: #f8fafc;",
    "--corp-secondary: #1e293b;": "--corp-secondary: #f1f5f9;",
    "--corp-text: #f8fafc;": "--corp-text: #0f172a;",
    "--corp-muted: #94a3b8;": "--corp-muted: #64748b;",
    "--glass-bg: rgba(30, 41, 59, 0.6);": "--glass-bg: rgba(255, 255, 255, 0.6);",
    "--glass-border: rgba(255, 255, 255, 0.08);": "--glass-border: rgba(0, 0, 0, 0.08);",
    "background: rgba(15, 23, 42, 0.85);": "background: rgba(255, 255, 255, 0.85);",
    "background: rgba(15, 23, 42, 0.95);": "background: rgba(255, 255, 255, 0.95);",
    "background: rgba(15, 23, 42, 0.7);": "background: rgba(255, 255, 255, 0.7);",
    "rgba(15, 23, 42, 0.95)": "rgba(255, 255, 255, 0.95)",
    "rgba(15, 23, 42, 0.6)": "rgba(255, 255, 255, 0.6)",
    "rgba(15, 23, 42, 0.9)": "rgba(255, 255, 255, 0.9)",
    "rgba(15, 23, 42, 0.5)": "rgba(255, 255, 255, 0.5)",
    "color: white;": "color: #0f172a;",
    "color: rgba(255, 255, 255, 0.8);": "color: rgba(15, 23, 42, 0.8);",
    "color: rgba(255, 255, 255, 0.3);": "color: rgba(15, 23, 42, 0.3);",
    "rgba(255, 255, 255, 0.5)": "rgba(0, 0, 0, 0.2)",
    "rgba(0, 0, 0, 0.5)": "rgba(0, 0, 0, 0.1)",
    "rgba(0, 0, 0, 0.6)": "rgba(0, 0, 0, 0.15)",
    "rgba(0, 0, 0, 0.8)": "rgba(0, 0, 0, 0.2)",
    "rgba(0, 0, 0, 0.4)": "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)": "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.05)": "rgba(0, 0, 0, 0.05)",
    "radial-gradient(circle at 50% 0%, #1e293b 0%, var(--corp-primary) 70%)": "radial-gradient(circle at 50% 0%, #f1f5f9 0%, var(--corp-primary) 70%)",
    "background: #0b1120;": "background: #f1f5f9;",
    "background: #020617;": "background: #e2e8f0;",
    "linear-gradient(180deg, #020617 0%, var(--corp-primary) 100%)": "linear-gradient(180deg, #e2e8f0 0%, var(--corp-primary) 100%)"
};

for (const [oldStr, newStr] of Object.entries(replacements)) {
    content = content.split(oldStr).join(newStr);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('done node');
