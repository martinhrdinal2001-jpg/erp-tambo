// Ilustración SVG decorativa: pradera con árboles al estilo del Fundo el Raulí.
// La usamos como fondo en pantallas con espacio (login, headers).
export default function ScenicBackground({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        {/* Cielo: amanecer/atardecer suave del sur */}
        <linearGradient id="bg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="45%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>

        {/* Colinas cercanas (verde profundo) */}
        <linearGradient id="bg-hills-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Cielo */}
      <rect width="1440" height="900" fill="url(#bg-sky)" />

      {/* Sol suave */}
      <circle cx="1080" cy="220" r="110" fill="#fef3c7" opacity="0.55" />
      <circle cx="1080" cy="220" r="65" fill="#fde68a" opacity="0.55" />

      {/* Colinas lejanas */}
      <path
        d="M0,520 Q360,440 720,480 T1440,460 L1440,900 L0,900 Z"
        fill="#86efac"
        opacity="0.55"
      />

      {/* Colinas medias */}
      <path
        d="M0,600 Q360,540 720,580 T1440,560 L1440,900 L0,900 Z"
        fill="#34d399"
        opacity="0.75"
      />

      {/* Colinas cercanas */}
      <path
        d="M0,700 Q360,640 720,680 T1440,660 L1440,900 L0,900 Z"
        fill="url(#bg-hills-near)"
      />

      {/* Árboles añosos (siluetas estilo raulí en el potrero) */}
      <g fill="#064e3b" opacity="0.9">
        <rect x="195" y="600" width="10" height="80" />
        <ellipse cx="200" cy="600" rx="55" ry="85" />

        <rect x="345" y="570" width="12" height="100" />
        <ellipse cx="351" cy="570" rx="75" ry="105" />

        <rect x="1100" y="595" width="10" height="80" />
        <ellipse cx="1105" cy="595" rx="65" ry="95" />

        <rect x="1245" y="585" width="9" height="70" />
        <ellipse cx="1249" cy="585" rx="50" ry="80" />
      </g>

      {/* Pradera del frente */}
      <path
        d="M0,800 L1440,820 L1440,900 L0,900 Z"
        fill="#065f46"
      />
    </svg>
  );
}
