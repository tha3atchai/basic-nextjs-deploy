"use client";
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

const ScrollAnimation = () => {
  // ใช้ useScroll เพื่อดึงข้อมูล scrollYProgress
  const { scrollYProgress } = useScroll();

  console.log("scrollYProgress", scrollYProgress);

  // การเปลี่ยนแปลงของ scale และ borderRadius
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);

  // การเลื่อนของวงกลมจากหน้า 1 ไปหน้า 2
  const x = useTransform(scrollYProgress, [0, 1], [0, "100vw"]); // เลื่อนจากซ้ายไปขวา
  const y = useTransform(scrollYProgress, [0, 1], [0, 1280]); // เลื่อนจากบนลงล่าง

  return (
    <div className="bg-violet-500" style={{ height: "200vh" }}>
      {/* เพิ่มพื้นที่ของ page 2 เพื่อให้สามารถ scroll ได้ */}
      <motion.div
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: "red",
          //   margin: "auto",
          position: "absolute", // กำหนดตำแหน่งแบบ absolute เพื่อให้สามารถเคลื่อนที่ได้
          transformOrigin: "center",
          //   x, // การเลื่อนในแนวนอน
          y, // การเลื่อนในแนวตั้ง
          scale, // การเปลี่ยนขนาด
          borderRadius, // การเปลี่ยนรูปร่าง
        }}
      ></motion.div>
      <h2 className="text-white">Page 2</h2>
    </div>
  );
};

export default ScrollAnimation;
