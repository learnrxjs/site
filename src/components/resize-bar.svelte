<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let resizeTargetId: string | null = null;
  export let resizeAxis: "X" | "Y" | null = null;
  export let resizeBarPosition: "BLOCK_START" | "BLOCK_END" | "INLINE_START" | "INLINE_END"

  const eventDispatcher = createEventDispatcher();

  let resizeBarRef: HTMLDivElement | null = null;
  let resizeRequestAnimationFrameId: number | null = null;

  const onPointerOver = () => {};

  const onPointerLeave = () => {};

  const onPointerDown = (event: PointerEvent) => {
    if (
      resizeAxis === null ||
      resizeTargetId === null ||
      resizeBarRef === null
    ) {
      return;
    }

    const resizeTarget: HTMLElement | null = (
      resizeBarRef.getRootNode() as Document
    ).getElementById(resizeTargetId);

    if (resizeTarget === null) {
      return;
    }

    /**
     * NOTE: Нужно, чтобы браузере сказать следить
     * за курсором, чтобы его нельзя было отпустить случайно
    */
    resizeBarRef.setPointerCapture(event.pointerId);

    const { right, left, top, bottom }: DOMRect =
      resizeTarget.getBoundingClientRect();
    const isResizeAxisX = resizeAxis === "X";
    const oldSize: number = isResizeAxisX ? right - left : bottom - top;
    let clientX: number = 0;
    let clientY: number = 0;

    const onPointerMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;

      if (resizeRequestAnimationFrameId !== null) {
        return;
      }

      resizeRequestAnimationFrameId = requestAnimationFrame(() => {
        const newSize: number = Math.max(
          0,
          isResizeAxisX ? oldSize + clientX - right : oldSize + clientY - bottom
        );

        eventDispatcher("resize", newSize);
        resizeRequestAnimationFrameId = null;
      });
    };

    resizeBarRef.addEventListener("pointermove", onPointerMove);

    resizeBarRef.addEventListener(
      "pointerup",
      () => {
        resizeBarRef?.releasePointerCapture(event.pointerId);
        resizeBarRef?.removeEventListener("pointermove", onPointerMove);
      },
      { once: true }
    );
  };
</script>

<div
  class="absolute hover:bg-pink-500 transition z-10"
  bind:this={resizeBarRef}
  data-resize-axis={resizeAxis}
  data-resize-bar-position={resizeBarPosition}
  on:pointerover={onPointerOver}
  on:pointerleave={onPointerLeave}
  on:pointerdown={onPointerDown}
/>

<style>
  [data-resize-axis="X"] {
    @apply cursor-col-resize
  }

  [data-resize-axis="Y"] {
    @apply cursor-row-resize
  }
  
  [data-resize-axis="X"][data-resize-bar-position="INLINE_START"] {
    @apply top-0 -left-1 w-1 h-full
  }

  [data-resize-axis="X"][data-resize-bar-position="INLINE_END"] {
    @apply top-0 -right-1 w-1 h-full
  }

  [data-resize-axis="Y"][data-resize-bar-position="BLOCK_START"] {
    @apply left-0 -top-1 w-full h-1
  }

  [data-resize-axis="Y"][data-resize-bar-position="BLOCK_END"] {
    @apply left-0 -bottom-1 w-full h-1
  }
</style>
