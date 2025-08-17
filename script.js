  // --- Particle.js Background with Hover Animation ---
    particlesJS("particles-js", {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#808080" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#808080", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "bubble": { "distance": 100, "size": 5, "duration": 2, "opacity": 0.8, "color": "#A78BFA" }, "push": { "particles_nb": 4 } }
      }, "retina_detect": true
    });

    // === CONFIG: Your details ===
    const PROFILE = {
      name: "Arulprakash",
      about: "I am Arulprakash, a dedicated and enthusiastic Front-End Developer with a background in Mathematics...",
      education: "B.Sc. Mathematics, Presidency College, Chennai", email: "arulprakashs2710@gmail.com", phone: "8870189283",
      github: "https://github.com/Arul2710", linkedin: "https://www.linkedin.com/in/arul-prakash-s2004",
      instagram: "https://instagram.com/", x: "https://x.com/ArulprakashPra5?t=92DXcVFxD9cLii5_nKt6oA&s=09",
      portfolio: "https://arul2710.github.io/Arulprakash-portfolio/"
    };

    // --- DARK/LIGHT MODE TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    
    // Check for saved theme or prefer color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
    
    // Toggle theme function
    themeToggleBtn.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
    });

    // --- CHATBOT LOGIC ---
    document.getElementById('portfolioLink').href = PROFILE.portfolio;
    const chat = document.getElementById('chat');
    const input = document.getElementById('input');
    const sendBtn = document.getElementById('send');
    const clearBtn = document.getElementById('clear');

    // Function to create chat bubbles
    function bubble(text, side = 'ai') {
      const wrap = document.createElement('div');
      wrap.className = 'bubble max-w-[85%] sm:max-w-[75%]';
      wrap.innerHTML = `<div class="inline-block px-4 py-2 rounded-2xl ${side === 'ai' ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 ml-auto'}">${text}</div>`;
      chat.appendChild(wrap);
      chat.scrollTop = chat.scrollHeight;
      
      // Show clear button when messages exist
      if (chat.querySelectorAll('.bubble').length > 0) {
        clearBtn.classList.remove('hidden');
      }
    }

    // Function to show typing indicator
    let typingDiv = null;
    function typing(on = true) {
      if (on) {
        typingDiv = document.createElement('div');
        typingDiv.className = 'bubble';
        typingDiv.innerHTML = `<div class="inline-flex items-center gap-1 px-3 py-2 rounded-2xl bg-purple-600 text-white typing"><span></span><span></span><span></span></div>`;
        chat.appendChild(typingDiv);
        chat.scrollTop = chat.scrollHeight;
      } else if (typingDiv) {
        typingDiv.remove();
      }
    }

    // Function to create suggestion chips
    function chips(items = []) {
      const box = document.createElement('div');
      box.className = 'bubble';
      box.innerHTML = `<div class="flex flex-wrap gap-2">${items.map(t => `<button class="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-sm transition" data-chip="${t}">${t}</button>`).join('')}</div>`;
      chat.appendChild(box);
      chat.scrollTop = chat.scrollHeight;
      box.querySelectorAll('[data-chip]').forEach(btn => btn.addEventListener('click', () => ask(btn.dataset.chip)));
    }

    // Initial greeting
    function greet() {
      bubble(`Hi 👋 I'm <b>${PROFILE.name}'s AI Assistant</b>.<br/>Ask me anything about him.`);
      chips(["About Me", "Skills", "Education", "Portfolio", "GitHub", "X", "Instagram", "Contact"]);
    }

    // Generate responses
    function answerFor(q) {
      const t = q.toLowerCase();
      const linkClass = "underline text-purple-300 dark:text-purple-400 font-medium";
      const lk = `<a class="${linkClass}" href="${PROFILE.linkedin}" target="_blank">LinkedIn</a>`, gh = `<a class="${linkClass}" href="${PROFILE.github}" target="_blank">GitHub</a>`, ig = `<a class="${linkClass}" href="${PROFILE.instagram}" target="_blank">Instagram</a>`, pf = `<a class="${linkClass}" href="${PROFILE.portfolio}" target="_blank">Portfolio</a>`, x = `<a class="${linkClass}" href="${PROFILE.x}" target="_blank">X (Twitter)</a>`;

      if (/\b(about|yourself|intro)\b/.test(t)) return PROFILE.about;
      if (/\b(skill|stack|tools)\b/.test(t)) return `Core skills: <b>HTML</b>, <b>CSS</b>, <b>JavaScript</b>, <b>React</b>, <b>Tailwind CSS</b>, & <b>Node.js</b>. I love building clean, responsive UIs.`;
      if (/\b(education|study|college)\b/.test(t)) return `${PROFILE.education}.`;
      if (/\b(email|mail|contact)\b/.test(t)) return `You can email <a class="${linkClass}" href="mailto:${PROFILE.email}">${PROFILE.email}</a> or call <a class="${linkClass}" href="tel:${PROFILE.phone}">${PROFILE.phone}</a>.`;
      if (/\b(project|work|experience)\b/.test(t)) return `You can see all my projects on my ${gh}.`;
      if (/\b(linkedin)\b/.test(t)) return `Here is my ${lk}.`;
      if (/\b(github|git hub)\b/.test(t)) return `Here is my ${gh}.`;
      if (/\b(instagram)\b/.test(t)) return `Here is my ${ig}.`;
      if (/\b(portfolio|site|website)\b/.test(t)) return `Here is my ${pf}.`;
      if (/\b(x|twitter)\b/.test(t)) return `Here is my ${x}.`;
      
      return `Sorry, I can only answer questions about Arulprakash. Try asking about "skills", "projects", or "contact".`;
    }

    // Show next suggestions
    function suggestNext(prev) {
      const t = prev.toLowerCase();
      if (/about|who|name/.test(t)) chips(["Skills", "Education", "Projects"]);
      else if (/skill|stack/.test(t)) chips(["Projects", "Portfolio", "GitHub"]);
      else if (/project|work/.test(t)) chips(["GitHub", "Contact"]);
      else if (/contact|mail/.test(t)) chips(["LinkedIn", "GitHub"]);
      else chips(["About Me", "Skills", "Education"]);
    }

    // Handle user questions
    async function ask(text) {
      input.value = '';
      bubble(text, 'user');
      typing(true);
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
      typing(false);
      const reply = answerFor(text);
      bubble(reply, 'ai');
      suggestNext(text);
    }

    // Send message handler
    function handleSend() {
      if (input.value.trim()) {
        ask(input.value.trim());
      }
    }

    // Clear chat handler
    function handleClear() {
      chat.innerHTML = '';
      clearBtn.classList.add('hidden');
      greet();
    }

    // Event listeners
    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => { 
      if (e.key === 'Enter' && !e.shiftKey) { 
        e.preventDefault(); 
        handleSend(); 
      }
    });
    clearBtn.addEventListener('click', handleClear);

    // Initialize chat
    setTimeout(greet, 500);