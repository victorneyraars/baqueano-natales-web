import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

/**
 * Configuración de Astro para la web central de Baqueano Natales.
 *
 * - output: 'server' permite SSR y la ejecución en el Edge de Cloudflare.
 * - adapter: cloudflare() genera el output compatible con Pages Functions.
 * - env.schema: variables type-safe inyectadas en build time.
 */
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind()],
  env: {
    schema: {
      PUBLIC_API_URL: envField.string({ context: 'client', access: 'public' }),
    },
  },
});
