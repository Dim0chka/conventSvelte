<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    export let options: { id: string; name: string }[]; 
    export let changeHandlerButton: (name: string, value: string) => void;
    export let changeHandler: (ev: Event) => void;
    export let value: string;
    export let name: string;

    let optionsButtons: any[] = []
    

    onMount(() => {
        optionsButtons = options.filter((x) => ['USD', 'EUR','RUB', 'RSD'].includes(x.id))
    })

    afterUpdate(() => {
        if (!['USD', 'EUR','RUB'].includes(value)) {
            optionsButtons = options.filter((x) => ['USD', 'EUR','RUB', value].includes(x.id))
        }
    })

</script>

<div class="calc__switcher">
    {#each optionsButtons as option}
    <button
        class="calc-btn"
        aria-current={value === option.id}
        aria-label={option.id}
        on:click={() => {
            changeHandlerButton(name, option.id)
        }}
    >
    {option.id}
    </button>
    {/each}
    <select class="calc-btn" {name} bind:value on:change={changeHandler}>
        {#each options as option}
        <option value={option.id}>{option.id} - {option.name}</option>
        {/each}
    </select>

</div>

<style>
.calc__switcher {
    overflow: hidden;
}
.calc-btn {
    width: 85px;
    height: 40px;
    padding: 12px 0;
    outline: none;
    border: none;
    background-color: inherit;
    text-transform: uppercase;
    cursor: pointer;
    border-top: 1px solid #cdcdcd;
    border-bottom: 1px solid #cdcdcd;
    border-right: 1px solid #cdcdcd;
    float: left;
    text-align: center;
}

.calc-btn:first-child {
    border-left: 1px solid #cdcdcd;
    border-radius: 4px 0 0 4px;
}

.calc-btn:last-child {
  background: url(../public/download.svg) no-repeat 50%;
  background-size: 12px;
  color: transparent;
  width: 65px;
  border-radius: 0 4px 4px 0;
}

.calc-btn[aria-current="true"] {
    color: #fff;
    background-color: #FC401E;
}

</style>