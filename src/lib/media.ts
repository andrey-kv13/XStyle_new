const RASTER = /\.(jpe?g|png|webp|gif|avif)$/i;
const VECTOR = /\.svg$/i;

/** Scrape artifacts and Tilda bundle URLs saved with a .jpg extension. */
export function isScrapeArtifact(path: string): boolean {
  const name = path.replace(/^content\/images\//, "");
  return (
    /tilda-.*\.min\.js\.jpg$/i.test(name) ||
    /tilda-blocks-page.*\.min\.js\.jpg$/i.test(name)
  );
}

export function isDisplayableMedia(path: string): boolean {
  if (isScrapeArtifact(path)) return false;
  return RASTER.test(path) || VECTOR.test(path);
}

export function pickHeroPhoto(photos: string[]): string | undefined {
  return photos.find((p) => RASTER.test(p) && !isScrapeArtifact(p));
}

export function filterGalleryPhotos(photos: string[]): string[] {
  return photos.filter((p) => isDisplayableMedia(p) && RASTER.test(p));
}
