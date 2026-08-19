
    const grade = document.getElementById('grade');
    const contagem = document.getElementById('contagem');
    const carregarWrap = document.getElementById('carregar-wrap');
    const carregarBtn = document.getElementById('carregar-mais');
    let catAtual = 'todas';
    let aroAtual = 'todos';
    let buscaAtual = '';
    let listaFiltrada = [];
    const POR_PAGINA = 24;
    let pagAtual = 0;

    const fmt = (v) => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 0 });

    const NOME_CAT = { rodas: 'Rodas', pneus: 'Pneus', acessorios: 'Acessórios', limpeza: 'Limpeza' };

    function extrairAro(nome) {
      const m = (nome || '').match(/aro\s*(\d{2})/i);
      return m ? 'aro' + m[1] : null;
    }

    function render() {
      let lista = PRODUTOS.slice();

      if (catAtual !== 'todas') lista = lista.filter(p => p.c === catAtual);

      if (aroAtual !== 'todos') {
        lista = lista.filter(p => extrairAro(p.n) === aroAtual);
      }

      if (buscaAtual) {
        const q = buscaAtual.toLowerCase();
        lista = lista.filter(p =>
          p.n.toLowerCase().includes(q) ||
          (p.m || '').toLowerCase().includes(q) ||
          (extrairAro(p.n) || '').includes(q)
        );
      }

      listaFiltrada = lista;
      pagAtual = 0;

      contagem.textContent = lista.length + ' produto(s)';

      if (!lista.length) {
        grade.innerHTML = '<div class="sem-resultados">Nenhum produto encontrado<br>para os filtros selecionados.</div>';
        carregarWrap.hidden = true;
        return;
      }

      const visiveis = lista.slice(0, POR_PAGINA);

      grade.innerHTML = visiveis.map((p, idx) => `
        <article class="card">
          <figure>
            <img src="${p.i}" alt="${p.n}" loading="eager" decoding="async" ${idx < 8 ? 'fetchpriority="high"' : ''} onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22700%22 height=%22520%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23e8e8ed%22/%3E%3C/svg%3E'">
            <span class="cat-tag">${NOME_CAT[p.c] || p.c}</span>
          </figure>
          <div class="card-body">
            <h3>${p.n}</h3>
            <span class="marca">${p.m || 'APEX Rodas'}</span>
            <div class="card-foot">
              <span class="preco">${fmt(p.p)}</span>
              <button class="negociar" data-i="${PRODUTOS.indexOf(p)}">Ver produto</button>
            </div>
          </div>
        </article>
      `).join('');

      if (lista.length > POR_PAGINA) {
        carregarWrap.hidden = false;
        carregarBtn.textContent = 'Carregar mais (' + (lista.length - POR_PAGINA) + ')';
      } else {
        carregarWrap.hidden = true;
      }
    }

    carregarBtn.addEventListener('click', () => {
      pagAtual += POR_PAGINA;
      const inicio = pagAtual * POR_PAGINA;
      const mais = listaFiltrada.slice(inicio, inicio + POR_PAGINA);
      const frag = document.createDocumentFragment();
      const tmp = document.createElement('div');
      tmp.innerHTML = mais.map((p) => `
        <article class="card">
          <figure>
            <img src="${p.i}" alt="${p.n}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22700%22 height=%22520%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23e8e8ed%22/%3E%3C/svg%3E'">
            <span class="cat-tag">${NOME_CAT[p.c] || p.c}</span>
          </figure>
          <div class="card-body">
            <h3>${p.n}</h3>
            <span class="marca">${p.m || 'APEX Rodas'}</span>
            <div class="card-foot">
              <span class="preco">${fmt(p.p)}</span>
              <button class="negociar" data-i="${PRODUTOS.indexOf(p)}">Ver produto</button>
            </div>
          </div>
        </article>
      `).join('');

      while (tmp.firstChild) frag.appendChild(tmp.firstChild);
      grade.appendChild(frag);

      const totalVisiveis = inicio + mais.length;
      if (totalVisiveis >= listaFiltrada.length) {
        carregarWrap.hidden = true;
      } else {
        carregarBtn.textContent = 'Carregar mais (' + (listaFiltrada.length - totalVisiveis) + ')';
      }
    });

    document.getElementById('filtros').addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      catAtual = btn.dataset.cat;
      document.querySelectorAll('#filtros .chip').forEach(c => c.classList.remove('ativo'));
      btn.classList.add('ativo');
      render();
    });

    document.getElementById('sub-filtros').addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      aroAtual = btn.dataset.aro;
      document.querySelectorAll('#sub-filtros .chip').forEach(c => c.classList.remove('ativo'));
      btn.classList.add('ativo');
      render();
    });

    document.getElementById('busca').addEventListener('input', (e) => {
      buscaAtual = e.target.value.trim();
      render();
    });

    // ===== Modal =====
    const modal = document.getElementById('modal');

    function abrirModal(idx) {
      const p = PRODUTOS[idx];
      if (!p) return;

      document.getElementById('m-img').src = p.i;
      document.getElementById('m-ref').textContent = 'APEX RODAS / ' + NOME_CAT[p.c].toUpperCase();
      document.getElementById('m-nome').textContent = p.n;
      document.getElementById('m-marca').textContent = p.m || 'APEX Rodas';
      document.getElementById('m-preco').textContent = fmt(p.p);
      document.getElementById('m-cat').textContent = NOME_CAT[p.c];

      const msg = encodeURIComponent(`Olá! Tenho interesse nesse produto: ${p.n}`);
      document.getElementById('m-whats').href = 'https://wa.me/5541992114884?text=' + msg;

      modal.classList.add('aberto');
      document.body.style.overflow = 'hidden';
    }

    function fecharModal() {
      modal.classList.remove('aberto');
      document.body.style.overflow = '';
    }

    document.getElementById('modal-fechar').addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) fecharModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharModal(); });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.negociar');
      if (btn) abrirModal(+btn.dataset.i);
    });

    // ===== Menu mobile =====
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
      const aberto = navLinks.classList.toggle('aberto');
      navToggle.classList.toggle('ativo', aberto);
      navToggle.setAttribute('aria-expanded', aberto);
      navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('aberto');
      navToggle.classList.remove('ativo');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    }));

    // ===== Header com sombra ao rolar =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('rolado', window.scrollY > 8);
    }, { passive: true });

    // ===== Scrollspy (destaca link da seção visível) =====
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const id = '#' + en.target.id;
          navLinks.querySelectorAll('a').forEach(a => {
            a.classList.toggle('ativo', a.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    ['topo', 'catalogo', 'como-funciona', 'sobre', 'depoimentos', 'faq'].forEach(id => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });

    // ===== Reveal =====
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visivel'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    render();
  