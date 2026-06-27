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
// Parallax: mostrar fondo de la sección activa
const todasSecciones = document.querySelectorAll('.seccion');

const parallaxObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const pseudo = entry.target;
    if (entry.isIntersecting) {
      // Ocultar todos los fondos
      todasSecciones.forEach(s => s.style.setProperty('--bg-opacity', '0'));
      // Mostrar el de la sección activa
      entry.target.classList.add('sec-visible');
    } else {
      entry.target.classList.remove('sec-visible');
    }
  });
}, { threshold: 0.3 });

todasSecciones.forEach(sec => parallaxObserver.observe(sec));
let slideActual = 0;
let proyectoActual = 0;

const proyectos = [
  {
    nombre: 'Página Personal',
    desc: 'Sitio web personal, el cual es este mismo, donde puedo mostrar algunos proyectos realizados.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://tudominio.com',
    imagenes: [
      'img/pag1.png',
      'img/pag2.png',
      'img/pag3.png',
      'img/pag4.png',
    ]
  },
  {
    nombre: 'SuperRutaApp',
    desc: 'Aplicación movil la cual se encarga de crear una ruta eficiente a la hora de hacer la despensa, todo en base los productos que el usuario agrega junto con su pasillo de ubicacion.',
    tags: ['Flutter', 'Dart',],
    link: '#',
    imagenes: [
      'img/iapp1.jpeg',
    ]
  },
  {
    nombre: 'Hand Tracking',
    desc: 'Proyecto de trackeo de manos en Python.',
    tags: ['Python', 'OpenCV'],
    link: '#',
    imagenes: [
      'img/ht1.jpg',
      'img/ht2.jpg',
    ]
  },
  {
    nombre: 'Menu gestual',
    desc: 'Menú flotante que se activa y controla con trackeo de manos',
    tags: ['Python', 'OpenCV'],
    link: '#',
    imagenes: [
      'img/mf.mp4',
    ]
  },
  {
    nombre: 'Proyecto 5',
    desc: 'Mini e-commerce con carrito y diseño responsive.',
    tags: ['HTML', 'CSS', 'JS'],
    link: '#',
    imagenes: [
      'img/p4-4.png',
      'img/p4-5.png',
      ]
  }
];

function construirCarrusel(p) {
  slideActual = 0;
  const track = document.getElementById('carruselTrack');
  const dots = document.getElementById('carruselDots');
  if (!track || !dots) return;

  track.innerHTML = p.imagenes.map(src =>
    `<div class="carousel-slide">
      <img src="${src}" alt="Captura de ${p.nombre}" loading="lazy">
    </div>`
  ).join('');

  dots.innerHTML = p.imagenes.map((_, i) =>
    `<button class="carr-dot${i === 0 ? ' active' : ''}" onclick="irASlide(${i})" aria-label="Ir a imagen ${i+1}"></button>`
  ).join('');

  track.style.transform = 'translateX(0)';
}

function irASlide(i) {
  const p = proyectos[proyectoActual];
  slideActual = Math.max(0, Math.min(i, p.imagenes.length - 1));
  const track = document.getElementById('carruselTrack');
  if (track) track.style.transform = `translateX(-${slideActual * 100}%)`;
  document.querySelectorAll('.carr-dot').forEach((d, j) => d.classList.toggle('active', j === slideActual));
}

function moverCarrusel(dir) {
  irASlide(slideActual + dir);
}

function seleccionarProyecto(i) {
  proyectoActual = i;

  document.querySelectorAll('.proj-item').forEach((el, j) => {
    el.classList.toggle('active', j === i);
  });

  const p = proyectos[i];
  document.getElementById('panelTitulo').textContent = p.nombre;
  document.getElementById('panelDesc').textContent = p.desc;
  document.getElementById('panelTags').innerHTML =
    p.tags.map(t => `<span class="ptag">${t}</span>`).join('');

  construirCarrusel(p);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  construirCarrusel(proyectos[0]);
});
