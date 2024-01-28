import colorName from 'color-name';
import hex2Rgb from 'hex-rgb';

const pattern = /^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/;
var hexRe = new RegExp(pattern, 'i');

const float = '-?\\d*(?:\\.\\d+)';

const number = `(${float}?)`;
const percentage = `(${float}?%)`;
const numberOrPercentage = `(${float}?%?)`;

const pattern$1 = `^
  hsla?\\(
    \\s*(-?\\d*(?:\\.\\d+)?(?:deg|rad|turn)?)\\s*,
    \\s*${percentage}\\s*,
    \\s*${percentage}\\s*
    (?:,\\s*${numberOrPercentage}\\s*)?
  \\)
  $
`.replace(/\n|\s/g, '');

var hsl3Re = new RegExp(pattern$1);

const pattern$2 = `^
  hsla?\\(
    \\s*(-?\\d*(?:\\.\\d+)?(?:deg|rad|turn)?)\\s*
    \\s+${percentage}
    \\s+${percentage}
    \\s*(?:\\s*\\/\\s*${numberOrPercentage}\\s*)?
  \\)
  $
`.replace(/\n|\s/g, '');

var hsl4Re = new RegExp(pattern$2);

const pattern$3 = `^
  rgba?\\(
    \\s*${number}\\s*,
    \\s*${number}\\s*,
    \\s*${number}\\s*
    (?:,\\s*${numberOrPercentage}\\s*)?
  \\)
  $
`.replace(/\n|\s/g, '');

var rgb3NumberRe = new RegExp(pattern$3);

const pattern$4 = `^
  rgba?\\(
    \\s*${percentage}\\s*,
    \\s*${percentage}\\s*,
    \\s*${percentage}\\s*
    (?:,\\s*${numberOrPercentage}\\s*)?
  \\)
  $
`.replace(/\n|\s/g, '');

var rgb3PercentageRe = new RegExp(pattern$4);

const pattern$5 = `^
  rgba?\\(
    \\s*${number}
    \\s+${number}
    \\s+${number}
    \\s*(?:\\s*\\/\\s*${numberOrPercentage}\\s*)?
  \\)
$
`.replace(/\n|\s/g, '');

var rgb4NumberRe = new RegExp(pattern$5);

const pattern$6 = `^
  rgba?\\(
    \\s*${percentage}
    \\s+${percentage}
    \\s+${percentage}
    \\s*(?:\\s*\\/\\s*${numberOrPercentage}\\s*)?
  \\)
$
`.replace(/\n|\s/g, '');

var rgb4PercentageRe = new RegExp(pattern$6);

const pattern$7 = /^transparent$/;
var transparentRe = new RegExp(pattern$7, 'i');

const clamp = (num, min, max) => Math.min(Math.max(min, num), max);

/* 500 => 255, -10 => 0, 128 => 128 */
const parseRGB = (num) => {
  let n = num;
  if (typeof n !== 'number') n = n.endsWith('%') ? (parseFloat(n) * 255) / 100 : parseFloat(n);
  return clamp(Math.round(n), 0, 255);
};

/* 200 => 100, -100 => 0, 50 => 50 */
const parsePercentage = (percentage) => clamp(parseFloat(percentage), 0, 100);

/* '50%' => 5.0, 200 => 1, -10 => 0 */
function parseAlpha(alpha) {
  let a = alpha;
  if (typeof a !== 'number') a = a.endsWith('%') ? parseFloat(a) / 100 : parseFloat(a);
  return clamp(a, 0, 1);
}

function getHEX(hex) {
  const [r, g, b, a] = hex2Rgb(hex, { format: 'array' });
  return getRGB([null, ...[r, g, b, a]]);
}

function getHSL([, h, s, l, a = 1]) {
  let hh = h;
  if (hh.endsWith('turn')) {
    hh = (parseFloat(hh) * 360) / 1;
  } else if (hh.endsWith('rad')) {
    hh = Math.round((parseFloat(hh) * 180) / Math.PI);
  } else {
    hh = parseFloat(hh);
  }
  return {
    type: 'hsl',
    values: [hh, parsePercentage(s), parsePercentage(l)],
    alpha: parseAlpha(a === null ? 1 : a)
  };
}

function getRGB([, r, g, b, a = 1]) {
  return {
    type: 'rgb',
    values: [r, g, b].map(parseRGB),
    alpha: parseAlpha(a === null ? 1 : a)
  };
}

/**
 * parse-css-color
 * @version v0.2.1
 * @link http://github.com/noeldelgado/parse-css-color/
 * @license MIT
 */

const parseCSSColor = (str) => {
  if (typeof str !== 'string') return null;

  const hex = hexRe.exec(str);
  if (hex) return getHEX(hex[0]);

  const hsl = hsl4Re.exec(str) || hsl3Re.exec(str);
  if (hsl) return getHSL(hsl);

  const rgb =
    rgb4NumberRe.exec(str) ||
    rgb4PercentageRe.exec(str) ||
    rgb3NumberRe.exec(str) ||
    rgb3PercentageRe.exec(str);
  if (rgb) return getRGB(rgb);

  if (transparentRe.exec(str)) return getRGB([null, 0, 0, 0, 0]);

  const cn = colorName[str.toLowerCase()];
  if (cn) return getRGB([null, cn[0], cn[1], cn[2], 1]);

  return null;
};

export default parseCSSColor;
