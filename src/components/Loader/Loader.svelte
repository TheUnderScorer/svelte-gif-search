<script lang="ts" context="module">
  import { LoaderType } from "./types";

  export const srcMap = {
    [LoaderType.BeanEater]: 'assets/BeanEater.svg',
    [LoaderType.Spinner]: 'assets/Spin.svg'
  }
</script>

<script lang="ts">
  export let type: LoaderType = LoaderType.BeanEater;

  const src: string = srcMap[type];
</script>

<img src={src} alt="Loading...">