<script lang="ts">
    export let value: number;
    export let changeHandler: (ev: Event) => void;
    export let title: string;
    export let name: string;

</script>

<div class="calc_box">
    <input type="text" on:input={changeHandler} bind:value {name} class="input">
    <span class="calc_period">{title}</span>
</div>

<style>
.calc_box {
    margin: 24px 0;
    padding: 30px 20px 15px;
    border: 1px solid;
    font-family: 'Yandex Sans Text';
}

.input {
    font-size: 44px;
    height: 46px;
    margin-right: 10px;
    margin-bottom: 30px;
    outline: 0;
    border: none;
    border-radius: 4px;
    width: 100%;
    padding: 4px;
    transition: .17s linear;
}

.calc_period {
    color: #777;
    height: 35px;
    line-height: 35px;
    text-align: right;
}


</style>