<script lang="ts">
  import type { ApiEntityKind } from "../models";

  export let entityKind: ApiEntityKind;
</script>

{#if entityKind === "CLASS"}
  <div class="icon after:content-['C'] bg-blue-500" />
{:else if entityKind === "CONST"}
  <div class="icon after:content-['K'] bg-gray-400" />
{:else if entityKind === "ENUM"}
  <div class="icon after:content-['E'] bg-orange-400" />
{:else if entityKind === "FUNCTION"}
  <div class="icon after:content-['F'] bg-green-700" />
{:else if entityKind === "INTERFACE"}
  <div class="icon after:content-['I'] bg-teal-500" />
{:else if entityKind === "TYPE_ALIAS"}
  <div class="icon after:content-['T'] bg-emerald-400" />
{/if}

<style>
  .icon {
    @apply relative
      w-[1em]
      h-[1em]
      after:absolute
      after:top-0
      after:left-0
      after:leading-none
      after:text-white
      after:text-xs
      after:w-full
      after:h-full
      after:flex
      after:justify-center
      after:items-center;
  }
</style>
