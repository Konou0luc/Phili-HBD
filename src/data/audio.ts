const base = import.meta.env.BASE_URL;

/**
 * Joyeux anniversaire — en local si `public/audio/happy-birthday.ogg` est présent,
 * sinon repli Wikimedia (CC BY-SA 3.0, Sselmer).
 */
export const happyBirthdaySources: { src: string; type: string }[] = [
  { src: `${base}audio/happy-birthday.ogg`, type: "audio/ogg" },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/de/Happy_birthday.ogg",
    type: "audio/ogg",
  },
];
