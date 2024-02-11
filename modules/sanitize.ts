import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export default (text) => {
    try {
        const window = new JSDOM('').window;
        const purify = DOMPurify(window);
        return purify.sanitize(text);
    } catch {
        throw new Error(`That ain't no string mfr`)
    }
}