const fs = require('fs');
const path = require('path');
const https = require('https');

const imageMap = {
    "1515886657613-9f3515b0c78f": "hero1.jpg",
    "1483985988355-763728e1935b": "hero2.jpg",
    "1539008835657-9e8e9680c956": "prod1.jpg",
    "1591047139829-d91aecb6caea": "prod2.jpg",
    "1434389678369-184bfbf40152": "prod3.jpg",
    "1550614000-4b95d466f217": "prod4.jpg",
    "1489987707023-afc8271076f5": "cat_men.jpg",
    "1550639524-a6f58345a278": "cat_women.jpg",
    "1542291026-7eec264c27ff": "cat_sneakers.jpg",
    "1496747611176-843222e1e57c": "women_d1.jpg",
    "1515347619252-8d77a9437b0a": "women_d2.jpg",
    "1532453288672-3a27e9be9efd": "women_d3.jpg",
    "1583496661160-c588c4af5a65": "women_d4.jpg",
    "1543163521-1bf539c55dd2": "men_h1.jpg",
    "1516826957135-700ede19c6ce": "men_h2.jpg",
    "1551028719-00167b16eac5": "men_d1.jpg",
    "1596755094514-f87e32f85e23": "men_d2.jpg",
    "1542272604-787c3835535d": "men_d3.jpg",
    "1556821840-3a63f95609a7": "men_d4.jpg",
    "1523206489230-c012c64b2b48": "acc_h1.jpg",
    "1584916201218-f4242ceb4809": "acc_h2.jpg",
    "1524592094714-0f0654e20314": "acc_d1.jpg",
    "1511499767150-a48a237f0083": "acc_d2.jpg",
    "1590874103328-eac38a683ce7": "acc_d3.jpg",
    "1627123424574-724758594e93": "acc_d4.jpg"
};

const storeDir = path.join(__dirname, 'images', 'store');
if (!fs.existsSync(storeDir)) {
    fs.mkdirSync(storeDir, { recursive: true });
}

function fetchWithRedirect(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                fetchWithRedirect(res.headers.location).then(resolve).catch(reject);
            } else if (res.statusCode === 200) {
                resolve(res);
            } else {
                reject(new Error(`Status ${res.statusCode} for ${url}`));
            }
        }).on('error', reject);
    });
}

function downloadImage(id, filename) {
    return new Promise((resolve, reject) => {
        const destPath = path.join(storeDir, filename);
        if (fs.existsSync(destPath)) {
            console.log(`Skipping ${filename}, already exists.`);
            return resolve();
        }
        const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

        fetchWithRedirect(url)
            .then(res => {
                const file = fs.createWriteStream(destPath);
                res.pipe(file);
                file.on('finish', () => file.close(resolve));
            })
            .catch(err => {
                console.error(`Failed to download ${id}:`, err);
                // Fallback: Use placeholders if Unsplash fails completely
                const fallbackUrl = `https://picsum.photos/seed/${id}/800/800`;
                console.log(`Using fallback image for ${filename}`);
                fetchWithRedirect(fallbackUrl).then(res => {
                    const file = fs.createWriteStream(destPath);
                    res.pipe(file);
                    file.on('finish', () => file.close(resolve));
                }).catch(reject);
            });
    });
}

async function fixFiles() {
    const files = [
        'demo-storefront.html',
        'demo-storefront-arrivals.html',
        'demo-storefront-men.html',
        'demo-storefront-women.html',
        'demo-storefront-accessories.html'
    ];

    console.log("Downloading images...");
    const promises = Object.entries(imageMap).map(([id, filename]) => downloadImage(id, filename));
    await Promise.allSettled(promises);
    console.log("Done downloading images.");

    console.log("Replacing URLs in files...");
    for (const file of files) {
        const filepath = path.join(__dirname, file);
        if (!fs.existsSync(filepath)) continue;
        let content = fs.readFileSync(filepath, 'utf8');

        // Regex to match unsplash URLs and replace with local paths
        for (const [id, filename] of Object.entries(imageMap)) {
            const regex = new RegExp(`https://images\\.unsplash\\.com/photo-${id}[^"']*`, 'g');
            content = content.replace(regex, `images/store/${filename}`);
        }

        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Fixed ${file}`);
    }
}

fixFiles().catch(console.error);
