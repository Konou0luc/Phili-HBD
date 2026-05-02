/**
 * Centralise les médias pour lazy-import et URLs stables.
 * Les vidéos servent de fonds immersifs ; les JPEG au storytelling / galerie.
 */
import phili1 from "@assets/phili1.webp";
import phili2 from "@assets/phili2.webp";
import phili3 from "@assets/phili3.webp";
import phili4 from "@assets/phili4.webp";
import phili5 from "@assets/phili5.webp";
import phili6 from "@assets/phili6.webp";
import videoAmbientA from "@assets/WhatsApp Video 2026-05-02 at 22.04.09.mp4";
import videoAmbientB from "@assets/WhatsApp Video 2026-05-02 at 22.04.10.mp4";

export const galleryImages = [
  { id: "1", src: phili1, alt: "Souvenir partagé" },
  { id: "2", src: phili2, alt: "Moment ensemble" },
  { id: "3", src: phili3, alt: "Regard" },
  { id: "4", src: phili4, alt: "Lumière douce" },
  { id: "5", src: phili5, alt: "Présence" },
  { id: "6", src: phili6, alt: "Émotion" },
] as const;

export const ambientVideos = {
  primary: videoAmbientA,
  alternate: videoAmbientB,
} as const;
