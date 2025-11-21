declare module '*.svg' {
  import * as React from 'react';

  // Define el tipo de la exportación por defecto (la forma en que Next.js/svgr lo convierte)
  const SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}