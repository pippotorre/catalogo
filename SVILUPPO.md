# SVILUPPO — entratadisicurezza.app (catalogo)

## Scopo
Una pagina unica (PWA installabile) che elenca tutte le app realizzate, organizzabile per tessere o righe.

## Scelte
- **Stack:** HTML/CSS/JS puro, nessuna build, service worker scritto a mano.
- **Dati:** file curato `data/apps.json` (non l'API di GitHub), così nomi e descrizioni sono in italiano e compaiono anche le app con repository privato.
- **Hosting:** GitHub Pages + GitHub Actions, dominio `catalogo.entratadisicurezza.com` (CNAME su Tophost → `pippotorre.github.io`).
- **Link:** il link principale porta all'app pubblicata; il repository GitHub non viene mostrato. Le app su Google Play hanno in più il link allo store nei Dettagli.
- **Google Play in pubblicazione:** con `"playStoreStato": "in-pubblicazione"` in `apps.json` i link allo store non si aprono e mostrano il toast «In fase di pubblicazione su Google Play». Quando un'app è approvata basta togliere quel campo.
- **Privacy e funzionamento:** nei Dettagli, per ogni app, le voci *trattiene dati personali*, *funziona offline*, *usa la posizione*, *richiede account*, *notifiche* (campo `caratteristiche` in `apps.json`, valori `si`/`no`/`parziale`/`minimi` + testo breve), più la riga fissa «Nessun cookie di tracciamento, nessuna pubblicità». Informazioni ricavate dalle informative privacy e dal codice di ciascuna app (15/11/2026).
- **Esclusi:** `catalogo` (sé stesso), `immaginaria` (non pronta), `laundryscanner-privacy` (pagina privacy dell'app Android).
- **Rinomina:** il repository `alberico` compare come **Buon App**.
- **Grafica:** sfondo carta, testata blu notte; ogni scheda prende il colore (`theme_color`) e l'icona della sua app. Tema scuro automatico. Icona del catalogo provvisoria (quattro tessere colorate), generata con Python/Pillow.
- **Offline:** app shell e icone in cache (cache-first); `apps.json` network-first con copia di riserva. Cache versionata (`catalogo-v1`) e avviso di aggiornamento.
- La scelta tessere/righe è ricordata sul dispositivo (localStorage).

## App in catalogo (14/11/2026)
Buon App, Nasone, Turet, Fontanelle, spesaok, Bookcase, Uova, Guida Claude, sVolta, Reserve, LaundryScanner.

## Funzionalità
- [x] Vista a tessere e a righe, con scelta ricordata
- [x] Per ogni app: titolo, descrizione, link, pulsante Dettagli (tecnologie, hosting, piattaforme, note, Google Play)
- [x] Installabile e funzionante offline
- [x] Deploy automatico su GitHub Pages
- [x] Sezione «Privacy e funzionamento» nei Dettagli
- [x] Toast «In fase di pubblicazione» sui link Google Play
- [ ] Togliere `playStoreStato` quando le app sono approvate (Buon App, Nasone, Turet, LaundryScanner, Bookcase)
- [ ] Idee: ricerca/filtro per categoria o tecnologia, ordinamento, logo definitivo

## Registro
| Data | Cosa |
|---|---|
| 14/11/2026 | Prima versione: struttura PWA, dati delle 10 app ricavati dai README e dai manifest dei repository, icone copiate dalle singole app, workflow di pubblicazione. |
| 15/11/2026 | spesaok su `spesaok.entratadisicurezza.com`; toast «In fase di pubblicazione» per i link Google Play; sezione «Privacy e funzionamento» nei Dettagli; corretto il pulsante Google Play che compariva anche senza link (`[hidden]` scavalcato da `.btn`). Cache `catalogo-v2`. |
| 15/11/2026 | Statistiche di visita con GoatCounter (senza cookie), dashboard comune https://entratadisicurezza.goatcounter.com: script in `index.html`, percorso inviato `/catalogo/` (nome dell'app davanti al percorso, perché sui sottodomini sarebbe `/` per tutte). Nessun pulsante di installazione, quindi nessun evento. Riga «Le visite sono contate in forma anonima, senza cookie» nel piè di pagina; per Uova il testo «Non raccoglie dati» diventa «Non raccoglie dati personali». `?v=3`, cache `catalogo-v3`. |
| 15/11/2026 | Aggiunta **Bookcase** (www.entratadisicurezza.com/bookcase/, Tophost PHP + MySQL, Google Play in pubblicazione). Nuovo valore `facoltativo` per le voci *dati* («Solo con account») e *account* («Facoltativo»). Icona `img/app/bookcase.png`. Cache `catalogo-v4`. |
