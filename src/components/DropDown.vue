<template>
    <div class="container">
      {{selected || 'Select'}}
      <span ref="toggler"  class="arrow" :class="{'arrow-open': isOpen}"> </span>
      <transition name="fade">
      <div v-if="isOpen" class="drop" :style="{height: `${30 * 6}px`}">
        <p class="item" @click="selected = 'item' + item" :key="item" v-for="item in 6">{{'item' + item }}</p>
      </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'DropDown',
  data() {
    return {
      isOpen: false,
      selected: null,
    };
  },
  mounted() {
    window.addEventListener('click', this.toggle);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.toggle);
  },
  methods: {
    toggle({ target }) {
      if (this.$el === target || this.$refs.toggler === target) {
        if (this.isOpen) {
          this.isOpen = false;
        } else {
          this.isOpen = true;
        }
      } else {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style scoped>
  .container {
    width: 200px;
    position: relative;
    border: 1px solid black;
    height: 30px;
    margin-bottom: 10px;
    background: white;
    padding: 10px;
    cursor: pointer;
    font-size: 12px;
  }
  .drop {
    position: absolute;
    top: 28px;
    left: -1px;
    transition: height .5s;
    border: 1px solid black;
    border-top: none;
    overflow: hidden;
    width: calc(100% + 2px);
    background: white;
    z-index: 2;
  }
  .item {
    width: 100%;
    height: 30px;
    padding: 10px;
    font-size: 14px;
  }
  .item:hover {
    background: lightcyan;
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: height 0.5s;
  }
  .fade-leave-active {
    z-index: 1;
  }
  .fade-enter, .fade-leave-to {
    height: 0 !important;
  }
  .arrow {
    border-color: black transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    content: " ";
    transform: rotateX(0deg);
    display: inline-block;
    position: absolute;
    font-size: 14px;
    transition:  transform 0.5s;
    right: 20px;
    top: 12px;
    cursor: pointer;
  }
  .arrow-open {
    transform: rotateX(180deg);

  }

</style>
