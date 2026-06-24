const secciones = document.querySelectorAll('section[id]');
const dotsLateral = document.querySelectorAll('.side-dot');
const navIsland = document.getElementById('navIsland');
const navLinks = document.querySelectorAll('.nav-island ul li a');

// Scroll suave para todos los enlaces ancla
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Detectar sección activa con IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      actualizarActivo(id);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

secciones.forEach(sec => observer.observe(sec));

function actualizarActivo(id) {
  dotsLateral.forEach(dot => {
    dot.classList.toggle('active', dot.getAttribute('href') === '#' + id);
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
  });
}

// Compactar menú al hacer scroll
window.addEventListener('scroll', () => {
  navIsland.classList.toggle('scrolled', window.scrollY > 30);
});