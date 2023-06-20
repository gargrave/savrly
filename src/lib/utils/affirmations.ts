const aff = [
  "Nice work!",
  "Great job!",
  "You are really something special!",
  "Keep on keepin' on!",
];

const len = aff.length;
export const randomAffirmation = (): string =>
  aff[Math.floor(Math.random() * aff.length)];
