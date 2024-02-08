import { loadFont } from '../../modules/utils';

export default [
    {
        name: 'Redaction',
        data: await loadFont('Redaction-Regular.otf'),
        weight: 400,
        style: 'normal',
    },
    {
        name: 'Redaction-100',
        data: await loadFont('Redaction100-Regular.otf'),
        weight: 400,
        style: 'normal',
    }
];