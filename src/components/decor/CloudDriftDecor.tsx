/**
 * Halos « nuage » animés par CSS (transform + opacity seulement) — sous le contenu.
 */
export function CloudDriftDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="cloud-drift-a absolute -left-[10%] top-[8%] h-[42vmin] w-[42vmin] rounded-full bg-[radial-gradient(circle,rgba(232,180,188,0.22)_0%,transparent_68%)]" />
      <div className="cloud-drift-b absolute -right-[8%] top-[35%] h-[38vmin] w-[38vmin] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.65)_0%,transparent_62%)]" />
      <div className="cloud-drift-c absolute bottom-[5%] left-[25%] h-[36vmin] w-[55vmin] rounded-full bg-[radial-gradient(ellipse,rgba(200,160,175,0.12)_0%,transparent_70%)]" />
    </div>
  );
}
