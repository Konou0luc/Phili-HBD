import { Clock, Heart, Sparkle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { fadeUpBlur } from "@/components/motion/presets";

const pillars = [
  {
    icon: Heart,
    title: "Ce qu’on a vécu",
    body: "Chaque image, c’est un moment où on était ensemble. Pas une anthologie — juste les instants que j’ai choisis pour te les redire aujourd’hui.",
  },
  {
    icon: Sparkle,
    title: "Rien de plus",
    body: "Je n’ai pas cherché à en rajouter pour faire joli : il y a ce que j’avais sous les yeux quand je pensais à toi et à ton anniversaire.",
  },
  {
    icon: Clock,
    title: "À garder",
    body: "Tu pourras rouvrir ça dans un mois ou dans un an : pour moi, nos souvenirs ne vieillissent pas pareil que le calendrier.",
  },
];

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const row = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export function StoryPillars() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 xl:gap-24">
      <motion.div
        variants={fadeUpBlur}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.26em] text-rose-glow">
          Pour ton anniversaire
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-zinc-900">
          Pourquoi pas une tonne de photos
        </h2>
        <p className="mt-6 max-w-[40ch] font-sans text-sm leading-relaxed text-zinc-600">
          Parce que ce n’est pas une vitrine : c’est nous, à ce moment-là, avec ce
          qu’on a sous la main. Je préfère quelques instants nets à mille clichés
          flous — pour te dire joyeux anniversaire avec ce qu’on a vraiment vécu.
        </p>
      </motion.div>

      <motion.ul
        className="grid gap-5 md:gap-6"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {pillars.map((p) => (
          <motion.li
            key={p.title}
            variants={row}
            className="rounded-[1.75rem] border border-zinc-300/45 bg-white/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] md:p-8"
          >
            <div className="flex items-start gap-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-300/50 bg-white/70">
                <p.icon className="h-5 w-5 text-rose-glow" weight="regular" />
              </span>
              <div>
                <h3 className="font-display text-xl text-zinc-900 md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-zinc-600">
                  {p.body}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
