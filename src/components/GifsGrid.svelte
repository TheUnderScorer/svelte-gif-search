<script lang="ts">
  import type { IGif } from "@giphy/js-types";
  import LazyImage from "./LazyImage.svelte";

  export let gifs: IGif[];
</script>

<div class="gifs">
  {#each gifs as gif}
    <LazyImage
            url={gif.url}
            className="gif"
            src={gif.images.fixed_width.url}
            alt=""
            height={gif.images.fixed_width.height}
            width={gif.images.fixed_width.width}/>
  {/each}
</div>

<style lang="scss">
  .gifs {
    display: flex;
    flex-wrap: wrap;

    :global(.gif) {
      margin: 0.5rem;
    }
  }
</style>