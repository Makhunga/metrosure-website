#!/usr/bin/env node
/**
 * Generate high-resolution static map images for office locations
 * Uses OpenStreetMap tiles stitched together via canvas
 *
 * Usage: node scripts/generate-maps.mjs
 *
 * Prerequisites: npm install canvas
 */

import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Office locations with coordinates
const offices = [
  { id: 'dbn', name: 'Durban', lat: -29.8579, lng: 31.0292 },
  { id: 'pmb', name: 'Pietermaritzburg', lat: -29.6006, lng: 30.3794 },
  { id: 'pta', name: 'Pretoria', lat: -25.7479, lng: 28.1879 },
  { id: 'jhb', name: 'Boksburg', lat: -26.2041, lng: 28.2639 },
  { id: 'msg', name: 'Musgrave', lat: -29.8450, lng: 31.0000 },
];

// Configuration
const OUTPUT_WIDTH = 1600;
const OUTPUT_HEIGHT = 1200;
const ZOOM = 16;
const TILE_SIZE = 256;

// Convert lat/lng to tile coordinates
function latLngToTile(lat, lng, zoom) {
  const n = Math.pow(2, zoom);
  const x = Math.floor((lng + 180) / 360 * n);
  const latRad = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
  return { x, y };
}

// Convert tile coordinates to lat/lng
function tileToLatLng(x, y, zoom) {
  const n = Math.pow(2, zoom);
  const lng = x / n * 360 - 180;
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n)));
  const lat = latRad * 180 / Math.PI;
  return { lat, lng };
}

// Get pixel offset within tile for a coordinate
function getPixelOffset(lat, lng, zoom) {
  const n = Math.pow(2, zoom);
  const x = (lng + 180) / 360 * n;
  const latRad = lat * Math.PI / 180;
  const y = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n;

  return {
    x: (x - Math.floor(x)) * TILE_SIZE,
    y: (y - Math.floor(y)) * TILE_SIZE
  };
}

// Download a tile image
function downloadTile(x, y, zoom) {
  return new Promise((resolve, reject) => {
    // Using OpenStreetMap tiles
    const url = `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;

    const options = {
      headers: {
        'User-Agent': 'MetrosureMapGenerator/1.0 (contact@metrosure.co.za)'
      }
    };

    https.get(url, options, (response) => {
      if (response.statusCode === 200) {
        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve(buffer);
        });
      } else {
        reject(new Error(`Failed to download tile: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Generate map for an office
async function generateMap(office) {
  console.log(`Generating map for ${office.name}...`);

  const centerTile = latLngToTile(office.lat, office.lng, ZOOM);
  const pixelOffset = getPixelOffset(office.lat, office.lng, ZOOM);

  // Calculate how many tiles we need
  const tilesX = Math.ceil(OUTPUT_WIDTH / TILE_SIZE) + 2;
  const tilesY = Math.ceil(OUTPUT_HEIGHT / TILE_SIZE) + 2;

  // Calculate starting tile
  const startTileX = centerTile.x - Math.floor(tilesX / 2);
  const startTileY = centerTile.y - Math.floor(tilesY / 2);

  // Create canvas
  const canvas = createCanvas(tilesX * TILE_SIZE, tilesY * TILE_SIZE);
  const ctx = canvas.getContext('2d');

  // Download and draw tiles
  for (let dy = 0; dy < tilesY; dy++) {
    for (let dx = 0; dx < tilesX; dx++) {
      const tileX = startTileX + dx;
      const tileY = startTileY + dy;

      try {
        const buffer = await downloadTile(tileX, tileY, ZOOM);
        const img = await loadImage(buffer);
        ctx.drawImage(img, dx * TILE_SIZE, dy * TILE_SIZE);

        // Small delay to be respectful to OSM servers
        await new Promise(r => setTimeout(r, 100));
      } catch (err) {
        console.warn(`  Warning: Could not load tile ${tileX},${tileY}`);
        // Fill with grey
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(dx * TILE_SIZE, dy * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  // Draw marker at center
  const markerX = (tilesX / 2) * TILE_SIZE;
  const markerY = (tilesY / 2) * TILE_SIZE;

  // Draw marker shadow
  ctx.beginPath();
  ctx.ellipse(markerX, markerY + 25, 15, 6, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fill();

  // Draw marker pin
  ctx.beginPath();
  ctx.moveTo(markerX, markerY + 20);
  ctx.bezierCurveTo(markerX - 20, markerY, markerX - 20, markerY - 30, markerX, markerY - 35);
  ctx.bezierCurveTo(markerX + 20, markerY - 30, markerX + 20, markerY, markerX, markerY + 20);
  ctx.fillStyle = '#BF0603';
  ctx.fill();
  ctx.strokeStyle = '#8B0000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw inner circle
  ctx.beginPath();
  ctx.arc(markerX, markerY - 15, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();

  // Crop to final size (centered)
  const cropCanvas = createCanvas(OUTPUT_WIDTH, OUTPUT_HEIGHT);
  const cropCtx = cropCanvas.getContext('2d');

  const cropX = (canvas.width - OUTPUT_WIDTH) / 2;
  const cropY = (canvas.height - OUTPUT_HEIGHT) / 2;

  cropCtx.drawImage(canvas, cropX, cropY, OUTPUT_WIDTH, OUTPUT_HEIGHT, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

  // Save to file
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'maps', `${office.id}.png`);
  const buffer = cropCanvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`  Saved: ${outputPath}`);
}

// Main function
async function main() {
  console.log('='.repeat(50));
  console.log('Generating high-resolution map images');
  console.log(`Output size: ${OUTPUT_WIDTH}x${OUTPUT_HEIGHT}px at zoom ${ZOOM}`);
  console.log('='.repeat(50));
  console.log('');

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'maps');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const office of offices) {
    await generateMap(office);
    console.log('');
  }

  console.log('='.repeat(50));
  console.log('Done! All maps generated successfully.');
  console.log('='.repeat(50));
}

main().catch(console.error);
