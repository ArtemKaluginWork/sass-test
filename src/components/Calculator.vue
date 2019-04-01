<template>
  <div class="calculator-container" :class="{'wibro': wibro}">
    <p class="input">{{value | formatNumber}}</p>
    <div class="calculator__number-block">
      <button @click="changeC" class="button-number button-operation">С</button>
      <button class="button-number button-error" @click="wibro = !wibro">{{wibro ? "STOP!!!" : "Don't Press"}}</button>
      <button @click="changeValue(number)" class="button-number" :key="number" v-for="number in numbers">
        {{number }}
      </button>
      <button @click="changePlus" class="button-number button-operation">+</button>
      <button @click="resolve" class="button-number button-operation">=</button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'calculator',
  data() {
    return {
      value: '',
      result: 0,
      numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
      wibro: false,
    };
  },
  filters: {
    formatNumber(value) {
      return new Intl.NumberFormat('ru-RU').format(value);
    },
  },
  methods: {
    changeValue(val) {
      if (this.value.length > 8) return;
      this.value = this.value + String(val).slice(-1);
    },
    changePlus() {
      this.result = this.result + Number(this.value);
      this.value = '';
    },
    resolve() {
      this.value = this.result + Number(this.value);
      this.result = 0;
    },
    changeC() {
      this.value = '';
      this.result = 0;
    },

  },
};
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';

  $button-background-number: #d1d2d5;
  $button-font-size: 16px;
  $button-font-color: #1f1f1f;
  $button-background-operation: #f5923d;
  $input-background: #4a4a4a;
  $input-color: #FFFFFF;


  .calculator-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 301px;
    .input {
      font-family: $base-font-family;
      font-size: 24px;
      border-top: 1px solid black;
      border-right: 1px solid black;
      border-left: 1px solid black;
      width: 301px;
      height: 60px;
      background-color: $input-background;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: $input-color;
    }
    .calculator__number-block {
      display: flex;
      width: 301px;
      flex-wrap: wrap;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;

      .button-number {
        background-color: $button-background-number;
        width: 100px;
        height: 60px;
        font-family: $base-font-family;
        font-size: $button-font-size;
        color: $button-font-color;
        border: none;
        cursor: pointer;
        outline: none;
        border-top: 1px solid black;
        border-left: 1px solid black;
      }
      .button-operation {
        background-color: $button-background-operation;
        color: white;
      }
      .button-error {
        background-color: $error-color;
        color: white;
        width: 200px;
      }
    }
  }

  .wibro{
    display: block;
    position: fixed;
    animation: tremor 3s infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
    transition: opacity 1s;
    &:hover {
      opacity: 0;
    }
  }
  @keyframes tremor {
    0% {
      left: 0;
      top: 0;
      opacity: 0;
    }
    100% {
      left: calc(100% - 301px);
      top: calc(100% - 361px);
      opacity: 1;
    }
  }
</style>
