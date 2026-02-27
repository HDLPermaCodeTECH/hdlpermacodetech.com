document.addEventListener('DOMContentLoaded', () => {

    // --- Premium Preloader Logic ---
    const preloader = document.getElementById('hdl-preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            // Keep the shield pulsing for an extra 800ms to ensure the user sees the branding
            setTimeout(() => {
                preloader.classList.add('fade-out');
                // Remove from DOM after animation completes to free up resources
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 800);
        });
    }
    const line1Text = "We Build Modern,";
    const line2Texts = [
        "High-Converting Websites",
        "Premium Templates",
        "Custom Digital Solutions",
        "E-Commerce Stores",
        "Scalable Applications"
    ];
    const line1El = document.getElementById('typewriter-line1');
    const line2El = document.getElementById('typewriter-line2');

    if (line1El && line2El) {
        let charIndex1 = 0;
        let charIndex2 = 0;
        let phraseIndex = 0;
        let isDeleting = false;

        const typeLine2 = () => {
            const currentLine2 = line2Texts[phraseIndex];

            if (isDeleting) {
                line2El.innerHTML = currentLine2.substring(0, charIndex2 - 1) + '<span class="cursor"></span>';
                charIndex2--;
            } else {
                line2El.innerHTML = currentLine2.substring(0, charIndex2 + 1) + '<span class="cursor"></span>';
                charIndex2++;
            }

            let typeSpeed = isDeleting ? 30 : 60;

            if (!isDeleting && charIndex2 === currentLine2.length) {
                typeSpeed = 2000; // Pause before deleting
                isDeleting = true;
            } else if (isDeleting && charIndex2 === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % line2Texts.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(typeLine2, typeSpeed);
        };

        const typeLine1 = () => {
            if (charIndex1 < line1Text.length) {
                line1El.innerHTML = line1Text.substring(0, charIndex1 + 1) + '<span class="cursor"></span>';
                charIndex1++;
                setTimeout(typeLine1, 60);
            } else {
                // Remove cursor from line 1 and start line 2 looping
                line1El.innerHTML = line1Text;
                setTimeout(typeLine2, 300);
            }
        };

        // Start typing after a short delay
        setTimeout(typeLine1, 800);
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    const mainForm = document.getElementById('mainForm');
    if (mainForm) {
        mainForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = mainForm.querySelector('button[type="submit"]');
            const btnText = document.getElementById('submitBtnText');
            const originalText = btnText.innerText;
            const notification = document.getElementById('formNotification');

            // Set Loading State
            btnText.innerText = 'Processing...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';
            notification.style.display = 'none';

            // Gather Data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                inquiryType: document.getElementById('inquiryType').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value
            };

            try {
                // The site is now served via Node.js (or proxy), so we just use the relative API path
                const backendUrl = '/send-project-brief';

                const response = await fetch(backendUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const responseText = await response.text();
                let result;
                try {
                    result = JSON.parse(responseText);
                } catch (e) {
                    console.error("Raw Server Response:", responseText);
                    throw new Error("Server returned an invalid response (Check console for exact error or HTML page).");
                }

                if (result.success) {
                    // Success State
                    btnText.innerText = 'Sent Successfully!';
                    btn.style.background = '#10b981'; // Green

                    notification.innerText = 'Thank you! Your project brief has been sent. Check your email for confirmation.';
                    notification.style.color = '#10b981';
                    notification.style.border = '1px solid #10b981';
                    notification.style.background = 'rgba(16, 185, 129, 0.1)';
                    notification.style.display = 'block';

                    mainForm.reset();

                    // Reset dropdown visual states
                    const selectTriggers = document.querySelectorAll('.custom-select-trigger');
                    selectTriggers[0].innerText = 'Inquiry Type';
                    selectTriggers[1].innerText = 'Estimated Budget';
                    document.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
                } else {
                    throw new Error(result.message || 'Something went wrong.');
                }
            } catch (error) {
                // Error State
                btnText.innerText = 'Failed to Send';
                btn.style.background = '#ef4444'; // Red

                notification.innerText = error.message || 'Error connecting to server. Please try again.';
                notification.style.color = '#ef4444';
                notification.style.border = '1px solid #ef4444';
                notification.style.background = 'rgba(239, 68, 68, 0.1)';
                notification.style.display = 'block';
            } finally {
                // Restore button after delay
                setTimeout(() => {
                    btnText.innerText = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 4000);
            }
        });
    }



    // --- 3D Tilt Cards ---
    const tiltCards = document.querySelectorAll('.card, .demo-card, .template-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const getBoundingClientRect = card.getBoundingClientRect();
            const x = e.clientX - getBoundingClientRect.left;
            const y = e.clientY - getBoundingClientRect.top;
            const centerX = getBoundingClientRect.width / 2;
            const centerY = getBoundingClientRect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        const initCanvas = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];

            const count = Math.floor((width * height) / 15000);

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 1.5 + 0.5
                });
            }
        };

        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        const drawParticles = () => {
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
            ctx.beginPath();

            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Mouse interactivity
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - p.x;
                    let dy = mouse.y - p.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * 5;
                        const directionY = forceDirectionY * force * 5;
                        p.x -= directionX;
                        p.y -= directionY;
                    }
                }

                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 - dist / 1000})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            ctx.fill();
            requestAnimationFrame(drawParticles);
        };

        initCanvas();
        drawParticles();

        window.addEventListener('resize', () => {
            clearTimeout(window.resizeTimeout);
            window.resizeTimeout = setTimeout(initCanvas, 200);
        });
    }

    /* --- Custom Cursor Hardware PNG Generator --- */
    const svgs = {
        main: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M21 11L2 2l9 19 2-8 8-2z" fill="white" stroke="#38bdf8" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
        hover: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="none" stroke="#38bdf8" stroke-width="2" /><path d="M16 4v24M4 16h24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" /></svg>`
    };

    function createCursor(svgString, hotX, hotY, cssProperty, fallback) {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const pngData = canvas.toDataURL('image/png');
            document.documentElement.style.setProperty(cssProperty, `url(${pngData}) ${hotX} ${hotY}, ${fallback}`);
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgString);
    }

    createCursor(svgs.main, 2, 2, '--cursor-main', 'auto');
    createCursor(svgs.hover, 16, 16, '--cursor-hover', 'pointer');

    /* --- Interactive Stat Counter Logic --- */
    const statValues = document.querySelectorAll('.stat-card .stat-value');

    // Function to animate numbers
    const animateStat = (el) => {
        const originalText = el.innerText;

        // Extract the numerical part and the suffix logic (e.g. 300%, 0.4s, 10M+)
        const match = originalText.match(/^([0-9.]+)(.*)$/);
        if (!match) return; // If it doesn't match a number pattern, skip

        const targetNumber = parseFloat(match[1]);
        const suffix = match[2];
        const hasDecimals = originalText.includes('.');

        let startTimestamp = null;
        const duration = 2000; // 2 seconds animation

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Ease out cubic function for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            let currentNumber = easeProgress * targetNumber;

            if (hasDecimals) {
                el.innerText = currentNumber.toFixed(1) + suffix;
            } else {
                el.innerText = Math.floor(currentNumber) + suffix;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure the final exactly matches original
                el.innerText = originalText;
            }
        };

        window.requestAnimationFrame(step);
    };

    // Observer to trigger animation when stats scroll into view
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => {
        // Init to empty or 0 before animation starts 
        // to prevent popping if JS loads fast
        statObserver.observe(stat);
    });

    /* --- 3D Interactive Tilt For Demo Cards --- */
    const demoCards = document.querySelectorAll('.demo-card-wrapper');

    demoCards.forEach(wrapper => {
        const card = wrapper.querySelector('.demo-card');

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            // Calculate mouse position relative to center of the card
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Generate rotation degrees (max tilt 10 degrees)
            const rotateX = (y / (rect.height / 2)) * -10;
            const rotateY = (x / (rect.width / 2)) * 10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.transition = 'transform 0.1s ease'; // Fast transition during movement
        });

        wrapper.addEventListener('mouseleave', () => {
            // Reset position smoothly
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
            card.style.transition = 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Springy reset
        });
    });

    /* --- Skill Bar Animation --- */
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                fill.style.width = width;
                skillsObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-fill').forEach(fill => {
        skillsObserver.observe(fill);
    });



    // --- Custom Dropdown Logic ---
    const customSelectWrappers = document.querySelectorAll('.custom-select-wrapper');

    customSelectWrappers.forEach(wrapper => {
        const select = wrapper.querySelector('.custom-select');
        const options = wrapper.querySelector('.custom-options');
        const hiddenInput = wrapper.querySelector('input[type="hidden"]');
        const trigger = select.querySelector('.custom-select-trigger');

        // Toggle dropdown open/close
        select.addEventListener('click', function (e) {
            e.stopPropagation();

            // Close all other dropdowns
            document.querySelectorAll('.custom-select').forEach(otherSelect => {
                if (otherSelect !== select) {
                    otherSelect.classList.remove('open');
                }
            });

            this.classList.toggle('open');
        });

        // Handle option selection
        options.querySelectorAll('.custom-option').forEach(option => {
            option.addEventListener('click', function (e) {
                e.stopPropagation();

                trigger.textContent = this.textContent;
                hiddenInput.value = this.dataset.value;

                select.classList.remove('open');
                select.classList.add('selected');

                options.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                // Trigger change event for any other listeners
                hiddenInput.dispatchEvent(new Event('change'));
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select').forEach(select => {
            select.classList.remove('open');
        });
    });

    // --- Lead Magnet Modal Logic ---
    const leadModal = document.getElementById('leadModal');
    const closeLeadModal = document.getElementById('closeLeadModal');

    if (leadModal && closeLeadModal) {
        // Show after 5 seconds if not already shown in this session
        if (!sessionStorage.getItem('leadModalShown')) {
            setTimeout(() => {
                leadModal.style.display = 'flex';
                // Trigger reflow for transition
                leadModal.offsetHeight;
                leadModal.style.opacity = '1';
                leadModal.querySelector('.lead-modal-content').style.transform = 'translateY(0)';
                sessionStorage.setItem('leadModalShown', 'true');
            }, 5000);
        }

        const closeModal = () => {
            leadModal.style.opacity = '0';
            leadModal.querySelector('.lead-modal-content').style.transform = 'translateY(20px)';
            setTimeout(() => {
                leadModal.style.display = 'none';
            }, 400); // Matches CSS transition duration
        };

        closeLeadModal.addEventListener('click', closeModal);

        // Close on outside click
        leadModal.addEventListener('click', (e) => {
            if (e.target === leadModal) {
                closeModal();
            }
        });

        // Handle form submission
        const leadForm = document.getElementById('leadMagnetForm');
        if (leadForm) {
            leadForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('leadSubmitBtn');
                const originalText = btn.innerText;
                const emailInput = document.getElementById('leadEmail').value;
                const notification = document.getElementById('leadFormNotification');

                btn.innerText = 'Sending...';
                btn.style.opacity = '0.7';
                btn.style.pointerEvents = 'none';
                notification.style.display = 'none';

                try {
                    const response = await fetch('/lead.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: emailInput })
                    });

                    const responseText = await response.text();
                    let result;
                    try {
                        result = JSON.parse(responseText);
                    } catch (err) {
                        throw new Error("Server returned an invalid response.");
                    }

                    if (result.success) {
                        btn.innerText = 'Check Your Inbox!';
                        btn.style.background = '#10b981'; // Success Green

                        notification.innerText = 'Success! Your checklist is on the way.';
                        notification.style.color = '#10b981';
                        notification.style.border = '1px solid #10b981';
                        notification.style.background = 'rgba(16, 185, 129, 0.1)';
                        notification.style.display = 'block';

                        leadForm.reset();
                        setTimeout(closeModal, 3000);
                    } else {
                        throw new Error(result.message || 'Something went wrong.');
                    }
                } catch (error) {
                    btn.innerText = 'Failed';
                    btn.style.background = '#ef4444'; // Red

                    notification.innerText = error.message || 'Error connecting to server. Please try again.';
                    notification.style.color = '#ef4444';
                    notification.style.border = '1px solid #ef4444';
                    notification.style.background = 'rgba(239, 68, 68, 0.1)';
                    notification.style.display = 'block';
                } finally {
                    setTimeout(() => {
                        if (btn.innerText === 'Failed') {
                            btn.innerText = originalText;
                            btn.style.background = '';
                            btn.style.opacity = '1';
                            btn.style.pointerEvents = 'auto';
                        }
                    }, 4000);
                }
            });
        }
    }

    // --- Timeline Animation Logic ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -100px 0px" });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

});
