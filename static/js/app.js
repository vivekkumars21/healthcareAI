/**
 * HealthCare AI — Frontend Application (Enhanced 132-Symptom Version)
 * Handles SPA navigation, dynamic symptom checker flow, disease encyclopedia, and doctor finder.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHero();
    initScrollControls();
    initSectionReveal();
    initSymptomChecker();
    initDiseaseEncyclopedia();
    initDoctorFinder();
    loadModelInfo();
});


/* ═══════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNav();
    });

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            const target = document.getElementById(section);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            links.classList.remove('open');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    document.getElementById('nav-logo-link').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function updateActiveNav() {
    const sections = ['hero', 'checker', 'encyclopedia', 'doctor-finder'];
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200) current = id;
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
}


/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
function initHero() {
    const container = document.getElementById('hero-particles');
    if (container) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (5 + Math.random() * 8) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    }

    document.getElementById('start-checker-btn').addEventListener('click', () => {
        document.getElementById('checker').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('browse-diseases-btn').addEventListener('click', () => {
        document.getElementById('encyclopedia').scrollIntoView({ behavior: 'smooth' });
    });

    const indicator = document.getElementById('hero-scroll-indicator');
    const goToChecker = () => document.getElementById('checker').scrollIntoView({ behavior: 'smooth' });
    if (indicator) {
        indicator.addEventListener('click', goToChecker);
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToChecker();
            }
        });

        // Hide on scroll, show back at top
        window.addEventListener('scroll', () => {
            indicator.style.opacity = window.scrollY > 60 ? '0' : '1';
            indicator.style.pointerEvents = window.scrollY > 60 ? 'none' : 'auto';
        }, { passive: true });
    }
}

function initScrollControls() {
    const progressBar = document.getElementById('scroll-progress');

    const onScroll = () => {
        if (progressBar) {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
            progressBar.style.width = pct + '%';
        }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

function initSectionReveal() {
    // Add reveal class to major content blocks
    const targets = document.querySelectorAll(
        '.card, .glass-card, .section-header, .disease-grid, .doctor-finder-content, .disclaimer-card, .stepper'
    );
    targets.forEach(el => el.classList.add('section-reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
}

function loadModelInfo() {
    fetch('/api/model-info')
        .then(res => res.json())
        .then(data => {
            if (data.loaded) {
                animateCounter('stat-diseases', data.diseaseCount);
                animateCounter('stat-symptoms', data.symptomCount);
                document.getElementById('stat-accuracy').textContent = data.accuracy + '%';
                document.getElementById('stat-model').textContent = data.modelType === 'Random Forest' ? 'RF' : 'GB';
            } else {
                ['stat-diseases', 'stat-accuracy', 'stat-model', 'stat-symptoms'].forEach(id => {
                    document.getElementById(id).textContent = '—';
                });
            }
        })
        .catch(() => {
            document.getElementById('stat-diseases').textContent = '—';
        });
}

function animateCounter(elementId, target) {
    const el = document.getElementById(elementId);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = current;
    }, 30);
}


/* ═══════════════════════════════════════════════════
   SYMPTOM CHECKER — Enhanced 132 Symptom Version
   ═══════════════════════════════════════════════════ */
let allSymptomGroups = {};
let allSymptoms = [];
let selectedSymptoms = new Set();

function initSymptomChecker() {
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3')
    ];

    function showStep(n) {
        steps.forEach((s, i) => s.classList.toggle('hidden', i !== n));
        document.querySelectorAll('.stepper .step').forEach((s, i) => {
            s.classList.remove('active', 'completed');
            if (i === n) s.classList.add('active');
            else if (i < n) s.classList.add('completed');
        });
    }

    // Load symptoms from API
    loadSymptoms();

    // Search
    document.getElementById('symptom-search').addEventListener('input', (e) => {
        filterSymptomGrid(e.target.value);
    });

    // Navigation
    document.getElementById('to-step-2').addEventListener('click', () => {
        if (selectedSymptoms.size === 0) {
            showToast('Please select at least one symptom', 'warning');
            return;
        }
        renderReviewStep();
        showStep(1);
    });

    document.getElementById('back-to-step-1').addEventListener('click', () => showStep(0));
    document.getElementById('back-to-step-2').addEventListener('click', () => showStep(1));

    document.getElementById('new-check-btn').addEventListener('click', () => {
        selectedSymptoms.clear();
        updateSelectedDisplay();
        renderSymptomGrid(allSymptoms);
        document.getElementById('symptom-search').value = '';
        setActiveTab('all');
        showStep(0);
    });

    document.getElementById('predict-btn').addEventListener('click', predictDisease);
}

