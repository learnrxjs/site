import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import { rehypeHeadings } from './src/utils';
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
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