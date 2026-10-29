"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { experiences, getExperience, type Experience } from "@/lib/data";

// Interactive sneak peek of the Véva mobile app. Example content only.
type Tab = "home" | "discover" | "reserve" | "search" | "you";

const tabs: { id: Tab; label: string; icon: JSX.Element }[] = [
  { id: "home", label: "Home", icon: <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z" /> },
  { id: "discover", label: "Discover", icon: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></> },
  { id: "reserve", label: "Reserve", icon: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></> },
  { id: "search", label: "Search", icon: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></> },
  { id: "you", label: "You", icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></> },
];

const Icon = ({ children, className = "h-5 w-5" }: { children: React.ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    {children}
  </svg>
);

type Post = {
  id: string;
  author: string;
  place: string;
  image: string;
  caption: React.ReactNode;
  likes: number;
  comments: number;
  points: number;
  when: string;
};

const mention = (name: string) => <span className="font-medium text-[#3d5a73]">@{name}</span>;

const posts: Post[] = [
  {
    id: "bernardus",
    author: "Maria",
    place: "Bernardus · Cromvoirt",
    image: "/images/community-post-bernardus.jpg",
    caption: (
      <>
        First tee at Bernardus. Calm morning, perfect greens, nervous swing… Teeing off with {mention("Pepijn")} and{" "}
        {mention("Floris")}. Long putts, longer lunch.
      </>
    ),
    likes: 38,
    comments: 7,
    points: 245,
    when: "2h",
  },
  {
    id: "lars",
    author: "Pepijn",
    place: "Lars Amsterdam · Houthavens",
    image: getExperience("dining", "lars-amsterdam")?.image ?? "",
    caption: <>Celebrating with a view over the IJ. Every course a surprise.</>,
    likes: 52,
    comments: 9,
    points: 412,
    when: "1d",
  },
  {
    id: "marathon",
    author: "Floris",
    place: "NN Marathon Rotterdam",
    image: getExperience("sports", "nn-marathon-rotterdam")?.image ?? "",
    caption: <>Erasmus Bridge at km 1, and somehow still smiling at km 42. Stage 2 of 5 done.</>,
    likes: 87,
    comments: 14,
    points: 250,
    when: "3d",
  },
];

function Avatar({ name, size = "h-8 w-8" }: { name: string; size?: string }) {
  return (
    <div className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-ink font-serif text-[11px] text-white`}>
      {name[0]}
    </div>
  );
}

function FeedPost({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <article className="border-b border-line pb-3">
      <header className="flex items-center gap-2 px-3 py-2">
        <Avatar name={post.author} />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[12px] font-medium">{post.author}</p>
          <p className="truncate text-[10px] text-muted">{post.place}</p>
        </div>
        <span className="border border-ink px-1.5 py-0.5 text-[8px] uppercase tracking-wider">✓ Verified</span>
      </header>
      <div className="relative aspect-square bg-neutral-200">
        <Image src={post.image} alt={post.place} fill sizes="300px" className="object-cover" />
      </div>
      <div className="flex items-center gap-3 px-3 pt-2.5">
        <button onClick={() => setLiked((l) => !l)} aria-label="Like" aria-pressed={liked}>
          <Icon className={`h-5 w-5 transition-colors ${liked ? "fill-[#c0392b] text-[#c0392b]" : ""}`}>
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
          </Icon>
        </button>
        <Icon><path d="M4 5h16v11H8l-4 4z" /></Icon>
        <Icon><path d="M4 12 20 4l-6 16-3-7z" /></Icon>
        <button onClick={() => setSaved((s) => !s)} className="ml-auto" aria-label="Save" aria-pressed={saved}>
          <Icon className={`h-5 w-5 ${saved ? "fill-ink" : ""}`}><path d="M6 3h12v18l-6-4-6 4z" /></Icon>
        </button>
      </div>
      <p className="px-3 pt-1.5 text-[11px] font-medium">{post.likes + (liked ? 1 : 0)} likes</p>
      <p className="px-3 pt-1 text-[11px] leading-snug">
        <span className="font-medium">{post.author}</span> {post.caption}
      </p>
      <p className="px-3 pt-1.5 text-[10px] text-muted">
        View all {post.comments} comments · {post.when} · <span className="text-ink">+{post.points} Véva Points</span>
      </p>
    </article>
  );
}

function Home() {
  return (
    <div>
      <div className="flex gap-3 overflow-x-auto px-3 py-3 [scrollbar-width:none]">
        {["You", "Pepijn", "Floris", "Sophie", "Daan", "Emma"].map((n, i) => (
          <div key={n} className="flex shrink-0 flex-col items-center gap-1">
            <div className={`rounded-full p-[2px] ${i === 0 ? "bg-line" : "bg-gradient-to-tr from-[#b8860b] to-[#f5d76e]"}`}>
              <div className="rounded-full bg-white p-[2px]">
                <Avatar name={n} size="h-11 w-11" />
              </div>
            </div>
            <span className="text-[9px]">{n}</span>
          </div>
        ))}
      </div>
      {posts.map((p) => (
        <FeedPost key={p.id} post={p} />
      ))}
      <p className="py-6 text-center text-[10px] text-muted">You&apos;re all caught up</p>
    </div>
  );
}

function MiniCard({ e }: { e: Experience }) {
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-200">
        <Image src={e.image} alt="" fill sizes="150px" className="object-cover" />
      </div>
      <p className="mt-1.5 truncate text-[11px] font-medium leading-tight">{e.title}</p>
      <p className="truncate text-[9px] text-muted">{e.city}</p>
    </div>
  );
}

function Discover() {
  const [cat, setCat] = useState<Experience["category"]>("dining");
  const list = experiences.filter((e) => e.category === cat).slice(0, 6);
  return (
    <div className="px-3 py-3">
      <p className="font-serif text-xl">Discover</p>
      <p className="text-[10px] text-muted">Picked for you this week</p>
      <div className="mt-3 flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
        {(["dining", "sports", "culture", "wellness"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-3 py-1 text-[10px] capitalize ${cat === c ? "border-ink bg-ink text-white" : "border-line"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-2.5 gap-y-3">
        {list.map((e) => (
          <MiniCard key={e.slug} e={e} />
        ))}
      </div>
    </div>
  );
}

function Reserve() {
  const upcoming = [
    { e: getExperience("dining", "lars-amsterdam"), when: "Sat 14 Nov · 19:00", who: "2 guests" },
    { e: getExperience("wellness", "signature-spa-ritual"), when: "Sun 22 Nov · 12:30", who: "2 guests" },
    { e: getExperience("sports", "golf-tee-time-hilversum"), when: "Sat 5 Dec · 09:20", who: "3 players" },
  ];
  return (
    <div className="px-3 py-3">
      <p className="font-serif text-xl">Reservations</p>
      <p className="text-[10px] text-muted">Show your QR code at the venue to earn points</p>
      <div className="mt-3 space-y-2.5">
        {upcoming.map(({ e, when, who }) =>
          e ? (
            <div key={e.slug} className="flex items-center gap-2.5 rounded-lg border border-line p-2">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-neutral-200">
                <Image src={e.image} alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-[11px] font-medium">{e.title}</p>
                <p className="text-[10px] text-muted">{when}</p>
                <p className="text-[10px] text-muted">{who}</p>
              </div>
              <div className="grid h-9 w-9 shrink-0 grid-cols-3 gap-[2px] rounded border border-line p-1" aria-label="QR code">
                {[1, 0, 1, 0, 1, 0, 1, 1, 0].map((on, i) => (
                  <span key={i} className={on ? "bg-ink" : ""} />
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>
      <p className="mt-5 text-[11px] font-medium">Past visits</p>
      <p className="mt-1 text-[10px] text-muted">Bernardus · Cromvoirt · +245 Véva Points</p>
      <p className="mt-0.5 text-[10px] text-muted">De Kas · Amsterdam · +312 Véva Points</p>
    </div>
  );
}

function Search() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return experiences.filter((e) => `${e.title} ${e.city} ${e.venue}`.toLowerCase().includes(term)).slice(0, 8);
  }, [q]);
  return (
    <div className="px-3 py-3">
      <label className="flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-2">
        <Icon className="h-4 w-4 text-muted"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Icon>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Restaurants, races, spas…"
          className="w-full bg-transparent text-[12px] outline-none placeholder:text-muted"
        />
      </label>
      {!q && (
        <div className="mt-4">
          <p className="text-[11px] font-medium">Try</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Amsterdam", "Marathon", "Golf", "Spa", "Opera"].map((s) => (
              <button key={s} onClick={() => setQ(s)} className="rounded-full border border-line px-2.5 py-1 text-[10px]">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="mt-3 space-y-2">
        {results.map((e) => (
          <div key={e.slug} className="flex items-center gap-2.5">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-neutral-200">
              <Image src={e.image} alt="" fill sizes="40px" className="object-cover" />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[11px] font-medium">{e.title}</p>
              <p className="truncate text-[10px] text-muted">{e.venue} · {e.city}</p>
            </div>
          </div>
        ))}
        {q && results.length === 0 && <p className="text-[11px] text-muted">No results for “{q}”.</p>}
      </div>
    </div>
  );
}

function You() {
  return (
    <div className="px-3 py-3">
      <div className="flex items-center gap-3">
        <Avatar name="Maria" size="h-14 w-14" />
        <div className="flex flex-1 justify-around text-center">
          {[["48", "Experiences"], ["312", "Followers"], ["189", "Following"]].map(([n, l]) => (
            <div key={l}>
              <p className="text-[13px] font-medium">{n}</p>
              <p className="text-[9px] text-muted">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-[12px] font-medium">Maria</p>
      <p className="text-[10px] text-muted">Golf, good food and the odd marathon. Amsterdam.</p>

      <div
        className="mt-3 rounded-xl p-3 text-ink"
        style={{ background: "linear-gradient(135deg, #b8860b 0%, #f5d76e 30%, #e2b23a 50%, #fbe38a 70%, #c99a1e 100%)" }}
      >
        <p className="text-[9px] uppercase tracking-wider">Gold elite</p>
        <p className="font-serif text-lg leading-tight">6,240 Véva Points</p>
        <div className="mt-2 h-1.5 rounded-full bg-black/15">
          <div className="h-full w-[12%] rounded-full bg-ink" />
        </div>
        <p className="mt-1 text-[9px]">8,760 points to Diamond vanguard</p>
      </div>

      {/* Milestones */}
      <ul className="mt-3 divide-y divide-line rounded-xl border border-line px-3 text-[11px]">
        {[
          { icon: <path d="M7 3v8a3 3 0 0 0 6 0V3M10 3v18M17 3c-1.5 2-2 4-2 7h2v11" />, text: "Went to 14 different restaurants" },
          { icon: <><path d="M5 20 9 8l4 6 2-3 4 9z" /><circle cx="15" cy="5" r="2" /></>, text: "Completed 3 marathons and 5 half marathons" },
          { icon: <><path d="M8 21V3l9 4-9 4" /><path d="M5 21h8" /></>, text: "Current handicap: 25" },
        ].map((m) => (
          <li key={m.text} className="flex items-center gap-2.5 py-2">
            <Icon className="h-4 w-4 shrink-0 text-muted">{m.icon}</Icon>
            {m.text}
          </li>
        ))}
      </ul>

      <div className="mt-3 rounded-xl border border-line p-3">
        <p className="text-[11px] font-medium">Road to the European Marathon Classics medal</p>
        <div className="mt-2 flex gap-1">
          {[1, 1, 0, 0, 0].map((done, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${done ? "bg-ink" : "bg-line"}`} />
          ))}
        </div>
        <p className="mt-1 text-[9px] text-muted">2 of 5 marathons</p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-0.5">
        {[...posts.map((p) => p.image), getExperience("wellness", "signature-spa-ritual")?.image ?? "", getExperience("dining", "de-kas")?.image ?? "", getExperience("sports", "tcs-amsterdam-marathon")?.image ?? ""].map((src, i) => (
          <div key={i} className="relative aspect-square bg-neutral-200">
            {src && <Image src={src} alt="" fill sizes="100px" className="object-cover" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AppPreview() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="mx-auto w-[300px] shrink-0">
      <div className="relative rounded-[46px] bg-[#111] p-[10px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]">
        <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[36px] bg-white text-ink">
          {/* Status bar */}
          <div className="relative flex h-9 shrink-0 items-center justify-between px-6 text-[11px] font-medium">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-[#111]" aria-hidden />
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-2 w-3 rounded-[1px] bg-ink" />
              <span className="h-2.5 w-5 rounded-[3px] border border-ink p-[1px]"><span className="block h-full w-3/4 rounded-[1px] bg-ink" /></span>
            </span>
          </div>

          {/* App header */}
          {tab === "home" && (
            <div className="flex shrink-0 items-center justify-between border-b border-line px-3 pb-2">
              <span className="font-serif text-xl">Véva</span>
              <span className="flex gap-3">
                <Icon><path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0" /></Icon>
                <Icon><path d="M4 5h16v11H8l-4 4z" /></Icon>
              </span>
            </div>
          )}

          {/* Scrollable screen */}
          <div key={tab} className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tab === "home" && <Home />}
            {tab === "discover" && <Discover />}
            {tab === "reserve" && <Reserve />}
            {tab === "search" && <Search />}
            {tab === "you" && <You />}
          </div>

          {/* Tab bar */}
          <nav className="flex shrink-0 justify-around border-t border-line bg-white pb-4 pt-2" aria-label="App sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? "page" : undefined}
                className={`flex w-14 flex-col items-center gap-0.5 text-[9px] transition-colors ${tab === t.id ? "text-ink" : "text-neutral-400"}`}
              >
                <Icon className={`h-5 w-5 ${tab === t.id ? "stroke-[2]" : ""}`}>{t.icon}</Icon>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted">Scroll the feed and tap through the app</p>
    </div>
  );
}
