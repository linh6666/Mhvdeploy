// "use client";

// import { useRef, useState, useEffect } from "react";

// export default function AvatarEditor() {
//   const stageRef = useRef<HTMLDivElement>(null);
//   const avatarRef = useRef<HTMLImageElement>(null);
//   const frameRef = useRef<HTMLImageElement>(null);

//   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
//   const [frameUrl] = useState<string>("/Khung VietModel.png"); // Frame nằm trong public folder

//   const [avatar, setAvatar] = useState({
//     x: 0,
//     y: 0,
//     scale: 1,
//     rotDeg: 0,
//   });

//   const draggingRef = useRef(false);
//   const dragStart = useRef({ x: 0, y: 0 });
//   const pointerStart = useRef({ x: 0, y: 0 });

//   // Áp dụng transform cho avatar
//   // useEffect(() => {
//   //   if (!avatarRef.current) return;
//   //   avatarRef.current.style.transform = `translate(${avatar.x}px, ${avatar.y}px) rotate(${avatar.rotDeg}deg) scale(${avatar.scale})`;
//   //   avatarRef.current.style.transformOrigin = "center center";
//   // }, [avatar]);

//   // Center avatar khi load ảnh
//   const centerAvatar = () => {
//     if (!stageRef.current || !avatarRef.current) return;
//     const bounds = stageRef.current.getBoundingClientRect();
//     const { naturalWidth, naturalHeight } = avatarRef.current;
//     if (!naturalWidth || !naturalHeight) return;

//     const scaleToFit = bounds.width / naturalWidth;

//     setAvatar({
//       x: bounds.width / 2 - (naturalWidth * scaleToFit) / 2,
//       y: bounds.height / 2 - (naturalHeight * scaleToFit) / 2,
//       scale: scaleToFit,
//       rotDeg: 0,
//     });
//   };

//   // Reset avatar về mặc định
//   const resetAll = () => {
//     setAvatar({ x: 0, y: 0, scale: 1, rotDeg: 0 });
//   };

//   // ===== Drag avatar =====
//   const onPointerDown = (e: React.PointerEvent) => {
//     e.preventDefault();
//     draggingRef.current = true;
//     pointerStart.current = { x: e.clientX, y: e.clientY };
//     dragStart.current = { x: avatar.x, y: avatar.y };
//     window.addEventListener("pointermove", onMove);
//     window.addEventListener("pointerup", onUp);

//     if (avatarRef.current) avatarRef.current.style.cursor = "grabbing";
//   };

//   const onMove = (e: PointerEvent) => {
//     if (!draggingRef.current) return;
//     const dx = e.clientX - pointerStart.current.x;
//     const dy = e.clientY - pointerStart.current.y;
//     setAvatar((prev) => ({
//       ...prev,
//       x: dragStart.current.x + dx,
//       y: dragStart.current.y + dy,
//     }));
//   };

//   const onUp = () => {
//     draggingRef.current = false;
//     window.removeEventListener("pointermove", onMove);
//     window.removeEventListener("pointerup", onUp);

//     if (avatarRef.current) avatarRef.current.style.cursor = "grab";
//   };

//   // ===== Xuất ảnh ra file =====
//   const exportImage = () => {
//     if (!stageRef.current || !avatarRef.current || !frameRef.current) return;

//     const canvas = document.createElement("canvas");
//     canvas.width = 1080;
//     canvas.height = 1080;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const stageWidth = stageRef.current.clientWidth;
//     const stageHeight = stageRef.current.clientHeight;

//     if (avatarUrl) {
//       const img = avatarRef.current;
//       const imgWidth = img.naturalWidth;
//       const imgHeight = img.naturalHeight;

//       const scaleX = canvas.width / stageWidth;
//       const scaleY = canvas.height / stageHeight;

//       ctx.save();
//       ctx.translate(
//         (avatar.x + (imgWidth * avatar.scale) / 2) * scaleX,
//         (avatar.y + (imgHeight * avatar.scale) / 2) * scaleY
//       );
//       ctx.rotate((avatar.rotDeg * Math.PI) / 180);
//       ctx.scale(avatar.scale * scaleX, avatar.scale * scaleY);
//       ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2);
//       ctx.restore();
//     }

