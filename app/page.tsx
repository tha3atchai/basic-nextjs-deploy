"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const ModelViewer = dynamic(() => import("../components/ModelViewer"), {
  ssr: false,
});

export default function Home() {
  const { scrollYProgress, scrollY } = useScroll();
  const [refY, setRefY] = useState();

  // ใช้ useEffect เพื่อตรวจสอบค่า scrollY

  useMotionValueEvent(scrollY, "change", latest => {
    console.log("Page scroll: ", latest);
    setRefY(latest);
  });

  // การเปลี่ยนแปลงของ scale และ borderRadius
  // const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);

  // การเลื่อนของวงกลมจากหน้า 1 ไปหน้า 2
  const x = useTransform(scrollYProgress, [0, 0.5], [400, 400]); // เลื่อนจากซ้ายไปขวา
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 2200]); // เลื่อนจากบนลงล่าง

  const x2 = useTransform(scrollYProgress, [0.3, 1], [400, 400]); // เลื่อนจากซ้ายไปขวา
  const y2 = useTransform(scrollYProgress, [0.3, 1], [-400, 3000]); // เลื่อนจากบนลงล่าง

  useEffect(() => {
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>Test Threejs use GLB file</div>
      <div className="w-full" style={{ height: "400vh" }}>
        {refY < 600 && (
          <>
            {/* เพิ่มพื้นที่ของ page 2 เพื่อให้สามารถ scroll ได้ */}
            <motion.div
              style={{
                // width: "150px",
                // height: "150px",
                // backgroundColor: "red",
                //   margin: "auto",
                position: "absolute", // กำหนดตำแหน่งแบบ absolute เพื่อให้สามารถเคลื่อนที่ได้
                transformOrigin: "center",
                x, // การเลื่อนในแนวนอน
                y, // การเลื่อนในแนวตั้ง
                // scale, // การเปลี่ยนขนาด
                borderRadius, // การเปลี่ยนรูปร่าง
              }}
              initial="offscreen"
              whileInView="onscreen"
            >
              <ModelViewer src="/models/newLogo2.glb" refY={refY} />
            </motion.div>
          </>
        )}
        <h2
          className="w-full"
          style={{ height: "100vh", backgroundColor: "blue" }}
        >
          {/* Page 1 */}
        </h2>
        <h2
          className="w-full"
          style={{ height: "100vh", backgroundColor: "blue" }}
        >
          {/* Page 2 */}
          {refY > 600 && (
            <>
              {/* เพิ่มพื้นที่ของ page 2 เพื่อให้สามารถ scroll ได้ */}
              <motion.div
                style={{
                  width: "150px",
                  height: "150px",
                  backgroundColor: "blue",
                  //   margin: "auto",
                  position: "absolute", // กำหนดตำแหน่งแบบ absolute เพื่อให้สามารถเคลื่อนที่ได้
                  transformOrigin: "center",
                  x: x2, // การเลื่อนในแนวนอน
                  y: y2, // การเลื่อนในแนวตั้ง
                  // scale, // การเปลี่ยนขนาด
                  borderRadius, // การเปลี่ยนรูปร่าง
                }}
                initial="offscreen"
                whileInView="onscreen"
              >
                <ModelViewer src="/models/newLogo2.glb" refY={refY} />
              </motion.div>
            </>
          )}
        </h2>
        <h2
          className="w-full"
          style={{ height: "100vh", backgroundColor: "darkred" }}
        >
          Page 3
        </h2>
      </div>
    </div>
  );
}
