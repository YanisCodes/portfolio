export default function Noise() {
  return (
    <>
      <svg
        style={{ display: 'none' }}
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves={4}
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden
        className="bg-grain pointer-events-none fixed -inset-1/2 z-[9997] h-[200%] w-[200%]"
        style={{ opacity: 0.028, background: '#ffffff' }}
      />
    </>
  );
}
