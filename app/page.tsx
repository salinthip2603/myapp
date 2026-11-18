
"use client";

import { useState } from "react";

type Screen = "home" | "seats" | "booking" | "success";

const busImage =
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1000&q=85";

const destinations = [
  {
    name: "เชียงใหม่",
    from: "กรุงเทพฯ",
    image:
      "https://images.unsplash.com/photo-1598935888738-cd2622bcd437?w=500&q=80",
    price: 650,
  },
  {
    name: "ขอนแก่น",
    from: "กรุงเทพฯ",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&q=80",
    price: 480,
  },
  {
    name: "ภูเก็ต",
    from: "กรุงเทพฯ",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=500&q=80",
    price: 850,
  },
];

const allSeats = [
  "1A", "1B", "1C", "1D",
  "2A", "2B", "2C", "2D",
  "3A", "3B", "3C", "3D",
  "4A", "4B", "4C", "4D",
  "5A", "5B", "5C", "5D",
];

const occupiedSeats = ["1C", "2D", "3D", "4A", "5C"];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [from, setFrom] = useState("กรุงเทพฯ");
  const [to, setTo] = useState("เชียงใหม่");
  const [date, setDate] = useState("2026-11-25");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([
    "3A",
    "3B",
  ]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("บัตรเครดิต / เดบิต");
  const [bookingCode] = useState("BK2568001234");
  const [activeTab, setActiveTab] = useState("หน้าแรก");

  const price =
    destinations.find((item) => item.name === to)?.price ?? 650;

  const total = selectedSeats.length * price;

  const toggleSeat = (seat: string) => {
    if (occupiedSeats.includes(seat)) return;

    setSelectedSeats((current) =>
      current.includes(seat)
        ? current.filter((item) => item !== seat)
        : current.length < 5
        ? [...current, seat]
        : current
    );
  };

  const searchTickets = () => {
    if (from === to) {
      alert("ต้นทางและปลายทางต้องไม่เหมือนกัน");
      return;
    }
    setScreen("seats");
  };

  const goBooking = () => {
    if (selectedSeats.length === 0) {
      alert("กรุณาเลือกที่นั่งก่อน");
      return;
    }
    setScreen("booking");
  };

  const confirmBooking = () => {
    if (!name.trim() || !phone.trim()) {
      alert("กรุณากรอกชื่อและเบอร์โทรศัพท์");
      return;
    }
    if (phone.length < 9) {
      alert("กรุณาตรวจสอบเบอร์โทรศัพท์");
      return;
    }
    setScreen("success");
  };

  const resetApp = () => {
    setScreen("home");
    setSelectedSeats(["3A", "3B"]);
    setName("");
    setPhone("");
    setActiveTab("หน้าแรก");
  };

  const formattedDate = new Date(
    `${date}T00:00:00`
  ).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const ScreenHeader = ({
    title,
    back,
  }: {
    title: string;
    back: () => void;
  }) => (
    <div className="flex items-center justify-between px-5 py-4">
      <button
        onClick={back}
        className="text-2xl text-white hover:text-pink-400"
      >
        ←
      </button>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="w-6" />
    </div>
  );

  const BottomNav = () => (
    <div className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-white/10 bg-[#17121c]/95 px-2 py-3 backdrop-blur-xl">
      {[
        ["⌂", "หน้าแรก"],
        ["▤", "การจองของฉัน"],
        ["♧", "ช่วยเหลือ"],
        ["♙", "โปรไฟล์"],
      ].map(([icon, label]) => (
        <button
          key={label}
          onClick={() => {
            setActiveTab(label);
            if (label === "หน้าแรก") setScreen("home");
            if (label === "การจองของฉัน") {
              alert("ยังไม่มีรายการจองอื่นใน Prototype นี้");
            }
            if (label === "ช่วยเหลือ") {
              alert("ติดต่อ Call Center: 02-000-0000");
            }
            if (label === "โปรไฟล์") {
              alert("ระบบโปรไฟล์ยังไม่เปิดใช้งาน");
            }
          }}
          className={`flex flex-col items-center gap-1 text-xs ${
            activeTab === label ? "text-pink-400" : "text-gray-400"
          }`}
        >
          <span className="text-2xl">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0b080e] px-3 py-6 text-white sm:px-6">
      <div className="mx-auto max-w-[430px] overflow-hidden rounded-[35px] border border-pink-400/30 bg-[#17121c] shadow-[0_0_50px_rgba(236,72,153,0.16)]">

        {/* HOME SCREEN */}
        {screen === "home" && (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#17121c]" />

              <img
                src={busImage}
                alt="รถโดยสาร"
                className="h-[245px] w-full object-cover"
              />

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl text-pink-400">▣</span>
                  <div>
                    <h1 className="text-3xl font-black">
                      Bus<span className="text-pink-400">Go</span>
                    </h1>
                    <p className="text-xs text-gray-200">
                      เดินทางสะดวก ทุกเส้นทาง
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => alert("ไม่มีการแจ้งเตือนใหม่")}
                  className="text-2xl"
                >
                  ♧
                </button>
              </div>

              <div className="absolute bottom-5 left-5">
                <h2 className="text-2xl font-black leading-tight">
                  ออกเดินทาง
                  <br />
                  ไปกับ BusGo ♡
                </h2>
                <p className="mt-2 text-sm text-pink-300">
                  ค้นหาการเดินทางของคุณ
                </p>
              </div>
            </div>

            <div className="px-4 pb-5">
              <div className="mb-4 grid grid-cols-2 rounded-xl bg-[#29232f] p-1">
                <button className="rounded-lg bg-gradient-to-r from-pink-500 to-pink-400 py-3 font-bold text-black">
                  ▣ จองตั๋วรถ
                </button>
                <button
                  onClick={() =>
                    alert("กรุณาเข้าสู่ระบบเพื่อเช็กสถานะ")
                  }
                  className="rounded-lg py-3 text-sm text-gray-300"
                >
                  ▤ เช็กสถานะ
                </button>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-[#29232f] p-3">
                  <label className="mb-1 block text-xs text-gray-400">
                    📍 ต้นทาง
                  </label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-transparent font-semibold outline-none"
                  >
                    {["กรุงเทพฯ", "เชียงใหม่", "ขอนแก่น", "ภูเก็ต"].map(
                      (city) => (
                        <option key={city} value={city} className="bg-[#29232f]">
                          {city}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#29232f] p-3">
                  <label className="mb-1 block text-xs text-gray-400">
                    📍 ปลายทาง
                  </label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-transparent font-semibold outline-none"
                  >
                    {["เชียงใหม่", "ขอนแก่น", "ภูเก็ต", "กรุงเทพฯ"].map(
                      (city) => (
                        <option key={city} value={city} className="bg-[#29232f]">
                          {city}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#29232f] p-3">
                  <label className="mb-1 block text-xs text-gray-400">
                    📅 วันเดินทาง
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-white outline-none"
                  />
                </div>
              </div>

              <button
                onClick={searchTickets}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-pink-500 to-pink-300 py-4 font-black text-black shadow-lg shadow-pink-500/20 transition hover:brightness-110 active:scale-95"
              >
                🔍 ค้นหาตั๋ว
              </button>

              <div className="mb-3 mt-6 flex items-center justify-between">
                <h3 className="font-bold">เส้นทางยอดนิยม</h3>
                <button
                  onClick={() => alert("แสดงเส้นทางทั้งหมด")}
                  className="text-xs text-pink-400"
                >
                  ดูทั้งหมด ›
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {destinations.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setFrom("กรุงเทพฯ");
                      setTo(item.name);
                    }}
                    className="overflow-hidden rounded-xl border border-white/10 bg-[#29232f] text-left"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-full object-cover"
                    />
                    <div className="p-2">
                      <p className="text-xs font-bold">{item.from}</p>
                      <p className="text-xs text-pink-300">
                        → {item.name}
                      </p>
                      <p className="mt-1 text-[10px] text-gray-400">
                        เริ่ม ฿{item.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <BottomNav />
          </>
        )}

        {/* SEAT SCREEN */}
        {screen === "seats" && (
          <>
            <ScreenHeader
              title="เลือกที่นั่ง"
              back={() => setScreen("home")}
            />

            <div className="px-4 pb-5">
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-[#29232f] p-3">
                <img
                  src={busImage}
                  alt="รถโดยสาร"
                  className="h-20 w-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold">
                    {from} → {to}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    วันเดินทาง {formattedDate}
                  </p>
                  <p className="text-xs text-gray-400">
                    20:00 น. | รถ VIP 32 ที่นั่ง
                  </p>
                  <p className="mt-1 text-sm font-bold text-pink-400">
                    ฿{price} / ที่นั่ง
                  </p>
                </div>
              </div>

              <div className="my-5 flex flex-wrap justify-center gap-4 text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded bg-white" />
                  ที่นั่งว่าง
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded bg-pink-500" />
                  ที่นั่งที่เลือก
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded bg-gray-600" />
                  ถูกจองแล้ว
                </span>
              </div>

              <div className="rounded-[35px] border-4 border-gray-500/60 bg-gradient-to-b from-[#4b4552] to-[#211c27] p-4 shadow-inner">
                <div className="mb-5 rounded-2xl border border-gray-500 bg-[#17121c] py-3 text-center text-sm font-bold text-pink-300">
                  🚘 ด้านหน้ารถ / คนขับ
                </div>

                <div className="grid grid-cols-[1fr_1fr_0.45fr_1fr_1fr] gap-2">
                  {allSeats.map((seat, index) => {
                    const occupied = occupiedSeats.includes(seat);
                    const selected = selectedSeats.includes(seat);

                    return (
                      <div key={seat} className="contents">
                        {index % 4 === 0 && (
                          <div className="hidden" />
                        )}
                        <button
                          onClick={() => toggleSeat(seat)}
                          disabled={occupied}
                          className={`aspect-square rounded-xl text-sm font-black transition active:scale-90 ${
                            occupied
                              ? "cursor-not-allowed bg-gray-600 text-gray-400"
                              : selected
                              ? "bg-gradient-to-br from-pink-400 to-pink-600 text-black shadow-lg shadow-pink-500/30"
                              : "bg-gray-100 text-gray-900 hover:bg-pink-200"
                          }`}
                        >
                          {seat}
                        </button>
                        {index % 4 === 1 && (
                          <div className="flex items-center justify-center text-[10px] text-gray-500">
                            |
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-xl border border-gray-600 bg-[#17121c] py-2 text-center text-xs text-gray-400">
                  🚪 ทางออกฉุกเฉิน
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-pink-400/20 bg-[#29232f] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">ที่นั่งที่เลือก</p>
                    <p className="mt-1 text-sm text-pink-300">
                      {selectedSeats.length
                        ? selectedSeats.join(", ")
                        : "ยังไม่ได้เลือกที่นั่ง"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">รวมทั้งหมด</p>
                    <p className="text-xl font-black text-pink-400">
                      ฿{total.toLocaleString("th-TH")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={goBooking}
                  className="mt-4 w-full rounded-full bg-gradient-to-r from-pink-500 to-pink-300 py-4 font-black text-black"
                >
                  ดำเนินการต่อ →
                </button>
              </div>
            </div>
          </>
        )}

        {/* BOOKING SCREEN */}
        {screen === "booking" && (
          <>
            <ScreenHeader
              title="สรุปรายการจอง"
              back={() => setScreen("seats")}
            />

            <div className="space-y-4 px-4 pb-6">
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-[#29232f] p-3">
                <img
                  src={busImage}
                  alt="รถโดยสาร"
                  className="h-20 w-24 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold">
                    {from} → {to}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    วันที่ {formattedDate}
                  </p>
                  <p className="text-xs text-gray-400">
                    เวลา 20:00 น. | VIP
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#29232f] p-4">
                <h3 className="mb-3 font-bold">รายละเอียดการจอง</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">ที่นั่ง</span>
                    <span>{selectedSeats.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">จำนวน</span>
                    <span>{selectedSeats.length} ที่นั่ง</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ราคา / ที่นั่ง</span>
                    <span>฿{price.toLocaleString("th-TH")}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <div className="flex justify-between font-bold">
                      <span>ยอดรวมทั้งหมด</span>
                      <span className="text-xl text-pink-400">
                        ฿{total.toLocaleString("th-TH")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#29232f] p-4">
                <h3 className="mb-4 font-bold">ข้อมูลผู้โดยสาร</h3>
                <label className="mb-2 block text-xs text-gray-400">
                  ชื่อ - นามสกุล
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="กรอกชื่อ-นามสกุล"
                  className="mb-4 w-full rounded-xl border border-white/10 bg-[#17121c] p-3 text-sm outline-none focus:border-pink-400"
                />

                <label className="mb-2 block text-xs text-gray-400">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="กรอกเบอร์โทรศัพท์"
                  className="w-full rounded-xl border border-white/10 bg-[#17121c] p-3 text-sm outline-none focus:border-pink-400"
                />
              </div>

              <div className="rounded-2xl bg-[#29232f] p-4">
                <h3 className="mb-3 font-bold">ช่องทางการชำระเงิน</h3>
                {[
                  ["บัตรเครดิต / เดบิต", "💳"],
                  ["พร้อมเพย์", "▣"],
                  ["โอนผ่านธนาคาร", "🏦"],
                ].map(([label, icon]) => (
                  <button
                    key={label}
                    onClick={() => setPayment(label)}
                    className={`mb-2 flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm ${
                      payment === label
                        ? "border-pink-400 bg-pink-500/10"
                        : "border-white/10 bg-[#17121c]"
                    }`}
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="flex-1">{label}</span>
                    <span
                      className={`h-4 w-4 rounded-full border ${
                        payment === label
                          ? "border-pink-400 bg-pink-400"
                          : "border-gray-500"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={confirmBooking}
                className="w-full rounded-full bg-gradient-to-r from-pink-500 to-pink-300 py-4 font-black text-black shadow-lg shadow-pink-500/20"
              >
                💳 ยืนยันการจอง
              </button>
              <p className="text-center text-xs text-gray-500">
                * Prototype สำหรับทดลองใช้งาน ยังไม่มีการตัดเงินจริง
              </p>
            </div>
          </>
        )}

        {/* SUCCESS SCREEN */}
        {screen === "success" && (
          <div className="flex min-h-[780px] flex-col items-center justify-between px-5 py-10 text-center">
            <div className="w-full">
              <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-pink-600 text-6xl font-black text-white shadow-[0_0_50px_rgba(236,72,153,0.5)]">
                ✓
              </div>

              <h1 className="text-3xl font-black">
                จองตั๋วสำเร็จ!
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                ขอบคุณที่เลือกเดินทางกับ BusGo
              </p>

              <div className="mt-8 rounded-2xl border border-pink-400/30 bg-gradient-to-r from-pink-600/80 to-pink-400/80 p-4">
                <p className="text-sm text-white/80">
                  หมายเลขการจอง
                </p>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <p className="text-xl font-black tracking-wider">
                    {bookingCode}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(bookingCode);
                      alert("คัดลอกหมายเลขการจองแล้ว");
                    }}
                    className="text-xl"
                  >
                    ▢
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#29232f] p-4 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">เส้นทาง</span>
                  <span>{from} → {to}</span>
                </div>
                <div className="mt-3 flex justify-between">
                  <span className="text-gray-400">วันเดินทาง</span>
                  <span>{formattedDate}</span>
                </div>
                <div className="mt-3 flex justify-between">
                  <span className="text-gray-400">ที่นั่ง</span>
                  <span>{selectedSeats.join(", ")}</span>
                </div>
                <div className="mt-3 flex justify-between">
                  <span className="text-gray-400">ยอดรวม</span>
                  <span className="font-bold text-pink-400">
                    ฿{total.toLocaleString("th-TH")}
                  </span>
                </div>
                <div className="mt-3 flex justify-between">
                  <span className="text-gray-400">ช่องทางชำระเงิน</span>
                  <span>{payment}</span>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-gray-400">
                กรุณาเก็บหมายเลขการจองไว้
                <br />
                เพื่อใช้ในการตรวจสอบสถานะการเดินทาง
              </p>
            </div>

            <div className="w-full">
              <button
                onClick={() =>
                  alert(
                    `รายละเอียดการจอง\nหมายเลข: ${bookingCode}\nผู้โดยสาร: ${name}\nเบอร์โทร: ${phone}`
                  )
                }
                className="w-full rounded-full bg-gradient-to-r from-pink-500 to-pink-300 py-4 font-black text-black"
              >
                ▣ ดูรายละเอียดการจอง
              </button>
              <button
                onClick={resetApp}
                className="mt-3 w-full rounded-full border border-pink-400 py-4 font-bold text-pink-300"
              >
                ⌂ กลับหน้าหลัก
              </button>
            </div>

            <img
              src={busImage}
              alt="รถโดยสาร BusGo"
              className="mt-8 h-40 w-full rounded-2xl object-cover"
            />
          </div>
        )}
      </div>

      <p className="mt-5 text-center text-xs text-gray-500">
        BusGo • Bus Ticket Booking Prototype
      </p>
    </main>
  );
}
