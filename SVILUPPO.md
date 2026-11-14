# SVILUPPO — entratadisicurezza.app (catalogo)

## Scopo
Una pagina unica (PWA installabile) che elenca tutte le app realizzate, organizzabile per tessere o righe.

## Scelte
- **Stack:** HTML/CSS/JS puro, nessuna build, service worker scritto a mano.
- **Dati:** file curato `data/apps.json` (non l'API di GitHub), così nomi e descrizioni sono in italiano e compaiono anche le app con repository privato.
- **Hosting:** GitHub Pages + GitHub Actions, dominio `catalogo.entratadisicurezza.com` (CNAME su Tophost → `pippotorre.github.io`).
- **Link:** il link principale porta all'app pubblicata; il repository GitHub non viene mostrato. Le app su Google Play hanno in più il link allo store nei Dettagli.
- **Esclusi:** `catalogo` (sé stesso), `immaginaria` (non pronta), `laundryscanner-privacy` (pagina privacy dell'app Android).
- **Rinomina:** il repository `alberico` compare come **Buon App**.
- **Grafica:** sfondo carta, testata blu notte; ogni scheda prende il colore (`theme_color`) e l'icona della sua app. Tema scuro automatico. Icona del catalogo provvisoria (quattro tessere colorate), generata con Python/Pillow.
- **Offline:** app shell e icone in cache (cache-first); `apps.json` network-first con copia di riserva. Cache versionata (`catalogo-v1`) e avviso di aggiornamento.
- La scelta tessere/righe è ricordata sul dispositivo (localStorage).

## App in catalogo (14/11/2026)
Buon App, Nasone, Turet, Fontanelle, spesaok, Uova, Guida Claude, sVolta, Reserve, LaundryScanner.

## Funzionalità
- [x] Vista a tessere e a righe, con scelta ricordata
- [x] Per ogni app: titolo, descrizione, link, pulsante Dettagli (tecnologie, hosting, piattaforme, note, Google Play)
- [x] Installabile e funzionante offline
- [x] Deploy automatico su GitHub Pages
- [ ] Da verificare: link Google Play effettivamente attivi (Buon App, Nasone, Turet, LaundryScanner)
- [ ] Idee: ricerca/filtro per categoria o tecnologia, ordinamento, logo definitivo

## Registro
| Data | Cosa |
|---|---|
| 14/11/2026 | Prima versione: struttura PWA, dati delle 10 app ricavati dai README e dai manifest dei repository, icone copiate dalle singole app, workflow di pubblicazione. |
