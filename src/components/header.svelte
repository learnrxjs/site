<script>
import Icon from "./icon.svelte";
</script>

<header class="border-b py-4 px-8">
  <div class="wrap">
    <div class="flex justify-between items-center">
      <a href="/">
        <span class="text-xl font-bold">RxJS Space</span>
      </a>
    
      <nav class="hidden md:block">
        <ul class="flex items-center gap-8">
          <li>
            <a class=" text-gray-500 hover:text-pink-500" href="/guide/overview">Введение</a>
          </li>
          <li>
            <a class=" text-gray-500 hover:text-pink-500" href="/api">API</a>
          </li>
          <li>
            <a class=" text-gray-500 hover:text-pink-500" href="/blog">Блог</a>
          </li>
          <li>
            <a class=" text-gray-500 hover:text-pink-500" href="/tour">Туториал</a>
          </li>
        </ul>
      </nav>
  
      <button class="w-[2em] h-[2em] md:hidden">
        <Icon name="menu" />
      </button>
    </div>
  </div>
</header>