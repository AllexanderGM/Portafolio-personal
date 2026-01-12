export const pathImage = (path, imgName) => new URL(`${path}${imgName}`, import.meta.url).href
