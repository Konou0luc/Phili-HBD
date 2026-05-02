import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type LenisContextValue = {
  scrollTo: (selector: string, offset?: number) => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function LenisProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  const scrollTo = useCallback((selector: string, offset = -72) => {
    const el = document.querySelector(selector);
    const lenis = lenisRef.current;
    if (lenis && el instanceof HTMLElement) {
      lenis.scrollTo(el, { offset });
    } else {
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenisScroll() {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    throw new Error("useLenisScroll doit être utilisé dans LenisProvider");
  }
  return ctx;
}
