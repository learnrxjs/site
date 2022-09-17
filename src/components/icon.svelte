<script lang="ts">
  type IconNames = "menu" | "arrow-right" | "arrow-left" | "arrow-clockwise" | "arrow-counter-clockwise" | "magic-wand"
  const icons: Record<IconNames, string> = {
    "menu": `<svg style="width: 100%;height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path fill="none" d="M0 0h256v256H0z"/>
      <path stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M40 128h176M40 64h176M40 192h176"/>
    </svg>`,
    "arrow-right": `<svg style="width: 100%;height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path fill="none" d="M0 0h256v256H0z"/>
      <path fill="none" stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M40 128h176M144 56l72 72-72 72"/>
    </svg>`,
    "arrow-left": `<svg style="width: 100%;height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path fill="none" d="M0 0h256v256H0z"/>
      <path fill="none" stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M216 128H40M112 56l-72 72 72 72"/>
    </svg>`,
    "arrow-clockwise": `<svg style="width: 100%;height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path fill="none" d="M0 0h256v256H0z"/>
      <path fill="none" stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176.2 99.7h48v-48"/>
      <path fill="none" stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M190.2 190.2a88 88 0 1 1 0-124.4l34 33.9"/>
    </svg>`,
    "arrow-counter-clockwise": `<svg style="width: 100%;height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path fill="none" d="M0 0h256v256H0z"/>
      <path fill="none" stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M79.8 99.7h-48v-48"/>
      <path fill="none" stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M65.8 190.2a88 88 0 1 0 0-124.4l-34 33.9"/>
    </svg>`,
    "magic-wand": `<svg style="width: 100%;height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path fill="none" d="M0 0h256v256H0z"/>
      <path fill="none" stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M216 128v48M192 152h48M84 40v40M64 60h40M168 184v32M152 200h32"/>
      <rect width="226.3" height="45.25" x="14.9" y="105.4" fill="none" stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" rx="8" transform="rotate(-45 128.01 127.977)"/>
      <path fill="none" stroke="var(--icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m144 80 32 32"/>
    </svg>`
  }

  export let name: IconNames;
  $: iconHtml = Reflect.get(icons, name)
</script>

{@html iconHtml}