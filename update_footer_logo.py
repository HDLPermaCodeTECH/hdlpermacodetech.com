import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# We match the <a href="index.html" class="nav-logo"> inside <div class="footer-col footer-brand">
regex = re.compile(r'(<div class="footer-col footer-brand">\s*)<a href="index\.html"[^>]*>\s*<svg viewBox="0 0 950 140" class="nav-logo-svg".*?</svg>\s*</a>', re.DOTALL)

replacement = r'''\1<a href="index.html" class="footer-logo-container">
                    <img src="images/HDL_HexShield_Icon.png" alt="Shield Icon" class="footer-shield-icon">
                    <img src="images/HDLPermaCodeTECH_Logo.png" alt="HDL Perma Code TECH" class="footer-text-logo">
                </a>'''

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = regex.subn(replacement, content)
    if count > 0:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
