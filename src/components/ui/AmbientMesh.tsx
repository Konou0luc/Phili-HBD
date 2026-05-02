/**
 * Halos roses fixes au-dessus de la vidéo : profondeur sans blur sur tout le scroll.
 */
export function AmbientMesh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <div className="ambient-orb absolute -left-[20%] top-[-10%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,rgba(232,180,188,0.28)_0%,transparent_68%)] opacity-90" />
      <div className="ambient-orb-delay absolute -right-[15%] top-[25%] h-[45vmin] w-[45vmin] rounded-full bg-[radial-gradient(circle,rgba(201,138,150,0.18)_0%,transparent_65%)] opacity-70" />
      <div className="absolute bottom-[-20%] left-[30%] h-[40vmin] w-[70vmin] rounded-full bg-[radial-gradient(ellipse,rgba(245,240,241,0.06)_0%,transparent_70%)]" />
    </div>
  );
}
