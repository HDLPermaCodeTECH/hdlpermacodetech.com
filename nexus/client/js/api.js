/**
 * Enterprise Nexus API Wrapper
 */

const API_BASE = '/api';

const NexusAPI = {
    // 1. Fetch Templates
    async getTemplates(category = '', search = '') {
        try {
            const params = new URLSearchParams();
            if (category) params.append('category', category);
            if (search) params.append('search', search);

            const res = await fetch(`${API_BASE}/templates?${params.toString()}`);
            if (!res.ok) throw new Error('API Error');
            return await res.json();
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    // 2. Auth Simulation
    login(email, password) {
        // Dummy mock. In reality -> POST /api/login
        return new Promise(resolve => {
            setTimeout(() => {
                localStorage.setItem('nexus_token', 'dummytkt123');
                localStorage.setItem('nexus_user', JSON.stringify({ name: 'Admin User', role: 'admin', email }));
                resolve({ success: true, token: 'dummytkt123' });
            }, 500);
        });
    },

    logout() {
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
        window.location.href = 'index.html';
    },

    getUser() {
        const u = localStorage.getItem('nexus_user');
        return u ? JSON.parse(u) : null;
    },

    // 3. Purchase / Checkout
    async createCheckoutSession(templateId) {
        try {
            const res = await fetch(`${API_BASE}/create-checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templateId })
            });
            const data = await res.json();
            return data.session_url;
        } catch (err) {
            console.error("Payment failed", err);
        }
    },

    // 4. Admin Stats
    async getAdminStats() {
        try {
            const user = this.getUser();
            const res = await fetch(`${API_BASE}/admin/stats`, {
                headers: { 'X-User-Role': user ? user.role : 'guest' }
            });
            return await res.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    }
};

// Global UI Init Actions
document.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        if (NexusAPI.getUser()) {
            authBtn.innerHTML = 'Dashboard';
            authBtn.href = "dashboard.html";
        } else {
            authBtn.innerHTML = 'Sign In';
            authBtn.href = "login.html";
        }
    }
});
