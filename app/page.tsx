"use client";

import { useState } from "react";

type Video = {
  id: number;
  title: string;
  image: string;
  duration: string;
  size: string;
};

const initialVideos: Video[] = [
  {
    id: 1,
    title: "ทริปท่องเที่ยว",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700",
    duration: "00:30",
    size: "12 MB",
  },
  {
    id: 2,
    title: "ดอกไม้สวยๆ",
    image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=700",
    duration: "00:15",
    size: "25 MB",
  },
  {
    id: 3,
    title: "วิวเมือง",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=700",
    duration: "00:45",
    size: "18 MB",
  },
  {
    id: 4,
    title: "น้องแมว",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=700",
    duration: "00:20",
    size: "10 MB",
  },
];

const tools = [
  { icon: "✂️", name: "ตัดต่อ" },
  { icon: "◷", name: "ความเร็ว" },
  { icon: "✨", name: "เอฟเฟกต์" },
  { icon: "T", name: "ข้อความ" },
  { icon: "♫", name: "เสียงเพลง" },
  { icon: "◉", name: "ฟิลเตอร์" },
];

export default function Home() {
  const [page, setPage] = useState("home");
  const [videos, setVideos] = useState(initialVideos);
  const [selected, setSelected] = useState<Video>(initialVideos[0]);
  const [quality, setQuality] = useState("1080P");
  const [fps, setFps] = useState("30");
  const [format, setFormat] = useState("MP4");
  const [playing, setPlaying] = useState(false);
  const [activeTool, setActiveTool] = useState("ตัดต่อ");
  const [notice, setNotice] = useState("");

  const openEditor = (video: Video) => {
    setSelected(video);
    setPage("editor");
    setPlaying(false);
  };

  const exportVideo = () => {
    setNotice(`ส่งออกวิดีโอ ${selected.title} สำเร็จ! (${quality}, ${fps} FPS, ${format})`);
    setVideos((old) => old.some((v) => v.id === selected.id) ? old : [selected, ...old]);
  };

  const nav = [
    { id: "home", icon: "⌂", label: "หน้าแรก" },
    { id: "editor", icon: "▣", label: "โปรเจกต์" },
    { id: "export", icon: "♛", label: "พรีเมียม" },
    { id: "library", icon: "♟", label: "โปรไฟล์" },
  ];

  return (
    <main className="app-bg">
      <div className="phone">

        {/* STATUS BAR */}
        <div className="status">
          <span>9:41</span>
          <span className="island" />
          <span>▮ ▴ ▰</span>
        </div>

        {/* HOME PAGE */}
        {page === "home" && (
          <div className="screen">
            <header className="header">
              <div className="brand">
                <span className="logo">▶</span>
                <span>VideoEdit</span>
              </div>
              <button className="icon-button" onClick={() => setNotice("ตั้งค่าการใช้งาน")}>⚙</button>
            </header>

            <p className="subtitle">ตัดต่อวิดีโอ...ได้ง่ายๆ ในมือคุณ ♡</p>

            <div className="hero" style={{ backgroundImage: `url(${selected.image})` }}>
              <button className="play" onClick={() => openEditor(selected)}>▶</button>
              <div className="hero-caption">Create your story ✨</div>
            </div>

            <button className="pink-button" onClick={() => openEditor(selected)}>
              ＋ เริ่มสร้างวิดีโอ
            </button>

            <SectionTitle title="เครื่องมือตัดต่อยอดนิยม" action="ดูทั้งหมด" />

            <div className="tool-grid">
              {tools.slice(0, 4).map((tool) => (
                <button
                  key={tool.name}
                  className="tool-card"
                  onClick={() => {
                    setActiveTool(tool.name);
                    openEditor(selected);
                  }}
                >
                  <span>{tool.icon}</span>
                  <small>{tool.name}</small>
                </button>
              ))}
            </div>

            <SectionTitle title="เทมเพลตแนะนำ" action="ดูทั้งหมด" />

            <div className="template-grid">
              {videos.slice(0, 3).map((video) => (
                <button
                  className="template"
                  key={video.id}
                  onClick={() => openEditor(video)}
                >
                  <img src={video.image} alt={video.title} />
                  <span>{video.title}</span>
                </button>
              ))}
            </div>

            <div className="tip">
              <span>💗</span>
              <div>
                <b>สร้างวิดีโอในแบบของคุณ</b>
                <small>เพิ่มสีสันให้ทุกช่วงเวลาพิเศษ</small>
              </div>
            </div>
          </div>
        )}

        {/* EDITOR PAGE */}
        {page === "editor" && (
          <div className="screen">
            <header className="editor-header">
              <button className="icon-button" onClick={() => setPage("home")}>✕</button>
              <button className="quality-tag" onClick={() => setPage("export")}>
                {quality}⌄
              </button>
              <button className="export-small" onClick={() => setPage("export")}>
                ↑ ส่งออก
              </button>
            </header>

            <div className="video-preview">
              <img src={selected.image} alt={selected.title} />
              <button className="play" onClick={() => setPlaying(!playing)}>
                {playing ? "Ⅱ" : "▶"}
              </button>
            </div>

            <div className="time-row">
              <span>{playing ? "00:15" : "00:00"} / {selected.duration}</span>
              <div className="preview-controls">
                <button onClick={() => setPlaying(!playing)}>▶</button>
                <button onClick={() => setNotice("ย้อนกลับแล้ว")}>↶</button>
                <button onClick={() => setNotice("ทำซ้ำแล้ว")}>↷</button>
                <button onClick={() => setNotice("แสดงตัวอย่างเต็มจอ")}>⛶</button>
              </div>
            </div>

            <div className="timeline">
              <div className="timeline-ruler">
                <span>00:00</span>
                <span>00:05</span>
                <span>00:10</span>
              </div>
              <div className="timeline-track">
                <div className="track-icon">🔊</div>
                <div className="track-content">
                  <img src={selected.image} alt="" />
                  <img src={selected.image} alt="" />
                  <img src={selected.image} alt="" />
                </div>
                <div className="playhead" />
              </div>
              <div className="audio-track">
                <span>♫ เพลงประกอบ</span>
                <div className="wave">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <i key={i} style={{ height: `${8 + ((i * 13) % 25)}px` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="active-tool">
              กำลังใช้งาน: <b>{activeTool}</b>
            </div>

            <div className="editor-tools">
              {tools.map((tool) => (
                <button
                  key={tool.name}
                  className={activeTool === tool.name ? "selected-tool" : ""}
                  onClick={() => {
                    setActiveTool(tool.name);
                    setNotice(`เลือกเครื่องมือ ${tool.name} แล้ว`);
                  }}
                >
                  <span>{tool.icon}</span>
                  <small>{tool.name}</small>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* EXPORT PAGE */}
        {page === "export" && (
          <div className="screen">
            <header className="page-header">
              <button className="icon-button" onClick={() => setPage("editor")}>‹</button>
              <b>ส่งออกวิดีโอ</b>
              <span />
            </header>

            <div className="export-preview">
              <img src={selected.image} alt={selected.title} />
              <span className="play-mini">▶</span>
            </div>

            <p className="field-label">ความละเอียด</p>
            <div className="option-row">
              {["480P", "720P", "1080P"].map((item) => (
                <button
                  key={item}
                  className={quality === item ? "option active" : "option"}
                  onClick={() => setQuality(item)}
                >
                  {item} {quality === item ? "✓" : ""}
                </button>
              ))}
            </div>

            <p className="field-label">อัตราเฟรม (FPS)</p>
            <div className="option-row">
              {["24", "30", "60"].map((item) => (
                <button
                  key={item}
                  className={fps === item ? "option active" : "option"}
                  onClick={() => setFps(item)}
                >
                  {item} {fps === item ? "✓" : ""}
                </button>
              ))}
            </div>

            <p className="field-label">รูปแบบไฟล์</p>
            <div className="option-row">
              {["MP4", "MOV"].map((item) => (
                <button
                  key={item}
                  className={format === item ? "option active" : "option"}
                  onClick={() => setFormat(item)}
                >
                  {item} {format === item ? "✓" : ""}
                </button>
              ))}
            </div>

            <div className="export-info">
              <span>📁</span>
              <div>
                <b>ตั้งค่าการส่งออก</b>
                <small>{quality} · {fps} FPS · {format}</small>
              </div>
            </div>

            <button className="pink-button export-button" onClick={exportVideo}>
              ↓ ส่งออกวิดีโอ
            </button>
            <p className="footnote">♡ นี่เป็นการจำลองการส่งออกใน Prototype</p>

            {notice && <div className="notice">{notice}</div>}
          </div>
        )}

        {/* LIBRARY PAGE */}
        {page === "library" && (
          <div className="screen">
            <header className="page-header">
              <b>โปรเจกต์ของฉัน</b>
              <div>
                <button className="icon-button" onClick={() => setNotice("ค้นหาวิดีโอ")}>⌕</button>
                <button className="icon-button" onClick={() => setVideos([])}>♜</button>
              </div>
            </header>

            <p className="subtitle">วิดีโอทั้งหมด {videos.length} รายการ</p>

            {videos.length === 0 ? (
              <div className="empty">
                <span>🎬</span>
                <b>ยังไม่มีวิดีโอ</b>
                <small>เริ่มสร้างวิดีโอของคุณกันเลย</small>
                <button className="pink-button" onClick={() => setVideos(initialVideos)}>
                  เพิ่มตัวอย่างวิดีโอ
                </button>
              </div>
            ) : (
              <div className="library-grid">
                {videos.map((video) => (
                  <div className="video-card" key={video.id}>
                    <button className="video-thumb" onClick={() => openEditor(video)}>
                      <img src={video.image} alt={video.title} />
                      <span>{video.duration}</span>
                    </button>
                    <div className="video-detail">
                      <b>{video.title}</b>
                      <small>{video.size}</small>
                    </div>
                    <button
                      className="more"
                      onClick={() => setVideos(videos.filter((v) => v.id !== video.id))}
                    >
                      ⋯
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button className="pink-button library-add" onClick={() => openEditor(initialVideos[0])}>
              ＋ สร้างวิดีโอใหม่
            </button>
          </div>
        )}

        {/* BOTTOM NAVIGATION */}
        <nav className="bottom-nav">
          {nav.map((item) => (
            <button
              key={item.id}
              className={page === item.id ? "nav-active" : ""}
              onClick={() => setPage(item.id)}
            >
              <span>{item.icon}</span>
              <small>{item.label}</small>
            </button>
          ))}
        </nav>
        <div className="home-indicator" />
      </div>

      {notice && page !== "export" && (
        <div className="toast" onClick={() => setNotice("")}>{notice} ✕</div>
      )}

      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, "Noto Sans Thai", sans-serif; }
        button { font: inherit; cursor: pointer; }
        .app-bg {
          min-height: 100vh;
          background: radial-gradient(ellipse at top, #ffe6f2, #ffc6e0 55%, #f9b4d6);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 10px;
        }
        .phone {
          width: 100%;
          max-width: 410px;
          height: min(850px, calc(100dvh - 40px));
          min-height: 600px;
          background: #100e14;
          border: 5px solid #29232e;
          border-radius: 38px;
          color: #fff;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px #a94e7c55, 0 0 0 2px #ffb3d7;
        }
        .status {
          height: 33px;
          min-height: 33px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          font-size: 11px;
          font-weight: bold;
          position: relative;
        }
        .island {
          position: absolute;
          width: 83px;
          height: 22px;
          background: #000;
          border-radius: 20px;
          left: 50%;
          top: 3px;
          transform: translateX(-50%);
        }
        .screen {
          flex: 1;
          overflow-y: auto;
          padding: 8px 13px 85px;
          scrollbar-width: none;
        }
        .screen::-webkit-scrollbar { display: none; }
        .header, .editor-header, .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 38px;
        }
        .brand {
          display: flex;
          align-items: center;
          font-size: 22px;
          font-weight: 900;
          gap: 9px;
        }
        .logo { color: #ff65ad; font-size: 28px; }
        .icon-button {
          border: none;
          background: transparent;
          color: white;
          font-size: 22px;
          padding: 5px 8px;
        }
        .subtitle { font-size: 11px; color: #c5bac6; margin: 2px 0 12px; }
        .hero, .video-preview, .export-preview {
          width: 100%;
          position: relative;
          background-size: cover;
          background-position: center;
          border-radius: 13px;
          overflow: hidden;
        }
        .hero { height: 132px; background-color: #312433; }
        .hero:after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent, #0008);
          pointer-events: none;
        }
        .hero .play, .video-preview .play {
          position: absolute;
          z-index: 2;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 43px;
          height: 43px;
          border: none;
          border-radius: 50%;
          background: #ffffffdf;
          color: #17121b;
          font-size: 18px;
        }
        .hero-caption {
          position: absolute;
          bottom: 10px;
          left: 12px;
          z-index: 2;
          font-size: 12px;
          font-weight: bold;
        }
        .pink-button {
          width: 100%;
          border: 0;
          border-radius: 30px;
          padding: 13px;
          background: linear-gradient(100deg, #ff8ac3, #f22e91);
          color: #1c1018;
          font-weight: 900;
          margin: 9px 0 17px;
          box-shadow: 0 4px 15px #ed429055;
        }
        .pink-button:active { transform: scale(.98); }
        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 15px 0 9px;
          font-size: 12px;
          font-weight: bold;
        }
        .section-title span:last-child { color: #aaa; font-size: 10px; }
        .tool-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; }
        .tool-card {
          border: 1px solid #34303a;
          background: #211e27;
          border-radius: 9px;
          padding: 10px 3px;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .tool-card span { font-size: 22px; color: #ff82bd; }
        .tool-card small { font-size: 10px; }
        .template-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .template {
          padding: 0;
          border: none;
          background: #25212a;
          color: white;
          overflow: hidden;
          border-radius: 9px;
          text-align: left;
        }
        .template img { width: 100%; height: 95px; object-fit: cover; display: block; }
        .template span { display: block; padding: 6px; font-size: 10px; }
        .tip, .export-info {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #241d29;
          border-radius: 10px;
          padding: 11px;
          margin-top: 15px;
        }
        .tip > span, .export-info > span { font-size: 22px; }
        .tip div, .export-info div { display: flex; flex-direction: column; gap: 4px; }
        .tip b, .export-info b { font-size: 11px; }
        .tip small, .export-info small { color: #b8aebc; font-size: 10px; }
        .bottom-nav {
          position: absolute;
          bottom: 13px;
          left: 0;
          width: 100%;
          height: 56px;
          background: #17141c;
          border-top: 1px solid #302b35;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 5;
        }
        .bottom-nav button {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
          color: #aaa1ae;
          background: none;
          border: 0;
          min-width: 55px;
        }
        .bottom-nav button span { font-size: 21px; }
        .bottom-nav button small { font-size: 9px; }
        .bottom-nav .nav-active { color: #ff65ad; }
        .home-indicator {
          position: absolute;
          z-index: 6;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 105px;
          height: 4px;
          border-radius: 10px;
          background: white;
        }
        .editor-header { margin-bottom: 8px; }
        .quality-tag, .export-small {
          border: 0;
          background: #28232e;
          color: white;
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 10px;
        }
        .export-small {
          background: #f45ba7;
          color: #1c1018;
          font-weight: bold;
        }
        .video-preview { height: 225px; background: #25202a; }
        .video-preview img, .export-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .time-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          color: #ccc;
          padding: 10px 0;
        }
        .preview-controls { display: flex; gap: 13px; }
        .preview-controls button { background: none; color: white; border: 0; font-size: 16px; }
        .timeline {
          background: #1d1a23;
          padding: 10px;
          border-radius: 10px;
          min-height: 190px;
          position: relative;
        }
        .timeline-ruler {
          display: flex;
          justify-content: space-between;
          padding-left: 45px;
          color: #aaa;
          font-size: 9px;
          margin-bottom: 9px;
        }
        .timeline-track { display: flex; align-items: center; gap: 7px; position: relative; }
        .track-icon { font-size: 17px; }
        .track-content { display: flex; height: 48px; overflow: hidden; border-radius: 5px; flex: 1; }
        .track-content img { width: 33.33%; height: 100%; object-fit: cover; border-right: 1px solid #222; }
        .playhead {
          position: absolute;
          top: -13px;
          left: 53px;
          width: 2px;
          height: 130px;
          background: #ff66af;
          pointer-events: none;
        }
        .audio-track {
          margin: 14px 0 0 27px;
          background: #33203d;
          border-radius: 6px;
          padding: 8px;
          color: #e4a4ff;
          font-size: 10px;
        }
        .wave { height: 23px; display: flex; gap: 3px; align-items: center; margin-top: 5px; }
        .wave i { display: block; width: 3px; border-radius: 3px; background: #b85de5; }
        .active-tool { margin: 14px 0 7px; color: #aaa; font-size: 10px; }
        .active-tool b { color: #ff85bd; }
        .editor-tools { display: grid; grid-template-columns: repeat(6, 1fr); gap: 3px; }
        .editor-tools button {
          border: 0;
          background: transparent;
          color: white;
          padding: 9px 1px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          border-radius: 8px;
        }
        .editor-tools button span { font-size: 20px; }
        .editor-tools button small { font-size: 9px; }
        .editor-tools .selected-tool { background: #392438; color: #ff8ac3; }
        .page-header { margin-bottom: 17px; }
        .page-header b { font-size: 16px; }
        .page-header > div { display: flex; }
        .export-preview { height: 190px; margin-bottom: 18px; }
        .play-mini {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #ffffffdf;
          color: #111;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
        }
        .field-label { font-size: 11px; font-weight: bold; margin: 18px 0 8px; }
        .option-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .option {
          border: none;
          background: #28242e;
          color: white;
          padding: 12px 5px;
          border-radius: 8px;
          font-size: 11px;
        }
        .option.active {
          background: linear-gradient(100deg, #ff91c8, #ef3e99);
          color: #20111b;
          font-weight: bold;
        }
        .export-info { margin-top: 22px; }
        .export-button { margin-top: 20px; }
        .footnote { color: #888; font-size: 9px; text-align: center; }
        .notice, .toast {
          position: fixed;
          z-index: 20;
          bottom: 82px;
          left: 50%;
          transform: translateX(-50%);
          background: #ff83bd;
          color: #24111c;
          border-radius: 20px;
          padding: 11px 16px;
          font-size: 11px;
          font-weight: bold;
          width: max-content;
          max-width: 85%;
          text-align: center;
        }
        .library-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px 10px; }
        .video-card { position: relative; min-width: 0; }
        .video-thumb {
          position: relative;
          width: 100%;
          height: 125px;
          padding: 0;
          border: 0;
          overflow: hidden;
          border-radius: 9px;
          background: #25202a;
        }
        .video-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .video-thumb span {
          position: absolute;
          bottom: 6px;
          right: 6px;
          background: #000b;
          padding: 3px 5px;
          font-size: 9px;
          border-radius: 4px;
        }
        .video-detail { display: flex; flex-direction: column; gap: 4px; padding: 6px 3px; }
        .video-detail b { font-size: 11px; }
        .video-detail small { color: #aaa; font-size: 9px; }
        .more {
          position: absolute;
          right: 1px;
          bottom: 3px;
          border: 0;
          color: #ccc;
          background: transparent;
          font-size: 19px;
        }
        .library-add { margin-top: 22px; }
        .empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 70px 10px;
          color: #aaa;
          font-size: 12px;
        }
        .empty span { font-size: 45px; }
        .empty b { color: white; }
        .empty .pink-button { margin-top: 12px; }
        @media (max-width: 480px) {
          .app-bg { padding: 0; background: #100e14; }
          .phone {
            max-width: none;
            width: 100%;
            height: 100dvh;
            min-height: 560px;
            border: none;
            border-radius: 0;
          }
          .status { padding-top: env(safe-area-inset-top); }
          .home-indicator { bottom: max(4px, env(safe-area-inset-bottom)); }
          .bottom-nav { bottom: max(13px, env(safe-area-inset-bottom)); }
        }
      `}</style>
    </main>
  );
}

function SectionTitle({ title, action }: { title: string; action: string }) {
  return (
    <div className="section-title">
      <span>{title}</span>
      <span>{action} ›</span>
    </div>
  );
}
