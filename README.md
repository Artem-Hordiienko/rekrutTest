# GiardDesign — zadanie rekrutacyjne

Odwzorowanie makiety `Zadanie_rekrutacyjne.fig` w HTML/Tailwind + vanilla JS, z widokami
desktop / tablet / mobile i czterema propozycjami interakcji, których w pliku Figma nie było
(patrz `design-tokens.md`, sekcja "Czego w pliku NIE MA").

## Stack

- **Tailwind CSS** (CLI build, nie CDN) — tokeny koloru/typografii/siatki przeniesione 1:1
  z `design-tokens.md` do `tailwind.config.js`.
- **Vanilla JS** (`app.js`) — bez frameworka. Zakres interakcji (dropdown, wysuwane pole
  szukania, lightbox, load-more, prosty karuzela) jest na tyle mały, że framework (Alpine/React)
  dodałby więcej narzutu (bundler, hydration) niż realnie rozwiązuje. Framework JS miałby sens,
  gdyby strona rosła o kolejne widoki lub stan współdzielony między sekcjami — tu tego nie ma.

## Uruchomienie

```bash
npm install
npm run build   # jednorazowy build Tailwind -> dist/style.css
npm run watch    # tryb dev
```

Potem otwórz `index.html` bezpośrednio w przeglądarce (strona jest w pełni statyczna,
nie wymaga serwera).

## Cztery rzeczy, których nie było w pliku Figma

### 1. Rozwinięcie „Oferta” w nawigacji
Dropdown otwierany klikiem (nie hoverem — stabilniejsze na dotyku/tablecie), pokazuje 3 skróty
do podsekcji oferty (Projekty / Wizualizacje / Realizacje) z krótkim opisem, każdy linkuje do
właściwej sekcji strony. Zamyka się na Escape, klik poza, lub wybór pozycji. Na mobile ten sam
dropdown jest wbudowany jako akordeon w panelu menu (bo osobny popover nie ma sensu w wąskim
viewport).

### 2. Wysuwane pole wyszukiwania
Klik w ikonę lupy rozszerza pigułkę z 40px do 260px i pokazuje input z placeholderem
(`Czego szukasz?`), z fokusem automatycznym i zamknięciem na Escape / klik poza. Wyszukiwarka
nie jest podłączona do żadnego backendu (brak endpointu w zakresie zadania) — to czysto
interakcyjny szkielet UI.

### 3. Galeria zdjęć w popupie (lightbox)
Klik w dowolne zdjęcie w sekcji Realizacje otwiera pełnoekranowe okno z możliwością przechodzenia
strzałkami / klawiszami ←→, zamykane na Escape lub klik w tło. Fokus wraca do klikniętego
elementu po zamknięciu (dostępność klawiaturowa).

### 4. Przycisk „Rozwiń”
Doładowuje drugi rząd realizacji (ten sam układ 3-kolumnowy) z animacją wejścia i zmienia się
w „Zwiń”. Plik Figma nie zawiera dodatkowych zdjęć realizacji poza tymi 8 unikalnymi, więc drugi
batch celowo używa tego samego zestawu — w produkcji podpięcie pod CMS/API dokładałoby nowe
pozycje bez zmiany w warstwie interakcji.

## Uwaga: niespójność w wyeksportowanych plikach `.webp`

W trakcie weryfikacji (renderowanie w headless Chromium + odczyt realnych wymiarów pikselowych
z nagłówków WebP) okazało się, że **żaden** z 18 plików `Photo_*.webp` nie zawiera zdjęcia
zgodnego ze swoją nazwą, a w dodatku wariant `@2x` danej nazwy to w większości przypadków
zupełnie inne zdjęcie niż jego "1x" odpowiednik (nie ta sama fotografia w wyższej
rozdzielczości, tylko losowo inny kadr). Wygląda na przesunięcie/przetasowanie podczas eksportu
z Figmy, zanim pliki trafiły do repo — nie da się tego wywnioskować z samych nazw plików.

