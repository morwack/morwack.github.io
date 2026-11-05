/* ============================================
   Homepage banner: "Spot the inauthentic accounts"
   Illustrative posts modeled on the patterns of the pro-Kagame/RPF
   network documented in Wack, Linvill & Warren (2024). All accounts
   and posts here are fictional.
   ============================================ */

(function () {
    const root = document.querySelector('.spot-game');
    if (!root) return;
    const grid = root.querySelector('.spot-grid');
    const btn = root.querySelector('.spot-check');
    const status = root.querySelector('.spot-status');

    // Coordinated posts come in themed clusters: reworded rather than copied,
    // the same hashtag stack, posted within the same minute, by accounts
    // created in early 2024. Some leave the generating prompt in the text.
    const CLUSTERS = [
        {
            tags: '#ToraKagame2024 #Rwanda #Visionary',
            time: '14:02',
            posts: [
                { name: 'Grace Uwase', handle: 'grace_uwase2024', joined: 'Jan 2024', text: 'Under President Kagame, Rwanda has become a model of unity and progress for all of Africa.' },
                { name: 'Eric M.', handle: 'ericm88412', joined: 'Feb 2024', text: 'Rwanda\'s unity and steady progress show the world what visionary leadership can achieve.' },
                { name: 'Diane Kigali', handle: 'diane_k_rw24', joined: 'Jan 2024', text: 'Sure! Here is a tweet praising Rwanda\'s progress: Rwanda stands as a beacon of unity and growth in Africa.', tell: 'Prompt left in post' },
                { name: 'Patrick N.', handle: 'patrickn_5521', joined: 'Mar 2024', text: 'Visionary leadership has made Rwanda a symbol of unity, safety, and progress across the continent.' }
            ]
        },
        {
            tags: '#RwandaClassified #FakeNews #Rwanda',
            time: '09:47',
            posts: [
                { name: 'Jean Bosco', handle: 'jbosco_24rw', joined: 'Jan 2024', text: 'Foreign media keep recycling the same false stories about Rwanda. Rwandans know the truth.' },
                { name: 'Aline R.', handle: 'aliner30917', joined: 'Feb 2024', text: 'Once again Western outlets spread baseless claims about Rwanda. We see through these stories.' },
                { name: 'Claude H.', handle: 'claudeh_2024', joined: 'Jan 2024', text: 'Write a tweet defending Rwanda against biased foreign media reports. Use a confident tone.', tell: 'Prompt left in post' },
                { name: 'Sandrine U.', handle: 'sandrine_u7', joined: 'Mar 2024', text: 'These reports are part of a long campaign to tarnish Rwanda\'s image. The facts speak for themselves.' }
            ]
        },
        {
            tags: '#DRC #M23 #RwandaIsPeace',
            time: '18:21',
            posts: [
                { name: 'Olivier K.', handle: 'olivierk_4410', joined: 'Jan 2024', text: 'The instability in eastern DRC is a Congolese failure. Rwanda only seeks peace and security.' },
                { name: 'Yvonne M.', handle: 'yvonnem_rw', joined: 'Feb 2024', text: 'Blaming Rwanda for the crisis in eastern Congo ignores Kinshasa\'s own responsibility for peace.' },
                { name: 'Fabrice T.', handle: 'fabricet2024', joined: 'Jan 2024', text: 'As an AI language model, I can share a post: Rwanda remains committed to regional peace and stability.', tell: 'Prompt left in post' },
                { name: 'Chantal I.', handle: 'chantal_i_88', joined: 'Mar 2024', text: 'Rwanda has always worked for stability in the Great Lakes region. The DRC must address its own failures.' }
            ]
        }
    ];

    // Ordinary accounts: older, varied topics and wording, scattered posting times.
    // Some are supportive of the government so that stance alone is not the tell.
    const REAL = [
        { name: 'Ange Mukamana', handle: 'angemuka', joined: 'Jun 2013', time: '07:15', text: 'Nyabugogo traffic this morning was something else. Left home at 6 and still late.' },
        { name: 'Theo Habimana', handle: 'theo_hab', joined: 'Sep 2016', time: '21:40', text: 'APR played well tonight but that second half was nervous. Rayon fans, you can talk tomorrow.' },
        { name: 'Clarisse N.', handle: 'clarisse_n', joined: 'Mar 2011', time: '11:03', text: 'Voted early in Huye. Short queue and the volunteers were kind to my grandmother.' },
        { name: 'Samuel Rukundo', handle: 'samrukundo', joined: 'Jan 2015', time: '16:52', text: 'Has anyone read the full Rwanda Classified series? Long, but I want to see the sources myself.' },
        { name: 'Divine I.', handle: 'divine_ish', joined: 'Aug 2018', time: '13:27', text: 'Proud of how Kigali has changed in ten years. Still waiting on more buses on my route though.' },
        { name: 'Kevin Mugisha', handle: 'kmugisha', joined: 'Nov 2012', time: '19:08', text: 'Power cut again in Kimironko. Third time this week. Fridge is not happy.' },
        { name: 'Esther U.', handle: 'estheru_', joined: 'Apr 2017', time: '08:30', text: 'Kwibuka events at school today. The students asked such careful questions.' },
        { name: 'Joseph K.', handle: 'josephkay', joined: 'Jul 2014', time: '22:15', text: 'Basketball Africa League in Kigali again. BK Arena was loud tonight.' }
    ];

    const PER_ROUND = 6, FAKES = 3;
    let round = [], checked = false, lastCluster = -1;

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function initials(name) {
        return name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    }

    function esc(s) {
        return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    }

    function newRound() {
        let c;
        do { c = Math.floor(Math.random() * CLUSTERS.length); } while (c === lastCluster && CLUSTERS.length > 1);
        lastCluster = c;
        const cl = CLUSTERS[c];
        // Always include the post with the leaked prompt, plus two reworded ones.
        const leak = cl.posts.filter(p => p.tell);
        const rest = shuffle(cl.posts.filter(p => !p.tell)).slice(0, FAKES - leak.length);
        const fakes = leak.concat(rest).map(p => Object.assign({ fake: true, tags: cl.tags, time: cl.time }, p));
        const reals = shuffle(REAL.slice()).slice(0, PER_ROUND - FAKES).map(p => Object.assign({ fake: false, tags: '' }, p));
        round = shuffle(fakes.concat(reals)).map(p => Object.assign({ flagged: false }, p));
        checked = false;
        render();
    }

    function tellFor(p) {
        if (!p.fake) return 'Authentic';
        return p.tell || 'Reworded post, same hashtags';
    }

    function render() {
        grid.innerHTML = round.map((p, i) => {
            const cls = ['spot-card'];
            if (p.flagged) cls.push('is-flagged');
            if (checked) cls.push(p.fake ? 'is-fake' : 'is-real');
            return `<button type="button" class="${cls.join(' ')}" data-i="${i}" aria-pressed="${p.flagged}">
                <span class="sc-head">
                    <span class="sc-avatar">${initials(p.name)}</span>
                    <span class="sc-id"><span class="sc-name">${esc(p.name)}</span><span class="sc-handle">@${esc(p.handle)} · ${p.time}</span></span>
                    <span class="sc-flag">${p.flagged ? 'Flagged' : 'Flag'}</span>
                </span>
                <span class="sc-text">${esc(p.text)}${p.tags ? ' <span class="sc-tags">' + esc(p.tags) + '</span>' : ''}</span>
                <span class="sc-joined">Joined ${p.joined}</span>
                ${checked ? `<span class="sc-tell">${tellFor(p)}</span>` : ''}
            </button>`;
        }).join('');
        const n = round.filter(p => p.flagged).length;
        if (checked) {
            const hits = round.filter(p => p.flagged && p.fake).length;
            const fp = round.filter(p => p.flagged && !p.fake).length;
            status.textContent = `You caught ${hits} of ${FAKES}` + (fp ? `, and flagged ${fp} real account${fp > 1 ? 's' : ''}.` : '.') +
                ' Tells: accounts created in early 2024, matching hashtags, same minute, prompts left in the text.';
            btn.textContent = 'New round';
        } else {
            status.textContent = `Three of these six posts come from a coordinated network. Flagged: ${n} of 3.`;
            btn.textContent = 'Check';
        }
        btn.disabled = !checked && n === 0;
    }

    grid.addEventListener('click', e => {
        const card = e.target.closest('.spot-card');
        if (!card || checked) return;
        const p = round[+card.dataset.i];
        p.flagged = !p.flagged;
        render();
    });

    btn.addEventListener('click', () => {
        if (checked) newRound();
        else { checked = true; render(); }
    });

    newRound();
})();
