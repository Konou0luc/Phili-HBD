import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLenisScroll } from "@/context/LenisProvider";

const links = [
  { label: "Accueil", href: "#hero" },
  { label: "Tes souvenirs", href: "#fil" },
  { label: "Les photos", href: "#moments" },
  { label: "Un mot pour toi", href: "#lettre" },
  { label: "Le 3 mai", href: "#jour-j" },
];

export function LandingNav() {
  const { scrollTo } = useLenisScroll();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  function go(href: string) {
    scrollTo(href);
    setOpen(false);
  }

  return (
    <>
      <motion.header
        className="pointer-events-none fixed left-0 right-0 top-0 z-40 flex justify-start px-4 pt-5 md:justify-center md:px-4 md:pt-7"
        initial={reduce ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <nav
          aria-label="Sections"
          className="pointer-events-auto flex max-w-[min(100%,920px)] items-center gap-1 rounded-full border border-white/10 bg-black/55 py-2 pl-2 pr-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:gap-2 md:px-3 md:pl-3"
        >
          {/* Burger à gauche sur mobile */}
          <button
            type="button"
            className="order-first flex rounded-full p-2.5 text-white/80 md:hidden"
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" weight="regular" />
            ) : (
              <List className="h-5 w-5" weight="regular" />
            )}
          </button>

          <button
            type="button"
            onClick={() => go("#hero")}
            className="hidden shrink-0 rounded-full px-3 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 md:order-none md:block"
          >
            Philippine
          </button>
          <span className="hidden h-4 w-px bg-white/15 md:block" />

          <div className="hidden items-center gap-0.5 md:flex">
            {links.slice(1).map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => go(l.href)}
                className="rounded-full px-3 py-2 font-sans text-[11px] uppercase tracking-[0.14em] text-white/45 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white"
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-4 right-4 top-[5.25rem] z-40 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => go(l.href)}
                  className="rounded-xl px-4 py-3 text-left font-sans text-sm text-white/85"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
