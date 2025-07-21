// For making transparent palette variations, check:
// https://stackoverflow.com/questions/71281969/how-to-make-the-default-color-theme-in-mui-transparent
export const PALETTE_TRANSPARENCY = {
  // 75% opacity.
  75: "BF",
  // 66% opacity.
  66: "A8",
  // 50% opacity.
  50: "80",
  // 33% opacity.
  33: "54",
  // 25% opacity.
  25: "40",
};

/**
 * Make MUI colors transparent.
 */
export function withTransparency(color: string, transparency: keyof typeof PALETTE_TRANSPARENCY) {
  return `${color}${PALETTE_TRANSPARENCY[transparency]}`;
}
