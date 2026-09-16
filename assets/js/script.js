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

  // ---------- Formulário de orçamento -> WhatsApp ----------
  var WHATSAPP_NUMBER = '5521974793847';

  var form = document.getElementById('quoteForm');
  var submitBtn = document.getElementById('submitBtn');

  function updateSubmitState() {
    if (!form || !submitBtn) return;
    submitBtn.disabled = !form.checkValidity();
  }

  if (form) {
    form.addEventListener('input', updateSubmitState);
    form.addEventListener('change', updateSubmitState);
    updateSubmitState();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        updateSubmitState();
        return;
      }

      var nome = form.nome.value.trim();
      var whatsapp = form.whatsapp.value.trim();
      var bairro = form.bairro.value;
      var projeto = form.projeto.value;
      var mensagem = form.mensagem.value.trim();

      var lines = [
        'Olá! Gostaria de solicitar um orçamento na Granorte Marmoraria.',
        '',
        'Nome: ' + nome,
        'WhatsApp: ' + whatsapp,
        'Bairro ou região: ' + bairro,
        'Tipo de projeto: ' + projeto
      ];

      if (mensagem) {
        lines.push('Detalhes do projeto: ' + mensagem);
      }

      var text = encodeURIComponent(lines.join('\n'));
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;

      window.open(url, '_blank', 'noopener');
    });
  }
})();
