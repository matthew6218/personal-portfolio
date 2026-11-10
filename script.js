const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');

const setHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('is-active', item === button));
    projects.forEach((project) => {
      const visible = value === 'all' || project.dataset.category.split(' ').includes(value);
      project.classList.toggle('is-hidden', !visible);
    });
  });
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
