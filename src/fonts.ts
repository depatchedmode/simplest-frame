import fs from 'fs/promises';
import path from 'path';
import { Font, FontStyle, FontWeight } from 'satori';

const loadFont = async (fileName) => {
    try {
        const filePath = path.join(__dirname, '../public', 'fonts', fileName);
        const fontData = await fs.readFile(filePath);
        return fontData;
    } catch (error) {
        console.error('Error reading font file:', error);
    }
}

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
