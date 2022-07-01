# Intro to (web) programming talk

Hele gezellige collega's bij Ordina, maar wat doen die software developers nou eigenlijk de hele dag?

In twee uurtjes krijg je de allereerste basis van het (web) programmeren uitgelegd. We gebruiken hiervoor de webtalen: HTML, CSS en JavaScript (veel van mijn mede-developers zullen het oneens zijn met deze keuze :D ). Aan het einde van de workshop heb je een eenvoudige site gemaakt, en als je daarna de smaak te pakken hebt kan ik altijd meer lesmateriaal adviseren.

Doelpubliek: mensen zonder enige ervaring met programmeren die wat meer willen begrijpen van de dagelijkse bezigheden van onze developers. Maak je geen zorgen: iedereen kan dit leren!

## Running

Start by opening index.html in a browser

Set full screen (e.g. with "F")

Start speaker mode (server needed only for speaker notes):

- nvm use 16
- serve . -p 5000
- go to http://localhost:5000
- press "S"

Print with:

- open in browser: http://localhost:5000/?print-pdf
- ctrl+P
- export as PDF

NOTE: the dir `assets` contains presentation specific **runtime** assets

## Reveal

Installed Reveal by downloading 4.3.1 from https://github.com/hakimel/reveal.js/releases

### Codestar theme

css/theme/source/codestar.scss
dist/theme/fonts/conduit-itc-std/*
dist/theme/fonts/fira-code/*

- run `npm i`
- run `npm run build -- css-themes`
- start like explained at the top of this file

### Disabled timer in speaker view

- modified CSS in plugin/notes/speaker-view.html
- rebuild with `npm run build`
