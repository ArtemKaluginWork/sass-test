<template>
  <div >
    <button @click="deleteThanos">DELETE</button>
    <div ref="thanos">
      <div style="position: relative" v-for="item in items" :key="item" :ref="`drop${item}`">
        <!--<img src="../assets/thanos.png">-->
        <drop-down></drop-down>
        <button @click="deleteItem(`drop${item}`, item)">Delete</button>
      </div>
    </div>
    <div ref="clone"></div>
  </div>

</template>

<script>
import html2canvas from 'html2canvas';
import chance from 'chance';
import DropDown from './DropDown';

const myChance = new chance();


function weightedRandomDistrib(peak, canvasCount) {
  const prob = [];
  const seq = [];
  for (let i = 0; i < canvasCount; i++) {
    prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3));
    seq.push(i);
  }
  return myChance.weighted(seq, prob);
}

function newCanvasFromImageData(imageDataArray, w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const tempCtx = canvas.getContext('2d');
  tempCtx.putImageData(new ImageData(imageDataArray, w, h), 0, 0);
  return canvas;
}

function createBlankImageData(imageData, canvasCount, imageDataArray) {
  for (let i = 0; i < canvasCount; i++) {
    const arr = new Uint8ClampedArray(imageData.data);
    for (let j = 0; j < arr.length; j++) {
      arr[j] = 0;
    }
    imageDataArray.push(arr);
  }
}


export default {
  name: 'Thanos',
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6],
      clone: null,
    };
  },
  components: {
    DropDown,
  },
  methods: {
    deleteThanos() {
      this.$refs.clone.childNodes.forEach((elem, index) => {
        setTimeout(() => elem.classList.add(index < 6 ? 'fade' : 'stop-fade'), index * 100);
      });
    },
    deleteItem(item, itemId) {
      html2canvas(this.$refs[item][0])
        .then((canvas) => {
          const ctx = canvas.getContext('2d');
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixelArr = imageData.data;
          const canvasCount = 10;
          const imageDataArray = [];
          createBlankImageData(imageData, canvasCount, imageDataArray);

          for (let i = 0; i < pixelArr.length; i += 4) {
            // find the highest probability canvas the pixel should be in
            const p = Math.floor((i / pixelArr.length) * canvasCount);
            const a = imageDataArray[weightedRandomDistrib(p, canvasCount)];
            a[i] = pixelArr[i];
            a[i + 1] = pixelArr[i + 1];
            a[i + 2] = pixelArr[i + 2];
            a[i + 3] = pixelArr[i + 3];
          }
          // create canvas for each imageData and append to target element
          const finalElemArray = [];
          for (let i = 0; i < canvasCount; i++) {
            const c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height, imageData);
            c.classList.add('dust');
            finalElemArray.push(c);
          }
          finalElemArray.forEach(c => this.$refs[item][0].appendChild(c));
          setTimeout(() => {
            this.$refs[item][0].childNodes.forEach((elem, index) => {
              setTimeout(() => elem.classList.add(index < 6 ? 'fade' : 'stop-fade'), index * 100);
            });
          }, 1000);
          setTimeout(() => this.items = this.items.filter(item => item != itemId), 3000);
        })
        .catch(err => console.log(err));
    },
  },
};

</script>

<style>
  .dust {
    position: absolute;
    transition: all 1s;
    left: 0;
    top: 0;
  }
  .fade {
    opacity: 0;
    left: 12px;
  }
  .stop-fade {
    opacity: 0;
    left: 3px
  }

</style>
