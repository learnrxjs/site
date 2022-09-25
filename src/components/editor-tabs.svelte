<script lang="ts">
  import { get, writable, Writable } from "svelte/store";
    import { connectWriteable } from "../directives";
  import Icon from "./icon.svelte";

  export let tabNames: string[] = ["index.html", "index.ts", "index.css"];
  export let activeTabName: string = "index.html"
  
  let editTabName: string | null = null
  let editTabNameValue: Writable<string | null> = writable(null)

  const onClickTab = (tabName: string) => {
    activeTabName = tabName
  }

  const onDoubleClickTab = (tabName: string) => {
    editTabNameValue.set(tabName)
    editTabName = tabName
  }

  const onBlurInput = () => {
    saveTabName()
  }

  const onKeyDownInput = (event: KeyboardEvent) => {
    if (event.key !== "Enter") {
      return
    }

    saveTabName()
  }

  const saveTabName = () => {
    debugger
    const oldTabName: string = activeTabName
    const oldTabNameIndex = tabNames.indexOf(oldTabName)
    const newTabName: string = get(editTabNameValue) as string
    const newTabNames = tabNames.slice()
    newTabNames[ oldTabNameIndex ] = newTabName
    tabNames = newTabNames
    activeTabName = newTabName

    editTabNameValue.set(null)
    editTabName = null
  }

  const onClickCloseButton = (tabName: string) => {
    tabNames = tabNames.filter((t) => t !== tabName)
  }

  const onClickAddButton = () => {
    const newTabName: string = `tab-${ tabNames.length + 1 }.ts`
    tabNames = [ ...tabNames, newTabName ]
  }
</script>

<ul class="flex items-center">
  {#each tabNames as tabName}
    <li class="flex items-center">
      <button
        on:click={() => onClickTab(tabName)}
        on:dblclick={() => onDoubleClickTab(tabName)}
        class="tab-button flex items-center gap-1 px-3 py-2 border-r bg-gray-100 max-w-[175px]"
        class:is-active={tabName === activeTabName}
      >
        {#if editTabName === tabName}
          <input
            type="text"
            autofocus
            class="w-full"
            on:blur={onBlurInput}
            on:keydown={onKeyDownInput}
            use:connectWriteable={editTabNameValue}
          />
        {:else}
          <span class="leading-none select-none">{tabName}</span>
        {/if}
        <button on:click|stopPropagation={() => onClickCloseButton(tabName)} class="close-button block w-[1.2em] p-[3px] rounded hover:bg-gray-200"><Icon name="close" /></button>
      </button>
    </li>
  {/each}
  <li>
    <button on:click={onClickAddButton} class="p-2">
      <span class="block p-[3px] w-[1.2em] rounded hover:bg-gray-200"><Icon name="add" /></span>
    </button>
  </li>
</ul>

<style>
  .tab-button:hover .close-button,
  .tab-button.is-active .close-button {
    @apply visible
  }

  .close-button {
    @apply invisible
  }

  .is-active {
    @apply bg-white border-t-2 border-t-pink-500
  }
</style>