<script context="module" lang="ts">
  import { createGiphyClient } from "./clients/giphyClient";

  export const giphyClient = createGiphyClient();
</script>

<script lang="ts">
  import Input from "./components/Input.svelte";
  import GifsGrid from "./components/GifsGrid.svelte";
  import debounce from "lodash.debounce"
  import type { IGif } from "@giphy/js-types";
  import Loader from "./components/Loader/Loader.svelte";

  let loading: boolean = false;
  let search: string;
  let gifs: IGif[] = [];
  let isTyping = false;

  const getGifs = debounce(async (phrase: string) => {
    isTyping = false;

    gifs = [];

    if (!phrase) {
      return;
    }

    loading = true;

    const result = await giphyClient.search(phrase);

    gifs = result.data;
    loading = false;
  }, 500)

  $: {
    isTyping = true;
    getGifs(search);
  }
</script>


<main>
  <Input id="search" bind:value={search} placeholder="Search for gifs..." ref="input"/>
  {#if loading}
    <div>
      <Loader />
    </div>
  {/if}
  {#if search}
    {#if !gifs.length && !loading && !isTyping}
      <div>
        No gifs found 😭. Maybe try a different phrase?
      </div>
    {/if}
    {#if gifs.length}
      <GifsGrid gifs={gifs}/>
    {/if}
  {/if}
  {#if !search && !loading}
    <div>
      Start typing to search for gifs 👆
    </div>
  {/if}
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 1200px;
    margin: 0 auto;
  }

  :global([ref=input]) {
    width: 350px;

  }
</style>