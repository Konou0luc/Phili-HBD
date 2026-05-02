import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ambientVideos, galleryImages } from "@/data/media";
import { CloudDriftDecor } from "@/components/decor/CloudDriftDecor";
import { LenisProvider } from "@/context/LenisProvider";
import { IntroGate } from "@/components/intro/IntroGate";
import { BirthdayCta } from "@/components/landing/BirthdayCta";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingNav } from "@/components/landing/LandingNav";
import { LetterSection } from "@/components/landing/LetterSection";
import { SectionShell } from "@/components/landing/SectionShell";
import { StoryPillars } from "@/components/landing/StoryPillars";
import { GalleryStrip } from "@/components/sections/GalleryStrip";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative min-h-[100dvh] bg-cloud">
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="intro"
            className="relative z-10 min-h-[100dvh]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IntroGate onBegin={() => setStarted(true)} />
          </motion.div>
        ) : (
          <LenisProvider enabled key="lenis">
            <motion.div
              key="experience"
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <LandingNav />

              <main>
                <LandingHero videoSrc={ambientVideos.primary} />

                <div className="cloud-surface">
                  <CloudDriftDecor />
                  <SectionShell id="fil" variant="band">
                    <StoryPillars />
                  </SectionShell>

                  <GalleryStrip
                    id="moments"
                    images={galleryImages.slice(1)}
                  />

                  <SectionShell id="lettre" variant="roseWash">
                    <LetterSection />
                  </SectionShell>

                  <SectionShell id="jour-j" variant="finale">
                    <BirthdayCta />
                  </SectionShell>

                  <LandingFooter />
                </div>
              </main>
            </motion.div>
          </LenisProvider>
        )}
      </AnimatePresence>
    </div>
  );
}