async function loadSymptoms() {
    try {
        const res = await fetch('/api/symptoms');
        const data = await res.json();
        allSymptomGroups = data.groups;

        // Flatten all symptoms
        allSymptoms = [];
        for (const [group, symptoms] of Object.entries(allSymptomGroups)) {
            symptoms.forEach(s => {
                allSymptoms.push({ ...s, group });
            });
        }

        // Build category tabs
        buildCategoryTabs(Object.keys(allSymptomGroups));

        // Render symptom grid
        renderSymptomGrid(allSymptoms);
    } catch (err) {
        document.getElementById('symptom-grid-dynamic').innerHTML = `
            <div class="loading-state">
                <div style="font-size: 2.5rem; margin-bottom: 1rem;">⚠️</div>
                <p>Unable to load symptoms. Is the server running?</p>
            </div>`;
    }
}

function buildCategoryTabs(groups) {
    const container = document.getElementById('symptom-category-tabs');
    container.innerHTML = '<button class="symptom-tab active" data-group="all">All (132)</button>';

    const icons = {
        'General': '🌡️',
        'Head & Neurological': '🧠',
        'Respiratory': '🫁',
        'Gastrointestinal': '🤢',
        'Skin': '🩹',
        'Musculoskeletal': '🦴',
        'Urinary': '🫘',
        'Cardiovascular': '❤️',
        'Other': '📋'
    };

    groups.forEach(group => {
        const count = allSymptomGroups[group].length;
        const btn = document.createElement('button');
        btn.className = 'symptom-tab';
        btn.setAttribute('data-group', group);
        btn.innerHTML = `${icons[group] || '📋'} ${group} (${count})`;
        btn.addEventListener('click', () => {
            setActiveTab(group);
            const filtered = allSymptoms.filter(s => s.group === group);
            renderSymptomGrid(filtered);
        });
        container.appendChild(btn);
    });

    container.querySelector('[data-group="all"]').addEventListener('click', () => {
        setActiveTab('all');
        renderSymptomGrid(allSymptoms);
    });
}

function setActiveTab(group) {
    document.querySelectorAll('.symptom-tab').forEach(t => t.classList.remove('active'));
    const target = document.querySelector(`.symptom-tab[data-group="${group}"]`);
    if (target) target.classList.add('active');
}

function filterSymptomGrid(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        setActiveTab('all');
        renderSymptomGrid(allSymptoms);
        return;
    }

    const filtered = allSymptoms.filter(s =>
        s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    );

    // Deactivate all tabs when searching
    document.querySelectorAll('.symptom-tab').forEach(t => t.classList.remove('active'));
    renderSymptomGrid(filtered, q);
}