//     // Vẽ frame
//     ctx.drawImage(frameRef.current, 0, 0, canvas.width, canvas.height);

//     const a = document.createElement("a");
//     a.href = canvas.toDataURL("image/png");
//     a.download = "avatar_khung.png";
//     a.click();
//   };

//   useEffect(() => {
//     if (!avatarRef.current) return;
//     avatarRef.current.onload = () => centerAvatar();
//     window.addEventListener("resize", centerAvatar);
//     return () => window.removeEventListener("resize", centerAvatar);
//   }, [avatarUrl]);

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-white mt-[80px]">
//       {/* Sidebar */}
//       <aside className="w-full md:w-80 p-4 bg-slate-800 space-y-4">
//         <div>
//           <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">
//             Ảnh khung
//           </h3>
//           <p className="text-gray-400">Khung ảnh đã được cố định.</p>
//         </div>

//         <div>
//           <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">
//             Ảnh avatar
//           </h3>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               if (e.target.files?.[0])
//                 setAvatarUrl(URL.createObjectURL(e.target.files[0]));
//             }}
//           />
//           <label className="block text-xs mt-2">Phóng to</label>
//           <input
//             type="range"
//             min="0.2"
//             max="3"
//             step="0.01"
//             value={avatar.scale}
//             onChange={(e) =>
//               setAvatar({ ...avatar, scale: parseFloat(e.target.value) })
//             }
//           />
//           <label className="block text-xs mt-2">Xoay</label>
//           <input
//             type="range"
//             min="-180"
//             max="180"
//             step="1"
//             value={avatar.rotDeg}
//             onChange={(e) =>
//               setAvatar({ ...avatar, rotDeg: parseFloat(e.target.value) })
//             }
//           />
//         </div>

//         <div>
//           <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">
//             Xuất ảnh
//           </h3>
//           <button
//             className="w-full bg-cyan-600 py-2 rounded mb-2"
//             onClick={exportImage}
//           >
//             Tải ảnh
//           </button>
//           <button
//             className="w-full bg-slate-700 py-2 rounded"
//             onClick={resetAll}
//           >
//             Reset
//           </button>
//         </div>
//       </aside>

