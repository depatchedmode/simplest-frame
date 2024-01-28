# parse-css-color
[![NPM Version][npm-image]][npm-url]
![](https://img.badgesize.io/noeldelgado/parse-css-color/master/src/index.js.svg?compression=gzip)
[![License][license-img]][license-url]
[![Known Vulnerabilities][snyk-img]][snyk-url]
[![Libraries.io dependency status for latest release][librariesio-img]][librariesio-url]
[![Total alerts][lgtm-image]][lgtm-url]
[![Language grade: JavaScript][lgtm-grade-image]][lgtm-grade-url]

Parse a CSS color string.

### Supports
* \<color value\>
	* Hexadecimal RGB value: #RGB #RRGGBB
	* #RGBA #RRGGBBAA (4 and 8-digit hexadecimal RGBA notation)
	* RGB/A color module level 3 and 4 (number, percentage)
	* HSL/A color module level 3 and 4 (number, deg, rad, turn)
* \<color keyword\>
	* One of the [pre-defined color keywords](https://www.w3.org/wiki/CSS/Properties/color/keywords).
* transparent
	* Shorthand for transparent black, rgba(0,0,0,0).

### Does not support
* currentColor
* inherit

## Installation

**NPM**

```sh
npm i parse-css-color
```

Or as a `<script>` tag from a CDN as `parseCssColor`:

**Unpkg CDN**

```html
<script src="https://unpkg.com/parse-css-color"></script>
```

**jsDelivr CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/parse-css-color"></script>
```

## Usage
```js
import parse from 'parse-css-color'

// HEX/A
parse('#00f')
//> { type: 'rgb', values: [0, 0, 255], alpha: 1 }
parse('#00f8')
//> { type: 'rgb', values: [0, 0, 255], alpha: 0.5333333333333333 }
parse('#0000FF80')
//> { type: 'rgb', values: [0, 0, 255], alpha: 0.5019607843137255 }
parse('#00g')
//> null

// HSL/A
parse('hsl(270deg 60% 70% / 25%)')
//> { type: 'hsl', values: [270, 60, 70], alpha: 0.25 }
parse('hsl(4.71239rad 260% -70% / 0.5)') // clipped to
//> { type: 'hsl', values: [270, 100, 0], alpha: 0.5 }
parse('hsla(.75turn, 60%, 70%, 50%)')
//> { type: 'hsl', values: [270, 60, 70], alpha: 0.5 }
parse('hsla(100deg 0 0 / 0)') // error: missing percetanges
//> null

// RGB/A
parse('rgb(255 0 0 / 0.5)')
//> { type: 'rgb', values: [255, 0, 0], alpha: 0.5 }
parse('rgb(500 -100 0 / 200%)') // clipped to
//> { type: 'rgb', values: [255, 0, 0], alpha: 1 }
parse('rgba(255, 0, 255, 20%)')
//> { type: 'rgb', values: [255, 0, 255], alpha: 0.2 }
parse('rgba(100% 255 100% / 0)') // error: mixed percetange with integer
//> null
```
See [tests](https://github.com/noeldelgado/parse-css-color/tree/master/test) for more cases.

## Dev
```sh
npm install   # install dependencies
npm test      # run the tests (append `-- -w`) to watch
npm run dev   # watch for changes and rebuild
```

## Related
- [mix-css-color](https://github.com/noeldelgado/mix-css-color) - Mix two CSS colors together in variable proportion. Opacity is included in the calculations.
- [values.js](https://github.com/noeldelgado/values.js) - Get the tints and shades of a CSS color.

## License
MIT © [Noel Delgado](http://pixelia.me/)

[npm-image]: https://img.shields.io/npm/v/parse-css-color.svg?logo=npm&label=NPM
[npm-url]: https://www.npmjs.com/package/parse-css-color
[license-img]: https://img.shields.io/npm/l/parse-css-color
[license-url]: https://github.com/noeldelgado/parse-css-color/blob/master/LICENSE
[snyk-img]: https://snyk.io/test/npm/parse-css-color/badge.svg
[snyk-url]: https://snyk.io/test/npm/parse-css-color
[librariesio-img]: https://img.shields.io/librariesio/release/npm/parse-css-color.svg?logo=librariesdotio
[librariesio-url]: https://libraries.io/npm/parse-css-color
[lgtm-image]: https://img.shields.io/lgtm/alerts/g/noeldelgado/parse-css-color.svg?logo=lgtm&logoWidth=18
[lgtm-url]: https://lgtm.com/projects/g/noeldelgado/parse-css-color/alerts/
[lgtm-grade-image]: https://img.shields.io/lgtm/grade/javascript/g/noeldelgado/parse-css-color.svg?logo=lgtm&logoWidth=18
[lgtm-grade-url]: https://lgtm.com/projects/g/noeldelgado/parse-css-color/context:javascript