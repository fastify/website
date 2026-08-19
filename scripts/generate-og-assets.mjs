#!/usr/bin/env node
// @ts-nocheck
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = `${ROOT}public/favicon.svg`;
const OUT = `${ROOT}public`;

const svg = await readFile(SRC);

// 1200x630 OG card: dark bg, logo centered inside a rounded inset square.
const OG_W = 1200;
const OG_H = 630;
const LOGO_PX = 360;
const logoB64 = svg.toString("base64");
const ogSvg = Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">` +
		`<rect width="100%" height="100%" fill="#0a0b0d"/>` +
		`<rect x="${(OG_W - LOGO_PX) / 2}" y="${(OG_H - LOGO_PX) / 2}" width="${LOGO_PX}" height="${LOGO_PX}" rx="${LOGO_PX * 0.21}" fill="#0a0b0d" stroke="#1f2125" stroke-width="2"/>` +
		`<image href="data:image/svg+xml;base64,${logoB64}" x="${(OG_W - LOGO_PX) / 2}" y="${(OG_H - LOGO_PX) / 2}" width="${LOGO_PX}" height="${LOGO_PX}"/>` +
		`</svg>`,
);
await sharp(ogSvg).png().toFile(`${OUT}/og-image.png`);

await sharp(svg).resize(180, 180).png().toFile(`${OUT}/apple-touch-icon.png`);

await sharp(svg).resize(32, 32).png().toFile(`${OUT}/favicon-32x32.png`);

// Wrap a 32x32 PNG in a minimal ICO container (1 image, type=icon) so Safari
// and IE accept it as a real .ico instead of guessing by filename.
const png = await sharp(svg).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(6 + 16, 18);
await writeFile(`${OUT}/favicon.ico`, Buffer.concat([header, png]));

console.log(
	"wrote: og-image.png, apple-touch-icon.png, favicon-32x32.png, favicon.ico",
);
