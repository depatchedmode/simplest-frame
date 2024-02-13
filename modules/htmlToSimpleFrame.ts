import * as cheerio from 'cheerio';

export default (html:string) => {
  const $ = cheerio.load(html);

  const imageSrc = $('frame-image').attr('src') || null;
  const imageMarkup = $('frame-image').html().trim() || null;
  const imageLayout = $('frame-image').attr('layout') || null;
  const inputText = $('frame-input').attr('text');
  const buttons = $('frame-button').map((i, el) => {
    return {
      label: $(el).text().trim(),
      action: $(el).attr('action') || null,
      target: $(el).attr('target') || null
    };
  }).get(); // .get() is used to convert cheerio object into a plain array
  const postVars = $('frame-post-var').map((i, el) => {
    const name = $(el).attr('name');
    const value = $(el).attr('value');
    return { [name]: value };
  }).get().reduce((acc, pair) => ({ ...acc, ...pair }), {});

  return {
    imageSrc,
    imageLayout,
    imageMarkup,
    inputText,
    buttons,
    postVars
  };
}