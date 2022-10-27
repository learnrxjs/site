<script lang="ts">
  import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
  import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
  import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
  import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
  import { onMount, createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import EditorTabs from "./editor-tabs.svelte";
  import type { EditorFile } from "../models";

  export let files: EditorFile[] = []
  const dispatcher = createEventDispatcher()

  let editorElementRef: HTMLElement
  const activeTabName = writable("index.html")

  const tabNames = files.map((file) => file.name)

  async function initMonaco(): Promise<void> {
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
          case "html": {
            return new htmlWorker()
          }
          default: {
            // @ts-ignore
            return new editorWorker()
          }
        }
      }
    }

    const { editor: MonacoEditor, Uri } = await import("monaco-editor")
    
    const editor = MonacoEditor.create(editorElementRef, {
      lineNumbers: "on",
      automaticLayout: true,
      fontSize: 15,
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

    const fileModels = new Map()

    for (const file of files) {
      const model = MonacoEditor.createModel(file.content, undefined, Uri.parse(`file:///rxjs/${ file.name }`))
      
      model.onDidChangeContent(() => {
        dispatcher("tab-content-change", {
          name: file.name,
          newContent: model.getValue()
        })
      })

      fileModels.set(file.name, model)
    }

    activeTabName.subscribe((fileName) => {
      editor.setModel(fileModels.get(fileName))
    })
  }

  onMount(() => {
    initMonaco()
  })

  const onChangeActiveTabName = (event: CustomEvent<string>) => {
    activeTabName.set(event.detail)
  }
</script>

<div class="h-full">
  <div class="border-b">
    <EditorTabs tabNames={tabNames} on:activeTabChange={onChangeActiveTabName} activeTabName={$activeTabName} />
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