# Bine baaaa

Aplicația de weekend a găștii: parolă, selfie + nume, activități pe zile, like-uri, „Merg și eu”, comentarii.

- `index.html` – pagina și stilul
- `app.js` – logica (Firebase: conturi, date live)
- `bg.jpg` – poza găștii
- `firestore.rules` – regulile de securitate pentru Firestore (se copiază manual în Firebase → Firestore → Rules)

Hosting: Netlify, legat de acest repo. Orice push pe `main` publică automat.

Conturi: utilizator + parolă (parola e hash-uită SHA-256 înainte să plece din telefon) sau Google. Un cont făcut cu utilizator se poate lega de Google din Profil.
Admin: ardelean.alex2003@gmail.com, logat cu Google.
