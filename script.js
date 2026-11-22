const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = [...document.querySelectorAll('.nav-links a')];

    function closeMenu() {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      menuToggle.textContent = '☰';
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuToggle.textContent = isOpen ? '×' : '☰';
    });

    navItems.forEach(link => link.addEventListener('click', closeMenu));
    document.getElementById('year').textContent = new Date().getFullYear();

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const sections = [...document.querySelectorAll('main section[id]')];
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));

    // If you add portrait.jpg beside index.html, it will appear automatically.
    const portraitFrame = document.getElementById('portraitFrame');
    const portrait = new Image();
    portrait.src = 'portrait.jpg';
    portrait.onload = () => {
      portrait.alt = 'Portrait of Glenn Ariola';
      portraitFrame.replaceChildren(portrait);
    };