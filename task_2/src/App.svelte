<script lang="ts">
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  import Input from './lib/input.svelte'
  import { afterUpdate, onMount } from 'svelte'
  import fetchValues from "./fetchers/fetchValues"
  import Menu from "./lib/menu.svelte"
  import current from './current';

  let isLoading = false;
  let exchange = {
    fromCur: "USD",
    toCur: "RUB",
    fromAmount: 0,
    toAmount: 0,
  }


  async function getExchangeRate(fromCur: string, toCur: string) {
        let res = await fetchValues(fromCur)
        return `1 ${fromCur} = ${res[toCur]} ${toCur}` 
  }

  let exchangeRateFrom: string;
  let exchangeRateTo: string;


  onMount(async () => {
    exchangeRateFrom = await getExchangeRate(exchange.fromCur, exchange.toCur);
    exchangeRateTo = await getExchangeRate(exchange.toCur, exchange.fromCur);
  });

  afterUpdate(async () => {
    exchangeRateFrom = await getExchangeRate(exchange.fromCur, exchange.toCur);
    exchangeRateTo = await getExchangeRate(exchange.toCur, exchange.fromCur);

    handleChange
  })

  async function handleChange(ev: InputEvent) {
    if (ev.target instanceof HTMLInputElement) {
      let { name, value } = ev.target
      let val = Number(value)
      if (isNaN(val) || !isFinite(val)) {
        exchange[name] = exchange[name]
      } else {
        exchange[name] = val
      }
      if (name == "fromAmount") {
        let from = await fetchValues(exchange.fromCur)
        exchange.toAmount = (exchange.fromAmount * from[exchange.toCur])
      }
      if (name == "toAmount") {
        let to = await fetchValues(exchange.toCur)
        exchange.fromAmount = (exchange.toAmount * to[exchange.fromCur])
      }
    }
    if (ev.target instanceof HTMLSelectElement) {
      isLoading = true;
      let { name, value } = ev.target;
      exchange[name] = value;
      isLoading = false;

      if (name === "fromCur" || name === "toCur") {
            let from = await fetchValues(exchange.fromCur);
            exchange.toAmount = exchange.fromAmount * from[exchange.toCur];
      }
    }
  }

  async function handleChangeButton(name: string, value: string) {
    isLoading = true;
    exchange[name] = value;
    isLoading = false;

    if (name === "fromCur" || name === "toCur") {
        let from = await fetchValues(exchange.fromCur);
        exchange.toAmount = exchange.fromAmount * from[exchange.toCur];
    }
  }

  function changeData() {
      let changeCur = exchange.fromCur
      exchange.fromCur = exchange.toCur
      exchange.toCur = changeCur

      let changeAmount = exchange.fromAmount
      exchange.fromAmount = exchange.toAmount
      exchange.toAmount = changeAmount
  }

</script>
<div class="page">
  <div class="demo" style="font-family: 'Yandex Sans Text'; font-weight: 100; font-style: normal;">
      <h1>Конвентер валют</h1>
      <div class="box_convent">
        <div class="calc_side">
          <h2 class="calc_title">У меня есть</h2>
          <Menu
            options={current}
            value={exchange.fromCur}
            changeHandlerButton={handleChangeButton}
            changeHandler={handleChange}
            name="fromCur"
          />

          <Input
            title={exchangeRateFrom}
            changeHandler={handleChange}
            value={exchange.fromAmount === 0 ? '' : exchange.fromAmount}
            name="fromAmount"
          />
        </div>

        <div class="calc_center">
          <div on:click={changeData} class="calc_reverse"></div>
        </div>

        <div class="calc_side">
          <h2 class="calc_title">Хочу приобрести</h2>
          <Menu
            options={current}
            value={exchange.toCur}
            changeHandlerButton={handleChangeButton}
            changeHandler={handleChange}
            name="toCur"
          />
          <Input
            title={exchangeRateTo}
            changeHandler={handleChange}
            value={exchange.toAmount === 0 ? '' : exchange.toAmount}
            name="toAmount"
          />
        </div>
      </div>
      
    </div>
  </div>

<style>

.box_convent {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.calc_title {
  font-size: 16px;
  color: #777;
  margin: 10px 0;
}
.calc_side {
  width: 405px;
  display: inline-block;
  vertical-align: top;
}

.calc_center {
  width: 110px;
  padding-top: 20px;
  display: inline-block;
  vertical-align: top;
}

.calc_reverse {
  width: 50px;
  min-height: 50px;
  background: url(../public/transfer.svg) no-repeat 50%;
  background-size: 50px;
  margin: 0 auto;
  cursor: pointer;
}


</style>
