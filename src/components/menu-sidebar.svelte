<script lang="ts">
  import type { MenuItem } from "../models";

  export let menuItems: readonly MenuItem[] = [];
  export let currentPagePathname: string;
</script>

<div>
  <ul class="flex flex-col gap-2">
    {#each menuItems as item}
      {#if item.type === "GROUP"}
        <li>
          <details open>
            <summary class="font-bold uppercase select-none cursor-pointer">{item.title}</summary>

            <ul class="pl-4">
              {#each item.links as link}
                <li>
                  <a
                    class="sidebar-link"
                    class:is-active={link.url.endsWith(currentPagePathname)}
                    href={link.url}
                  >
                    {link.title}
                  </a>
                </li>
              {/each}
            </ul>
          </details>
        </li>
      {:else}
        <li>
          <a class="sidebar-link" href={item.url}>
            {item.title}
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</div>
