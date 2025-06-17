📁 src/system/
│
├── 📁 tokens/             // Design tokens (CSS / SASS variables)
│   ├── colors.scss
│   ├── typo-tokens.scss
│   ├── 
│   └── shadows.scss
│
├── 📁 mixins/             // Mixins utiles : responsive, fluid fonts, gradients
│   ├── responsive.scss
│   ├── fluid-type.scss
│   └── accessibility.scss
│
├── 📁 base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _root.scss         // Variables CSS : dark mode, transitions, etc.
│
├── 📁 layout/
│   ├── grid.scss          // Grille simple, inspirée de Bootstrap
│   └── spacing.scss       // Classes utilitaires d'espacement
│
├── 📁 components/
│   ├── buttons.scss
│   ├── cards.scss
│   ├── forms.scss
│   └── utilities.scss     // Helpers (.text-center, .hide, .sr-only, etc.)
│
└── main.scss              // Point d’entrée importé dans App.jsx
