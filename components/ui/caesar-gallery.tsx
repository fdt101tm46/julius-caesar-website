"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const galleryItems = [
  {
    tempId: 0,
    title: "Tusculum Portrait Bust",
    description: "One of the most realistic surviving likenesses of Julius Caesar, dated c. 50–40 BC. The bust shows Caesar in middle age with a receding hairline — a detail no Roman artist would typically include unless ordered to, suggesting authenticity.",
    caption: "Archaeological Museum, Turin · c. 50–40 BC",
    category: "Portrait",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/6/62/Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg"
  },
  {
    tempId: 1,
    title: "Vercingetorix Surrenders",
    description: "Painted by Lionel Royer in 1899, this dramatic work depicts the moment Vercingetorix — the Gaulish chieftain who nearly defeated Caesar — threw down his weapons at Caesar's feet after the decisive Siege of Alesia in 52 BC.",
    caption: "Lionel Royer, 1899 · Musée Crozatier, Le Puy-en-Velay",
    category: "Battle",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Lionel_Royer_-_Vercingetorix_Throwing_down_His_Weapons_at_the_feet_of_Julius_Caesar.jpg"
  },
  {
    tempId: 2,
    title: "Rome at Caesar's Death",
    description: "A map of the city of Rome as it stood in 44 BC at the moment of Caesar's assassination. The city he had begun transforming from brick to marble — his ambitious building programme was left unfinished at the Ides of March.",
    caption: "City of Rome · 44 BC",
    category: "Rome",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/8/83/The_city_of_Rome%2C_44_B.C.E.jpg"
  },
  {
    tempId: 3,
    title: "Gallic War Campaigns",
    description: "A detailed map tracing Caesar's eight years of campaigning across Gaul from 58 to 50 BC. The campaigns brought modern-day France, Belgium, and parts of Germany under Roman control, laying the cultural and linguistic foundation for Western Europe.",
    caption: "Caesar's Gallic War Campaigns · 58–50 BC",
    category: "Map",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Caesar_campaigns_gaul-en.svg/800px-Caesar_campaigns_gaul-en.svg.png"
  },
  {
    tempId: 4,
    title: "Silver Denarius — 44 BC",
    description: "The silver denarius of Julius Caesar, minted in 44 BC, made him the first living Roman to appear on a coin. The portrait — showing his distinctive laurel wreath — was a bold assertion of power that shocked Roman republican tradition.",
    caption: "Silver Denarius · First Roman on a coin · 44 BC",
    category: "Portrait",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e2/RSC_0022_-_transparent_background.png"
  },
  {
    tempId: 5,
    title: "Siege of Alesia",
    description: "Caesar's greatest military engineering achievement. At Alesia in 52 BC, he built two parallel fortification walls totalling over 35 km — one facing inward to contain Vercingetorix, one facing outward to repel a relief army of 250,000. He won both battles simultaneously.",
    caption: "Siege of Alesia · 52 BC · Caesar's Masterpiece",
    category: "Battle",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/SiegeAlesia.png/800px-SiegeAlesia.png"
  },
  {
    tempId: 6,
    title: "The Roman Senate",
    description: "The Senate of Rome — the institution Caesar spent his life navigating and ultimately overturning. The senators who conspired to kill him feared the end of the Republic. Their act, intended to save it, destroyed it.",
    caption: "Cicero Denounces Catiline · Fresco by Cesare Maccari, 1880",
    category: "Rome",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari.png/800px-Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari.png"
  },
  {
    tempId: 7,
    title: "Roman Republic — 44 BC",
    description: "The extent of the Roman Republic at the time of Caesar's death. Caesar's campaigns had dramatically expanded Roman territory. His heir Octavian would transform this Republic into the Roman Empire — the unintended consequence of the Ides of March.",
    caption: "Roman Republic Territory · 44 BC",
    category: "Map",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Roman_republic%2C_territory_44_BC_labelled.svg/800px-Roman_republic%2C_territory_44_BC_labelled.svg.png"
  },
  {
    tempId: 8,
    title: "Vatican Portrait Bust",
    description: "A marble portrait bust of Julius Caesar housed in the Vatican Museums, Rome. Carved in the 1st century BC, this is one of several competing claimants to being the most authentic likeness of Rome's greatest general and statesman.",
    caption: "Portrait Bust · Vatican Museums, Rome · 1st century BC",
    category: "Portrait",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Gaius_Iulius_Caesar_%28Vatican_Museum%29.jpg"
  },
  {
    tempId: 9,
    title: "Caesar's Rhine Bridge",
    description: "An illustration of Caesar's famous Rhine Bridge, constructed in just ten days in 55 BC. Caesar crossed into Germanic territory, demonstrated Roman engineering supremacy, then dismantled the bridge. The entire operation was a deliberate act of psychological warfare.",
    caption: "Caesar's Rhine Bridge · Roman Engineering · 55 BC",
    category: "Battle",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/4/44/Il_ponte_di_Cesare_sul_Reno.jpg"
  },
  {
    tempId: 10,
    title: "Brutus and the Ghost",
    description: "An 1802 engraving depicting Brutus confronted by Caesar's ghost the night before the Battle of Philippi. According to legend, Caesar's apparition said: 'We shall meet again at Philippi.' Brutus died there — and the Republic died with him.",
    caption: "Brutus and the Ghost of Caesar · Edward Scriven, 1802",
    category: "Rome",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Brutus_and_the_Ghost_of_Caesar_1802.jpg"
  },
  {
    tempId: 11,
    title: "The Ides of March",
    description: "The Death of Caesar by Vincenzo Camuccini (1804–1825). On 15 March 44 BC, senators led by Brutus and Cassius stabbed Caesar 23 times at the Theatre of Pompey. His body lay where it fell for three hours before servants carried it home.",
    caption: "La morte di Cesare · Vincenzo Camuccini, 1804–1825",
    category: "Portrait",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg"
  },
];

