// Variant of the game of life
export const CUSTOM = {
  name: "Personnalisée",
  rules: {
    born: [false, false, false, false, false, false, false, false, false],
    survive: [false, false, false, false, false, false, false, false, false]
  }
};
const CONWAY = {
  name: "Conway: Jeu de la Vie (B2/S23)",
  rules: {
    born: [false, false, false, true, false, false, false, false, false],
    survive: [false, false, true, true, false, false, false, false, false]
  }
};
const DAY_NIGHT = {
  name: "Day & Night (B3678/S34678)",
  rules: {
    born: [false, false, false, true, false, false, true, true, true],
    survive: [false, false, false, true, true, false, true, true, true]
  }
};
const HIGHLIFE = {
  name: "HighLife (B36/S23)",
  rules: {
    born: [false, false, false, true, false, false, true, false, false],
    survive: [false, false, true, true, false, false, false, false, false]
  }
};

export const TYPE_GAME_OF_LIFE = [CUSTOM, CONWAY, DAY_NIGHT, HIGHLIFE];

const DEFAULT_VARIANT = 1; // Number of the default variant for the game of life

export const INIT_CONTROLS = {
  // Initial state of the controls section
  speed: 500, // Speed of the animation in ms
  variant: { ...TYPE_GAME_OF_LIFE[DEFAULT_VARIANT] }, // Use for the variant of the game of life
  play: false // true is the animation is set to play
};

export const INIT_WINDOWS = {
  // Initial state of the windows section
  click: false, // To handle when the user click
  cells: new Map() // represent the board. Map with String has key and int as value
};

export const INIT_CORE = {
  // Initial state of the core section (ie common to all sections)
  nbR: 20, // Number of rows
  nbC: 20, // Number of columns
  size: 15 // Size of the blocs
};

export const NB_COLORS = 2; // Number of colors set in the CSS

/* Buttons */

export const BUTTON_COLOR = "btn-success"; // Bootstrap of the button
