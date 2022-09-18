<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let resizeTargetId: string | null = null;
  export let resizeAxis: "X" | "Y" | null = null;

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
          isResizeAxisX ? oldSize + clientX - right : oldSize - clientY + top
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
  class="absolute hover:bg-pink-500 cursor-col-resize transition"
  bind:this={resizeBarRef}
  data-resize-axis={resizeAxis}
  on:pointerover={onPointerOver}
  on:pointerleave={onPointerLeave}
  on:pointerdown={onPointerDown}
/>

<style>
  [data-resize-axis="X"] {
    @apply top-0 -right-1 w-1 h-full
  }

  [data-resize-axis="Y"] {
    @apply left-0 -top-1 w-full h-1
  }
</style>
