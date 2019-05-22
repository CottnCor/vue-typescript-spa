<template>
  <div class="container">
    <div class="full">
      <slot name="full"></slot>
    </div>
    <div class="top popup radius">
      <div class="radius">
        <slot name="top"></slot>
      </div>
    </div>
    <div class="left popup radius">
      <div class="radius">
        <slot name="left"></slot>
      </div>
    </div>
    <div class="bottom popup radius">
      <div class="radius">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class SketchLayout extends Vue {}
export default SketchLayout;
</script>

<style lang='scss' scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;

    .full {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .popup {
        position: absolute;
        padding: $size_12;
        box-shadow: $shadow_power;
        z-index: $zindex_back-top;
        background-color: map-get($default, glass);

        & > div {
            display: flex;
            width: 100%;
            height: 100%;
        }

        &.right,
        &.left {
            top: $size_12;
            max-height: 80%;
            overflow-y: auto;
        }

        &.right {
            right: $size_12;
        }

        &.left {
            left: $size_12;
        }

        &.top {
            top: $size_12;
            right: $size_12;
            padding: $size_6;
            & > div {
                border: 1px dashed map-get($default, grey_4);
            }
        }

        &.bottom {
            left: $size_12;
            bottom: $size_12;
        }
    }
}
</style>