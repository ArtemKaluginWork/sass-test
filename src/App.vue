<template>
  <div id="app">
    <calculator></calculator>
  </div>
</template>

<script>
import Calculator from '@/components/Calculator.vue';

export default {
  name: 'app',
  components: {
    Calculator,
  },
};
</script>

<style lang="scss">
  @import '@/assets/styles/base.scss';
</style>