type GalleryItem = typeof galleryItems[0];

interface GalleryCardProps {
  position: number;
  item: GalleryItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  position,
  item,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 overflow-hidden transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 border-amber-500"
          : "z-0 border-stone-700 hover:border-amber-500/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px rgba(201,168,76,0.35)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      {/* Diagonal corner cut line */}
      <span
        className="absolute block origin-top-right rotate-45 bg-amber-500/50 z-20"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />

      {/* Background image */}
      <img
        src={item.imgSrc}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        style={{
          filter: isCenter
            ? "sepia(15%) contrast(1.05) brightness(0.9)"
            : "sepia(50%) contrast(0.95) brightness(0.55)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500",
          isCenter
            ? "bg-gradient-to-t from-black/95 via-black/50 to-black/10"
            : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        )}
      />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-semibold tracking-[0.22em] uppercase px-2 py-1 bg-amber-500 text-black">
          {item.category}
        </span>
      </div>

      {/* Card content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3
          className={cn(
            "font-semibold leading-snug tracking-wide mb-0 transition-all duration-300",
            isCenter
              ? "text-white text-sm sm:text-base mb-2"
              : "text-white/70 text-xs sm:text-sm"
          )}
        >
          {item.title}
        </h3>

        {/* Description — visible only on center card */}
        {isCenter && (
          <>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-4 mb-3">
              {item.description}
            </p>
            <p className="text-amber-400/70 text-[10px] tracking-[0.18em] uppercase">
              {item.caption}
            </p>
          </>
        )}

        {/* Side card hint */}
        {!isCenter && (
          <p className="text-amber-500/50 text-[9px] tracking-[0.25em] uppercase mt-1">
            Click to view
          </p>
        )}
      </div>

      {/* Active gold bottom bar */}
      {isCenter && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-500 z-20" />
      )}
    </div>
  );
};

export const CaesarGallery: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [galleryList, setGalleryList] = useState(galleryItems);

  const handleMove = (steps: number) => {
    const newList = [...galleryList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setGalleryList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="w-full bg-stone-950 py-20">
      {/* Section header */}
      <div className="text-center mb-12 px-4">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-500 mb-3">
          Visual Archive
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-white mb-3">
          The <span className="text-amber-400">Gallery</span>
        </h2>
        <div className="w-14 h-px bg-amber-500 mx-auto mb-4" />
        <p className="text-stone-400 text-sm max-w-md mx-auto">
          Portraits, battle maps, monuments, and artefacts — click any image to reveal its story.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 600 }}
      >
        {galleryList.map((item, index) => {
          const position =
            galleryList.length % 2
              ? index - (galleryList.length + 1) / 2
              : index - galleryList.length / 2;
          return (
            <GalleryCard
              key={item.tempId}
              item={item}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}

        {/* Navigation buttons */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-30">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-12 w-12 items-center justify-center transition-all duration-200",
              "bg-stone-900/90 border border-amber-500/30 text-amber-500",
              "hover:bg-amber-500 hover:text-black hover:border-amber-500",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-12 w-12 items-center justify-center transition-all duration-200",
              "bg-stone-900/90 border border-amber-500/30 text-amber-500",
              "hover:bg-amber-500 hover:text-black hover:border-amber-500",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            )}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
