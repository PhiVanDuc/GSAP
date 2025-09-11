import { oklch, formatHex } from 'culori';

const oklchToHex = (codeColor) => {
    const color = oklch(codeColor);
    return formatHex(color);
}

export default oklchToHex;