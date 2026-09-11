"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";

export function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function Tilt({ children, className = "" }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 180, damping: 24 });
  function move(event) {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientY - box.top) / box.height - 0.5) * -7);
    y.set(((event.clientX - box.left) / box.width - 0.5) * 9);
  }
  return (
    <motion.div
      className={className}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

export function Sculpture() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="sculpture-stage">
      <div className="art-coordinates">
        <span>FORM / FUNCTION</span>
        <span>001</span>
      </div>
      <motion.div className="sculpture-parallax" style={{ y: reduced ? 0 : y }}>
        <Tilt className="sculpture-tilt">
          <div
            className="sculpture-orbit"
            data-paused={paused || reduced || !inView}
            aria-hidden="true"
          >
            <div className="sculpture-shadow" />
            <div className="sculpture-object">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <div
                  className="sculpture-slice"
                  style={{ "--slice": index }}
                  key={index}
                >
                  <span />
                </div>
              ))}
              <div className="sculpture-core">
                <span>JC</span>
                <ArrowUpRight />
              </div>
            </div>
          </div>
        </Tilt>
      </motion.div>
      <div className="art-caption">
        <span>A LITTLE DEPTH. A LOT OF INTENTION.</span>
        <button
          onClick={() => setPaused(!paused)}
          disabled={Boolean(reduced)}
          aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
          aria-pressed={paused}
        >
          {paused || reduced ? <Play size={13} /> : <Pause size={13} />}
          <span>{reduced ? "Still" : paused ? "Play" : "Pause"}</span>
        </button>
      </div>
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