function renderSymptomGrid(symptoms, highlightQuery = '') {
    const grid = document.getElementById('symptom-grid-dynamic');

    if (symptoms.length === 0) {
        grid.innerHTML = `
            <div class="loading-state" style="grid-column: 1/-1;">
                <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
                <p>No symptoms found matching your search</p>
            </div>`;
        return;
    }

    grid.innerHTML = symptoms.map(symptom => {
        const isSelected = selectedSymptoms.has(symptom.id);
        let displayName = symptom.name;

        // Highlight search match
        if (highlightQuery) {
            const regex = new RegExp(`(${highlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            displayName = displayName.replace(regex, '<mark>$1</mark>');
        }

        return `
            <label class="symptom-toggle ${isSelected ? 'checked' : ''}" data-symptom-id="${symptom.id}">
                <input type="checkbox" name="${symptom.id}" value="1" ${isSelected ? 'checked' : ''}>
                <div class="symptom-card">
                    <span class="symptom-check">${isSelected ? '✓' : ''}</span>
                    <span class="symptom-name">${displayName}</span>
                    <span class="symptom-group-badge">${symptom.group}</span>
                </div>
            </label>`;
    }).join('');

    // Add click handlers
    grid.querySelectorAll('.symptom-toggle input').forEach(input => {
        input.addEventListener('change', () => {
            const id = input.name;
            if (input.checked) {
                selectedSymptoms.add(id);
            } else {
                selectedSymptoms.delete(id);
            }
            // Update visual state
            const label = input.closest('.symptom-toggle');
            label.classList.toggle('checked', input.checked);
            label.querySelector('.symptom-check').textContent = input.checked ? '✓' : '';
            updateSelectedDisplay();
        });
    });
}

function updateSelectedDisplay() {
    const countBadge = document.getElementById('selected-count');
    const container = document.getElementById('selected-symptoms-container');
    const chips = document.getElementById('selected-symptoms-chips');

    countBadge.textContent = `${selectedSymptoms.size} selected`;

    if (selectedSymptoms.size > 0) {
        container.classList.remove('hidden');
        chips.innerHTML = Array.from(selectedSymptoms).map(id => {
            const symptom = allSymptoms.find(s => s.id === id);
            const name = symptom ? symptom.name : id;
            return `<span class="selected-chip">
                ${name}
                <button class="chip-remove" data-remove="${id}">&times;</button>
            </span>`;
        }).join('');

        // Remove handlers
        chips.querySelectorAll('.chip-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const removeId = btn.getAttribute('data-remove');
                selectedSymptoms.delete(removeId);
                updateSelectedDisplay();
                // Update checkbox state
                const checkbox = document.querySelector(`input[name="${removeId}"]`);
                if (checkbox) {
                    checkbox.checked = false;
                    const label = checkbox.closest('.symptom-toggle');
                    label.classList.remove('checked');
                    label.querySelector('.symptom-check').textContent = '';
                }
            });
        });
    } else {
        container.classList.add('hidden');
    }
}

function renderReviewStep() {
    const container = document.getElementById('review-symptoms');
    const symptomList = Array.from(selectedSymptoms).map(id => {
        const s = allSymptoms.find(s => s.id === id);
        return s ? s.name : id;
    });

    container.innerHTML = `
        <div class="review-card">
            <div class="review-header">
                <span class="review-icon">📋</span>
                <div>
                    <div class="review-title">Selected Symptoms (${symptomList.length})</div>
                    <div class="review-subtitle">These symptoms will be analyzed by our AI model</div>
                </div>
            </div>
            <div class="review-chips">
                ${symptomList.map(name => `<span class="review-chip">✓ ${name}</span>`).join('')}
            </div>
        </div>`;
}


async function predictDisease() {
    const btn = document.getElementById('predict-btn');
    const loader = document.getElementById('predict-loader');
    const text = document.getElementById('predict-text');

    loader.classList.remove('hidden');
    text.textContent = 'Analyzing...';
    btn.disabled = true;

    const payload = {
        symptoms: Array.from(selectedSymptoms)
    };

    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.success) {
            renderResults(data);
            document.querySelectorAll('.checker-step').forEach(s => s.classList.add('hidden'));
            document.getElementById('step-3').classList.remove('hidden');
            document.querySelectorAll('.stepper .step').forEach((s, i) => {
                s.classList.remove('active', 'completed');
                if (i === 2) s.classList.add('active');
                else s.classList.add('completed');
            });
        } else {
            showToast('Prediction failed: ' + (data.error || 'Unknown error'), 'error');
        }
    } catch (err) {
        showToast('Connection error. Is the server running?', 'error');
        console.error(err);
    } finally {
        loader.classList.add('hidden');
        text.textContent = '🔬 Analyze Symptoms';
        btn.disabled = false;
    }
}

function renderResults(data) {
    const container = document.getElementById('results-container');
    const predictions = data.predictions;

    if (!predictions || predictions.length === 0) {
        container.innerHTML = `
            <div class="card glass-card text-center" style="padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <h3>No Strong Matches Found</h3>
                <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                    Your symptom combination didn't strongly match any disease in our database.
                    Please consult a healthcare professional for proper diagnosis.
                </p>
            </div>`;
        return;
    }

    // Matched symptoms info
    let html = `
        <div class="results-matched-info">
            <span class="matched-badge">🎯 ${data.matchedSymptoms.length} symptoms matched</span>
            <span class="matched-badge model-badge">🤖 ${data.modelType} · ${data.modelAccuracy}% accuracy</span>
        </div>`;

    predictions.forEach((pred, i) => {
        const delay = i * 0.1;
        const severityIcons = { mild: '🟢', moderate: '🟡', severe: '🟠', critical: '🔴' };
        const sIcon = severityIcons[pred.severity] || '🟡';

        html += `
        <div class="result-card" style="animation-delay: ${delay}s">
            <div class="result-header">
                <div class="result-disease-name">
                    <span class="result-rank">#${i + 1}</span>
                    <span>${pred.disease}</span>
                </div>
                <div class="result-badges">
                    <span class="severity-badge" style="background: ${pred.severityColor}15; color: ${pred.severityColor}; border: 1px solid ${pred.severityColor}40;">
                        ${sIcon} ${pred.severityLabel}
                    </span>
                    <span class="severity-badge" style="background: rgba(102,126,234,0.1); color: var(--accent-secondary); border: 1px solid rgba(102,126,234,0.3);">
                        ${pred.category}
                    </span>
                </div>
            </div>

            <div class="confidence-bar-container">
                <div class="confidence-label">
                    <span>Prediction Confidence</span>
                    <span class="confidence-value">${pred.confidence}%</span>
                </div>
                <div class="confidence-bar">
                    <div class="confidence-fill" data-width="${Math.min(pred.confidence, 100)}"></div>
                </div>
            </div>

            <p class="result-description">${pred.description}</p>

            <div style="padding: 0.75rem 1rem; margin-bottom: 1rem; border-radius: var(--radius-md); background: ${pred.severityColor}08; border: 1px solid ${pred.severityColor}25;">
                <span style="font-size: 0.88rem; color: ${pred.severityColor}; font-weight: 500;">
                    ${sIcon} ${pred.severityAdvice}
                </span>
            </div>

            ${pred.matchingSymptoms && pred.matchingSymptoms.length > 0 ? `
            <div class="result-section-title">🎯 Matching Key Symptoms (${pred.matchingSymptoms.length}/${pred.totalKeySymptoms})</div>
            <div class="matching-symptoms-chips">
                ${pred.matchingSymptoms.map(s => `<span class="match-chip">✓ ${s.replace(/_/g, ' ')}</span>`).join('')}
            </div>` : ''}

            <div class="result-section-title">🛡️ Precautions & Advice</div>
            <ul class="precaution-list">
                ${pred.precautions.map(p => `<li>${p}</li>`).join('')}
            </ul>

            <div class="result-section-title">👨‍⚕️ Recommended Specialist</div>
            <div class="result-specialist" onclick="findSpecialistDoctor('${pred.specialist}')">
                <span class="specialist-icon">🏥</span>
                <div class="specialist-info">
                    <div class="specialist-name">${pred.specialist}</div>
                    <div class="specialist-hint">Click to find nearby specialists</div>
                </div>
                <span class="specialist-arrow">→</span>
            </div>
        </div>`;
    });

    html += `
        <div class="results-model-info">
            Powered by ${data.modelType} model · ${data.modelAccuracy}% accuracy · For educational purposes only
        </div>`;

    container.innerHTML = html;

    // Animate confidence bars
    setTimeout(() => {
        document.querySelectorAll('.confidence-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width') + '%';
        });
    }, 100);
}


/* ═══════════════════════════════════════════════════
   DISEASE ENCYCLOPEDIA
   ═══════════════════════════════════════════════════ */
let allDiseases = [];

function initDiseaseEncyclopedia() {
    fetchDiseases();
    document.getElementById('disease-search').addEventListener('input', filterDiseases);
}

async function fetchDiseases() {
    try {
        const res = await fetch('/api/diseases');
        allDiseases = await res.json();
        renderDiseaseGrid(allDiseases);
        buildCategoryFilters(allDiseases);
    } catch (err) {
        document.getElementById('disease-grid').innerHTML = `
            <div class="loading-state">
                <p>Unable to load diseases. Is the server running?</p>
            </div>`;
    }
}

function buildCategoryFilters(diseases) {
    const categories = [...new Set(diseases.map(d => d.category))].sort();
    const container = document.getElementById('category-filters');
    container.innerHTML = '<button class="chip active" data-category="all">All</button>';

    categories.forEach(cat => {
        const chip = document.createElement('button');
        chip.className = 'chip';
        chip.setAttribute('data-category', cat);
        chip.textContent = cat;
        chip.addEventListener('click', () => {
            container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            filterDiseases();
        });
        container.appendChild(chip);
    });

    container.querySelector('[data-category="all"]').addEventListener('click', (e) => {
        container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        filterDiseases();
    });
}

function filterDiseases() {
    const searchTerm = document.getElementById('disease-search').value.toLowerCase();
    const activeChip = document.querySelector('#category-filters .chip.active');
    const category = activeChip ? activeChip.getAttribute('data-category') : 'all';

    const filtered = allDiseases.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchTerm) ||
                              d.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || d.category === category;
        return matchesSearch && matchesCategory;
    });

    renderDiseaseGrid(filtered);
}

const categoryIcons = {
    'Infectious': '🦠', 'Immunological': '🛡️', 'Gastrointestinal': '🤢',
    'Endocrine': '💉', 'Respiratory': '🫁', 'Cardiovascular': '❤️',
    'Neurological': '🧠', 'Musculoskeletal': '🦴', 'Dermatological': '🩹',
    'Renal': '🫘', 'General': '🏥'
};

function renderDiseaseGrid(diseases) {
    const grid = document.getElementById('disease-grid');

    if (diseases.length === 0) {
        grid.innerHTML = `
            <div class="loading-state" style="grid-column: 1/-1">
                <div style="font-size: 3rem;">🔍</div>
                <p>No diseases found matching your search</p>
            </div>`;
        return;
    }

    grid.innerHTML = diseases.map((d, i) => {
        const icon = categoryIcons[d.category] || '🏥';
        return `
        <div class="disease-card" onclick='showDiseaseModal(${JSON.stringify(d).replace(/'/g, "&#39;")})' style="animation-delay: ${i * 0.05}s">
            <div class="disease-card-header">
                <span class="disease-card-icon">${icon}</span>
                <span class="disease-card-name">${d.name}</span>
                <span class="disease-card-category">${d.category}</span>
            </div>
            <p class="disease-card-desc">${d.description}</p>
            <div class="disease-card-footer">
                <span class="disease-card-specialist">👨‍⚕️ ${d.specialist}</span>
                <span class="severity-badge" style="background: ${d.severityColor}15; color: ${d.severityColor}; border: 1px solid ${d.severityColor}40; font-size: 0.72rem;">
                    ${d.severityLabel}
                </span>
            </div>
        </div>`;
    }).join('');
}

function showDiseaseModal(disease) {
    const modal = document.getElementById('disease-modal');
    const content = document.getElementById('modal-content');
    const icon = categoryIcons[disease.category] || '🏥';

    content.innerHTML = `
        <div class="modal-disease-header">
            <span class="modal-disease-icon">${icon}</span>
            <div>
                <div class="modal-disease-title">${disease.name}</div>
                <div class="modal-disease-category">${disease.category}</div>
            </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
            <span class="severity-badge" style="background: ${disease.severityColor}15; color: ${disease.severityColor}; border: 1px solid ${disease.severityColor}40;">
                ${disease.severityLabel}
            </span>
        </div>

        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.7;">${disease.description}</p>

        <div class="result-section-title">🛡️ Precautions</div>
        <ul class="precaution-list">
            ${disease.precautions.map(p => `<li>${p}</li>`).join('')}
        </ul>

        <div class="result-section-title">👨‍⚕️ Recommended Specialist</div>
        <div class="result-specialist" onclick="findSpecialistDoctor('${disease.specialist}'); closeDiseaseModal();">
            <span class="specialist-icon">🏥</span>
            <div class="specialist-info">
                <div class="specialist-name">${disease.specialist}</div>
                <div class="specialist-hint">Click to find nearby specialists</div>
            </div>
            <span class="specialist-arrow">→</span>
        </div>

        ${disease.avgAge !== 'N/A' ? `
        <div style="margin-top: 1.25rem; padding: 0.75rem 1rem; background: var(--bg-glass); border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-muted);">
            📊 Average patient age: ${disease.avgAge} years · ${disease.sampleCount || 0} cases in dataset
        </div>` : ''}
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    document.getElementById('modal-close').onclick = closeDiseaseModal;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeDiseaseModal();
    });
}

