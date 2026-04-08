/**
 * HDL Perma Code TECH - Anti-Clone & Security Guardian
 * This script prevents casual cloning, scraping, and inspection.
 */

(function () {
    // 1. Disable Right Click Context Menu
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showWarning();
    });

    // 2. Disable Key Commands for Inspection
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (Inspect)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
    });

    // 3. Disable Dragging for images (prevent easy image save)
    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // 4. Large Console Warning (Fingerprint)
    const logStyle1 = "font-size: 40px; font-weight: bold; color: #ff0000; text-shadow: 2px 2px 0 #000;";
    const logStyle2 = "font-size: 16px; color: #38bdf8;";
    console.log("%cSTOP!", logStyle1);
    console.log("%cThis browser feature is intended for developers. Any attempt to clone, scrape, or steal code/assets from HDL Perma Code TECH is strictly monitored and heavily protected.", logStyle2);

    function showWarning() {
        // Create a subtle visual warning if they try to right click
        const warning = document.createElement('div');
        warning.style.position = 'fixed';
        warning.style.bottom = '20px';
        warning.style.right = '20px';
        warning.style.backgroundColor = 'rgba(239, 68, 68, 0.9)';
        warning.style.color = 'white';
        warning.style.padding = '10px 20px';
        warning.style.borderRadius = '8px';
        warning.style.fontFamily = 'sans-serif';
        warning.style.fontSize = '14px';
        warning.style.fontWeight = 'bold';
        warning.style.zIndex = '999999';
        warning.style.pointerEvents = 'none';
        warning.style.opacity = '1';
        warning.style.transition = 'opacity 0.5s ease';
        warning.innerHTML = 'Content Protection Enabled';

        document.body.appendChild(warning);

        setTimeout(() => {
            warning.style.opacity = '0';
            setTimeout(() => warning.remove(), 500);
        }, 2000);
    }
})();
