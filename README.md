# entratadisicurezza.app — catalogo delle app

PWA che raccoglie in una pagina tutte le app di entratadisicurezza.com, visualizzabili **a tessere** o **a righe**.
Ogni app ha titolo, breve descrizione, link all'app pubblicata e un pulsante **Dettagli** con tecnologie, hosting, piattaforme e (se c'è) il link a Google Play.

Indirizzo: **https://catalogo.entratadisicurezza.com/**

## Aggiungere o modificare un'app
Tutto sta in `data/apps.json`. Per una nuova app aggiungi un oggetto all'elenco `apps` e metti la sua icona (128×128 PNG) in `img/app/`, poi aggiungi il percorso dell'icona alla lista `SHELL` in `sw.js` e aumenta `VERSIONE`.

Campi: `id`, `titolo`, `descrizione`, `url`, `icona`, `colore`, `categoria`, `tecnologie` (elenco), `hosting`, `piattaforme` (elenco), `playStore` (URL o `null`), `note`.

## Pubblicazione (GitHub Pages)
1. **Settings → Pages → Build and deployment → Source:** *GitHub Actions*.
2. **Settings → Pages → Custom domain:** `catalogo.entratadisicurezza.com`, poi **Enforce HTTPS** quando il controllo DNS è superato.
3. DNS su Tophost: record `CNAME` da `catalogo` a `pippotorre.github.io` (già fatto).
4. Ogni push su `main` pubblica il sito (workflow `.github/workflows/deploy.yml`).

Per un rilascio che cambia CSS/JS aumenta `?v=` in `index.html` e in `sw.js`, e `VERSIONE` in `sw.js`: chi ha l'app aperta vedrà «Nuova versione disponibile – Aggiorna».

## Provarla in locale
`python3 -m http.server` nella cartella del progetto, poi apri http://localhost:8000/.

Diario di sviluppo: [SVILUPPO.md](SVILUPPO.md).
