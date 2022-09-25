<script lang="ts">
  import { onMount } from "svelte";
  import { Writable, writable } from "svelte/store";
  import EditorTabs from "./editor-tabs.svelte";
  import Icon from "./icon.svelte";
  import ResizeBar from "./resize-bar.svelte";

  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    import Editor from "./editor.svelte";

  let editorElementRef: HTMLDivElement | null = null;

  const contentWidth: Writable<string> = writable("500px");
  const editorHeight: Writable<string> = writable("1fr");

  const onContentResize = (event: CustomEvent<number>) =>
    contentWidth.set(`${event.detail}px`);
  const onEditorResize = (event: CustomEvent<number>) =>
    editorHeight.set(`${event.detail}px`);

  onMount(() => {
    if (editorElementRef === null) {
      return;
    }

    window.MonacoEnvironment = {
      getWorker: (_moduleId: unknown, label: string) => {
        switch (label) {
          case "javascript":
          case "typescript": {
            // @ts-ignore
            return new tsWorker()
          }
          case "css": {
            // @ts-ignore
            return new cssWorker()
          }
          default: {
            // @ts-ignore
            return new editorWorker()
          }
        }
      }
    }

    import("monaco-editor").then(async ({ editor, KeyMod, KeyCode, Uri }) => {
      const ed = editor.create(editorElementRef, {
        lineNumbers: "on",
        value: `Hello...`,
        automaticLayout: true,
        fontSize: "15px",
        fontFamily: "Cascadia Code, monospace",
        fontLigatures: true,
        minimap: {
          enabled: false,
        },
        lineDecorationsWidth: 5,
        lineNumbersMinChars: 3,
        padding: { top: 15 },
      });

      ed.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => {
        ed?.getAction("editor.action.formatDocument").run();
        ed?.focus();
      });

      ed.onDidChangeModelContent((event) => {
        
      })

      const model = editor.getModel(Uri.parse("file:///tutorial/index.ts"))
      console.log(model)
    });
  });
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
      <header class="flex justify-between sticky top-0 z-10 bg-white px-4 py-2 border-b">
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
          <p class="line" data-line="1">
            <strong
              >Advertisement <img
                class="emoji"
                draggable="false"
                alt="😃"
                src="https://twemoji.maxcdn.com/36x36/1f603.png"
              />
            </strong>
          </p>
          <ul>
            <li>
              <strong
                ><a href="https://nodeca.github.io/pica/demo/">pica</a>
              </strong> - high quality and fast image resize in browser.
            </li>
            <li>
              <strong
                ><a href="https://github.com/nodeca/babelfish/">babelfish</a>
              </strong> - developer friendly i18n with plurals support and easy syntax.
            </li>
          </ul>
          <p class="line" data-line="8">You will like those projects!</p>
          <hr />
          <h1 class="line" data-line="12">
            h1 Heading <img
              class="emoji"
              draggable="false"
              alt="😎"
              src="https://twemoji.maxcdn.com/36x36/1f60e.png"
            />
          </h1>
          <h2 class="line" data-line="13">h2 Heading</h2>
          <h3 class="line" data-line="14">h3 Heading</h3>
          <h4 class="line" data-line="15">h4 Heading</h4>
          <h5 class="line" data-line="16">h5 Heading</h5>
          <h6 class="line" data-line="17">h6 Heading</h6>
          <h2 class="line" data-line="20">Horizontal Rules</h2>
          <hr />
          <hr />
          <hr />
          <h2 class="line" data-line="29">Typographic replacements</h2>
          <p class="line" data-line="31">
            Enable typographer option to see result.
          </p>
          <p class="line" data-line="33">© © ® ® ™ ™ (p) (P) ±</p>
          <p class="line" data-line="35">test… test… test… test?.. test!..</p>
          <p class="line" data-line="37">!!! ??? , – —</p>
          <p class="line" data-line="39">
            “Smartypants, double quotes” and ‘single quotes’
          </p>
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

    <div class="border-b">
      <EditorTabs />
    </div>

    <div class="h-[calc(100%-39px)] min-h-0 editor-instance" bind:this={editorElementRef} />
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
      <!-- <iframe
        class="w-full h-full box-border"
        src="https://mephi.dev"
        frameborder="0"
      /> -->
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
