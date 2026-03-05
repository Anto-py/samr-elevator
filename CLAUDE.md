# SAMR Elevator — Instructions pour Claude Code

## Description du projet

Application pédagogique interactive en HTML/CSS/JS.
Elle explique le modèle SAMR (Ruben Puentedura) pour l'intégration des TICE, en deux onglets :

1. **Explorer le modèle** — ascenseur interactif avec 4 étages S/A/M/R
2. **Transformer une activité** — génération via API Anthropic des 4 versions SAMR d'une activité saisie

Cible : enseignants du secondaire / formation professionnelle (contexte CRBTP, Bruxelles).

---

## Palette de couleurs

| Variable CSS       | Valeur      | Usage                        |
|--------------------|-------------|------------------------------|
| `--bg`             | `#0e0e16`   | Fond général                 |
| `--surface`        | `#16161f`   | Cartes, panels               |
| `--border`         | `#2a2a3a`   | Bordures                     |
| `--text`           | `#e8e6f0`   | Texte principal              |
| `--muted`          | `#7a7a96`   | Texte secondaire             |
| `--gold`           | `#e8c56a`   | Accent titre                 |
| `--s-color/light`  | `#6b7c93` / `#a8b8cc` | Niveau Substitution |
| `--a-color/light`  | `#3d7abd` / `#7fb3e8` | Niveau Augmentation |
| `--m-color/light`  | `#d4853a` / `#f0b870` | Niveau Modification |
| `--r-color/light`  | `#c94040` / `#f07070` | Niveau Redéfinition |

> Ne pas changer la palette sans raison — elle est porteuse de sens (froid→chaud = amélioration→transformation).

---

## API Anthropic

