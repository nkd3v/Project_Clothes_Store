export function convertRGB(rgbColor) {
  const match = rgbColor.match(/\d+/g); // Extract the RGB values
  if (match) {
    const [r, g, b] = match.map(Number); // Convert extracted values to numbers
    const hexColor = rgbToHex(r, g, b);
    return hexColor;
  }
}

function rgbToHex(r, g, b) {
  const clamp = (value) => Math.max(0, Math.min(255, value)); // Ensure values are within 0-255 range
  r = clamp(r);
  g = clamp(g);
  b = clamp(b);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
