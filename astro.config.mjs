import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';

/**
 * Configuración de Astro para la web central de Baqueano Natales.
 * 
 * - output: 'static' (sitio estático puro, Cloudflare Pages lo sirve desde el edge).
 * - env.schema: variables type-safe inyectadas en build time.
 * - NOTA: La carpeta functions/ se mantiene en la raíz. Cloudflare Pages
 *   la detecta automáticamente para ejecutar lógica en el Edge (ej. descargar.js).
 */
export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
  env: {
    schema: {
      PUBLIC_API_URL: envField.string({ context: 'client', access: 'public' }),
    },
  },
});
