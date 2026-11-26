(function () {
  'use strict';

  // ---------- Ano no rodapé ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Header com fundo ao rolar ----------
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Menu mobile ----------
  var navToggle = document.getElementById('navToggle');
  var navClose = document.getElementById('navClose');
  var mobileNav = document.getElementById('mobileNav');

  function openNav() {
    mobileNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) navToggle.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // ---------- FAQ accordion ----------
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---------- Links de WhatsApp (sem formulário) ----------
  // Todo elemento com [data-wa] vira link direto pro WhatsApp com a mensagem
  // padrão. Se data-wa tiver um valor (ex.: "Cozinha e bancada"), o tipo de
  // projeto entra na mensagem.
  var WHATSAPP_NUMBER = '5521974793847';
  var WA_INTRO = 'Olá, vim pelo site da Granorte e gostaria de fazer um orçamento.';
  var WA_PRIORITY = 'Não apague a mensagem para atendimento prioritário';

  function buildWhatsAppUrl(projectType) {
    var parts = [WA_INTRO];
    if (projectType) parts.push('Tipo de projeto: ' + projectType);
    parts.push(WA_PRIORITY);
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(parts.join('\n\n'));
  }

  window.dataLayer = window.dataLayer || [];

  document.querySelectorAll('[data-wa]').forEach(function (link) {
    var projectType = link.getAttribute('data-wa') || '';
    link.setAttribute('href', buildWhatsAppUrl(projectType));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');

    link.addEventListener('click', function () {
      window.dataLayer.push({
        event: 'whatsapp_click',
        cta_location: link.getAttribute('data-cta') || '',
        project_type: projectType
      });
    });
  });

  // ---------- Antes e depois ----------
  document.querySelectorAll('.ba').forEach(function (slider) {
    var range = slider.querySelector('input[type="range"]');
    if (!range) return;
    function update() { slider.style.setProperty('--pos', range.value + '%'); }
    range.addEventListener('input', update);
    update();
  });
})();
