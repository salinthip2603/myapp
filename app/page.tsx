
"use client";

import { useState } from "react";

const videos = [
  {
    title: "ทริปเที่ยวญี่ปุ่น",
    time: "00:30",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
  },
  {
    title: "ดอกไม้สวยงาม",
    time: "00:15",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
  },
  {
    title: "เมืองยามค่ำคืน",
    time: "00:45",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600",
  },
  {
    title: "น้องแมวน่ารัก",
    time: "00:20",
    image:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600",
  },
];

export default function Home() {
  const [page, setPage] = useState("home");
  const [resolution, setResolution] = useState("1080P");
  const [fps, setFps] = useState("30");
  const [format, setFormat] = useState("MP4");
  const [playing, setPlaying] = useState(false);
  const [music, setMusic] = useState(true);
  const [activeTool, setActiveTool] = useState("ตัดต่อ");
  const [videoName, setVideoName] = useState("โปรเจกต์ของฉัน");

  const tools = [
    { icon: "✂️", name: "ตัดต่อ" },
    { icon: "◉", name: "ความเร็ว" },
    { icon: "✨", name: "เอฟเฟกต์" },
    { icon: "T", name: "ข้อความ" },
    { icon: "♫", name: "เสียงเพลง" },
    { icon: "◐", name: "ฟิลเตอร์" },
  ];

  const goEdit = () => {
    setPage("editor");
  };

  const exportVideo = () => {
    alert(
      `ส่งออกวิดีโอสำเร็จ!\nความละเอียด: ${resolution}\nFPS: ${fps}\nรูปแบบ: ${format}`
    );
    setPage("library");
  };

  return (
    <main className="app">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Kanit', sans-serif;
          background: #fce2f1;
          color: white;
        }

        button {
          font-family: inherit;
          cursor: pointer;
        }

        .app {
          min-height: 100vh;
          padding: 35px 20px;
          background:
            radial-gradient(ellipse at 10% 20%, #ffc0df 0%, transparent 40%),
            radial-gradient(ellipse at 90% 80%, #ffb8dd 0%, transparent 40%),
            linear-gradient(135deg, #ffe8f5, #f9d5ec);
        }

        .heading {
          text-align: center;
          color: #30202e;
          margin-bottom: 30px;
        }

        .heading h1 {
          font-size: 34px;
          margin: 0;
          font-weight: 700;
        }

        .heading p {
          margin: 5px 0;
          color: #79536d;
          font-size: 14px;
        }

        .screens {
          display: grid;
          grid-template-columns: repeat(2, 340px);
          justify-content: center;
          gap: 28px;
        }

        .phone {
          width: 340px;
          min-height: 620px;
          border-radius: 34px;
          background: #111014;
          border: 5px solid #28232b;
          outline: 2px solid #f48cbe;
          box-shadow: 0 15px 35px #8f52704d;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .status {
          height: 28px;
          padding: 5px 19px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: white;
        }

        .notch {
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          background: #000;
          width: 82px;
          height: 20px;
          border-radius: 20px;
        }

        .screen-content {
          padding: 10px 14px;
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .screen-content::-webkit-scrollbar {
          display: none;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 23px;
          font-weight: 600;
        }

        .logo-icon {
          color: #ff69b1;
          font-size: 27px;
        }

        .pink {
          background: linear-gradient(100deg, #ff91c9, #f52d91);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 500;
        }

        .create-btn {
          width: 100%;
          padding: 13px;
          font-size: 15px;
          margin: 12px 0 18px;
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 500;
          margin: 15px 0 9px;
        }

        .section-title small {
          color: #b3a6b2;
          font-size: 10px;
        }

        .hero {
          height: 120px;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
        }

        .hero img, .preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background: #ffffffbd;
          color: #171219;
          font-size: 20px;
        }

        .tool-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 7px;
        }

        .tool {
          background: #26232b;
          border: 1px solid #39333e;
          border-radius: 10px;
          min-height: 75px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          font-size: 11px;
        }

        .tool span {
          color: #ff82bd;
          font-size: 23px;
        }

        .tool.active {
          background: #54243e;
          border-color: #ff76b6;
        }

        .thumbnail-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .thumbnail {
          height: 105px;
          border-radius: 9px;
          overflow: hidden;
          position: relative;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumbnail span {
          position: absolute;
          bottom: 5px;
          left: 5px;
          font-size: 11px;
          text-shadow: 0 1px 4px black;
        }

        .bottom-nav {
          height: 58px;
          background: #17151a;
          border-top: 1px solid #29252d;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-shrink: 0;
        }

        .nav-item {
          color: #a69ba9;
          border: none;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          font-size: 10px;
        }

        .nav-item b {
          font-size: 20px;
        }

        .nav-item.active {
          color: #ff72b6;
        }

        .preview {
          width: 100%;
          height: 210px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          margin-bottom: 10px;
        }

        .editor-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #c4b8c3;
          padding: 7px 0;
        }

        .timeline {
          background: #1d1a21;
          border-radius: 10px;
          padding: 10px;
          margin: 12px 0;
        }

        .time-label {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #aaa;
          margin-bottom: 8px;
        }

        .track {
          height: 52px;
          display: flex;
          overflow: hidden;
          border-radius: 6px;
          margin-bottom: 8px;
          border: 1px solid #655063;
        }

        .track img {
          width: 25%;
          object-fit: cover;
        }

        .track img:nth-child(2) {
          width: 25%;
        }

        .track img:nth-child(3) {
          width: 25%;
        }

        .track img:nth-child(4) {
          width: 25%;
        }

        .music-track {
          height: 38px;
          border-radius: 6px;
          background: #42204d;
          color: #e4b0ff;
          padding: 8px;
          font-size: 12px;
        }

        .music-wave {
          color: #d77bff;
          letter-spacing: 2px;
          margin-left: 8px;
        }

        .editor-tool-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 3px;
          margin-top: auto;
          padding: 12px 0;
        }

        .editor-tool {
          background: transparent;
          border: none;
          color: #ddd;
          font-size: 10px;
          padding: 5px 0;
        }

        .editor-tool div {
          font-size: 20px;
          margin-bottom: 4px;
        }

        .editor-tool.active {
          color: #ff75b9;
        }

        .back {
          background: transparent;
          border: none;
          color: white;
          font-size: 20px;
        }

        .setting-label {
          font-size: 13px;
          margin: 15px 0 8px;
        }

        .option-row {
          display: flex;
          gap: 8px;
        }

        .option {
          flex: 1;
          padding: 10px 5px;
          background: #29252e;
          border: 1px solid transparent;
          color: white;
          border-radius: 7px;
          font-size: 12px;
        }

        .option.selected {
          background: #f34c9c;
          border-color: #ffb0d8;
        }

        .export-btn {
          width: 100%;
          padding: 13px;
          margin-top: 20px;
        }

        .library-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .video-card {
          min-width: 0;
        }

        .video-card .thumbnail {
          height: 130px;
        }

        .video-card p {
          font-size: 12px;
          margin: 5px 0 0;
        }

        .video-card small {
          color: #aaa;
          font-size: 10px;
        }

        .phone-title {
          font-size: 19px;
          font-weight: 600;
          margin: 5px 0 15px;
        }

        .text-muted {
          color: #aaa;
          font-size: 11px;
        }

        .full-input {
          width: 100%;
          padding: 12px;
          background: #27232b;
          color: white;
          border: 1px solid #514451;
          border-radius: 9px;
          margin: 8px 0;
          outline: none;
          font-family: inherit;
        }

        @media(max-width: 750px) {
          .screens {
            grid-template-columns: 1fr;
            justify-items: center;
          }

          .heading h1 {
            font-size: 27px;
          }
        }

        @media(max-width: 380px) {
          .phone {
            width: 100%;
          }

          .app {
            padding: 20px 10px;
          }
        }
      `}</style>

      <header className="heading">
        <h1>💗 VideoEdit</h1>
        <p>แอปพลิเคชันตัดต่อวิดีโอ Prototype</p>
      </header>

      <div className="screens">

        {/* SCREEN 1 : HOME */}
        <section className="phone">
          <div className="status">
            <b>9:41</b>
            <span>●●● ▰ ▰</span>
          </div>
          <div className="notch" />

          <div className="screen-content">
            <div className="topbar">
              <div className="logo">
                <span className="logo-icon">▶</span>
                VideoEdit
              </div>
              <button className="back" onClick={() => alert("ตั้งค่า")}>
                ⚙
              </button>
            </div>

            <p className="text-muted">
              ตัดต่อวิดีโอ...ได้ง่ายๆ ในมือถือ ♡
            </p>

            <div className="hero">
              <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600" alt="Camera" />
              <button className="play" onClick={() => setPlaying(!playing)}>
                {playing ? "Ⅱ" : "▶"}
              </button>
            </div>

            <button className="pink create-btn" onClick={goEdit}>
              ＋ เริ่มสร้างวิดีโอ
            </button>

            <div className="section-title">
              เครื่องมือตัดต่อยอดนิยม
              <small>ดูทั้งหมด ›</small>
            </div>

            <div className="tool-grid">
              {[
                ["🎬", "ตัดต่อวิดีโอ"],
                ["♫", "ตัดเสียง"],
                ["⭐", "เอฟเฟกต์"],
                ["T", "ข้อความ"],
              ].map(([icon, name]) => (
                <button
                  className="tool"
                  key={name}
                  onClick={() => {
                    setActiveTool(name);
                    goEdit();
                  }}
                >
                  <span>{icon}</span>
                  {name}
                </button>
              ))}
            </div>

            <div className="section-title">
              เทมเพลตแนะนำ
              <small>ดูทั้งหมด ›</small>
            </div>

            <div className="thumbnail-row">
              {videos.slice(0, 3).map((v) => (
                <div className="thumbnail" key={v.title}>
                  <img src={v.image} alt={v.title} />
                  <span>{v.title}</span>
                </div>
              ))}
            </div>
          </div>

          <nav className="bottom-nav">
            <button className="nav-item active" onClick={() => setPage("home")}>
              <b>⌂</b>หน้าหลัก
            </button>
            <button className="nav-item" onClick={goEdit}>
              <b>▣</b>โปรเจกต์
            </button>
            <button className="nav-item" onClick={() => setPage("export")}>
              <b>♛</b>พรีเมียม
            </button>
            <button className="nav-item" onClick={() => alert("โปรไฟล์")}>
              <b>♙</b>โปรไฟล์
            </button>
          </nav>
        </section>

        {/* SCREEN 2 : EDITOR */}
        <section className="phone">
          <div className="status">
            <b>9:41</b>
            <span>●●● ▰ ▰</span>
          </div>
          <div className="notch" />

          <div className="screen-content">
            <div className="topbar">
              <button className="back" onClick={() => setPage("home")}>
                ×
              </button>
              <button className="option" style={{ flex: "none" }}>
                1080P ⌄
              </button>
              <button className="pink" style={{ padding: "8px 15px" }} onClick={() => setPage("export")}>
                ↑ ส่งออก
              </button>
            </div>

            <div className="preview">
              <img
                src={videos[0].image}
                alt="Video preview"
              />
              <button className="play" onClick={() => setPlaying(!playing)}>
                {playing ? "Ⅱ" : "▶"}
              </button>
            </div>

            <div className="editor-actions">
              <span>{playing ? "00:12" : "00:00"} / 00:30</span>
              <button className="back" onClick={() => setPlaying(!playing)}>▶</button>
              <span>↶　↷　⛶</span>
            </div>

            <div className="timeline">
              <div className="time-label">
                <span>00:00</span>
                <span>00:05</span>
                <span>00:10</span>
              </div>

              <div className="track">
                {videos.map((v) => (
                  <img src={v.image} key={v.title} alt="" />
                ))}
              </div>

              <button
                className="music-track"
                style={{ width: "100%", textAlign: "left", border: "none" }}
                onClick={() => setMusic(!music)}
              >
                ♫ {music ? "เพลงประกอบ" : "ปิดเสียงเพลง"}
                <span className="music-wave">▂▅▃▇▅▂▆▃▅▇</span>
              </button>
            </div>

            <p className="text-muted">เครื่องมือตัดต่อ</p>

            <div className="editor-tool-grid">
              {tools.map((tool) => (
                <button
                  key={tool.name}
                  className={`editor-tool ${activeTool === tool.name ? "active" : ""}`}
                  onClick={() => setActiveTool(tool.name)}
                >
                  <div>{tool.icon}</div>
                  {tool.name}
                </button>
              ))}
            </div>

            <div className="timeline" style={{ marginTop: 0 }}>
              <b style={{ fontSize: 12 }}>{activeTool}</b>
              <p className="text-muted">
                {activeTool === "ตัดต่อ"
                  ? "เลือกคลิปบน Timeline เพื่อแก้ไข"
                  : `กำลังเลือกเครื่องมือ${activeTool}`}
              </p>
            </div>
          </div>

          <nav className="bottom-nav">
            <button className="nav-item active" onClick={() => setPage("home")}>⌂<small>หน้าหลัก</small></button>
            <button className="nav-item active" onClick={goEdit}>✂<small>ตัดต่อ</small></button>
            <button className="nav-item" onClick={() => setPage("export")}>T<small>ข้อความ</small></button>
            <button className="nav-item" onClick={() => setMusic(!music)}>♫<small>เสียงเพลง</small></button>
          </nav>
        </section>

        {/* SCREEN 3 : EXPORT */}
        <section className="phone">
          <div className="status">
            <b>9:41</b>
            <span>●●● ▰ ▰</span>
          </div>
          <div className="notch" />

          <div className="screen-content">
            <div className="topbar">
              <button className="back" onClick={() => setPage("editor")}>‹</button>
              <b>ส่งออกวิดีโอ</b>
              <span />
            </div>

            <div className="preview" style={{ height: 155 }}>
              <img src={videos[0].image} alt="Export preview" />
              <button className="play" onClick={() => setPlaying(!playing)}>
                {playing ? "Ⅱ" : "▶"}
              </button>
            </div>

            <p className="setting-label">ความละเอียด</p>
            <div className="option-row">
              {["480P", "720P", "1080P"].map((r) => (
                <button
                  key={r}
                  onClick={() => setResolution(r)}
                  className={`option ${resolution === r ? "selected" : ""}`}
                >
                  {r} {resolution === r ? "✓" : ""}
                </button>
              ))}
            </div>

            <p className="setting-label">อัตราเฟรม (FPS)</p>
            <div className="option-row">
              {["24", "30", "60"].map((r) => (
                <button
                  key={r}
                  onClick={() => setFps(r)}
                  className={`option ${fps === r ? "selected" : ""}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <p className="setting-label">รูปแบบไฟล์</p>
            <div className="option-row">
              {["MP4", "MOV"].map((r) => (
                <button
                  key={r}
                  onClick={() => setFormat(r)}
                  className={`option ${format === r ? "selected" : ""}`}
                >
                  {r} {format === r ? "✓" : ""}
                </button>
              ))}
            </div>

            <button className="pink export-btn" onClick={exportVideo}>
              ↓ เริ่มส่งออก
            </button>

            <p className="text-muted" style={{ textAlign: "center" }}>
              ♡ วิดีโอของคุณพร้อมแชร์แล้ว
            </p>
          </div>

          <nav className="bottom-nav">
            <button className="nav-item" onClick={() => setPage("home")}>⌂<small>หน้าหลัก</small></button>
            <button className="nav-item" onClick={goEdit}>▣<small>โปรเจกต์</small></button>
            <button className="nav-item active" onClick={() => setPage("export")}>♛<small>ส่งออก</small></button>
            <button className="nav-item" onClick={() => setPage("library")}>♙<small>คลังวิดีโอ</small></button>
          </nav>
        </section>

        {/* SCREEN 4 : LIBRARY */}
        <section className="phone">
          <div className="status">
            <b>9:41</b>
            <span>●●● ▰ ▰</span>
          </div>
          <div className="notch" />

          <div className="screen-content">
            <div className="topbar">
              <b className="phone-title">โปรเจกต์ของฉัน</b>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="back" onClick={() => alert("ค้นหา")}>⌕</button>
                <button className="back" onClick={() => alert("จัดการโปรเจกต์")}>▤</button>
              </div>
            </div>

            <input
              className="full-input"
              placeholder="ค้นหาโปรเจกต์..."
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
            />

            <div className="library-grid">
              {videos
                .filter((v) =>
                  v.title.toLowerCase().includes(videoName.toLowerCase()) ||
                  videoName === "โปรเจกต์ของฉัน"
                )
                .map((v) => (
                  <div className="video-card" key={v.title}>
                    <div className="thumbnail">
                      <img src={v.image} alt={v.title} />
                      <span>{v.time}</span>
                    </div>
                    <p>{v.title}</p>
                    <small>วิดีโอ • บันทึกแล้ว</small>
                  </div>
                ))}
            </div>

            <button
              className="pink create-btn"
              style={{ marginTop: 25 }}
              onClick={goEdit}
            >
              ＋ สร้างโปรเจกต์ใหม่
            </button>
          </div>

          <nav className="bottom-nav">
            <button className="nav-item" onClick={() => setPage("home")}>⌂<small>หน้าหลัก</small></button>
            <button className="nav-item active" onClick={() => setPage("library")}>▣<small>โปรเจกต์</small></button>
            <button className="nav-item" onClick={() => setPage("export")}>♛<small>พรีเมียม</small></button>
            <button className="nav-item" onClick={() => alert("โปรไฟล์")}>♙<small>โปรไฟล์</small></button>
          </nav>
        </section>
      </div>

      <p style={{
        textAlign: "center",
        color: "#79536d",
        fontSize: 12,
        marginTop: 30
      }}>
        VideoEdit Prototype © 2026 | ออกแบบเพื่อทดลองใช้งาน
      </p>
    </main>
  );
}
