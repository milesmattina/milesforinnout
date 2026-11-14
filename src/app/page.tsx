"use client";

import Image from "next/image";
import resumeText from "./resume-text.json";
import { useEffect, useRef, useState } from "react";

type FieldNote = {
  title: string;
  label: string;
  oneLiner: string;
  color: "blue" | "red" | "gold";
  folder: string;
  artifacts: {
    detail: string;
    label: string;
  }[];
  links: {
    label: string;
    href: string;
  }[];
};

type ResumeMode = "closed" | "opening" | "open" | "full" | "minimized" | "closing";

type WhyCard = {
  title: string;
  note?: string;
  secondLine?: string;
  tone?: "sincere" | "bridge";
};

type WhySlideDirection = "next" | "prev";

type CanArrowGeometry = {
  height: number;
  path: string;
  width: number;
};

type ArtifactMedia =
  | {
      alt: string;
      href?: string;
      objectPosition: string;
      src: string;
      type: "image";
    }
  | {
      ariaLabel: string;
      href?: string;
      src: string;
      poster: string;
      type: "video";
    };

const buoyBirdMedia: ArtifactMedia[] = [
  {
    alt: "Buoy Bird merch booth with an orange bus and shirts",
    objectPosition: "center 72%",
    src: "/portfolio/buoy-bird-photo-1-f2087122.webp",
    type: "image",
  },
  {
    alt: "Clear Lake and Mount Konocti from above at dusk",
    objectPosition: "center",
    src: "/portfolio/buoy-bird-photo-2-289f2e5a.webp",
    type: "image",
  },
  {
    ariaLabel: "Clear Lake community video",
    src: "/clear-lake-context.mp4",
    poster: "/portfolio/clear-lake-context-dae269b3.webp",
    type: "video",
  },
  {
    ariaLabel: "Buoy Bird Cinema by the Shore reel",
    href: "https://www.instagram.com/p/DNjMhHCSgwV/",
    src: "/buoy-bird-cbts-reel.mp4",
    poster: "/portfolio/buoy-bird-cbts-reel-8e75ed86.webp",
    type: "video",
  },
];

const konoctiClimbMedia: (ArtifactMedia | undefined)[] = [
  {
    ariaLabel: "Konocti Climb flyover video",
    src: "/konocti-climb-ai-ascent.mp4#t=2",
    poster: "/portfolio/konocti-climb-ai-ascent-762ca070.webp",
    type: "video",
  },
  {
    ariaLabel: "Konocti Climb race-day operations reel",
    href: "https://www.instagram.com/p/DP1VLnyDi2P/",
    src: "/konocti-climb-reel.mp4",
    poster: "/portfolio/konocti-climb-reel-ca0ca006.webp",
    type: "video",
  },
  {
    alt: "Konocti Climb horizontal logo from the website footer",
    objectPosition: "center",
    src: "/portfolio/konocti-climb-horizontal-card-5a3c288d.webp",
    type: "image",
  },
  {
    alt: "Konocti Climb homepage hero with Mount Konocti at sunset",
    objectPosition: "center",
    src: "/portfolio/konocti-climb-home-cover-22e465ed.webp",
    type: "image",
  },
];

const southOfSoberMedia: ArtifactMedia[] = [
  {
    alt: "South of Sober wordmark on a black background",
    objectPosition: "center",
    src: "/portfolio/south-of-sober-logo-9db5395f.webp",
    type: "image",
  },
  {
    alt: "South of Sober band members posing with guitars and amplifiers at UCLA",
    objectPosition: "center",
    src: "/portfolio/south-of-sober-band-f6567d32.webp",
    type: "image",
  },
  {
    ariaLabel: "South of Sober Battle of the Bands performance clip",
    src: "/south-of-sober-botb.mp4",
    poster: "/portfolio/south-of-sober-botb-f9ac86f7.webp",
    type: "video",
  },
  {
    ariaLabel: "South of Sober Hear You Out performance clip",
    src: "/south-of-sober-hear-you-out.mp4",
    poster: "/portfolio/south-of-sober-hear-you-out-5e4aca0a.webp",
    type: "video",
  },
];

const whyCards: WhyCard[] = [
  {
    title: "I BUILT YOU THIS WEBSITE.",
    note: "So that's gotta count for something.",
  },
  {
    title: "I LIKE A BRAND WITH NOTHING TO HIDE.",
    note: "So I brought the work. And the receipts.",
  },
  {
    title: "I PUT MY RESUME IN A TAKEOUT BAG.",
    note: "Apparently, I take brand consistency pretty seriously.",
  },
  {
    title: "YOU ASKED FOR A RESUME.",
    note: "I may have gotten a little carried away.",
  },
  {
    title: "I'VE SOLD T-SHIRTS OUT OF A VOLKSWAGEN BUS.",
    note: "There's probably a transferable skill in there somewhere.",
  },
  {
    title: "I MAKE THINGS PEOPLE ACTUALLY WANT TO LOOK AT.",
    note: "You're still clicking these.",
  },
  {
    title: "SERIOUSLY, THOUGH.",
    secondLine: "I THINK I'D BE REALLY GOOD AT THIS.",
    tone: "sincere",
  },
  {
    title: "DON'T BELIEVE ME?",
    tone: "bridge",
  },
];

