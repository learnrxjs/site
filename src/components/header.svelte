<script lang="ts">
  import Icon from "./icon.svelte";
  import { headerMenuLinks } from "../static-data"

  export let currentPagePathname: string
  $: console.log(currentPagePathname)
</script>

<header class="border-b py-4 px-8">
  <div class="wrap">
    <div class="flex justify-between items-center">
      <a href="/">
        <span class="text-xl font-bold">RxJS Space</span>
      </a>
    
      <nav class="hidden md:block">
        <ul class="flex items-center gap-8">
          {#each headerMenuLinks as link}
            <li>
              <a class="header-link text-gray-500 hover:text-pink-500"
                 class:is-active={link.url.endsWith(currentPagePathname)}
                 href={link.url}
              >{link.title}</a>
            </li>
          {/each}
        </ul>
      </nav>
  
      <button class="w-[2em] h-[2em] md:hidden">
        <Icon name="menu" />
      </button>
    </div>
  </div>
</header>

<style>
  .header-link.is-active {
    @apply text-pink-500
  }
</style>