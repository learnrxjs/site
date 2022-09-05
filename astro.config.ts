import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";
import { rehypeHeadings } from './src/utils'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  markdown: {
    rehypePlugins: [
      // "rehype-slug",
      rehypeHeadings
    ]
  }
});