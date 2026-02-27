const fs = require('fs');
const path = require('path');

const cssToAppend = `

/* === Lead Magnet Modal === */
.lead-modal {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(2, 6, 23, 0.85);
    backdrop-filter: blur(10px);
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lead-modal.show {
    display: flex;
    opacity: 1;
}

.lead-modal-content {
    background: var(--bg-elevated);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 2.5rem;
    max-width: 500px;
    width: 90%;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transform: translateY(20px);
    transition: transform 0.3s ease;
    text-align: center;
}

.lead-modal.show .lead-modal-content {
    transform: translateY(0);
}

.close-lead-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s ease;
}

.close-lead-modal:hover {
    color: var(--accent-cyan);
}

.lead-modal h3 {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--text-main);
}

.lead-desc {
    color: var(--text-muted);
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
}

.lead-magnet-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.lead-magnet-form input {
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-main);
    font-family: var(--font-sans);
    outline: none;
    transition: border-color 0.3s;
}

.lead-magnet-form input:focus {
    border-color: var(--accent-cyan);
}
`;

try {
    fs.appendFileSync(path.join(__dirname, 'styles.css'), cssToAppend, 'utf8');
    console.log('Successfully appended modal styles to styles.css in UTF-8.');
} catch (e) {
    console.error('Failed to append styles: ', e);
}
