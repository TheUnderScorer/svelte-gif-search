<script lang="ts">
  export let label: string = '';
  export let value: string = '';
  export let placeholder: string;
  export let id: string;
  export let ref: string;

  const handleChange = (event: Event) => {
    value = (event.target as HTMLElement).value;
  }
</script>

<label class="input-component" for="{id}" {ref}>
  {#if label}
    <span>{label}</span>
  {/if}
  <input bind:value={value} id="{id}" on:change={handleChange} placeholder="{placeholder}" type="text">
</label>

<style lang="scss">
  .input-component {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
    }
  }
</style>