Konsekwencja dla kodu: `srcset` z parą 1x/2x pokazywałby dwa różne zdjęcia zależnie od
`devicePixelRatio` przeglądarki, a lightbox (podpięty pierwotnie pod `@2x` po jakość) otwierał
inne zdjęcie niż widoczny thumbnail. Naprawiono to, usuwając `srcset` i podpinając lightbox pod
dokładnie ten sam plik co miniaturka — kosztem utraty ostrości "retina", za to bez podmiany
zdjęcia w trakcie interakcji. Jeśli zależy Wam na retinie, trzeba wyeksportować pliki ponownie
z Figmy z poprawnym mapowaniem nazwa → kadr.

## Decyzja: brak biblioteki masonry

Notatka na canvasie sugerowała bibliotekę masonry (np. Masonry.js). W drzewie węzłów wysokości
kolumn galerii są jednak stałe i znane z góry (kol. 1: 601/452/338, kol. 2: 338/452/601,
kol. 3: 451/603/338 — zawsze sumują się do 1475px). Przy stałych proporcjach CSS Grid/Flexbox
daje identyczny układ bez zależności JS i bez layout shift przy ładowaniu obrazków, więc
świadomie z biblioteki zrezygnowano.

## Inne odstępstwa od pliku 1:1

- **Karuzela w Hero**: plik ma tylko jedno zdjęcie hero, ale strzałki nawigacyjne są w makiecie
  obecne i wyglądają na funkcjonalne. Podpięto pod nie lekką karuzelę (autoplay 6s, pauza na
  hover) cyklującą między zdjęciem hero i dwoma zdjęciami z realizacji — żeby strzałki miały
  realne działanie zamiast być martwym elementem dekoracyjnym.
- **Hover / focus states**: plik Figma nie zawiera żadnych stanów hover. Dodano spójny zestaw
  (uniesienie + cień na kartach/przyciskach, powiększenie zdjęć w galerii, podkreślenie linków)
  zgodny z paletą i promieniami zaokrągleń z tokenów.
- **Animacje wejścia**: sekcje i karty pojawiają się z lekkim fade+translateY przy wejściu w
  viewport (IntersectionObserver), żeby strona miała "trochę życia" zgodnie z notatką — bez
  ciężkiej biblioteki animacyjnej.
- **Ikony kart Oferty**: w pliku były to prawdopodobnie glify z biblioteki ikon niedostępnej
  poza Figmą; zastąpiono emoji o zbliżonym znaczeniu (✏️ 👁️ ✨), by uniknąć niedokładnego
  odwzorowania niedostępnego zasobu.
- **Overlay `#FFFFFF` @ 10% na zdjęciach**: odwzorowany (`bg-white/10` na obrazkach Hero/O firmie,
  `bg-white/10` w galerii), zgodnie z uwagą w `design-tokens.md`.
- **Odbicie zdjęć w poziomie** (Hero, O firmie): odwzorowane przez `-scale-x-100`, zgodnie z
  `transform m00 = -1` odnotowanym w źródle.

## Responsywność

Projekt wykonano desktop-first względem makiety (1440px), ale każda sekcja ma świadomie
zaprojektowane złamania dla tabletu (`sm`/`md`, ~768–1024px) i mobile (`<640px`):

- Nawigacja chowa się za hamburgerem poniżej `lg` (1024px), dropdown „Oferta” zamienia się
  w akordeon, wyszukiwarka w polu tekstowym na pełną szerokość panelu.
- Hero, Oferta, O firmie i CTA z 2-kolumnowych układów przechodzą w jednokolumnowe.
- Galeria Realizacje: 3 kolumny → 2 kolumny (tablet) → 1 kolumna (mobile), z zachowanymi
  proporcjami zdjęć (`aspect-ratio`) zamiast sztywnych wysokości z makiety 1440px.

## Struktura plików

```
index.html          — cała strona (semantyczny HTML + klasy Tailwind)
app.js               — cała interaktywność (bez zależności)
tailwind.config.js   — tokeny z design-tokens.md
src/input.css        — źródło Tailwind + komponenty (.btn, .card-link, .reveal, ...)
dist/style.css       — zbudowany, zminifikowany CSS (wygenerowany, nie edytować ręcznie)
Photo_*.webp         — zasoby graficzne wyeksportowane z Figmy (1x/2x)
design-tokens.md     — źródło prawdy dla kolorów/typografii/siatki (dostarczone z zadaniem)
```
