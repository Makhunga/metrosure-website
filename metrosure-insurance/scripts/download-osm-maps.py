#!/usr/bin/env python3
"""
Download static map images from OpenStreetMap tiles for office locations.
Creates grayscale styled maps with location markers.
"""

import os
import math
import urllib.request
from PIL import Image, ImageDraw, ImageFilter

# Office locations
OFFICES = {
    "dbn": {"name": "Durban (Head Office)", "lat": -29.8579, "lng": 31.0292},
    "pmb": {"name": "Pietermaritzburg", "lat": -29.6006, "lng": 30.3794},
    "pta": {"name": "Pretoria", "lat": -25.7479, "lng": 28.1879},
    "jhb": {"name": "Boksburg", "lat": -26.2041, "lng": 28.2639},
    "msg": {"name": "Musgrave", "lat": -29.8450, "lng": 31.0000},
}

# Output settings
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "../public/images/maps")
ZOOM = 16
TILE_SIZE = 256
OUTPUT_WIDTH = 800
OUTPUT_HEIGHT = 600


def lat_lng_to_tile(lat: float, lng: float, zoom: int) -> tuple[float, float]:
    """Convert lat/lng to tile coordinates."""
    lat_rad = math.radians(lat)
    n = 2.0 ** zoom
    x = (lng + 180.0) / 360.0 * n
    y = (1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n
    return x, y


def download_tile(x: int, y: int, zoom: int) -> Image.Image:
    """Download a single OSM tile."""
    url = f"https://tile.openstreetmap.org/{zoom}/{x}/{y}.png"
    headers = {"User-Agent": "MetrosureWebsite/1.0 (static map generation)"}

    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=10) as response:
        from io import BytesIO
        return Image.open(BytesIO(response.read()))


def create_map_image(lat: float, lng: float, width: int, height: int, zoom: int) -> Image.Image:
    """Create a map image centred on the given coordinates."""
    # Calculate centre tile
    centre_x, centre_y = lat_lng_to_tile(lat, lng, zoom)

    # Calculate how many tiles we need
    tiles_x = math.ceil(width / TILE_SIZE) + 1
    tiles_y = math.ceil(height / TILE_SIZE) + 1

    # Calculate the pixel offset for the centre
    centre_tile_x = int(centre_x)
    centre_tile_y = int(centre_y)
    offset_x = (centre_x - centre_tile_x) * TILE_SIZE
    offset_y = (centre_y - centre_tile_y) * TILE_SIZE

    # Create a larger canvas to place tiles
    canvas_width = tiles_x * TILE_SIZE
    canvas_height = tiles_y * TILE_SIZE
    canvas = Image.new("RGB", (canvas_width, canvas_height))

    # Calculate starting tile
    start_tile_x = centre_tile_x - tiles_x // 2
    start_tile_y = centre_tile_y - tiles_y // 2

    # Download and place tiles
    for tx in range(tiles_x):
        for ty in range(tiles_y):
            tile_x = start_tile_x + tx
            tile_y = start_tile_y + ty

            try:
                tile = download_tile(tile_x, tile_y, zoom)
                canvas.paste(tile, (tx * TILE_SIZE, ty * TILE_SIZE))
            except Exception as e:
                print(f"  Warning: Could not download tile {tile_x},{tile_y}: {e}")
                # Fill with grey if tile fails
                grey_tile = Image.new("RGB", (TILE_SIZE, TILE_SIZE), (200, 200, 200))
                canvas.paste(grey_tile, (tx * TILE_SIZE, ty * TILE_SIZE))

    # Calculate crop area to centre on the location
    crop_left = (canvas_width - width) // 2 + int(offset_x - TILE_SIZE // 2)
    crop_top = (canvas_height - height) // 2 + int(offset_y - TILE_SIZE // 2)

    # Ensure crop bounds are valid
    crop_left = max(0, min(crop_left, canvas_width - width))
    crop_top = max(0, min(crop_top, canvas_height - height))

    # Crop to final size
    final = canvas.crop((crop_left, crop_top, crop_left + width, crop_top + height))

    return final


def apply_grayscale_style(img: Image.Image) -> Image.Image:
    """Apply grayscale styling to match the original design."""
    # Convert to grayscale
    grey = img.convert("L")

    # Increase contrast slightly
    from PIL import ImageEnhance
    enhancer = ImageEnhance.Contrast(grey)
    grey = enhancer.enhance(1.1)

    # Convert back to RGB
    styled = grey.convert("RGB")

    return styled


def add_marker(img: Image.Image, colour: tuple = (191, 6, 3)) -> Image.Image:
    """Add a location marker at the centre of the image."""
    draw = ImageDraw.Draw(img)

    centre_x = img.width // 2
    centre_y = img.height // 2

    # Draw marker pin (simple circle with shadow)
    marker_radius = 12
    shadow_offset = 3

    # Shadow
    draw.ellipse(
        [
            centre_x - marker_radius + shadow_offset,
            centre_y - marker_radius + shadow_offset,
            centre_x + marker_radius + shadow_offset,
            centre_y + marker_radius + shadow_offset,
        ],
        fill=(0, 0, 0, 80),
    )

    # Outer circle (white border)
    draw.ellipse(
        [
            centre_x - marker_radius - 3,
            centre_y - marker_radius - 3,
            centre_x + marker_radius + 3,
            centre_y + marker_radius + 3,
        ],
        fill=(255, 255, 255),
    )

    # Inner circle (red)
    draw.ellipse(
        [
            centre_x - marker_radius,
            centre_y - marker_radius,
            centre_x + marker_radius,
            centre_y + marker_radius,
        ],
        fill=colour,
    )

    # Centre dot (white)
    dot_radius = 4
    draw.ellipse(
        [
            centre_x - dot_radius,
            centre_y - dot_radius,
            centre_x + dot_radius,
            centre_y + dot_radius,
        ],
        fill=(255, 255, 255),
    )

    return img


def main():
    """Download and create map images for all offices."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Creating {len(OFFICES)} map images...")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Size: {OUTPUT_WIDTH}x{OUTPUT_HEIGHT}, Zoom: {ZOOM}")
    print()

    for office_id, office in OFFICES.items():
        print(f"Processing {office['name']}...")

        try:
            # Create base map
            img = create_map_image(
                office["lat"],
                office["lng"],
                OUTPUT_WIDTH,
                OUTPUT_HEIGHT,
                ZOOM,
            )

            # Apply grayscale styling
            img = apply_grayscale_style(img)

            # Add location marker
            img = add_marker(img)

            # Save image
            output_path = os.path.join(OUTPUT_DIR, f"{office_id}.png")
            img.save(output_path, "PNG", optimize=True)

            print(f"  Saved: {output_path}")

        except Exception as e:
            print(f"  Error: {e}")

    print()
    print("Done!")


if __name__ == "__main__":
    main()
