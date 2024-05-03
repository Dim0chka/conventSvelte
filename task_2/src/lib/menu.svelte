<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    export let options: { id: string; name: string }[]; 
    export let changeHandlerButton: (name: string, value: string) => void;
    export let changeHandler: (ev: Event) => void;
    export let value: string;
    export let name: string;

    let sortedCurrencies: any[] = []

    let tooltip: any

    onMount(() => {
        sortedCurrencies = [
            ...options.filter((x) => ['USD', 'EUR','RUB'].includes(x.id)).reverse(),
            ...options.filter((x) => x.id === 'GBP')
        ]

    })

    afterUpdate(() => {
        if (!['USD', 'EUR','RUB'].includes(value)) {
            sortedCurrencies = [
                ...options.filter((x) => ['USD', 'EUR','RUB'].includes(x.id)).reverse(),
                ...options.filter((x) => x.id === value)
            ]
        }
    })

    let nameOption: string

    function openModal(event, name) {
        tooltip.style.opacity = 1
        nameOption = name
        let target = event.target;
        let coords = target.getBoundingClientRect()
        tooltip.style.top = `${coords.top - tooltip.offsetHeight - 5}px`
        tooltip.style.left = `${coords.left + (target.offsetWidth - tooltip.offsetWidth) / 2}px`
    }

    function closeModal() {
        tooltip.style.opacity = 0
    }



</script>

<div class="calc__switcher">
    {#each sortedCurrencies as option}
    <button
        class="calc-btn"
        aria-current={value === option.id}
        aria-label={option.id}
        data-tooltip={option.name}
        
        on:click={() => {
            changeHandlerButton(name, option.id)
        }}
        on:mouseenter={openModal(event, option.name)}
        on:mouseleave={closeModal}
    >
    {option.id}
    </button>
    {/each}


    <div class="tooltip" bind:this={tooltip}>
        {nameOption}
    </div>

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
    background: linear-gradient(0deg, rgba(2, 0, 36, 1) -1%, rgba(32, 252, 30, 1) 0%, rgba(0, 255, 173, 1) 100%);
}

.tooltip {
    opacity: 0;
    position: absolute;
    border-radius: 4px;
    text-align: center;

    background: #fff;
    transition: opacity 0.2s ease-in-out;
    padding: 10px 20px;
    box-shadow: 0 8px 40px 0 rgba(0, 0, 0, .2);
}


</style>