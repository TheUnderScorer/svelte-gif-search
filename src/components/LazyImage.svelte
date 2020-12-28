<script context="module" lang="ts">
  import { elementInViewport } from "../utils/viewport";

  export const elements = new Set<HTMLImageElement>();

  export function loadImageIfVisible(img: HTMLImageElement) {
    if (elementInViewport(img) && !img.src) {
      img.src = img.dataset.src;
    }
  }

  document.addEventListener('scroll', () => {
    elements.forEach(img => {
      loadImageIfVisible(img);
    })
  })
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Loader from "./Loader/Loader.svelte";
  import { LoaderType } from "./Loader/types";

  export let src: string;
  export let alt: string;
  export let width: number;
  export let height: number;
  export let className: string;
  export let url: string;

  let image: HTMLImageElement;
  let loading = true;

  const handleLoad = () => {
    loading = false;
  }

  onMount(() => {
    loadImageIfVisible(image);

    elements.add(image)
  })

  onDestroy(() => {
    elements.delete(image);
  })
</script>

<span class={className} style="--width: {`${width}px`}; --height: {`${height}px`}">
    <a href={url} target="_blank">
      <img alt={alt}
           bind:this={image}
           class={className}
           class:loading={loading}
           on:load={handleLoad}
           data-src={src}>
    </a>
  {#if loading}
        <div>
            <Loader type={LoaderType.Spinner}/>
        </div>
    {/if}
</span>

<style>
    span {
        width: var(--width);
        height: var(--height);
    }

    img {
        width: 100%;
        height: 100%;
    }

    .loading {
        width: 0;
        height: 0;
        position: absolute;
        visibility: hidden;
    }
</style>