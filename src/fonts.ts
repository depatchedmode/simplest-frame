import { Font, FontStyle, FontWeight } from 'satori';
import { loadFont } from '../modules/utils.js';

const fonts: Font[] = [
    {
        name: 'Redaction',
        data: await loadFont('Redaction-Regular.otf'),
        weight: 400 as FontWeight, // Explicitly casting as Weight type
        style: 'normal' as FontStyle, // Explicitly casting as FontStyle type
    },
    {
        name: 'Redaction-100',
        data: await loadFont('Redaction100-Regular.otf'),
        weight: 400 as FontWeight, // Explicitly casting as Weight type
        style: 'normal' as FontStyle, // Explicitly casting as FontStyle type
    }
];

export default fonts;
