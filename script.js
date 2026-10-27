'use strict';
// Añade aquí tu perfil real cuando quieras enlazarlo. No se asume un usuario.
const GITHUB_URL = 'https://github.com/AysselDev';
const email = 'mperezrojas874@gmail.com';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}));
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.project').forEach(project => {
    project.hidden = category !== 'all' && project.dataset.category !== category;
  });
}));
const projects = {
  csyg: {
    title: 'CSYG', url: 'https://csyg.cl',
    description: 'Participación integral en el sitio de CSYG: desde su implementación hasta la finalización y puesta en marcha.',
    points: ['Implementación inicial del sitio según las necesidades del cliente.', 'Desarrollo y configuración de la solución web.', 'Acompañamiento del proyecto hasta su finalización y entrega.']
  },
  sanantonio: {
    title: 'Comercializadora San Antonio', url: 'https://comsanantonio.cl',
    description: 'Participación integral desde la implementación hasta la finalización del sitio web y la tienda online con WordPress y WooCommerce.',
    points: ['Implementación, desarrollo y configuración del sitio y del comercio electrónico.', 'Trabajo con catálogo, importación de productos y navegación de la tienda.', 'Acompañamiento hasta la finalización, además de mantenimiento y mejoras en filtros, búsqueda y proceso de compra.']
  }
};
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  const list = document.querySelector('#dialog-points');
  list.replaceChildren(...project.points.map(point => { const item = document.createElement('li'); item.textContent = point; return item; }));
  document.querySelector('#dialog-link').href = project.url;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.querySelector('#copy-email').addEventListener('click', async event => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(email);
    button.textContent = 'Copiado ✓';
    document.querySelector('#copy-status').textContent = 'Correo copiado al portapapeles.';
    setTimeout(() => { button.textContent = 'Copiar ↗'; }, 2500);
  } catch {
    document.querySelector('#copy-status').textContent = 'No fue posible copiar automáticamente. Correo: ' + email;
    button.textContent = 'Selecciona el correo';
    const selection = window.getSelection(); const range = document.createRange();
    range.selectNodeContents(button.previousElementSibling); selection.removeAllRanges(); selection.addRange(range);
  }
});
if (/^https:\/\/github\.com\/[A-Za-z0-9-]+\/?$/.test(GITHUB_URL)) {
  const link = document.querySelector('#github-link'); link.href = GITHUB_URL;
  link.textContent = 'Ver mi GitHub ↗'; link.target = '_blank'; link.rel = 'noopener noreferrer';
}
document.querySelector('#year').textContent = new Date().getFullYear();

const techViews = {
  profile: {comment:'// Tecnología al servicio de las personas', code:'{\n  "nombre": "Mauro Pérez Rojas",\n  "ubicación": "Copiapó, Chile",\n  "enfoque": [\n    "Soporte TI",\n    "Desarrollo web",\n    "Procesos & minería"\n  ],\n  "forma_de_trabajar":\n    "Entender → implementar → entregar"\n}'},
  web: {comment:'// Experiencia y conocimientos de desarrollo', code:'const desarrollo = {\n  lenguajes: ["Python", "JavaScript"],\n  interfaz: ["React", "HTML", "CSS"],\n  datos: ["SQL", "MongoDB"],\n  eCommerce: ["WordPress", "WooCommerce"],\n  proyectos: [\n    "csyg.cl",\n    "comsanantonio.cl"\n  ]\n};'},
  support: {comment:'// Soporte aplicado + aprendizaje técnico', code:'# Soporte TI\n\n✓ Diagnóstico de equipos y software\n✓ Atención y orientación a usuarios\n✓ Conectividad y redes básicas\n\n# Conocimientos iniciales\n\nUbuntu · Cisco · Kali Linux\nWazuh (SIEM) · Zabbix · GLPI'}
};
const techTabs=[...document.querySelectorAll('[data-view]')];
function selectTechTab(button){
  techTabs.forEach(tab=>{const selected=tab===button;tab.classList.toggle('selected',selected);tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
  const view=techViews[button.dataset.view];
  document.querySelector('.code-comment').textContent=view.comment;
  document.querySelector('#tech-code code').textContent=view.code;
  document.querySelector('#tech-panel').setAttribute('aria-labelledby',button.id);
}
techTabs.forEach((button,index)=>{
  button.addEventListener('click',()=>selectTechTab(button));
  button.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%techTabs.length;
    if(event.key==='ArrowLeft')next=(index+techTabs.length-1)%techTabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=techTabs.length-1;
    if(next!==undefined){event.preventDefault();selectTechTab(techTabs[next]);techTabs[next].focus();}
  });
});
