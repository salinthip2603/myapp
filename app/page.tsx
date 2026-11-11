import Image from "next/image";"use client";

import { useMemo, useRef, useState } from "react";
import {
  Play, Pause, Settings, Plus, Music2, Sparkles, Type, Scissors,
  Gauge, SlidersHorizontal, Download, Search, Trash2, Home, Folder,
  Crown, UserRound, X, Undo2, Redo2, Maximize, Volume2, ImagePlus,
  Video, Check, ChevronDown, WandSparkles, Clock3, Film, MoreHorizontal,
  Upload, Layers, Heart, Camera, RotateCcw
} from "lucide-react";

type Clip = { id: number; title: string; duration: string; size: string; kind: "video" | "image"; image: string };

const initialClips: Clip[] = [
  { id: 1, title: "ทริปเที่ยวญี่ปุ่น", duration: "00:30", size: "12 MB", kind: "video", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=85" },
  { id: 2, title: "ดอกทิวลิป", duration: "00:15", size: "25 MB", kind: "video", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=85" },
  { id: 3, title: "วิวเมือง", duration: "00:45", size: "18 MB", kind: "video", image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=85" },
  { id: 4, title: "น้องแมว", duration: "00:20", size: "10 MB", kind: "image", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=85" },
];

const pink = "#f45aa8";

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`phone-shell ${className}`}><div className="phone-screen">{children}</div></div>;
}

function BottomNav({ active = "หน้าหลัก" }: { active?: string }) {
  const items = [
    { label: "หน้าหลัก", icon: Home }, { label: "โปรเจกต์", icon: Folder },
    { label: "พรีเมียม", icon: Crown }, { label: "โปรไฟล์", icon: UserRound },
  ];
  return <div className="bottom-nav">{items.map(({ label, icon: Icon }) =>
    <button key={label} className={active === label ? "nav-item active" : "nav-item"}><Icon size={17} fill={active === label ? "currentColor" : "none"} /><span>{label}</span></button>
  )}</div>;
}

export default function Page() {
  const [playing, setPlaying] = useState(false);
  const [activeTool, setActiveTool] = useState("ตัดต่อ");
  const [quality, setQuality] = useState("1080P");
  const [format, setFormat] = useState("MP4");
  const [tab, setTab] = useState("ทั้งหมด");
  const [clips, setClips] = useState(initialClips);
  const [projectName, setProjectName] = useState("ทริปเที่ยวญี่ปุ่น");
  const [exported, setExported] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [search, setSearch] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const visibleClips = useMemo(() => clips.filter(c => {
    const matchesTab = tab === "ทั้งหมด" || (tab === "วิดีโอ" ? c.kind === "video" : c.kind === "image");
    return matchesTab && c.title.toLowerCase().includes(search.toLowerCase());
  }), [clips, tab, search]);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const additions: Clip[] = Array.from(files).map((file, i) => ({
      id: Date.now() + i, title: file.name.replace(/\.[^/.]+$/, ""),
      duration: "00:15", size: `${Math.max(1, Math.round(file.size / 1024 / 1024))} MB`,
      kind: file.type.startsWith("image/") ? "image" : "video",
      image: URL.createObjectURL(file),
    }));
    setClips(prev => [...additions, ...prev]);
  };

  const removeClip = (id: number) => setClips(prev => prev.filter(c => c.id !== id));

  return (
    <main className="app-page">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #fce4f1; font-family: 'Prompt', sans-serif; color: #fff; }
        button, input { font: inherit; }
        button { cursor: pointer; }
        .app-page { min-height: 100vh; padding: 42px 22px 54px; position: relative; overflow: hidden; background: radial-gradient(ellipse at 50% 5%,#fff4fa 0,#fbd9ec 50%,#f9c9e4 100%); }
        .app-page:before,.app-page:after { content:""; position:absolute; width:70vw; height:220px; border:1px solid rgba(255,255,255,.34); border-radius:50%; transform:rotate(-15deg); pointer-events:none; }
        .app-page:before { top:170px; left:-20vw; } .app-page:after { right:-20vw; bottom:100px; transform:rotate(165deg); }
        .page-heading { position:relative; z-index:1; text-align:center; margin:0 auto 28px; color:#261622; }
        .page-heading h1 { font-size:clamp(24px,3vw,36px); margin:0 0 5px; font-weight:700; letter-spacing:-.5px; }
        .page-heading p { margin:0; color:#886579; font-size:13px; }
        .screens-grid { position:relative; z-index:1; display:grid; grid-template-columns:repeat(2,minmax(280px,390px)); justify-content:center; gap:26px 28px; }
        .phone-shell { width:100%; max-width:390px; aspect-ratio: .535; padding:7px; border-radius:37px; background:linear-gradient(135deg,#1c1720,#08070b 55%,#39303a); border:1px solid #e8a4c7; box-shadow:0 18px 45px rgba(108,39,79,.24),inset 0 0 0 1px rgba(255,255,255,.2); position:relative; }
        .phone-screen { height:100%; border-radius:30px; background:#100e14; overflow:hidden; position:relative; padding:15px 12px 54px; display:flex; flex-direction:column; }
        .phone-screen:before { content:""; position:absolute; top:5px; left:50%; transform:translateX(-50%); width:82px; height:17px; border-radius:12px; background:#030306; z-index:3; }
        .status { height:15px; display:flex; justify-content:space-between; font-size:8px; color:#fff; padding:0 5px; margin-bottom:7px; flex-shrink:0; }
        .brand-row { display:flex; align-items:center; justify-content:space-between; margin:3px 1px 12px; }
        .brand { display:flex; align-items:center; gap:7px; font-size:18px; font-weight:600; }
        .brand-mark { width:26px; height:26px; border-radius:8px; background:linear-gradient(135deg,#ff8ac7,#ec3f9c); display:grid; place-items:center; }
        .brand-sub { font-size:8px; color:#d9cbd4; margin-left:33px; margin-top:-11px; margin-bottom:9px; }
        .hero-image { width:100%; height:104px; object-fit:cover; border-radius:12px; display:block; }
        .play-overlay { position:relative; }
        .play-button { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:36px; height:36px; display:grid; place-items:center; border:0; border-radius:50%; color:white; background:rgba(20,17,24,.65); backdrop-filter:blur(8px); }
        .gradient-btn { border:0; color:#2b1020; font-size:11px; font-weight:600; background:linear-gradient(100deg,#ff8bc4,#f2449e); border-radius:30px; padding:11px 14px; display:flex; align-items:center; justify-content:center; gap:7px; box-shadow:0 4px 14px rgba(239,64,153,.18); }
        .section-head { display:flex; justify-content:space-between; align-items:center; font-size:10px; font-weight:500; margin:13px 2px 7px; }
        .muted { color:#a99aa5; font-size:8px; }

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Salinthip Wongkokun
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          ปวช.3/3
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          วิทยาลัยอาชีวศึกษาสุโขทัย
        </div>
      </main>
    </div>
  );
}
