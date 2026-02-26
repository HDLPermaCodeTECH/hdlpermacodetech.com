const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'index.html');
let content = fs.readFileSync(file, 'utf8');

// The marker where the good code ends (inside Testimonial 2)
const safeStartStr = 'Founder, Lumina Studio</p>\n                    </div>\n                </div>';
const safeStartIndex = content.indexOf(safeStartStr);

if (safeStartIndex === -1) {
    console.error("Could not find safe start index.");
    process.exit(1);
}

// The marker where the Partnerships section effectively begins (inside its old paragraph)
const oldPartnershipsP = 'Official Platforms & Core Technologies</p>';
const safeEndIndexSearchStr = 'Official Platforms & Core Technologies</p>';
let safeEndIndex = content.indexOf(safeEndIndexSearchStr);

if (safeEndIndex === -1) {
    console.error("Could not find safe end index.");
    process.exit(1);
}

// Move to the position right after the target end index
safeEndIndex += oldPartnershipsP.length;

// This is the clean, fixed transition from Testimonials into the Partnerships section,
// with the NEW DESIGN injected for the header as the user requested.
const cleanBlock = `Founder, Lumina Studio</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Partnerships & Platforms Section -->
    <section class="partnerships reveal"
        style="padding: 5rem 2rem; background: var(--bg-surface); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); text-align: center; margin-top: 6rem; margin-bottom: 5rem; border-radius: 20px; max-width: 1400px; margin-left: auto; margin-right: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <div class="section-header reveal" style="margin-bottom: 3rem;">
            <p style="font-family: var(--font-heading); color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 3px; font-size: 0.75rem; font-weight: 700; margin-bottom: 1rem;">Powering Our Infrastructure</p>
            <h2 class="section-title" style="font-size: clamp(2rem, 5vw, 3rem); line-height: 1.2;">Official <span class="text-gradient">Platforms</span> & Core Tech</h2>
        </div>`;

const newContent = content.substring(0, safeStartIndex) + cleanBlock + content.substring(safeEndIndex);
fs.writeFileSync(file, newContent, 'utf8');
console.log('Successfully cleansed the DOM duplication and added a rich design to the Affiliations header.');
