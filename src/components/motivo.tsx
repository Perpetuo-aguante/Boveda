/**
 * Marcas de portada. Seis motivos geométricos que se reparten por hash del
 * slug, para que dos artículos de la misma sección no salgan idénticos.
 * Todos dibujan sobre un lienzo de 100×100 y heredan el color por prop.
 */
export function Motivo({ n, color }: { n: number; color: string }) {
  const comun = {
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: color,
    "aria-hidden": true as const,
    style: { width: "100%", height: "100%", opacity: 0.9 },
  };

  switch (n % 6) {
    case 0:
      return (
        <svg {...comun}>
          {[46, 34, 22, 10].map((r) => (
            <circle key={r} cx="50" cy="50" r={r} strokeWidth="1.6" />
          ))}
        </svg>
      );
    case 1:
      return (
        <svg {...comun}>
          {[44, 33, 22, 11].map((r) => (
            <path key={r} d={`M ${50 - r} 74 A ${r} ${r} 0 0 1 ${50 + r} 74`} strokeWidth="1.6" />
          ))}
          <line x1="4" y1="74" x2="96" y2="74" strokeWidth="1.6" />
        </svg>
      );
    case 2:
      return (
        <svg {...comun} fill={color} stroke="none">
          {[0, 1, 2, 3, 4].map((fila) =>
            [0, 1, 2, 3, 4].map((col) => (
              <circle key={`${fila}-${col}`} cx={14 + col * 18} cy={14 + fila * 18} r="3.2" />
            )),
          )}
        </svg>
      );
    case 3:
      return (
        <svg {...comun}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={-10 + i * 20} y1="96" x2={40 + i * 20} y2="4" strokeWidth="1.6" />
          ))}
        </svg>
      );
    case 4:
      return (
        <svg {...comun}>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M 50 ${12 + i * 26} L ${86 - i * 8} ${50 + i * 22} L ${14 + i * 8} ${50 + i * 22} Z`}
              strokeWidth="1.6"
            />
          ))}
        </svg>
      );
    default:
      return (
        <svg {...comun}>
          <circle cx="50" cy="50" r="40" strokeWidth="1.6" />
          <line x1="10" y1="36" x2="90" y2="36" strokeWidth="1.6" />
          <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1.6" />
          <line x1="10" y1="64" x2="90" y2="64" strokeWidth="1.6" />
        </svg>
      );
  }
}