const fieldNotes: FieldNote[] = [
  {
    title: "Buoy Bird",
    label: "local apparel brand / community pride / in-person sales",
    oneLiner:
      "I built Buoy Bird to make Lake County feel worth rallying around: products, Shopify, content, pop-up sales, and free lakeside movie nights under one local brand.",
    color: "blue",
    folder: "/work/buoy-bird/",
    artifacts: [
      {
        label: "Volkswagen bus booth",
        detail: "Sold merch in person at local events, including straight out of the bus.",
      },
      {
        label: "Cinema by the Shore",
        detail:
          "Turned Buoy Bird into five free community movie nights with 1,500+ total attendees.",
      },
      {
        label: "Clear Lake context",
        detail: "The brand was built around local pride, lake life, and giving the town something positive to point at.",
      },
      {
        label: "Shopify + social",
        detail: "Ran the store, products, fulfillment, customer issues, paid ads, and content that reached 350K+ views.",
      },
    ],
    links: [
      { label: "buoybird.shop", href: "https://buoybird.shop" },
      {
        label: "@buoybirdofficial",
        href: "https://www.instagram.com/buoybirdofficial/",
      },
    ],
  },
  {
    title: "Konocti Climb",
    label: "public race / mountain brand / full event system",
    oneLiner:
      "A 5K up Mount Konocti where I owned the visible stuff and the invisible stuff: identity, route flow, volunteers, sponsors, shirts, medals, trophies, promotion, and the website.",
    color: "red",
    folder: "/work/konocti-climb/",
    artifacts: [
      {
        label: "166 first-year racers",
        detail: "Built the participant experience for a new race up Lake County's volcanic landmark.",
      },
      {
        label: "Race-day operations",
        detail: "Mapped parking, shuttles, water stations, summit logistics, volunteers, staffing, and flow.",
      },
      {
        label: "Identity + gear",
        detail: "Designed the visual system, bibs, shirts, medals, trophies, flyers, videos, and social assets.",
      },
      {
        label: "Interactive website",
        detail: "Built a responsive event site with course info, mapping, flyover-style presentation, and custom branding.",
      },
    ],
    links: [
      { label: "konocticlimb.com", href: "https://konocticlimb.com" },
      {
        label: "@lakecountyparksandrec",
        href: "https://www.instagram.com/lakecountyparksandrec/",
      },
    ],
  },
  {
    title: "South of Sober",
    label: "band / original music / artist-manager mode",
    oneLiner:
      "The band is the cleanest version of how I work: write the songs, recruit the people, book the room, build the brand, run the logistics, and still get on stage.",
    color: "gold",
    folder: "/work/south-of-sober/",
    artifacts: [
      {
        label: "Original music",
        detail: "Lead singer, guitarist, songwriter, and creative lead for an active Los Angeles band.",
      },
      {
        label: "Crowds in the hundreds",
        detail: "Scaled from early UCLA shows into larger campus events and Los Angeles venues.",
      },
      {
        label: "Booking + operations",
        detail: "Coordinate members, rehearsals, venue relationships, gear, expenses, schedules, and show logistics.",
      },
      {
        label: "Brand + commitment",
        detail: "Named the band, built the website, shaped the visual identity, and bought a cargo van for gear.",
      },
    ],
    links: [{ label: "SouthofSober.com", href: "https://southofsober.com/" }],
  },
];

