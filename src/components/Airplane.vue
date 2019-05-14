<template>
  <div class="map">
    <img class="plane play" src="../assets/airplane-flight.svg"/>
  </div>
</template>

<script>
export default {
  name: 'Airplane',
};
</script>

<style  lang="scss" scoped>
  .map {
    background: url("../assets/map.jpg");
    background-repeat: no-repeat;
    width: 1500px;
    height: 843px;
    border: 2px solid black;
    margin: auto;
    position: relative;
    .plane {
      position: absolute;
      height: 50px;
      width: 50px;
      transform: rotate(0deg);
      transition: all 1s;
    }
    .play {
      animation: play 3s infinite;

    }
  }
  @keyframes play  {
    to {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    from {
      transform: rotate(360deg);
    }
  }
</style>
