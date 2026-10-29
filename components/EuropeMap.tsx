import { geoConicConformal, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import countries50m from "world-atlas/countries-50m.json";

// Static map of Europe with Véva's live and upcoming cities. Rendered on the server; no client JavaScript.
type City = { name: string; lon: number; lat: number; live?: boolean; label: "left" | "right" | "below" };

export const cities: City[] = [
  { name: "Amsterdam", lon: 4.9, lat: 52.37, live: true, label: "right" },
  { name: "Copenhagen", lon: 12.57, lat: 55.68, label: "right" },
  { name: "Zurich", lon: 8.54, lat: 47.37, label: "left" },
  { name: "Milan", lon: 9.19, lat: 45.46, label: "right" },
  { name: "Madrid", lon: -3.7, lat: 40.42, label: "right" },
];

const W = 600;
const H = 640;
const gold = "#b89b6a";

const topology = countries50m as unknown as Topology<{ countries: GeometryCollection }>;
const land = feature(topology, topology.objects.countries);

// Frame roughly from Portugal to the Baltic, North Africa's coast to southern Scandinavia
const frame = {
  type: "MultiPoint" as const,
  coordinates: [
    [-10, 36],
    [22, 36],
    [-6, 60],
    [20, 60],
  ],
};
const projection = geoConicConformal()
  .parallels([40, 60])
  .rotate([-6, 0])
  .fitExtent(
    [
      [10, 10],
      [W - 10, H - 10],
    ],
    frame,
  )
  .clipExtent([
    [0, 0],
    [W, H],
  ]);
const path = geoPath(projection).digits(1);

export default function EuropeMap() {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-sm border border-[#e6dcc8] bg-[#faf7f1]">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="map-title">
          <title id="map-title">Véva is live in Amsterdam, coming soon to Madrid, Milan, Zurich and Copenhagen</title>
          <g fill="#ece2cf" stroke="#d6c7a9" strokeWidth={0.6} strokeLinejoin="round">
            {land.features.map((f, i) => {
              const d = path(f);
              return d ? <path key={i} d={d} /> : null;
            })}
          </g>

          {cities.map((c) => {
            const p = projection([c.lon, c.lat]);
            if (!p) return null;
            const [x, y] = p;
            const dx = c.label === "left" ? -14 : c.label === "right" ? 14 : 0;
            const dy = c.label === "below" ? 26 : 0;
            const anchor = c.label === "left" ? "end" : c.label === "right" ? "start" : "middle";
            return (
              <g key={c.name}>
                {c.live ? (
                  <>
                    <circle cx={x} cy={y} r={7} fill={gold} opacity={0.35}>
                      <animate attributeName="r" values="7;18;7" dur="2.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.35;0;0.35" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={x} cy={y} r={7} fill={gold} stroke="#fff" strokeWidth={2} />
                  </>
                ) : (
                  <circle cx={x} cy={y} r={5.5} fill="#faf7f1" stroke={gold} strokeWidth={2} />
                )}
                <text
                  x={x + dx}
                  y={y + dy - 1}
                  textAnchor={anchor}
                  className="font-serif"
                  fontSize={c.live ? 19 : 16}
                  fill="#111"
                >
                  {c.name}
                </text>
                <text
                  x={x + dx}
                  y={y + dy + 14}
                  textAnchor={anchor}
                  fontSize={10}
                  letterSpacing={1.5}
                  fill={c.live ? "#8a6d3b" : "#8f8f8f"}
                >
                  {c.live ? "NOW LIVE" : "COMING SOON"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: gold }} /> Now live: Amsterdam
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border-2" style={{ borderColor: gold }} /> Coming soon: Madrid, Milan,
          Zurich and Copenhagen
        </span>
      </figcaption>
    </figure>
  );
}
