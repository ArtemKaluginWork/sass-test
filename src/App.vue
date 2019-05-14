<template>
  <div id="app">
    <router-view></router-view>
    <!--<drop-down v-for="item, index in 10" :key="index"></drop-down>-->
  </div>
</template>

<script>
import DropDown from './components/DropDown';

export default {
  name: 'app',
  components: {
    DropDown,
  },
};
</script>

<style lang="scss">
  @import '@/assets/styles/base.scss';
</style>
