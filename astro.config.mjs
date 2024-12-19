import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  site: 'https://furever.live',
  integrations: [
    tailwind(),
    react()
  ],
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true
  },
  build: {
    inlineStylesheets: 'auto'
  }
});