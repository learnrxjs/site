<script lang="ts">
  import { Writable, writable } from "svelte/store";
  import Icon from "./icon.svelte";
  import ResizeBar from "./resize-bar.svelte";

  import Editor from "./editor.svelte";
  import type { EditorFile } from "../models";
  import { onMount } from "svelte";

  let iframeElementRef: HTMLIFrameElement | null = null

  const contentWidth: Writable<string> = writable("500px");
  const editorHeight: Writable<string> = writable("1fr");
  const src = writable("")

  onMount(() => {
    const html: string = `<html>
      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize/modern-normalize.min.css">
      </head>
      <body>
        <h1>Hello</h1>
      </body>
    </html>`
    
    const blob = new Blob([ html ], { type: 'text/html' })
    const srcResult = URL.createObjectURL(blob)
    src.set(srcResult)

    return () => URL.revokeObjectURL(srcResult)
  })

  const onContentResize = (event: CustomEvent<number>) => contentWidth.set(`${event.detail}px`);
  const onEditorResize = (event: CustomEvent<number>) => editorHeight.set(`${event.detail}px`);

  const files: EditorFile[] = [
    {
      name: "index.html",
      content: `<body>\n  <h1>Hello</h1>\n</body>`
    },
    {
      name: "index.ts",
      content: `const hello = document.querySelector("hello")\n\nhello.innerHTML = "Hello"`
    }
  ]

  const onTabContentChange = (event: CustomEvent<any>) => {
    const file = files.find((s) => s.name === event.detail.name)

    if (typeof file !== "undefined") {
      file.content = event.detail.newContent
    }
  }
</script>

<main
  class="absolute h-[calc(100%-61px)] w-full top-[61px] left-0 box-border tutorial-container"
  style:--content-size={$contentWidth}
  style:--editor-size={$editorHeight}
>
  <div id="content" class="content border-r relative">
    <ResizeBar
      resizeAxis="X"
      resizeTargetId="content"
      resizeBarPosition="INLINE_END"
      on:resize={onContentResize}
    />

    <div class="h-full overflow-y-auto">
      <header
        class="flex justify-between sticky top-0 z-10 bg-white px-4 py-2 border-b"
      >
        <div class="flex items-center gap-2">
          <h2 class="font-bold">Введение в RxJS</h2>
          <span>•</span>
          <span>Шаг <span class="font-bold">3/5</span></span>
        </div>

        <div class="flex">
          <a class="hover:bg-gray-200 p-2 rounded" href="">
            <span class="block max-w-[1em]"><Icon name="arrow-left" /></span>
          </a>

          <a class="hover:bg-gray-200 p-2 rounded" href="">
            <span class="block max-w-[1em]"><Icon name="arrow-right" /></span>
          </a>
        </div>
      </header>

      <article class="px-4 py-2">
        <div class="result-html full-height">
          <slot />
        </div>
      </article>

      <footer class="px-4 py-2 flex items-center flex-wrap gap-2 border-t">
        <div class="flex items-center gap-2">
          <button
            class="px-2 py-1 hover:bg-gray-200 border border-gray-200 rounded flex gap-2 items-center"
          >
            <span class="block max-w-[1em]"><Icon name="magic-wand" /></span>
            <span>Решение</span>
          </button>
          <button
            class="px-2 py-1 hover:bg-gray-200 border border-gray-200 rounded flex gap-2 items-center"
          >
            <span class="block max-w-[1em]"
              ><Icon name="arrow-counter-clockwise" /></span
            >
            <span>Сбросить</span>
          </button>
        </div>

        <div>
          <span>Далее:</span>
          <a class="like-link" href="">Новая страница</a>
        </div>
      </footer>
    </div>
  </div>
  <div id="editor-container" class="editor relative border-b">
    <ResizeBar
      resizeAxis="Y"
      resizeTargetId="editor-container"
      resizeBarPosition="BLOCK_END"
      on:resize={onEditorResize}
    />

    <Editor {files} on:tab-content-change={onTabContentChange} />
  </div>
  <div class="result flex flex-col">
    <header class="flex justify-between border-b px-4 py-2">
      <h3>Результат</h3>
      <button
        class="p-1 hover:bg-gray-200 border border-gray-200 rounded flex gap-2 items-center"
      >
        <span class="block max-w-[1em]"><Icon name="arrow-clockwise" /></span>
      </button>
    </header>

    <div class="flex-grow">
      <iframe
        title="RxJS Tutorial Sandbox"
        class="w-full h-full box-border"
        frameborder="0"
        bind:this={iframeElementRef}
        src={$src}
        sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin"
      />
    </div>
  </div>
</main>

<style>
  .tutorial-container {
    display: grid;
    grid-template-columns: var(--content-size, 500px) 1fr;
    grid-template-rows: var(--editor-size, 1fr) 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "content editor"
      "content result";
  }

  .content {
    grid-area: content;
  }

  .editor {
    grid-area: editor;
  }

  .result {
    grid-area: result;
  }
</style>