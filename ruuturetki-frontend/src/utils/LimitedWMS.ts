import L from "leaflet";

export const LimitedWMS = L.TileLayer.WMS.extend({
  _isValidTile(coords: L.Coords): boolean {
    if (!this._map) return false;

    // Get center tile projected coordinates
    const zoom = this._map.getZoom();
    const center = this._map.getCenter();
    const centerTile = this._map.project(center, zoom).divideBy(256).floor();

    // Tile vector component form from the map view center
    // For example the eight tiles surrounding the center tile in 3x3 grid
    // have [dx = 1, dy = 1] and the border tiles in 4x4 grid have [dx = 2, dy = 2]
    const dx = Math.abs(coords.x - centerTile.x);
    const dy = Math.abs(coords.y - centerTile.y);

    // Limited area is [9x5] of 256x256 px tiles = 2304x1280 px (tested to be good fit for fullscreen full hd 20ish inch monitor)
    // Area size must be [odd x odd] because dx and dy maximum values need to be integers
    // Maybe support for vertical screens in the future? Or different screensizes overall?
    const xMax = 9; // HAS TO BE ODD!!
    const yMax = 5; // HAS TO BE ODD!!

    const dxMax = (xMax - 1) / 2;
    const dyMax = (yMax - 1) / 2;

    return dx <= dxMax && dy <= dyMax;
  },
}) as unknown as {
  new (url: string, options?: L.WMSOptions): L.TileLayer.WMS;
};
