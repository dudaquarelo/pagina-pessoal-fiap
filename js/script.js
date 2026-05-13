const nav = document.querySelector('nav');
const navUl = document.querySelector('nav ul');
 
const menuBtn = document.createElement('button');
menuBtn.classList.add('menu-toggle');
menuBtn.setAttribute('aria-label', 'Abrir menu');
menuBtn.setAttribute('aria-expanded', 'false');
menuBtn.innerHTML = `
  <span></span>
  <span></span>
  <span></span>
`;
nav.appendChild(menuBtn);
 

menuBtn.addEventListener('click', () => {
  const isOpen = navUl.classList.toggle('nav-open');
  menuBtn.classList.toggle('active', isOpen);
  menuBtn.setAttribute('aria-expanded', isOpen);
});
 

navUl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navUl.classList.remove('nav-open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});
 

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    navUl.classList.remove('nav-open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});
 
 
const habilidadesGrid = document.querySelector('.habilidades-grid');

if (habilidadesGrid) {
  const articles = habilidadesGrid.querySelectorAll('article');

  articles.forEach((article) => {
    const title = article.querySelector('h3');
    const content = article.querySelector('ul');

    content.classList.add('accordion-content');

    title.classList.add('accordion-title');
    title.setAttribute('role', 'button');
    title.setAttribute('tabindex', '0');
    title.setAttribute('aria-expanded', 'false');

    const icon = document.createElement('span');
    icon.classList.add('accordion-icon');
    icon.textContent = '▾';
    title.appendChild(icon);

    content.style.maxHeight = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.35s ease, opacity 0.35s ease';
    content.style.opacity = '0';

    const toggle = () => {
      const isOpen = article.classList.toggle('accordion-open');
      title.setAttribute('aria-expanded', isOpen);
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0';
      content.style.opacity = isOpen ? '1' : '0';

      articles.forEach((other) => {
        if (other !== article) {
          const otherTitle = other.querySelector('h3');
          const otherContent = other.querySelector('ul');
          other.classList.remove('accordion-open');
          otherTitle.setAttribute('aria-expanded', 'false');
          otherContent.style.maxHeight = '0';
          otherContent.style.opacity = '0';
        }
      });
    };

    title.addEventListener('click', toggle);
    title.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
 
 
const backToTop = document.createElement('button');
backToTop.classList.add('back-to-top');
backToTop.setAttribute('aria-label', 'Voltar ao topo');
backToTop.title = 'Voltar ao topo';
backToTop.innerHTML = '&#8679;'; // ↑
document.body.appendChild(backToTop);
 
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
 
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
 
 
const styles = document.createElement('style');
styles.textContent = `
 

  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: background 0.2s;
  }
  .menu-toggle:hover {
    background: rgba(255,255,255,0.1);
  }
  .menu-toggle span {
    display: block;
    width: 22px;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-origin: center;
  }
 
  .menu-toggle.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .menu-toggle.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .menu-toggle.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
 
  @media (max-width: 768px) {
    nav {
      flex-direction: row !important;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0 !important;
    }
 
    .menu-toggle {
      display: flex;
    }
 
    nav ul {
      width: 100%;
      flex-direction: column;
      align-items: center;
      gap: 0 !important;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease, padding 0.35s ease;
      padding: 0;
    }
 
    nav ul.nav-open {
      max-height: 400px;
      padding: 8px 0;
    }
 
    nav ul li a {
      display: block;
      padding: 10px 4px;
      width: 100%;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
 
    nav ul li:last-child a {
      border-bottom: none;
    }
  }
 
  .accordion-title {
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 4px;
  }
  .accordion-title:hover {
    color: var(--orange);
    transition: color 0.2s;
  }
  .accordion-icon {
    font-size: 1rem;
    color: var(--primary);
    transition: transform 0.35s ease;
    line-height: 1;
  }
  .accordion-open .accordion-icon {
    transform: rotate(-180deg);
  }
 
  .back-to-top {
    position: fixed;
    bottom: 28px;
    right: 24px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background-color: var(--primary);
    color: #ffffff;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
    opacity: 0;
    transform: translateY(16px);
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.2s;
    z-index: 999;
  }
  .back-to-top.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .back-to-top:hover {
    background-color: var(--orange);
  }
`;
 
document.head.appendChild(styles);

const form = document.querySelector('.contato-form');

if (form) {
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const mensagemInput = document.getElementById('mensagem');

  function mostrarErro(input, mensagem) {
    const grupo = input.closest('.form-group');
    let erro = grupo.querySelector('.erro-msg');
    if (!erro) {
      erro = document.createElement('span');
      erro.classList.add('erro-msg');
      grupo.appendChild(erro);
    }
    erro.textContent = '⚠ ' + mensagem;
    input.style.borderColor = 'var(--accent)';
    input.style.backgroundColor = '#fff0f0';
  }

  function limparErro(input) {
    const grupo = input.closest('.form-group');
    const erro = grupo.querySelector('.erro-msg');
    if (erro) erro.remove();
    input.style.borderColor = '';
    input.style.backgroundColor = '';
  }

  function validar() {
    let valido = true;

    const nome = nomeInput.value.trim();
    if (nome.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
      mostrarErro(nomeInput, 'Nome deve ter pelo menos 3 caracteres e conter apenas letras');
      valido = false;
    } else {
      limparErro(nomeInput);
    }

    const email = emailInput.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarErro(emailInput, 'Digite um e-mail válido (exemplo@dominio.com)');
      valido = false;
    } else {
      limparErro(emailInput);
    }

    const mensagem = mensagemInput.value.trim();
    if (mensagem.length < 10) {
      mostrarErro(mensagemInput, 'Mensagem deve ter pelo menos 10 caracteres');
      valido = false;
    } else {
      limparErro(mensagemInput);
    }

    return valido;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validar()) return;

    console.log('Dados do formulário:', {
      nome: nomeInput.value.trim(),
      email: emailInput.value.trim(),
      mensagem: mensagemInput.value.trim()
    });

    const contatoCol = form.closest('.contato-col');
    contatoCol.innerHTML = `
      <div class="sucesso-msg">
        <p><strong>✓ Mensagem enviada com sucesso!</strong></p>
        <p>Obrigado por entrar em contato, ${nomeInput.value.trim().split(' ')[0]}! Retornarei em breve.</p>
      </div>
    `;
  });
}