<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { derived, Unsubscriber, writable } from "svelte/store";
  import { connectWriteable } from "../directives";
  import { filterApiEntites } from "../lib";
  import type { ApiEntityKindForView } from "../models";
  import type { ApiPackage } from "../models/api-package";
  import ApiEntityKindIcon from "./api-entity-kind-icon.svelte";
  import TranslateString from "./translate-string.svelte";

  const TITLE_QUERY_PARAM_NAME: string = "title"
  const KIND_QUERY_PARAM_NAME: string = "kind"

  export let apiPackages: ApiPackage[] = [];

  const search = writable<string>("");
  const kind = writable<ApiEntityKindForView>("ALL");

  const filteredApiPackages = derived(
    [search, kind],
    ([searchValue, kindValue]) => filterApiEntites(apiPackages, searchValue, kindValue)
  );

  const syncQueryParams = derived([search, kind], (v) => v)

  let syncQueryParamsUnsubscribe: Unsubscriber = () => {}

  onMount(() => {
    const url: URL = new URL(location.href);

    if (url.searchParams.has(TITLE_QUERY_PARAM_NAME)) {
      search.set(url.searchParams.get(TITLE_QUERY_PARAM_NAME)!);
    }

    if (url.searchParams.has(KIND_QUERY_PARAM_NAME)) {
      kind.set(url.searchParams.get(KIND_QUERY_PARAM_NAME) as ApiEntityKindForView);
    }

    syncQueryParamsUnsubscribe = syncQueryParams.subscribe(([searchValue, kindValue]) => {
      const url = new URL(location.href)
      if (searchValue.length <= 0) {
        url.searchParams.delete(TITLE_QUERY_PARAM_NAME)
      } else {
        url.searchParams.set(TITLE_QUERY_PARAM_NAME, searchValue)
      }
      
      if (kindValue === "ALL") {
        url.searchParams.delete(KIND_QUERY_PARAM_NAME)
      } else {
        url.searchParams.set(KIND_QUERY_PARAM_NAME, kindValue)
      }

      history.replaceState(null, "", url)
    })
  });

  onDestroy(() => {
    syncQueryParamsUnsubscribe()
  })

  const kinds: ApiEntityKindForView[] = [
    "ALL",
    "CLASS",
    "CONST",
    "ENUM",
    "FUNCTION",
    "INTERFACE",
    "TYPE_ALIAS"
  ];
</script>

<main class="py-12 px-8">
  <div class="wrap flex flex-col gap-4">
    <header class="flex gap-4">
      <select
        use:connectWriteable={kind}
        class="block rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 px-3 py-2"
      >
        {#each kinds as kind}
          <option value={kind} selected={ kind === "ALL" ? true : null }>
            <TranslateString key={`entities.kind.${kind.toLowerCase()}`} />
          </option>
        {/each}
      </select>

      <input
        type="text"
        class="block rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 px-3 py-2"
        placeholder="Поиск..."
        use:connectWriteable={search}
      />
    </header>

    <div>
      {#if $filteredApiPackages.length <= 0}
        <p>Совпадений нет!</p>
      {/if}
      {#each $filteredApiPackages as packageInstance}
        <div>
          <h2 class="font-bold text-2xl mb-4">{packageInstance.name}</h2>

          <ul class="flex gap-4">
            {#each packageInstance.entities as entity}
              <li class="w-1/3">
                <a href={entity.url} class="like-link flex items-center gap-1 w-min">
                  <ApiEntityKindIcon entityKind={entity.kind} />
                  <span>{entity.title}</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</main>
