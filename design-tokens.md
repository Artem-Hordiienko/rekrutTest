# GiardDesign - design tokens (wyciagniete z pliku .fig)

Zrodlo: Zadanie_rekrutacyjne.fig, canvas.fig (fig-kiwi v35), plik z 2023-08-14.
Wszystkie wartosci sa odczytane z drzewa wezlow, nie z pomiaru na oko.

## Kolory

| Token | Hex | Uzycie |
|---|---|---|
| green | #1B5B31 | przyciski fill, akcenty, blok Instagram, sekcja O firmie |
| black | #111111 | tekst podstawowy, logo, tlo footera |
| beige | #DCC1AB | tlo Hero, tlo Realizacje |
| cream | #F5F0EC | tlo Oferta, tekst na ciemnym, tlo bloku ze strzalkami |
| white | #FFFFFF | tlo navi, karty oferty |
| note | #FFE6C0 | tylko notatki na canvasie, nie wchodzi do kodu |

Overlay: kazde zdjecie (Hero, O firmie, wszystkie Realizacje) ma dodatkowy fill
`#FFFFFF` z opacity **0.1** nalozony na obrazek. Nie pomijaj tego, bez niego zdjecia
sa wyraznie bardziej nasycone niz w makiecie.

Gradient nad galeria (blok Realizacje):
- prostokat 1440x1000, y=475 wewnatrz kontenera Photos (1440x1475)
- linear, `transparent` -> `#DCC1AB` (od gory do dolu)

## Typografia

Fonty w wezlach: **Montserrat** (naglowki) + **Inter** (tekst, kursywa w naglowkach).
Oba sa darmowe na Google Fonts, wiec odwzorowanie jest 1:1.

Uwaga: plik zawiera rownolegly, nieuzywany zestaw stylow **Bagoss TRIAL Extended**.
To byl pierwotny zamysl projektanta, ale to font probny (TRIAL), bez licencji.
Realne wezly uzywaja Montserrat/Inter i tak wygladaja renderowane makiety.

| Rola | Font | Size | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 (Hero) | Montserrat Medium (500) | 60 | 70px (1.1667) | 0 |
| H2 (Dzialamy / Tworzymy / Nasze) | Montserrat Medium | 48 | 1.15 | -3% |
| H2 kursywa (kompleksowo, pasja, projekty) | Inter Medium Italic | 48 | 1.15 | 0 |
| H3 Instagram | Montserrat Regular (400) | 40 | 1.2 | -2px |
| H3 Instagram kursywa | Inter Medium Italic | 40 | 1.2 | +1px |
| H4 (tytuly kart) | Montserrat Medium | 28 | 1.15 | -5% |
| Body | Inter Regular | 16 | 1.5 | -1% (Hero: 0) |
| Body-small (opisy kart) | Inter Regular | 14 | 1.5 | -1% |
| Nav links / footer links | Inter Regular | 14 | 1.5 | -1% |
| Eyebrow (Oferta / O firmie / Realizacje) | Inter Regular | 12 | 1.5 | -1% |
| Button label | Inter Regular | 16 | 1.5 | 0 |

## Siatka

Grid ustawiony na glownym frame:
- typ STRETCH, 12 kolumn
- margines boczny **89px**
- gutter **64px**
- szerokosc kontentu **1262px** (1440 - 2x89)
- szerokosc kolumny = (1262 - 11x64) / 12 = **46.5px**

Kontenery uzywane w projekcie:
- **1262px** (offset 89) - navi, kontent Hero, karty Oferty
- **1040px** (offset 200) - naglowek Oferty, blok Instagram, footer. To kolumny 2-11,
  wiec mimo innej liczby jest zgodne z siatka.
- **offset 160** - naglowek sekcji Realizacje. To jedyne miejsce, ktore NIE lezy na siatce.
  Prawdopodobnie niedopatrzenie projektanta. Decyzja do udokumentowania: albo wyrownac do 89,
  albo do 200. Rekomendacja: 200, bo to samo co pozostale naglowki sekcji.

## Wysokosci sekcji (1440px)

| Sekcja | H | Uwagi |
|---|---|---|
| Navi | 72 | logo 114x19, gap miedzy linkami wynika z pozycji, ikona lupy 24x24 |
| Hero | 737 | NIE 100vh |
| Oferta | 939 | padding-top 120 |
| O firmie | 720 | |
| Realizacje | 1824 | naglowek y=120, galeria y=305, wysokosc galerii 1475 |
| Instagram | 478 | |
| Footer | 499 | |

