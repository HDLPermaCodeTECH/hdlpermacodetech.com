/**
 * main.js
 * Chronicle & Partners - Frontend Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile & Sticky Navigation
    const nav = document.getElementById('mainNav');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. AI Chat Widget Overlay Mock
    const chatBtn = document.getElementById('aiChatBtn');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            const exists = document.getElementById('aiMockModal');
            if (exists) return exists.remove(); // Toggle off

            const modal = document.createElement('div');
            modal.id = 'aiMockModal';
            modal.style.cssText = `
                position: fixed; bottom: 6rem; right: 2rem; width: 350px; 
                background: #fff; border: 1px solid var(--clr-border); 
                box-shadow: 0 20px 40px rgba(0,0,0,0.15); border-radius: 8px;
                overflow: hidden; display: flex; flex-direction: column; z-index: 10000;
            `;

            modal.innerHTML = `
                <div style="background: var(--clr-primary); color:#fff; padding: 1rem; display:flex; justify-content:space-between; align-items:center;">
                    <div style="font-family:var(--font-sans); font-weight:600; font-size: 0.9rem;">
                        <i class="fas fa-robot" style="color:var(--clr-accent); margin-right:5px;"></i> Chronicle AI Assistant
                    </div>
                    <button onclick="document.getElementById('aiMockModal').remove()" style="background:none; border:none; color:#fff; cursor:pointer;"><i class="fas fa-times"></i></button>
                </div>
                <div style="padding: 1.5rem; height: 250px; overflow-y:auto; font-size:0.9rem; color:var(--clr-text-muted); background:var(--clr-surface-alt);">
                    <div style="background:#fff; padding: 1rem; border-radius: 8px; border:1px solid var(--clr-border); margin-bottom: 1rem;">
                        Welcome to Chronicle & Partners. I am an AI-driven legal intake module. How may I direct your inquiry?
                    </div>
                </div>
                <div style="padding: 1rem; border-top: 1px solid var(--clr-border);">
                    <div style="display:flex; gap:0.5rem;">
                        <input type="text" placeholder="Type message..." style="flex:1; padding:0.5rem; border:1px solid var(--clr-border); outline:none;">
                        <button style="background:var(--clr-primary); color:#fff; border:none; padding: 0 1rem; border-radius:4px; cursor:pointer;" onclick="alert('Sending to /api/chat backend endpoint.')"><i class="fas fa-paper-plane"></i></button>
                    </div>
                    <p style="font-size: 0.65rem; color: #a1a1aa; margin-top: 0.5rem; text-align:center;">
                        Not formal legal advice. Transcripts logged via Zero-Trust policy.
                    </p>
                </div>
            `;
            document.body.appendChild(modal);
        });
    }

});
