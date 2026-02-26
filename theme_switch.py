import os

file_path = "c:\\Users\\hdlfr\\OneDrive\\Desktop\\HDLPermaCodeTECH Official Website\\demo-corporate.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "--corp-primary: #0f172a;": "--corp-primary: #f8fafc;",
    "--corp-secondary: #1e293b;": "--corp-secondary: #f1f5f9;",
    "--corp-text: #f8fafc;": "--corp-text: #0f172a;",
    "--corp-muted: #94a3b8;": "--corp-muted: #64748b;",
    "--glass-bg: rgba(30, 41, 59, 0.6);": "--glass-bg: rgba(255, 255, 255, 0.6);",
    "--glass-border: rgba(255, 255, 255, 0.08);": "--glass-border: rgba(0, 0, 0, 0.08);",
    "background: rgba(15, 23, 42, 0.85);": "background: rgba(255, 255, 255, 0.85);",
    "background: rgba(15, 23, 42, 0.95);": "background: rgba(255, 255, 255, 0.95);",
    "background: rgba(15, 23, 42, 0.7);": "background: rgba(255, 255, 255, 0.7);",
    "background: rgba(15, 23, 42, 0.85);": "background: rgba(255, 255, 255, 0.85);",
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
}

# we don't want to replace "color: white !important;" when we do "color: white;" so we should be careful.
# we notice that "color: white !important;" is in .corp-btn which has blue background so it is safe to keep it.
# Actually, the string replacement is exact match.
# wait, "color: white;" will match exactly "color: white;". Let's run it.

for old, new in replacements.items():
    content = content.replace(old, new)

# But we also have inline color: white like `color: white;` in `<h1 ...` ? No, we didn't see inline white colors.
# Wait, in the node labels we have `color: white;`, and my script handles `color: white;` exactly.

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("done")