## Hero

- Kontent: 599x448 @ (89, 144)
- Headline 599x210, paragraf 489x72, odstep naglowek/paragraf 44px (254-210)
- Przyciski y=398, odstep miedzy nimi 36px (244 - 208)
- Zdjecie: 688x737, przyklejone do prawej krawedzi, `transform m00 = -1` czyli
  **obrazek jest odbity w poziomie**. Latwo przeoczyc.
- Blok strzalek: 192x96, tlo **solid #F5F0EC** (bez blur, bez przezroczystosci),
  padding 32/24, gap 32, dwa pola 48x48, strzalka 24px

## Oferta

- Naglowek: kontener 1040 @ x=200, y=120; eyebrow -> 34px -> H2 -> 32px (87-55) -> paragraf
- Karty: 3 x 378x370, x = 89 / 531 / 973, gutter 64
- Karta: `border-radius: 28px`, tlo #FFFFFF, padding 40 poziomo / 48 pionowo,
  auto-layout VERTICAL gap 32
- Ikona 44x44, tytul 28px, opis 14px, link u dolu y=294

## O firmie

- Zdjecie 688x720 po lewej, przyklejone do lewej krawedzi, rowniez **odbite** (m00 = -1)
- Kontent 596x450 @ x=752, wewnetrzny padding-left 96
- Przycisk 194x50 (outline)

## Realizacje (masonry)

To nie jest losowy masonry. Trzy rowne kolumny, wszystkie koncza sie na tej samej wysokosci.

- 3 kolumny, x = 0 / 494 / 989, szerokosci 451 / 452 / 451, gap **42-43px**
- pelna szerokosc ekranu (bez marginesow bocznych)
- wysokosci kart:
  - kol. 1: 601, 452, 338
  - kol. 2: 338, 452, 601
  - kol. 3: 451, 603, 338
- laczna wysokosc kazdej kolumny: 1475
- przycisk "Rozwin" 123x50 wysrodkowany, y=1379.5

Wniosek praktyczny: proporcje sa znane z gory, wiec CSS grid ze `span` daje identyczny
uklad bez JS i bez layout shift. Biblioteka masonry nie jest technicznie potrzebna.

## Przyciski

Komponent ma warianty Fill i Outline, wszystkie `border-radius: 200px` (pill).

| Wariant | Rozmiar | Padding | Gap | Tlo | Tekst |
|---|---|---|---|---|---|
| Fill (Skontaktuj sie z nami) | 208x50 | 24 / 12 | 10 | #1B5B31 | #F5F0EC |
| Outline (Zobacz nasze realizacje) | 249x50 | 22 / 12 | 8 | brak, stroke 1px | #1B5B31 |
| Outline (Poznaj nas blizej) | 194x50 | 22 / 12 | 8 | stroke 1px | |
| Outline (Rozwin) | 123x50 | 22 / 12 | 8 | stroke 1px | |
| Instagram (na zielonym) | 124x46 | 24 / 10 | 10 | #FFFFFF | #1B5B31 |
| Link tekstowy w karcie | 171x28 / 207x28 | 0 | 10 | brak | podkreslenie + strzalka |

## Czego w pliku NIE MA

Sprawdzone, nie istnieje w drzewie wezlow:
- zadnego stanu hover, focus ani active
- zadnego rozwinietego dropdownu "Oferta"
- zadnego wysunietego pola wyszukiwania
- zadnych slajdow Hero poza pierwszym
- zadnego prototypu / interakcji

Czyli "zaproponuj swoje rozwiazanie" jest doslowne. Te cztery rzeczy to wlasnie
przedmiot oceny i trzeba je opisac w README, a nie tylko zakodowac.

## Teksty (do skopiowania 1:1)

- H1: `Nowoczesna aranżacja\nTwojego ogrodu`
- Hero paragraf: `Marka GiardDesign to wieloletnie doświadczenie i wysoka estetyka realizacji. Oferujemy kompleksowy zakres usług z indywidualnym podejściem do każdego projektu.`
- Nav: Oferta (dropdown), O firmie, Realizacje, Kontakt + ikona szukania
- Footer: Kontakt, Instagram, Facebook, LinkedIn, 000-000-000, giarddesign@kontakt.pl,
  `Prawa zastrzeżone © 2022`, `made by adRespect`

Uwaga: w tekstach uzyto znaku U+2028 (line separator) jako lamania linii,
m.in. w `Tworzymy\u2028z pasją` i w opisie karty Wizualizacje. W HTML to zwykly `<br>`.
