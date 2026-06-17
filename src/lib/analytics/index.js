// Punto de entrada del motor analítico.
// Importa desde acá en componentes de UI.

export { pastoreoVsSuplemento } from "./pastoreoVsSuplemento";
export { detectarAnomalias } from "./detectorAnomalias";
export { optimizadorRiego } from "./optimizadorRiego";

import { pastoreoVsSuplemento } from "./pastoreoVsSuplemento";
import { detectarAnomalias } from "./detectorAnomalias";
import { optimizadorRiego } from "./optimizadorRiego";

// Helper: corre los 3 motores y devuelve un snapshot consolidado para el dashboard.
export function analizarTodo() {
  const a = pastoreoVsSuplemento();
  const c = optimizadorRiego();
  const b = detectarAnomalias();

  return {
    pastoreo: a,
    riego: c,
    anomalias: b,
    resumen: {
      total_recomendaciones: 2 + (b.length > 0 ? 1 : 0),
      rojas: [
        a.severidad === "ROJO" ? 1 : 0,
        c.severidad === "ROJO" ? 1 : 0,
        b.filter((x) => x.severidad === "ROJO").length,
      ].reduce((s, x) => s + x, 0),
    },
  };
}
