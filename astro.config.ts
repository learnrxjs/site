import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import { rehypeHeadings } from './src/utils';
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), solidJs()],
  markdown: {
    rehypePlugins: [// "rehype-slug",
    rehypeHeadings]
  },
  // vite: {
  //   plugins: [monacoEditorPlugin({
  //     languageWorkers: ["css", "html", "typescript"]
  //   })]
  // }
});