function closeDiseaseModal() {
    document.getElementById('disease-modal').classList.add('hidden');
    document.body.style.overflow = '';
}


/* ═══════════════════════════════════════════════════
   DOCTOR FINDER
   ═══════════════════════════════════════════════════ */
function initDoctorFinder() {
    document.getElementById('find-doctors-btn').addEventListener('click', findDoctors);
}

function findDoctors() {
    const specialistType = document.getElementById('specialist-select').value;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                showDoctorMap(lat, lng, specialistType);

                const locInfo = document.getElementById('location-info');
                locInfo.classList.remove('hidden');
                document.getElementById('location-text').textContent =
                    `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            },
            (error) => {
                showToast('Unable to get location. Please enable location services.', 'warning');
                showDoctorMap(28.6139, 77.2090, specialistType);
            }
        );
    } else {
        showToast('Geolocation is not supported by this browser.', 'error');
    }
}

function showDoctorMap(lat, lng, specialist) {
    const mapFrame = document.getElementById('doctor-map');
    const placeholder = document.getElementById('map-placeholder');

    const query = encodeURIComponent(`${specialist} near me`);
    const fallbackUrl = `https://maps.google.com/maps?q=${query}&ll=${lat},${lng}&z=13&output=embed`;

    mapFrame.src = fallbackUrl;
    mapFrame.classList.remove('hidden');
    placeholder.classList.add('hidden');
}

