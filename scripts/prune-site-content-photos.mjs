import fs from "node:fs";

const mediaDir = "public/media";
const existing = new Set(fs.readdirSync(mediaDir));
const isBad = (name) =>
  /tilda-.*\.min\.js\.jpg$/i.test(name) || /tilda-blocks-page.*\.min\.js\.jpg$/i.test(name);
const isRaster = (p) => /\.(jpe?g|png|webp|gif|avif)$/i.test(p);
const file = "src/data/site-content.json";
const data = JSON.parse(fs.readFileSync(file, "utf8"));

for (const p of data.pages) {
  p.photos = (p.photos || []).filter((ph) => {
    const name = ph.replace(/^content\/images\//, "");
    if (isBad(name)) return false;
    if (!isRaster(ph)) return false;
    return existing.has(name);
  });
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(data.pages.map((p) => `${p.slug}:${p.photos.length}`).join(", "));