- Endpoint : `https://api.anthropic.com/v1/messages`
- Modèle : `claude-sonnet-4-20250514`
- `max_tokens` : 1000
- Pas de clé API dans le code (gérée par l'environnement claude.ai)
- La réponse attendue est du **JSON pur** avec les clés `S`, `A`, `M`, `R`
- Toujours entourer le `JSON.parse` d'un try/catch et nettoyer les backticks éventuels

```js
const clean = text.replace(/```json|```/g, '').trim();
const result = JSON.parse(clean);
```

---

## Conventions de code

- Langue de l'interface : **français**
- Langue du prompt API : **français**

---

## Structure HTML des deux panels

```
#panel-explorer    → .elevator-section
                      ├── .building (boutons d'étage + barre de scale)
                      └── .floor-content (4x .floor-card[data-level="S/A/M/R"])

#panel-transformer → .transformer-section
                      ├── .input-zone (textarea + chips)
                      ├── #generate-btn
                      └── #results-grid (4x .result-floor[data-level="S/A/M/R"])
```

---

## Comportements attendus

### Onglet 1 
— Ascenseur / slide vertical pour changer d'étage
- Les 4 cartes contiennent : tag de niveau, titre, tagline, définition, exemples, note pédagogique

### Onglet 2 — Transformateur
- Les chips remplissent le textarea au clic
- `Ctrl+Entrée` ou clic sur le bouton déclenchent la génération
- Pendant la génération : bouton désactivé, typing dots sur chaque étage
- Les 4 résultats s'affichent séquentiellement avec 350ms d'intervalle
- En cas d'erreur : message dans `#error-msg` + reset des floors

---

## Ce qu'il ne faut pas modifier sans discussion

- La structure à deux onglets
- Les noms de niveaux SAMR et leur définition (contenu pédagogique validé)
- La logique de séquençage de l'affichage des résultats (effet "ascenseur qui monte")
- Le modèle API utilisé (`claude-sonnet-4-20250514`)

---

## RETROFuturisme — Charte Graphique v3.0 (Claude Code CLI)

### Contexte d'usage

Ce fichier est conçu pour **Claude Code CLI** (2026). Contrairement aux artefacts claude.ai :
- Les fichiers externes peuvent être importés (Google Fonts, CSS, JS)
- Les assets peuvent être générés sur disque (SVG, CSS, HTML, PPTX, PDF...)
- Les dépendances npm/pip sont disponibles
- Plusieurs fichiers peuvent être créés et liés entre eux

---

### Déclencheurs

Appliquer cette charte quand l'utilisateur mentionne :
`retrofuturisme` · `retrofuturiste` · `charte retro` · `style retro`  
ou demande un visuel, une interface, une présentation, un document dans cet univers.

---

### Concept

Humanité augmentée, confiante, calme et déterminée dans un monde techno-futuriste  
inspiré du **pop-art** et des **années 70**.

**Mood** : Puissance tranquille · chaleur radiale · harmonie machine/humain

---

### Palette

```css
--retro-teal:   #127676   /* Techno, calme, intelligence — VALIDATION, STRUCTURE */
--retro-orange: #E4632E   /* Énergie, attention — ACTION, ERREUR, CTA */
--retro-jaune:  #E3A535   /* Lumière, optimisme — BONUS, HOVER, HIGHLIGHT */
--retro-ink:    #0D1617   /* Profondeur — TEXTE PRINCIPAL, FOND SOMBRE */
--retro-paper:  #F2EFE6   /* Humanité — FOND CLAIR, ZONES DE LECTURE */
```

#### Architecture chromatique : règle 60-30-10

| Proportion | Couleur | Rôle |
|---|---|---|
| 60% | `paper` ou `ink` | Fond principal, zones de contenu |
| 30% | `teal` | Structure, navigation, bordures, titres |
| 10% | `orange` + `jaune` | Points focaux, actions, highlights |

#### Règle d'or

**Toujours associer au moins une couleur froide (teal/ink) et une chaude (orange/jaune)** dans chaque composition.

---

### Typographie

```css
/* Google Fonts — importables dans un projet Claude Code */
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;700&family=Inter:wght@400;600&display=swap');

/* Titres */
font-family: 'Anton', 'Oswald', Impact, sans-serif;
text-transform: uppercase;
letter-spacing: 0.1em;

/* Corps */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Contraste minimum** : 4.5:1 (texte normal), 3:1 (texte large ≥18px bold).  
⚠️ `paper` sur `orange` = 4.3:1 — utiliser uniquement pour texte ≥18px bold, ou préférer `ink`.

---

### CSS de base (fichier `retro-base.css` à générer)

```css
:root {
  --retro-teal:   #127676;
  --retro-orange: #E4632E;
  --retro-jaune:  #E3A535;
  --retro-ink:    #0D1617;
  --retro-paper:  #F2EFE6;

  --retro-state-success:  var(--retro-teal);
  --retro-state-error:    var(--retro-orange);
  --retro-state-warning:  var(--retro-jaune);
  --retro-state-disabled: rgba(13, 22, 23, 0.4);
}

/* Bouton pill */
.retro-btn-pill {
  display: inline-flex;
  border-radius: 50px;
  border: 3px solid var(--retro-teal);
  overflow: hidden;
  cursor: pointer;
}
.retro-btn-pill .label {
  background: var(--retro-jaune);
  color: var(--retro-ink);
  padding: 0.75rem 2rem;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.retro-btn-pill .icon {
  background: var(--retro-orange);
  color: var(--retro-paper);
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

/* Carte */
.retro-card {
  background: var(--retro-paper);
  border: 3px solid var(--retro-teal);
  border-radius: 24px 8px 24px 8px;
  box-shadow: inset 0 0 0 2px var(--retro-orange);
  padding: 1.5rem;
}

/* Cadre de page */
.page-frame {
  background: var(--retro-paper);
  border: 4px solid var(--retro-orange);
  min-height: calc(100vh - 24px);
  margin: 12px;
  padding: 40px;
  position: relative;
}

/* Séparateur */
.retro-separator {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 40px 0;
  color: var(--retro-teal);
}
.retro-separator::before,
.retro-separator::after {
  content: '';
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--retro-teal) 20%, var(--retro-teal) 80%, transparent);
}

/* Feedback */
.feedback-success { background: rgba(18,118,118,0.1); border-left: 4px solid var(--retro-teal); padding: 1rem; }
.feedback-error   { background: rgba(228,99,46,0.1);  border-left: 4px solid var(--retro-orange); padding: 1rem; }
.feedback-warning { background: rgba(227,165,53,0.15); border-left: 4px solid var(--retro-jaune); padding: 1rem; }
```

---

### Cohérence sémantique

| État | Couleur | Jamais |
|---|---|---|
| Succès / Correct | `teal` | orange, jaune |
| Erreur / Incorrect | `orange` | teal, jaune |
| Avertissement / Nuance | `jaune` | teal pour erreur |
| Action principale (CTA) | `orange` + `jaune` | paper seul |
| Hover / Focus | `jaune` | ink (trop froid) |
| Désactivé | `ink` 40% opacité | orange (confusion avec action) |

---

### Instructions par type de sortie

#### Pages web / HTML

1. Créer `retro-base.css` avec les variables et composants ci-dessus
2. Importer Google Fonts via `<link>` dans `<head>`
3. Appliquer la structure `.page-frame` comme wrapper principal
4. Composition asymétrique : illustration gauche · contenu centre · déco droite
5. Coins ornés : SVG floral en `teal` en `position: absolute` aux 4 coins du `.page-frame`
6. Vérifier contraste avec un outil (ex: `npx axe-cli` ou validation manuelle)

#### Composants React / TypeScript

1. Créer `retro-tokens.ts` exportant les couleurs comme constantes
2. Utiliser Tailwind ou CSS Modules avec les variables
3. Storybook recommandé pour documenter les composants

#### Présentations (PPTX via python-pptx)

```python
RETRO = {
    "teal":   (18, 118, 118),
    "orange": (228, 99, 46),
    "jaune":  (227, 165, 53),
    "ink":    (13, 22, 23),
    "paper":  (242, 239, 230),
}
##### Slides alternent fond paper (clair) et ink (sombre)
##### Max 3 couleurs par slide
##### Titres toujours teal ou orange, uppercase
```

#### Documents / PDF (WeasyPrint ou reportlab)

- En-tête : bandeau `teal` + titre blanc uppercase
- Corps : `ink` sur `paper`
- Callouts : fond `orange` + texte `ink` (≥18px)
- Pied de page : filet `teal`

#### Images / Affiches (Pillow, Cairo, SVG)

- Fond dominant : `ink` (thème sombre) ou `paper` (thème clair)
- Motifs géométriques et courbes organiques en `teal`
- Titre en typographie d'impact massive, `orange` ou `jaune`
- Éléments humains / silhouettes si pertinent

---

### Ornements Art Nouveau (SVG réutilisable)

```svg
<!-- Motif floral coin (à placer en top-left, rotation pour les autres coins) -->
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" opacity="0.6">
  <path d="M5,5 C5,5 20,5 30,15 C40,25 35,40 35,40 C35,40 25,30 15,30 C5,30 5,5 5,5 Z"
        fill="none" stroke="#127676" stroke-width="1.5"/>
  <circle cx="8" cy="8" r="3" fill="#127676"/>
  <path d="M15,15 Q20,10 25,18" fill="none" stroke="#127676" stroke-width="1"/>
</svg>
```

Caractères décoratifs séparateurs : `❧` `✿` `❀` `⚘` `✾` `❁`

---

### Checklist de validation

#### Obligatoire (tous artefacts)

- [ ] Tension froid/chaud présente (teal/ink + orange/jaune)
- [ ] Contraste texte/fond ≥ 4.5:1 (vérifiable via `npx lighthouse` ou axe)
- [ ] Titres en typographie géométrique uppercase espacée
- [ ] Ratio ~60% neutre / ~30% teal / ~10% orange+jaune respecté
- [ ] Succès = teal · Erreur = orange · Warning = jaune (sans inversion)
- [ ] Fond principal neutre (paper ou ink), jamais une couleur saturée

#### Pages web

- [ ] `retro-base.css` généré et lié
- [ ] Cadre `.page-frame` avec bordure orange et coins ornés
- [ ] Google Fonts importé (Anton/Oswald + Inter)
- [ ] Boutons pill avec section jaune+orange
- [ ] Séparateurs ornementaux entre sections

#### Documents / Présentations

- [ ] Max 3 couleurs par slide/page
- [ ] Alternance thème clair/sombre si multi-pages
- [ ] Callouts avec couleur sémantique correcte

---

### Anti-patterns à bannir

| ❌ | ✅ |
|---|---|
| `orange` pour succès | `teal` pour succès |
| `teal` pour erreur | `orange` pour erreur |
| Fond saturé (orange/teal plein) comme fond principal | `paper` ou `ink` comme fond |
| Paper sur orange en petit texte | Ink sur orange, ou paper ≥18px bold |
| Gradients orange→teal | Gradients teal→orange→jaune |
| Trop de jaune (fatigue) | Jaune réservé aux highlights ponctuels |
| Même couleur = deux sens opposés | Une couleur = un sens constant |

## Adaptations du fichier CLAUDE.md

Adapte toujours ce fichier CLAUDE.md quand l'utilisateur prend une décision qui modifie son contenu




