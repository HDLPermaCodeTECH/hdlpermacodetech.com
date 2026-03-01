/**
 * properties.js
 * Advanced Real-Time Property Search Engine
 */

// 1. Mock Database
const propertiesDB = [
    {
        id: "p1",
        title: "The Nova Residence",
        location: "Beverly Hills, CA",
        price: 4250000,
        status: "For Sale",
        type: "House",
        beds: 4,
        baths: 5,
        sqft: 5200,
        image: "https://images.unsplash.com/photo-1613490908578-812e96030991?w=800&q=80",
        dateAdded: "2026-02-15"
    },
    {
        id: "p2",
        title: "Glass House Retreat",
        location: "Aspen, CO",
        price: 8900000,
        status: "For Sale",
        type: "House",
        beds: 6,
        baths: 7,
        sqft: 8100,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        dateAdded: "2026-01-20"
    },
    {
        id: "p3",
        title: "Minimalist Penthouse",
        location: "Manhattan, NY",
        price: 25000,
        status: "For Rent",
        type: "Apartment",
        beds: 3,
        baths: 3,
        sqft: 3400,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        dateAdded: "2026-02-28"
    },
    {
        id: "p4",
        title: "Azure Marina Condo",
        location: "Miami, FL",
        price: 1850000,
        status: "For Sale",
        type: "Condo",
        beds: 2,
        baths: 2,
        sqft: 1800,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        dateAdded: "2025-11-05"
    },
    {
        id: "p5",
        title: "Tech Hub Office Space",
        location: "Austin, TX",
        price: 55000,
        status: "For Rent",
        type: "Commercial",
        beds: 0,
        baths: 4,
        sqft: 12000,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        dateAdded: "2026-03-01"
    },
    {
        id: "p6",
        title: "Lakeside Modern",
        location: "Seattle, WA",
        price: 3100000,
        status: "For Sale",
        type: "House",
        beds: 4,
        baths: 4,
        sqft: 4100,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
        dateAdded: "2026-01-10"
    }
];

// Formatter for Prices
const formatPrice = (price, status) => {
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
    return status === "For Rent" ? `${formatted} / mo` : formatted;
};

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById('propertiesGrid');
    const countDisplay = document.getElementById('resultsCount');

    // DOM Elements for Filtering
    const filterKeyword = document.getElementById('filterKeyword');
    const filterStatus = document.getElementById('filterStatus');
    const filterType = document.getElementById('filterType');
    const filterMinPrice = document.getElementById('filterMinPrice');
    const filterMaxPrice = document.getElementById('filterMaxPrice');
    const filterBeds = document.getElementById('filterBeds');
    const filterBaths = document.getElementById('filterBaths');
    const sortOption = document.getElementById('sortOption');
    const resetBtn = document.getElementById('resetBtn');

    // Pre-populate URL Params if arrived from homepage Quick Search
    const params = new URLSearchParams(window.location.search);
    if (params.get('q')) {
        filterKeyword.value = params.get('q');
    }

    // 2. Core Render Function
    const renderProperties = (data) => {
        grid.innerHTML = '';

        if (data.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 4rem 0; color:var(--text-secondary);">
                <i class="fas fa-search" style="font-size:2rem; margin-bottom:1rem; opacity:0.5;"></i><br>
                <h3>No Properties Found</h3>
                <p>Try adjusting your filters to find more results.</p>
            </div>`;
            countDisplay.innerText = "0 results";
            return;
        }

        countDisplay.innerText = `Showing ${data.length} listing${data.length > 1 ? 's' : ''}`;

        data.forEach(p => {
            const card = document.createElement('article');
            card.className = "property-card glass-panel fade-up active"; // Skip delay on filter

            const badgeStyle = p.status === "For Rent" ? "background:rgba(15, 23, 42, 0.8); color:#fff;" : "";
            const bedDisplay = p.type === "Commercial" ? "" : `<div class="metric"><i class="fas fa-bed"></i> ${p.beds} Beds</div>`;

            card.innerHTML = `
                <div class="card-badge" style="${badgeStyle}">${p.status}</div>
                <div class="card-img-wrap">
                    <img src="${p.image}" alt="${p.title}">
                </div>
                <div class="card-content">
                    <div class="card-price">${formatPrice(p.price, p.status)}</div>
                    <h3 class="card-title">${p.title}</h3>
                    <p class="card-location"><i class="fas fa-map-marker-alt"></i> ${p.location}</p>
                    
                    <div class="card-metrics">
                        ${bedDisplay}
                        <div class="metric"><i class="fas fa-bath"></i> ${p.baths} Baths</div>
                        <div class="metric"><i class="fas fa-vector-square"></i> ${p.sqft.toLocaleString()} sqft</div>
                    </div>
                    
                    <a href="#" class="btn btn-glass" style="width: 100%; margin-top: 1.5rem; justify-content:center;">View Details</a>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    // 3. Filtering Engine
    const filterData = () => {
        let results = [...propertiesDB];

        const kW = filterKeyword.value.toLowerCase();
        const stat = filterStatus.value;
        const typ = filterType.value;
        const minP = parseFloat(filterMinPrice.value) || 0;
        const maxP = parseFloat(filterMaxPrice.value) || Infinity;
        const beds = parseInt(filterBeds.value) || 0;
        const baths = parseInt(filterBaths.value) || 0;
        const sortBy = sortOption.value;

        // Apply string matches
        if (kW) {
            results = results.filter(p => p.title.toLowerCase().includes(kW) || p.location.toLowerCase().includes(kW));
        }

        // Apply dropdown matches
        if (stat !== "All") results = results.filter(p => p.status === stat);
        if (typ !== "All") results = results.filter(p => p.type === typ);

        // Apply number matches
        results = results.filter(p => p.price >= minP && p.price <= maxP);
        results = results.filter(p => p.beds >= beds);
        results = results.filter(p => p.baths >= baths);

        // Sorting
        if (sortBy === 'price_asc') results.sort((a, b) => a.price - b.price);
        if (sortBy === 'price_desc') results.sort((a, b) => b.price - a.price);
        if (sortBy === 'newest') results.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

        // Render
        renderProperties(results);
    };

    // 4. Attach Event Listeners for REAL TIME filtering
    [filterKeyword, filterStatus, filterType, filterMinPrice, filterMaxPrice, filterBeds, filterBaths, sortOption].forEach(input => {
        input.addEventListener('input', filterData);
        input.addEventListener('change', filterData); // Catch selects
    });

    // Reset
    resetBtn.addEventListener('click', () => {
        filterKeyword.value = '';
        filterStatus.value = 'All';
        filterType.value = 'All';
        filterMinPrice.value = '';
        filterMaxPrice.value = '';
        filterBeds.value = '0';
        filterBaths.value = '0';
        sortOption.value = 'newest';
        filterData(); // trigger re-render
    });

    // Mobile Toggle
    document.getElementById('filterToggleBtn').addEventListener('click', () => {
        document.getElementById('filterSidebar').classList.toggle('active');
    });

    // Initial Load
    filterData();

});
