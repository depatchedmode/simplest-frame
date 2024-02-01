export default (name, frames) => {
    if (frames[name]) {
        return name;
    } else {
        console.error(`No frame found called ${name}`);
        return '';
    }
}