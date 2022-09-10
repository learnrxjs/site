import type { Writable } from "svelte/store"

function connectInputWriteable(node: HTMLInputElement, writable: Writable<string>) {
  const onInput = () => writable.set(node.value)

  writable.subscribe((value) => node.value = value)
  node.addEventListener("input", onInput)

  return {
    destroy: () => {
      node.removeEventListener("input", onInput)
    }
  }
}

function connectSelectWriteable(node: HTMLSelectElement, writable: Writable<string>) {
  const onChange = () => writable.set(node.value)

  writable.subscribe((value) => node.value = value)
  node.addEventListener("change", onChange)

  return {
    destroy: () => {
      node.removeEventListener("change", onChange)
    }
  }
}

export function connectWriteable<T = any>(node: HTMLElement, store: Writable<T>) {
  if (node instanceof HTMLSelectElement) {
    return connectSelectWriteable(node, store as any)
  }

  if (node instanceof HTMLInputElement) {
    return connectInputWriteable(node, store as any)
  }

  throw new TypeError("")
}