function findSpecialistDoctor(specialist) {
    document.getElementById('doctor-finder').scrollIntoView({ behavior: 'smooth' });

    const select = document.getElementById('specialist-select');
    const specialistLower = specialist.toLowerCase();

    const options = select.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value.toLowerCase().includes(specialistLower.split(' ')[0])) {
            select.selectedIndex = i;
            break;
        }
    }

    setTimeout(() => findDoctors(), 600);
}


/* ═══════════════════════════════════════════════════
   TOAST NOTIFICATIONS
   ═══════════════════════════════════════════════════ */
function showToast(message, type = 'info') {
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast';

    const colors = { info: '#667eea', warning: '#ffd93d', error: '#ff6b6b', success: '#6bcb77' };
    const icons = { info: 'ℹ️', warning: '⚠️', error: '❌', success: '✅' };

    toast.style.cssText = `
        position: fixed; top: 90px; right: 2rem; z-index: 3000;
        display: flex; align-items: center; gap: 0.75rem;
        padding: 1rem 1.5rem;
        background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(16px);
        border: 1px solid ${colors[type]}40; border-left: 3px solid ${colors[type]};
        border-radius: 12px; color: #f1f5f9; font-size: 0.9rem; font-family: 'Inter', sans-serif;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease; max-width: 400px;
    `;

    toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    document.body.appendChild(toast);

    if (!document.getElementById('toast-animation-style')) {
        const style = document.createElement('style');
        style.id = 'toast-animation-style';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}


/* ═══════════════════════════════════════════════════
   KEYBOARD SHORTCUTS
   ═══════════════════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDiseaseModal();
});
