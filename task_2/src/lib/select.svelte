<script lang="ts">
    export let options: { id: string; name: string }[];
    export let changeHandler: (ev: Event) => void;
    export let value: string;
    export let name: string;
  </script>
  
  <div class="calc__switcher">
    <div class="calc__btn">
      <select class="" {name} bind:value on:change={changeHandler}>
        {#each options as option}
          <option value={option.id}>{option.id} - {option.name}</option>
        {/each}
      </select>
    </div>
  </div>
  <style>

.calc__btn {
    width: 85px;
    height: 40px;
    padding: 12px 0;
    outline: none;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    border-top: 1px solid #cdcdcd;
    border-bottom: 1px solid #cdcdcd;
    border-right: 1px solid #cdcdcd;
    float: left;
    text-align: center;
}

.calc__btn:last-child {
  background: url(../public/download.svg) no-repeat 50%;
  background-size: 12px;
  color: transparent;
}

.calc__btn select {
  width: 100%;
  height: 35px;
  border: none;
  opacity: 0;
  outline: 0;
}



  </style>