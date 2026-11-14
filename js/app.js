(function () {
  'use strict';

  const elenco = document.getElementById('elenco');
  const conteggio = document.getElementById('conteggio');
  const errore = document.getElementById('errore');
  const dialogo = document.getElementById('dettagli');
  const bottoniVista = document.querySelectorAll('.vista__btn');
  const CHIAVE_VISTA = 'catalogo.vista';
  let apps = [];

  document.getElementById('anno').textContent = new Date().getFullYear();

  /* ---------- Vista tessere / righe ---------- */
  function leggiVista() {
    try { return localStorage.getItem(CHIAVE_VISTA) === 'righe' ? 'righe' : 'tessere'; }
    catch (e) { return 'tessere'; }
  }
  function impostaVista(vista) {
    elenco.classList.toggle('elenco--tessere', vista === 'tessere');
    elenco.classList.toggle('elenco--righe', vista === 'righe');
    bottoniVista.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.vista === vista)));
    try { localStorage.setItem(CHIAVE_VISTA, vista); } catch (e) { /* storage non disponibile */ }
  }
  bottoniVista.forEach(b => b.addEventListener('click', () => impostaVista(b.dataset.vista)));
  impostaVista(leggiVista());

  /* ---------- Elenco ---------- */
  function el(tag, attributi, figli) {
    const n = document.createElement(tag);
    Object.entries(attributi || {}).forEach(([k, v]) => {
      if (k === 'text') n.textContent = v;
      else if (k === 'style') n.style.cssText = v;
      else n.setAttribute(k, v);
    });
    (figli || []).forEach(f => n.appendChild(f));
    return n;
  }

  function scheda(app) {
    const apri = el('a', { class: 'btn btn--pieno', href: app.url, target: '_blank', rel: 'noopener', text: 'Apri' });
    const dettagli = el('button', { class: 'btn', type: 'button', text: 'Dettagli', 'aria-haspopup': 'dialog' });
    dettagli.addEventListener('click', () => mostraDettagli(app));

    return el('li', { class: 'app', style: `--colore:${app.colore}` }, [
      el('img', { class: 'app__icona', src: app.icona, alt: '', width: '64', height: '64', loading: 'lazy' }),
      el('div', { class: 'app__testo' }, [
        el('h2', { class: 'app__titolo' }, [el('a', { href: app.url, target: '_blank', rel: 'noopener', text: app.titolo })]),
        el('p', { class: 'app__categoria', text: app.categoria })
      ]),
      el('p', { class: 'app__descrizione', text: app.descrizione }),
      el('div', { class: 'app__azioni' }, [apri, dettagli])
    ]);
  }

  function disegna() {
    elenco.replaceChildren(...apps.map(scheda));
    conteggio.textContent = apps.length === 1 ? '1 app' : `${apps.length} app`;
  }

  /* ---------- Dettagli ---------- */
  function mostraDettagli(app) {
    dialogo.style.setProperty('--colore', app.colore);
    document.getElementById('d-icona').src = app.icona;
    document.getElementById('d-titolo').textContent = app.titolo;
    document.getElementById('d-categoria').textContent = app.categoria;
    document.getElementById('d-descrizione').textContent = app.descrizione;
    document.getElementById('d-note').textContent = app.note || '';
    document.getElementById('d-tecnologie').replaceChildren(...app.tecnologie.map(t => el('li', { text: t })));
    document.getElementById('d-hosting').textContent = app.hosting;
    document.getElementById('d-piattaforme').textContent = app.piattaforme.join(', ');

    const apri = document.getElementById('d-apri');
    apri.href = app.url;
    apri.textContent = app.url.includes('play.google.com') ? 'Apri su Google Play' : "Apri l'app";

    const play = document.getElementById('d-play');
    const mostraPlay = app.playStore && app.playStore !== app.url;
    play.hidden = !mostraPlay;
    if (mostraPlay) play.href = app.playStore;

    if (typeof dialogo.showModal === 'function') dialogo.showModal();
    else dialogo.setAttribute('open', '');
  }
  // Chiude toccando fuori dal riquadro
  dialogo.addEventListener('click', e => { if (e.target === dialogo) dialogo.close(); });

  /* ---------- Dati ---------- */
  fetch('./data/apps.json', { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(dati => { apps = dati.apps || []; disegna(); })
    .catch(() => { errore.hidden = false; });

  /* ---------- Service worker e aggiornamenti ---------- */
  if ('serviceWorker' in navigator) {
    const avviso = document.getElementById('aggiornamento');
    let ricaricato = false;

    navigator.serviceWorker.register('./sw.js').then(reg => {
      const proponi = w => {
        avviso.hidden = false;
        document.getElementById('aggiorna').onclick = () => w.postMessage('attiva');
      };
      if (reg.waiting && navigator.serviceWorker.controller) proponi(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const nuovo = reg.installing;
        nuovo.addEventListener('statechange', () => {
          if (nuovo.state === 'installed' && navigator.serviceWorker.controller) proponi(nuovo);
        });
      });
    }).catch(() => { /* niente offline, il sito funziona lo stesso */ });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (ricaricato) return;
      ricaricato = true;
      location.reload();
    });
  }
})();