const navItems = [
  ["Why", "#why-me"],
  ["Receipts", "#field-notes"],
  ["Resume", "#top"],
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createCanArrowGeometry(
  sectionRect: DOMRectReadOnly,
  buttonRect: DOMRectReadOnly,
  canRect: DOMRectReadOnly,
): CanArrowGeometry {
  const localX = (value: number) => value - sectionRect.left;
  const localY = (value: number) => value - sectionRect.top;
  const canIsBelow = canRect.top > buttonRect.bottom + 36;
  const sectionWidth = Math.max(1, sectionRect.width);
  const sectionHeight = Math.max(1, sectionRect.height);
  let path: string;

  if (canIsBelow || sectionWidth < 820) {
    const startX = localX(buttonRect.right - 1);
    const startY = localY(buttonRect.bottom - 1);
    const endX = localX(canRect.left + canRect.width * 0.78);
    const endY = localY(canRect.top + canRect.height * 0.11);
    const distanceX = Math.max(120, endX - startX);
    const distanceY = Math.max(120, endY - startY);
    const pull = Math.min(96, Math.max(52, distanceY * 0.38));

    path = [
      `M ${startX.toFixed(1)} ${startY.toFixed(1)}`,
      `C ${(startX + distanceX * 0.16).toFixed(1)} ${(startY + pull).toFixed(1)},`,
      `${(endX - distanceX * 0.16).toFixed(1)} ${(endY - pull).toFixed(1)},`,
      `${endX.toFixed(1)} ${endY.toFixed(1)}`,
    ].join(" ");
  } else {
    const startX = localX(buttonRect.right - 1);
    const startY = localY(buttonRect.top + buttonRect.height * 0.5);
    const endX = localX(canRect.left + Math.min(22, canRect.width * 0.1));
    const endY = localY(
      clamp(
        Math.max(
          buttonRect.top + buttonRect.height * 0.34,
          canRect.top + canRect.height * 0.46,
        ),
        canRect.top + 24,
        canRect.bottom - 20,
      ),
    );
    const distance = Math.max(160, endX - startX);
    const laneY = Math.max(startY + 2, endY);
    const bow = Math.min(36, Math.max(14, distance * 0.045));

    path = [
      `M ${startX.toFixed(1)} ${startY.toFixed(1)}`,
      `C ${(startX + distance * 0.34).toFixed(1)} ${(laneY + bow).toFixed(1)},`,
      `${(endX - distance * 0.34).toFixed(1)} ${(endY + bow).toFixed(1)},`,
      `${endX.toFixed(1)} ${endY.toFixed(1)}`,
    ].join(" ");
  }

  return {
    height: sectionHeight,
    path,
    width: sectionWidth,
  };
}

function colorClasses(color: FieldNote["color"]) {
  if (color === "red") {
    return "bg-[var(--brand-yellow)] text-[var(--brand-red)] shadow-[10px_10px_0_var(--brand-red)]";
  }

  if (color === "gold") {
    return "bg-[var(--brand-yellow)] text-[var(--ink)] shadow-[10px_10px_0_var(--brand-accent)]";
  }

  return "bg-[var(--brand-red)] text-white shadow-[10px_10px_0_var(--brand-accent)]";
}

type ResumeBagProps = {
  isResumeActive: boolean;
  isPrompting: boolean;
  openResume: () => void;
  resumeMode: ResumeMode;
  onBagMotionEnd: () => void;
};

function ResumeBag({ isResumeActive, isPrompting, openResume, resumeMode, onBagMotionEnd }: ResumeBagProps) {
  return (
    <button
      aria-expanded={isResumeActive}
      aria-controls="resume-viewer"
      aria-label="Open Miles Mattina resume bag"
      disabled={resumeMode === "opening" || resumeMode === "closing"}
      className={`resume-bag ${resumeMode === "opening" ? "resume-bag--opening" : resumeMode === "closing" ? "resume-bag--closing" : ""} ${isPrompting && !isResumeActive ? "resume-bag--prompt" : ""} ${isResumeActive && resumeMode !== "opening" ? "resume-bag--open" : ""}`}
      onClick={openResume}
      type="button"
    >
      <svg className="resume-bag__art" viewBox="0 0 420 540" aria-hidden="true">
        <defs>
          <linearGradient id="bag-paper" x1="0" x2="1"><stop stopColor="#e5dfd0"/><stop offset=".09" stopColor="#fffdf5"/><stop offset=".45" stopColor="#ffffff"/><stop offset=".9" stopColor="#f4f0e5"/><stop offset="1" stopColor="#ded7c5"/></linearGradient>
          <linearGradient id="bag-side"><stop stopColor="#d1c6b1"/><stop offset=".5" stopColor="#f1eadc"/><stop offset="1" stopColor="#c2b49b"/></linearGradient>
          <linearGradient id="bag-fold" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fffdf5"/><stop offset=".8" stopColor="#e5dece"/><stop offset="1" stopColor="#c8bca4"/></linearGradient>
          <pattern id="bag-palms" width="92" height="90" patternUnits="userSpaceOnUse">
            <g fill="#b60000" transform="translate(18 7) rotate(-13 25 35)">
              <path d="M25 22Q20 44 26 68H34Q23 45 29 22Z"/>
              <path d="M27 24Q3 11 1 33Q13 23 24 27Q4 33 10 47Q17 32 28 28Q42 32 43 46Q51 29 32 24Q50 18 57 28Q51 7 30 21Q36 2 45 5Q32-6 27 18Q20 0 8 9Q20 9 27 24Z"/>
            </g>
          </pattern>
          <clipPath id="bag-front-clip"><path d="M75 190L312 187L331 457Q213 475 91 455Z"/></clipPath>
        </defs>
        <ellipse cx="213" cy="478" rx="145" ry="16" fill="#7d311e" opacity=".12"/>
        <g className="resume-bag__body">
          <path d="M75 190L99 161L333 165L352 434L331 457L91 455Z" fill="url(#bag-side)" stroke="#c9bea8"/>
          <path d="M94 190Q209 164 333 186L313 214L88 212Z" fill="#7a6040"/>
          <path className="resume-bag__gusset" d="M312 187L333 165L352 434L331 457Z" fill="url(#bag-side)" stroke="#c5b89f"/>
          <g className="resume-bag__sheet" onAnimationEnd={(event) => { if (event.target === event.currentTarget) onBagMotionEnd(); }}>
            <rect x="113" y="223" width="190" height="224" rx="2" fill="#fff" stroke="#d8cebd"/>
            <path d="M131 250H284" stroke="#b60000" strokeWidth="5"/>
            <text x="131" y="277" fill="#b60000" fontSize="18" fontWeight="800">MILES MATTINA</text>
            <text x="131" y="295" fill="#6d665b" fontSize="9" letterSpacing="3">RESUME</text>
            <path d="M131 314H282M131 322H271M131 330H280M131 351H282M131 359H264M131 367H277M131 389H282M131 397H274M131 405H281" stroke="#c9c4b9" strokeWidth="3"/>
          </g>
          <path d="M75 190L312 187L331 457Q213 475 91 455Z" fill="url(#bag-paper)" stroke="#d8cfbb"/>
          <g clipPath="url(#bag-front-clip)">
            <rect x="74" y="359" width="264" height="105" fill="url(#bag-palms)"/>
            <path d="M80 346H324M80 353H324" stroke="#b60000" strokeWidth="3"/>
            <path d="M96 198L111 439L91 455M297 196L312 439L331 457M111 439Q209 450 312 439" fill="none" stroke="#b6a78a" opacity=".24"/>
            <path d="M83 205L107 438" stroke="#fff" strokeWidth="4" opacity=".65"/>
            <path d="M120 218Q113 211 123 211L266 231L270 218L294 243L263 252L266 239L141 226L151 251L135 247Z" fill="#ffce32"/>
            <g fill="#b60000" textAnchor="middle" fontWeight="900">
              <text x="204" y="277" fontSize="29" letterSpacing="-1.5">MILES MATTINA</text>
              <text x="204" y="309" fontSize="28" letterSpacing="3">RESUME</text>
            </g>
            <text x="204" y="330" textAnchor="middle" fill="#b60000" fontSize="8" fontWeight="700" letterSpacing="1.8">FOR IN-N-OUT BURGER</text>
          </g>
          <g className="resume-bag__fold">
            <path d="M75 190L83 148L315 146L312 187Q193 201 75 190Z" fill="url(#bag-fold)" stroke="#cfc5af"/>
            <path d="M83 148L94 155L304 153L315 146M81 174Q194 182 313 171" fill="none" stroke="#c6baa2" strokeWidth="1.5"/>
            <path d="M89 158L303 156" stroke="#fff" strokeWidth="3"/>
          </g>
        </g>
      </svg>
      <span className="resume-bag__cta">{isResumeActive ? "Resume, to go ↗" : "Unfold my resume ↗"}</span>
    </button>
  );
}

type ArtifactMediaFrameProps = {
  artifactLabel: string;
  media: ArtifactMedia;
};

function ArtifactMediaFrame({ artifactLabel, media }: ArtifactMediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.15 });
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, []);
  const frameClassName =
    "relative block h-40 overflow-hidden border-2 border-[var(--brand-accent)] bg-white";
  const content =
    media.type === "image" ? (
      <Image
        alt={media.alt}
        className="object-cover"
        fill
        loading="eager"
        fetchPriority="high"
        unoptimized
        sizes="(max-width: 640px) calc(100vw - 4rem), 25vw"
        src={media.src}
        style={{
          objectPosition: media.objectPosition,
        }}
      />
    ) : (
      <>
        <link rel="preload" as="image" href={media.poster} fetchPriority="high" />
        <video
        aria-label={media.ariaLabel}
        ref={videoRef}
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        className="pointer-events-none h-full w-full object-cover"
        loop
        muted
        playsInline
        preload="none"
        poster={media.poster}
      >
        <source src={media.src} type="video/mp4" />
      </video>
      </>
    );

  if (media.href) {
    return (
      <a
        aria-label={`Open ${artifactLabel} on Instagram`}
        className={`${frameClassName} transition hover:-translate-y-0.5`}
        href={media.href}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return <div className={frameClassName}>{content}</div>;
}

export default function Home() {
  const [cardIndex, setCardIndex] = useState(0);
  const [canPromptLevel, setCanPromptLevel] = useState<0 | 1 | 2>(0);
  const [isCanPrompting, setIsCanPrompting] = useState(false);
  const [cardSlideDirection, setCardSlideDirection] =
    useState<WhySlideDirection | null>(null);
  const [isWhyStackComplete, setIsWhyStackComplete] = useState(false);
  const [resumeMode, setResumeMode] = useState<ResumeMode>("closed");
  const [isResumeZoomed, setIsResumeZoomed] = useState(false);
  const [canArrowGeometry, setCanArrowGeometry] =
    useState<CanArrowGeometry | null>(null);
  const canPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardSlideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topSectionRef = useRef<HTMLElement | null>(null);
  const canPromptButtonRef = useRef<HTMLButtonElement | null>(null);
  const currentCard = whyCards[cardIndex];
  const isFinalCard = cardIndex === whyCards.length - 1;
  const isSincereCard = currentCard.tone === "sincere";
  const isBridgeCard = currentCard.tone === "bridge";
  const isCardSliding = cardSlideDirection !== null;
  const isResumeVisible = resumeMode === "open" || resumeMode === "full";
  const isResumeActive =
    resumeMode !== "closed" && resumeMode !== "closing";

  useEffect(() => () => {
    if (cardSlideTimerRef.current) clearTimeout(cardSlideTimerRef.current);
    if (canPromptTimerRef.current) clearTimeout(canPromptTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isResumeVisible) return;
    document.querySelector<HTMLButtonElement>(".resume-zoom")?.focus({ preventScroll: true });
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setResumeMode("closing");
      }
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [isResumeVisible]);


  useEffect(() => {
    if (canPromptLevel !== 2) {
      return;
    }

    const topSection = topSectionRef.current;
    const promptButton = canPromptButtonRef.current;
    const can = topSection?.querySelector(".resume-bag");

    if (!topSection || !promptButton || !(can instanceof HTMLElement)) {
      return;
    }

    let animationFrame = 0;
    const measureArrow = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        setCanArrowGeometry(
          createCanArrowGeometry(
            topSection.getBoundingClientRect(),
            promptButton.getBoundingClientRect(),
            can.getBoundingClientRect(),
          ),
        );
      });
    };

    measureArrow();
    const settleTimer = window.setTimeout(measureArrow, 560);
    const lateSettleTimer = window.setTimeout(measureArrow, 920);
    window.addEventListener("resize", measureArrow);
    window.addEventListener("orientationchange", measureArrow);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measureArrow);

    resizeObserver?.observe(topSection);
    resizeObserver?.observe(promptButton);
    resizeObserver?.observe(can);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
      window.clearTimeout(lateSettleTimer);
      window.removeEventListener("resize", measureArrow);
      window.removeEventListener("orientationchange", measureArrow);
      resizeObserver?.disconnect();
    };
  }, [canPromptLevel]);

  function moveCard(direction: WhySlideDirection) {
    if (isCardSliding) {
      return;
    }

    if (direction === "prev" && cardIndex === 0) {
      return;
    }

    setCardSlideDirection(direction);

    if (cardSlideTimerRef.current) {
      clearTimeout(cardSlideTimerRef.current);
    }

    cardSlideTimerRef.current = setTimeout(() => {
      if (direction === "next" && isFinalCard) {
        setIsWhyStackComplete(true);
      } else {
        setCardIndex((index) =>
          direction === "next"
            ? Math.min(index + 1, whyCards.length - 1)
            : Math.max(index - 1, 0),
        );
      }

      setCardSlideDirection(null);
      cardSlideTimerRef.current = null;
    }, 240);
  }

  function advanceCard() {
    moveCard("next");
  }

  function resetCards() {
    if (cardSlideTimerRef.current) {
      clearTimeout(cardSlideTimerRef.current);
      cardSlideTimerRef.current = null;
    }

    setCardSlideDirection(null);
    setCardIndex(0);
    setIsWhyStackComplete(false);
  }

  function promptCanClick() {
    if (canPromptTimerRef.current) {
      clearTimeout(canPromptTimerRef.current);
    }

    setCanPromptLevel((level) => (level === 0 ? 1 : 2));
    setIsCanPrompting(false);
    requestAnimationFrame(() => {
      setIsCanPrompting(true);
      canPromptTimerRef.current = setTimeout(() => {
        setIsCanPrompting(false);
        canPromptTimerRef.current = null;
      }, 520);
    });
  }

  function openResume() {
    if (isResumeVisible || resumeMode === "opening" || resumeMode === "closing") return;
    setCanPromptLevel(0);
    setResumeMode(resumeMode === "minimized" ? "open" : "opening");
  }

  function finishBagMotion() {
    if (resumeMode === "opening") setResumeMode("open");
    if (resumeMode === "closing") {
      setResumeMode("closed");
      requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".resume-bag")?.focus({ preventScroll: true }));
    }
  }

  function scrollToWork() {
    const workSection = document.getElementById("field-notes");

    if (!workSection) {
      return;
    }

    window.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      top: workSection.getBoundingClientRect().top + window.scrollY - 88,
    });
  }

  function scrollToCan() {
    const topSection = document.getElementById("top");

    if (!topSection) {
      return;
    }

    window.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      top: topSection.offsetTop,
    });

    window.setTimeout(promptCanClick, 650);
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--background)] text-[var(--ink)]">

      <nav
        aria-label="Main sections"
        className="site-nav sticky top-0 z-50 border-b-4 border-[var(--brand-red)] bg-white/90 px-4 py-3 shadow-[0_6px_0_var(--brand-accent)] backdrop-blur sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a
            className="font-mono text-xs font-black uppercase tracking-[0.22em] text-[var(--brand-red)]"
            href="#top"
          >
            Miles Mattina / In-N-Out Burger
          </a>
          <div className="flex flex-wrap justify-end gap-2">
            {navItems.map(([label, href]) => (
              <a
                className="border-2 border-[var(--brand-red)] bg-white px-3 py-1.5 text-xs font-black uppercase text-[var(--brand-red)] shadow-[3px_3px_0_var(--brand-accent)] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--brand-accent)]"
                href={href}
                key={href}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        className="brand-hero relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-16"
        id="top"
        ref={topSectionRef}
      >
        <div className="hero-copy relative z-10">
          <p className="mb-5 inline-flex -rotate-2 border-2 border-[var(--brand-red)] bg-[var(--brand-yellow)] px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-red)] shadow-[5px_5px_0_var(--brand-accent)]">
            In-N-Out Burger application
          </p>
          <h1 className="max-w-3xl text-6xl font-black uppercase leading-[0.84] text-[var(--brand-red)] sm:text-7xl lg:text-8xl">
            Who is this guy?
          </h1>
          <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 sm:text-2xl">
            A custom hello from Miles Mattina, built for In-N-Out Burger with
            a little brand-building experience, a lot of creative follow-through,
            and a very earnest interest in the job.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center gap-3">
            <button
              className={`can-prompt-button ${
                canPromptLevel === 2 ? "can-prompt-button--final" : ""
              }`}
              onClick={promptCanClick}
              ref={canPromptButtonRef}
              type="button"
            >
                {canPromptLevel === 0
                  ? "Click the bag"
                  : canPromptLevel === 1
                    ? "no, click the bag"
                    : "THE BAG"}
            </button>
            {canPromptLevel === 1 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none text-4xl font-black text-[var(--brand-accent)] sm:text-5xl"
              >
                →
              </span>
            ) : null}
          </div>
        </div>

        {canPromptLevel === 2 && canArrowGeometry ? (
          <svg
            aria-hidden="true"
            className="can-target-arrow"
            viewBox={`0 0 ${canArrowGeometry.width} ${canArrowGeometry.height}`}
          >
            <defs>
              <marker
                id="can-target-arrow-head"
                markerHeight="28"
                markerUnits="userSpaceOnUse"
                markerWidth="34"
                orient="auto"
                refX="30"
                refY="14"
              >
                <path d="M 0 0 L 34 14 L 0 28 Z" fill="currentColor" />
              </marker>
            </defs>
            <g className="can-target-arrow__draw">
              <path
                className="can-target-arrow__path"
                d={canArrowGeometry.path}
                markerEnd="url(#can-target-arrow-head)"
              />
            </g>
          </svg>
        ) : null}

        <div
          aria-label="Interactive Miles Mattina resume bag"
          className="bag-stage relative min-h-[560px]"
        >
          <ResumeBag
            isResumeActive={isResumeActive}
            isPrompting={isCanPrompting}
            openResume={openResume}
            resumeMode={resumeMode}
            onBagMotionEnd={finishBagMotion}
          />
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-20"
        id="why-me"
      >
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[var(--brand-accent)]">
            pull cards
          </p>
          <h2 className="mt-2 text-5xl font-black uppercase leading-none text-[var(--brand-red)] sm:text-6xl">
            Why me?
          </h2>
          {cardIndex > 0 || isWhyStackComplete ? (
            <button
              className="mt-6 border-2 border-[var(--brand-red)] bg-white px-4 py-2 text-xs font-black uppercase text-[var(--brand-red)] shadow-[4px_4px_0_var(--brand-accent)]"
              onClick={resetCards}
              type="button"
            >
              Restack
            </button>
          ) : null}
        </div>

        <div
          className="relative min-h-[470px]"
        >
          {isWhyStackComplete ? (
            <div className="absolute inset-x-0 top-0 mx-auto flex h-80 w-[calc(100%-1.25rem)] max-w-xl flex-col justify-center gap-8 border-4 border-[var(--brand-red)] bg-[var(--brand-yellow)] p-8 text-[var(--brand-red)] shadow-[10px_10px_0_var(--brand-accent)] sm:w-full sm:shadow-[14px_14px_0_var(--brand-accent)]">
              <h3 className="text-5xl font-black uppercase leading-[0.88] sm:text-6xl">
                THEN LET ME PROVE IT.
              </h3>
              <button
                className="self-start border-2 border-[var(--brand-red)] bg-white px-5 py-3 text-sm font-black uppercase text-[var(--brand-red)] shadow-[5px_5px_0_var(--brand-accent)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--brand-accent)]"
                onClick={scrollToWork}
                type="button"
              >
                Start snooping
              </button>
            </div>
          ) : (
            <>
              {whyCards
                .slice(cardIndex + 1, cardIndex + 4)
                .map((card, offset) => (
                  <div
                    className={`pointer-events-none absolute inset-x-0 mx-auto w-[calc(100%-1.25rem)] max-w-xl border-4 border-[var(--brand-red)] bg-white shadow-[8px_8px_0_rgba(182,0,0,0.2)] sm:w-full sm:shadow-[10px_10px_0_rgba(182,0,0,0.2)] h-80`}
                    key={card.title}
                    style={{
                      top: `${24 + offset * 16}px`,
                      transform: `rotate(${
                        offset % 2 === 0 ? 2 : -2
                      }deg) scale(${0.96 - offset * 0.03})`,
                      zIndex: 3 - offset,
                    }}
                  />
                ))}
              <div
                aria-live="polite"
                className={`why-card ${isBridgeCard ? "why-card--bridge" : isSincereCard ? "why-card--sincere" : ""} absolute inset-x-0 top-0 z-10 mx-auto flex w-[calc(100%-1.25rem)] max-w-xl border-4 border-[var(--brand-red)] text-left shadow-[10px_10px_0_var(--brand-accent)] transition hover:-translate-y-1 sm:w-full sm:shadow-[14px_14px_0_var(--brand-accent)] h-80 ${
                  cardSlideDirection === "next" ? "why-card--exit-next" : ""
                } ${
                  cardSlideDirection === "prev" ? "why-card--exit-prev" : ""
                } ${
                  isSincereCard
                    ? "flex-col justify-center gap-7 bg-[var(--brand-red)] p-9 text-white sm:p-10"
                    : isBridgeCard
                      ? "items-center justify-center bg-[var(--brand-yellow)] p-9 text-center text-[var(--brand-red)] sm:p-10"
                      : "flex-col justify-between bg-white p-6 text-[var(--ink)] sm:p-7"
                }`}
              >
                {isSincereCard || isBridgeCard ? null : (
                  <span className="font-mono text-xs font-black uppercase tracking-[0.24em] opacity-70">
                    card {cardIndex + 1} / {whyCards.length}
                  </span>
                )}
                  <>
                    <span
                      className={`[overflow-wrap:anywhere] font-black uppercase leading-[0.9] ${
                        isSincereCard
                          ? "text-4xl sm:text-5xl"
                          : isBridgeCard
                            ? "text-5xl sm:text-6xl"
                            : "text-[clamp(2.2rem,10vw,3rem)] sm:text-5xl"
                      }`}
                    >
                      {currentCard.title}
                    </span>
                    {currentCard.secondLine ? (
                      <span className="text-4xl font-black uppercase leading-[0.9] sm:text-5xl">
                        {currentCard.secondLine}
                      </span>
                    ) : null}
                    {currentCard.note ? (
                      <span className="max-w-md text-xl font-bold leading-7">
                        {currentCard.note}
                      </span>
                    ) : null}
                  </>
              </div>
              <div
                className={`absolute inset-x-0 z-20 mx-auto flex w-[calc(100%-1.25rem)] max-w-xl items-center justify-between gap-3 sm:w-full top-[348px]`}
              >
                <button
                  aria-label="Previous reason"
                  className="grid size-12 place-items-center border-2 border-[var(--brand-red)] bg-white text-3xl font-black leading-none text-[var(--brand-red)] shadow-[4px_4px_0_var(--brand-accent)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
                  disabled={cardIndex === 0 || isCardSliding}
                  onClick={() => moveCard("prev")}
                  type="button"
                >
                  ←
                </button>
                <button
                  aria-label="Next reason"
                  className="grid size-12 place-items-center border-2 border-[var(--brand-red)] bg-[var(--brand-red)] text-3xl font-black leading-none text-white shadow-[4px_4px_0_var(--brand-accent)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isCardSliding}
                  onClick={advanceCard}
                  type="button"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20"
        id="field-notes"
      >
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[var(--brand-accent)]">
            The receipts
          </p>
          <h2 className="mt-2 text-5xl font-black uppercase leading-none text-[var(--brand-red)] sm:text-6xl">
            Here&apos;s what I&apos;ve been up to.
          </h2>
          <p className="mt-5 text-lg font-semibold leading-7">
            A few real things I&apos;ve built, sold, booked, branded, and dragged
            across the finish line. From a consumer brand to public-sector
            launches: the story, the rollout, and the follow-through.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {fieldNotes.map((note, index) => (
            <article
              className="relative grid gap-5 lg:grid-cols-[0.78fr_1.22fr]"
              key={note.title}
            >
              <div
                className={`project-intro relative border-4 border-white p-6 outline outline-4 outline-[var(--brand-red)] ${
                  note.title === "Buoy Bird" || note.title === "South of Sober"
                    ? "overflow-hidden pr-28 sm:pr-36"
                    : ""
                } ${colorClasses(note.color)}`}
              >
                <p className="font-mono text-xs font-black uppercase tracking-[0.24em] opacity-80">
                  {note.label}
                </p>
                <h3 className="mt-8 text-5xl font-black uppercase leading-none">
                  {note.title}
                </h3>
                <p className="mt-6 text-xl font-bold leading-7">
                  {note.oneLiner}
                </p>
                {note.title === "Buoy Bird" ? (
                  <a
                    className="mt-7 block border-4 border-white bg-[var(--brand-accent)] p-5 text-white shadow-[8px_8px_0_rgba(0,0,0,0.36)] transition hover:-translate-y-0.5"
                    href="https://www.instagram.com/buoybirdofficial/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="block font-mono text-xs font-black uppercase tracking-[0.2em]">
                      Start here
                    </span>
                    <span className="mt-3 block text-3xl font-black uppercase leading-[0.9]">
                      Watch the pinned Cinema by the Shore preview videos.
                    </span>
                    <span className="mt-4 inline-block border-2 border-white bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--brand-red)] shadow-[4px_4px_0_rgba(0,0,0,0.28)]">
                      @buoybirdofficial on Instagram
                    </span>
                  </a>
                ) : null}
                <div className="mt-7 flex flex-wrap gap-3">
                  {note.links.map((link) => (
                    <a
                      className="border-2 border-white bg-white px-4 py-2 text-xs font-black uppercase text-[var(--brand-red)] shadow-[4px_4px_0_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5"
                      href={link.href}
                      key={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                {note.title === "Buoy Bird" ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    unoptimized
                    className="buoy-sticker buoy-sticker--bird"
                    height={844}
                    src="/portfolio/buoy-bird-sticker-b4176e37.webp"
                    width={780}
                  />
                ) : null}
                {note.title === "Konocti Climb" ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    unoptimized
                    className="buoy-sticker konocti-climb-sticker"
                    height={750}
                    src="/portfolio/konocti-climb-sticker-e69b00a8.webp"
                    width={750}
                  />
                ) : null}
                {note.title === "South of Sober" ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    unoptimized
                    className="buoy-sticker south-of-sober-sticker"
                    height={2000}
                    src="/portfolio/south-of-sober-sticker-a017d3fe.webp"
                    width={2000}
                  />
                ) : null}
              </div>

              <div className="relative grid gap-4 sm:grid-cols-2">
                {note.artifacts.map((artifact, artifactIndex) => {
                  const media =
                    note.title === "Buoy Bird"
                      ? buoyBirdMedia[artifactIndex]
                      : note.title === "Konocti Climb"
                        ? konoctiClimbMedia[artifactIndex]
                        : note.title === "South of Sober"
                          ? southOfSoberMedia[artifactIndex]
                      : undefined;

                  return (
                    <div
                      className={`artifact-card min-h-56 border-4 border-[var(--brand-red)] bg-white p-3 shadow-[8px_8px_0_rgba(196,32,50,0.25)] ${
                        (artifactIndex + index) % 2 === 0
                          ? "-rotate-1"
                          : "rotate-1"
                      }`}
                      key={artifact.label}
                    >
                      {media ? (
                        <ArtifactMediaFrame
                          artifactLabel={artifact.label}
                          media={media}
                        />
                      ) : (
                        <div className="flex h-40 items-center justify-center border-2 border-dashed border-[var(--brand-accent)] bg-[linear-gradient(135deg,#fff_0_32%,#fff4cb_32%_50%,#fff_50%_70%,#ffe8e8_70%)] text-center">
                          <p className="max-w-32 font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--brand-red)]">
                            {artifact.label}
                          </p>
                        </div>
                      )}
                      <p className="mt-3 text-sm font-black uppercase text-[var(--brand-accent)]">
                        {artifact.label}
                      </p>
                      <p className="mt-2 text-sm font-bold leading-5 text-[var(--ink)]">
                        {artifact.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-24"
        id="talk"
      >
        <div className="talk-card max-w-4xl border-4 border-[var(--brand-red)] bg-white p-7 shadow-[14px_14px_0_var(--brand-accent)] sm:p-10">
          <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[var(--brand-accent)]">
            closing tab
          </p>
          <h2 className="mt-6 text-6xl font-black uppercase leading-[0.86] text-[var(--brand-red)] sm:text-7xl">
            We should probably talk.
          </h2>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-8">
            If you want the official version, it&apos;s still hiding up top in
            the bag.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              className="border-2 border-[var(--brand-red)] bg-[var(--brand-yellow)] px-5 py-3 text-sm font-black uppercase text-[var(--brand-red)] shadow-[5px_5px_0_var(--brand-accent)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--brand-accent)]"
              onClick={scrollToCan}
              type="button"
            >
              Back to the bag
            </button>
            <a className="contact-link" href="mailto:milesmattina@gmail.com">Email Miles ↗</a>
            <a className="contact-link" href="https://www.linkedin.com/in/milesmattina" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">Miles Mattina · An independent application for In-N-Out Burger.</footer>

      {resumeMode === "minimized" ? (
        <button
          className="fixed bottom-4 right-4 z-[70] border-4 border-[var(--brand-red)] bg-[var(--brand-yellow)] px-5 py-4 text-left text-sm font-black uppercase text-[var(--brand-red)] shadow-[8px_8px_0_var(--brand-accent)] transition hover:-translate-y-1"
          onClick={openResume}
          type="button"
        >
          Resume tucked away
          <span className="block text-xs">open again</span>
        </button>
      ) : null}

      {isResumeVisible ? (
        <aside
          id="resume-viewer"
          data-mode={resumeMode}
          aria-label="Miles Mattina resume viewer"
          className={`fixed z-[80] flex flex-col border-4 border-[var(--brand-red)] bg-white shadow-[18px_18px_0_var(--brand-accent)] transition-all duration-500 ${
            resumeMode === "full"
              ? "inset-3 sm:inset-5"
              : "bottom-4 right-4 top-20 w-[calc(100vw-2rem)] lg:w-[52vw]"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-[var(--brand-red)] bg-[var(--brand-red)] px-4 py-3 text-white">
            <div>
              <p className="font-mono text-[11px] font-black uppercase tracking-[0.22em] text-[var(--brand-yellow)]">
                resume bag contents
              </p>
              <h3 className="text-2xl font-black uppercase leading-none">
                Miles Mattina Resume
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <a className="resume-download" href="/Miles_Mattina_Resume.pdf" download>Download PDF</a>
              <button type="button" className="resume-zoom" onClick={() => setIsResumeZoomed((zoomed) => !zoomed)}>{isResumeZoomed ? "Fit page" : "Zoom in"}</button>
              <button
                className="border-2 border-white bg-white px-3 py-2 text-xs font-black uppercase text-[var(--brand-red)] shadow-[3px_3px_0_var(--brand-accent)]"
                onClick={() =>
                  setResumeMode((mode) => (mode === "full" ? "open" : "full"))
                }
                type="button"
              >
                {resumeMode === "full" ? "Half screen" : "Full screen"}
              </button>
              <button
                className="border-2 border-white bg-[var(--brand-yellow)] px-3 py-2 text-xs font-black uppercase text-[var(--brand-red)] shadow-[3px_3px_0_var(--brand-accent)]"
                onClick={() => setResumeMode("minimized")}
                type="button"
              >
                Minimize
              </button>
              <button
                className="border-2 border-white bg-[var(--brand-accent)] px-3 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0_var(--brand-yellow)]"
                onClick={() => setResumeMode("closing")}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
          <div className="resume-page min-h-0 flex-1 overflow-auto bg-white" tabIndex={0} aria-label="Resume document">
            <Image src="/resume-preview.png" alt="Miles Mattina resume, original document" width={1469} height={1901} unoptimized className={`h-auto w-full ${isResumeZoomed ? "min-w-[850px]" : ""}`} />
            <p className="sr-only">{resumeText}</p>
          </div>
        </aside>
      ) : null}
    </main>
  );
}