//       {/* Stage */}
//       <main className="flex-1 flex items-center justify-center p-4">
//         <div
//           ref={stageRef}
//           className="relative bg-slate-950 border border-slate-700 rounded-lg w-full max-w-lg aspect-square overflow-hidden"
//         >
//           {avatarUrl && (
//             <img
//               ref={avatarRef}
//               src={avatarUrl}
//               alt="Avatar"
//               className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
//               onPointerDown={onPointerDown}
//             />
//           )}
//           {frameUrl && (
//             <img
//               ref={frameRef}
//               src={frameUrl}
//               alt="Frame"
//               className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
//             />
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function AvatarEditor() {
  const stageRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLImageElement>(null);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [frameUrl] = useState<string>("/Khung VietModel.png");

  const [avatar, setAvatar] = useState({
    x: 0,
    y: 0,
    scale: 1,
    rotDeg: 0,
  });

  const draggingRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const pointerStart = useRef({ x: 0, y: 0 });

  // ===== Center avatar khi load ảnh =====
  const centerAvatar = () => {
    if (!stageRef.current || !avatarUrl) return;

    const stageBounds = stageRef.current.getBoundingClientRect();

    const img = new window.Image();
    img.src = avatarUrl;
    img.onload = () => {
      const scaleX = stageBounds.width / img.width;
      const scaleY = stageBounds.height / img.height;
      const scaleToFit = Math.min(scaleX, scaleY);

      const x = stageBounds.width / 2 - (img.width * scaleToFit) / 2;
      const y = stageBounds.height / 2 - (img.height * scaleToFit) / 2;

      setAvatar({ x, y, scale: scaleToFit, rotDeg: 0 });
    };
  };

  const resetAll = () => {
    setAvatar({ x: 0, y: 0, scale: 1, rotDeg: 0 });
  };

  // ===== Drag (pointer + touch) =====
  const startDrag = (clientX: number, clientY: number) => {
    draggingRef.current = true;
    pointerStart.current = { x: clientX, y: clientY };
    dragStart.current = { x: avatar.x, y: avatar.y };
  };

  const onMoveDrag = (clientX: number, clientY: number) => {
    if (!draggingRef.current) return;
    const dx = clientX - pointerStart.current.x;
    const dy = clientY - pointerStart.current.y;
    setAvatar((prev) => ({
      ...prev,
      x: dragStart.current.x + dx,
      y: dragStart.current.y + dy,
    }));
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);
  };

  const pointerMove = (e: PointerEvent) => onMoveDrag(e.clientX, e.clientY);
  const pointerUp = () => {
    endDrag();
    window.removeEventListener("pointermove", pointerMove);
    window.removeEventListener("pointerup", pointerUp);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    e.preventDefault();
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("touchend", touchEnd);
  };

  const touchMove = (e: TouchEvent) => {
    e.preventDefault();
    onMoveDrag(e.touches[0].clientX, e.touches[0].clientY);
  };

  const touchEnd = () => {
    endDrag();
    window.removeEventListener("touchmove", touchMove);
    window.removeEventListener("touchend", touchEnd);
  };

  // ===== Xuất ảnh =====
  const exportImage = () => {
    if (!stageRef.current || !frameRef.current || !avatarUrl) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const stage = stageRef.current;
    const scaleX = canvas.width / stage.clientWidth;
    const scaleY = canvas.height / stage.clientHeight;

    // Vẽ avatar
    const img = new window.Image();
    img.src = avatarUrl;
    img.onload = () => {
      ctx.save();
      ctx.translate(
        (avatar.x + (img.width * avatar.scale) / 2) * scaleX,
        (avatar.y + (img.height * avatar.scale) / 2) * scaleY
      );
      ctx.rotate((avatar.rotDeg * Math.PI) / 180);
      ctx.scale(avatar.scale * scaleX, avatar.scale * scaleY);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      // Vẽ frame
      ctx.drawImage(frameRef.current!, 0, 0, canvas.width, canvas.height);

      // Xuất file
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "avatar_khung.png";
      a.click();
    };
  };

  // ===== useEffect load ảnh + resize =====
  useEffect(() => {
    centerAvatar();
    window.addEventListener("resize", centerAvatar);
    return () => window.removeEventListener("resize", centerAvatar);
  }, [avatarUrl]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-white mt-[80px]">
      {/* Sidebar */}
      <aside className="w-full md:w-80 p-4 bg-slate-800 space-y-4">
        <div>
          <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">
            Ảnh khung
          </h3>
          <p className="text-gray-400">Khung ảnh đã được cố định.</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">
            Ảnh avatar
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0])
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <label className="block text-xs mt-2">Phóng to</label>
          <input
            type="range"
            min="0.2"
            max="3"
            step="0.01"
            value={avatar.scale}
            onChange={(e) =>
              setAvatar({ ...avatar, scale: parseFloat(e.target.value) })
            }
          />
          <label className="block text-xs mt-2">Xoay</label>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={avatar.rotDeg}
            onChange={(e) =>
              setAvatar({ ...avatar, rotDeg: parseFloat(e.target.value) })
            }
          />
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">
            Xuất ảnh
          </h3>
          <button
            className="w-full bg-cyan-600 py-2 rounded mb-2"
            onClick={exportImage}
          >
            Tải ảnh
          </button>
          <button
            className="w-full bg-slate-700 py-2 rounded"
            onClick={resetAll}
          >
            Reset
          </button>
        </div>
      </aside>

      {/* Stage */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div
          ref={stageRef}
          className="relative bg-slate-950 border border-slate-700 rounded-lg w-full max-w-lg aspect-square overflow-hidden"
        >
          {/* Avatar */}
          {avatarUrl && (
            <img
              ref={avatarRef}
              src={avatarUrl}
              alt="Avatar"
              onPointerDown={onPointerDown}
              onTouchStart={onTouchStart}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translate(${avatar.x}px, ${avatar.y}px) scale(${avatar.scale}) rotate(${avatar.rotDeg}deg)`,
                transformOrigin: "top left",
                cursor: "grab",
                zIndex: 10,
                maxWidth: "none",
              }}
            />
          )}
          {frameUrl && (
            <Image
              ref={frameRef}
              src={frameUrl}
              alt="Frame"
              fill
              style={{
                objectFit: "contain",
                pointerEvents: "none",
                zIndex: 20,
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
