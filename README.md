# chriskbits.com

Wissenssammlung und Blog, gebaut mit [Hugo](https://gohugo.io) und ausgeliefert über GitHub Pages.

Kein Theme, kein Node/npm, keine Datenbank: nur Markdown, ein paar Templates und ein Workflow.
Jeder Push auf `main` baut und veröffentlicht die Seite automatisch (Tab **Actions**).

## Einen neuen Artikel schreiben

**Blog-Beitrag** (datiert, erscheint chronologisch):

```sh
hugo new content blog/mein-thema.md
```

**Wissensartikel** (dauerhaft, nach Thema sortiert, zeigt "Zuletzt aktualisiert"):

```sh
hugo new content wissen/<thema>/mein-artikel.md
```

Ein neues Thema ist einfach ein neuer Ordner unter `content/wissen/` mit einer `_index.md`:

```markdown
---
title: "Linux"
summary: "Kurze Beschreibung des Themas."
---
```

Dann die Datei bearbeiten, `draft: true` entfernen (oder auf `false` setzen), committen und pushen.

Ohne lokales Hugo geht es auch direkt auf GitHub: im Ordner **Add file → Create new file**, Name z. B.
`content/blog/mein-thema.md`, und oben diesen Kopf einfügen:

```markdown
---
title: "Mein Thema"
date: 2026-11-17
tags: ["linux", "netzwerk"]
---

Text in Markdown …
```

### Front Matter

| Feld      | Bedeutung                                                        |
|-----------|------------------------------------------------------------------|
| `title`   | Überschrift                                                      |
| `date`    | Veröffentlichungsdatum (Blog-Reihenfolge)                        |
| `tags`    | Gemeinsame Tags für Blog und Wissen, z. B. `["hugo", "linux"]`   |
| `summary` | Optional: Kurzbeschreibung für Listen und Suche                  |
| `draft`   | `true` = wird nicht veröffentlicht                               |

Bei Blog-Beiträgen ohne `summary` trennt `<!--more-->` den Anrisstext vom Rest.

Bilder: Artikel als Ordner anlegen (`content/blog/mein-thema/index.md`), Bild daneben legen und mit
`![Beschreibung](bild.jpg)` einbinden.

## Einzeiler (PowerShell) ergänzen

Die Seite `/einzeiler/` wird aus `data/einzeiler.yaml` erzeugt. Für einen neuen Einzeiler einen Block
in die passende Gruppe kopieren (direkt auf GitHub bearbeitbar):

```yaml
    - titel: Was der Befehl tut
      code: |-
        Get-Process | Sort-Object CPU -Descending
      beschreibung: Kurze Erklärung, Markdown erlaubt.
      link: https://learn.microsoft.com/powershell/module/...
```

Jeder Codeblock auf der ganzen Seite bekommt automatisch einen **Kopieren**-Knopf (`assets/js/copy.js`).

## Lokal ansehen

[Hugo installieren](https://gohugo.io/installation/) (eine einzelne Datei), dann:

```sh
hugo server -D      # http://localhost:1313, -D zeigt auch Entwürfe
```

## Aufbau

```
content/
  blog/            Blog-Beiträge
  wissen/<thema>/  Wissensartikel nach Thema
  einzeiler.md     Einzeiler-Seite (Inhalt aus data/einzeiler.yaml)
  ueber.md         Über mich
  suche.md         Suchseite
layouts/           HTML-Templates (eigenes Minimal-Layout)
assets/            CSS und Such-JavaScript
static/CNAME       Eigene Domain
hugo.toml          Konfiguration (Titel, Menü, …)
```

Die Suche läuft komplett im Browser: Hugo erzeugt `/index.json`, `assets/js/search.js` durchsucht ihn.

## Wartung

- **Actions** werden von Dependabot monatlich per PR aktualisiert: einfach mergen.
- **Hugo** aktualisieren: `HUGO_VERSION` in `.github/workflows/deploy.yml` anheben.
