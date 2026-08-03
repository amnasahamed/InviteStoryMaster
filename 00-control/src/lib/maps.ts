/**
 * Parse a pasted Google Maps / Apple Maps / geo URL into venue fields.
 */
export type ParsedMapsLink = {
  mapsUrl: string;
  mapQuery: string;
  lat?: number;
  lng?: number;
};

export function parseMapsLink(raw: string): ParsedMapsLink | null {
  const input = raw.trim();
  if (!input) return null;

  // Plain "lat, lng" paste
  const coordOnly = input.match(/^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/);
  if (coordOnly) {
    const lat = Number(coordOnly[1]);
    const lng = Number(coordOnly[2]);
    return {
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      mapQuery: `${lat},${lng}`,
      lat,
      lng,
    };
  }

  let url: URL;
  try {
    url = new URL(input.startsWith("http") ? input : `https://${input}`);
  } catch {
    // Treat as free-text query
    return {
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(input)}`,
      mapQuery: input,
    };
  }

  const href = url.href;
  let lat: number | undefined;
  let lng: number | undefined;
  let mapQuery = "";

  // https://www.google.com/maps/@12.34,56.78,17z
  const at = href.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (at) {
    lat = Number(at[1]);
    lng = Number(at[2]);
  }

  // !3dLAT!4dLNG (place pin)
  const bang = href.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
  if (bang) {
    lat = Number(bang[1]);
    lng = Number(bang[2]);
  }

  // ?q=... or query=
  const q = url.searchParams.get("q") || url.searchParams.get("query");
  if (q) {
    mapQuery = q;
    const qCoords = q.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
    if (qCoords) {
      lat = Number(qCoords[1]);
      lng = Number(qCoords[2]);
    }
  }

  // /place/Name+Of+Place/
  if (!mapQuery) {
    const place = href.match(/\/place\/([^/@]+)/);
    if (place) mapQuery = decodeURIComponent(place[1].replace(/\+/g, " "));
  }

  // /search/Name/
  if (!mapQuery) {
    const search = href.match(/\/search\/([^/@?]+)/);
    if (search) mapQuery = decodeURIComponent(search[1].replace(/\+/g, " "));
  }

  // destination= for directions links
  if (!mapQuery) {
    const dest = url.searchParams.get("destination");
    if (dest) mapQuery = dest;
  }

  if (!mapQuery && lat != null && lng != null) {
    mapQuery = `${lat},${lng}`;
  }

  if (!mapQuery && !lat) return null;

  return {
    mapsUrl: href,
    mapQuery: mapQuery || `${lat},${lng}`,
    lat,
    lng,
  };
}
