---
title: "Einen neuen Artikel schreiben"
date: 2026-11-17
tags: ["hugo", "meta"]
summary: "So entsteht ein neuer Blog-Beitrag oder Wissensartikel auf dieser Seite."
---

## Blog-Beitrag

```sh
hugo new content blog/mein-thema.md
```

## Wissensartikel

Jedes Thema ist ein Ordner unter `content/wissen/`. Ein neuer Artikel:

```sh
hugo new content wissen/hugo/mein-artikel.md
```

Danach `draft: true` entfernen, committen und pushen. Die Seite wird automatisch neu gebaut.
