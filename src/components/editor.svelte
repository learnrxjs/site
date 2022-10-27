<script lang="ts">
  // import * as monaco from "monaco-editor"
  import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
  import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
  import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
  import { onMount } from "svelte"
  import type { TutorialPageFile } from "../models"
  import EditorTabs from "./editor-tabs.svelte"

  let editorElementRef: HTMLElement | null = null
  let editorInst: any

  const tabs: Map<string, TutorialPageFile> = new Map<string, TutorialPageFile>([
    [
      "main.ts",
      {
        name: "main.ts",
        content: `import { fromEvent, throttleTime, scan } from 'rxjs';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => console.log(\`Clicked $\{count} times\`));`,
        lang: "typescript"
      }
    ],
    [
      "index.html",
      {
        name: "index.html",
        content: `<div>

<p>The HTML <code>button</code> tag defines a clickable button.</p>
<p>The CSS <code>background-color</code> property defines the background color of an element.</p>

</div>`,
        lang: "html"
      }
    ]
  ])

  onMount(() => {
    if (editorElementRef === null) {
      return
    }

    (window as any).MonacoEnvironment = {
      getWorker: function (workerId, label) {
        const getWorkerModule = (moduleUrl, label) => {
          return new Worker((window as any).MonacoEnvironment.getWorkerUrl(moduleUrl), {
            name: label,
            type: 'module'
          });
        };

        switch (label) {
          case 'json':
            return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label);
          case 'css':
          case 'scss':
          case 'less':
            return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label);
          case 'html':
          case 'handlebars':
          case 'razor':
            return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label);
          case 'typescript':
          case 'javascript':
            return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label);
          default:
            return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label);
        }
      }
    };

    monaco.editor.create(editorElementRef!, {
      lineNumbers: "on",
      value: "Hello",
      automaticLayout: true,
      fontSize: "15px",
      fontFamily: "Cascadia Code, monospace",
      fontLigatures: true,
      minimap: {
        enabled: false
      },
      lineDecorationsWidth: 5,
      lineNumbersMinChars: 3,
      padding: {
        top: 15
      }
    })


    /*if (editorElementRef === null) {
      return
    }

    (window as any).MonacoEnvironment = {
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

    import("monaco-editor").then(({ editor, KeyCode, KeyMod }) => {
      EditorClass = editor

      editorInst = editor.create(editorElementRef!, {
        lineNumbers: "on",
        automaticLayout: true,
        fontSize: "15px",
        fontFamily: "Cascadia Code, monospace",
        fontLigatures: true,
        minimap: {
          enabled: false
        },
        lineDecorationsWidth: 5,
        lineNumbersMinChars: 3,
        padding: {
          top: 15
        }
      })

      editorInst.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => {
        editorInst?.getAction("editor.action.formatDocument").run()
        editorInst?.focus()
      })

      editorInst.onDidChangeModelContent(() => {
        console.log(editorInst.getValue())
      })

      const tabName = Array.from(tabs.keys())[0]
      const tab = tabs.get(tabName)
      if (tab) {
        const model = EditorClass.createModel(tab.content, tab.lang)
        editorInst.setModel(model)
      }
    })*/
  })

  /*const onActiveTabChange = (event: CustomEvent<string>) => {
    if (typeof editorInst === "undefined") {
      return
    }

    const activeTabName: string = event.detail
    const tab: TutorialPageFile | undefined = tabs.get(activeTabName)

    if (tab) {
      const model = EditorClass.createModel(tab.content, tab.lang)
      editorInst.setModel(model)
    }
  }*/
</script>

<div class="h-full">
  <div class="border-b">
    <!-- <EditorTabs tabNames={Array.from(tabs.keys())}
                activeTabName={Array.from(tabs.keys())[0]}
                readonly={true}
                on:activeTabChange={onActiveTabChange} /> -->
  </div>

  <div
    class="h-[calc(100%-39px)] min-h-0 editor-instance"
    bind:this={editorElementRef}
  />
</div>
