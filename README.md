# GiardDesign — zadanie rekrutacyjne

Statyczna strona (HTML + Tailwind CSS + vanilla JS) odwzorowująca makietę `Zadanie_rekrutacyjne.fig`.

## Uruchomienie

```bash
npm install
npm run build     # jednorazowy build Tailwind -> dist/style.css
```

Potem otwórz `index.html` w przeglądarce — strona jest w pełni statyczna, nie wymaga serwera.

Podczas pracy nad stylami wygodniej jest użyć trybu watch, który przebudowuje CSS po każdej
zmianie w `index.html`, `app.js` lub `src/input.css`:

```bash
npm run watch
```

Jeśli wolisz podejrzeć stronę po HTTP (np. żeby uniknąć ograniczeń `file://`), wystarczy dowolny
serwer statyczny, np. `npx serve .`.

## Gdzie co leży

```
index.html           — cała strona: sekcje, semantyczny HTML, klasy Tailwind
app.js               — cała interaktywność, bez zależności zewnętrznych
src/input.css        — źródło Tailwind + własne komponenty (.btn, .nav-link, .card-link, .reveal)
dist/style.css       — zbudowany, zminifikowany CSS (generowany — nie edytować ręcznie)
tailwind.config.js   — tokeny projektu: kolory, typografia, siatka, promienie, animacje
img/                 — zdjęcia wyeksportowane z Figmy (Photo_*.webp) oraz ikony (pen/eye/stars.jpg)
design-tokens.md     — źródło prawdy dla kolorów, typografii i siatki (dostarczone z zadaniem)
```

Sekcje w `index.html` są oddzielone komentarzami (`<!-- ====== HERO ====== -->` itd.) i idą
w kolejności: nawigacja, hero, oferta, o firmie, realizacje (galeria), CTA, stopka, lightbox.

W `app.js` każdy blok funkcjonalny ma własny komentarz nagłówkowy: scroll reveal, cień nagłówka,
dropdown „Oferta" (desktop i mobile), wysuwane wyszukiwanie, menu mobilne, karuzela w hero,
przycisk „Rozwiń" wraz z animacją rozsypującego się piasku oraz lightbox galerii.

## Edytowanie stylów

Kolory, rozmiary czcionek, szerokości kontenerów i odstępy pochodzą z `tailwind.config.js` —
zmiana tokenu tam propaguje się na całą stronę. Powtarzalne komponenty (przyciski, linki nawigacji)
są zdefiniowane w `src/input.css` w warstwie `@layer components`. Po każdej zmianie w tych plikach
trzeba przebudować CSS (`npm run build` albo działający `npm run watch`).
