<template>
  <div class="container">
    <div class="full">
      <slot name="full"></slot>
    </div>
    <div class="top popup radius">
      <slot name="top"></slot>
    </div>
    <div class="left popup radius">
      <slot name="left"></slot>
    </div>
    <div class="bottom popup radius">
      <slot name="bottom"></slot>
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
        display: flex;
        position: absolute;
        box-shadow: $shadow_strong;
        z-index: $zindex_back-top;
        background-color: map-get($default, glass);

        &.right,
        &.left {
            top: $size_24;
            width: $size_180 * 2 + $size_12 * 4;
            height: calc(100% - #{($size_24 * 2)});
        }

        &.right {
            right: $size_24;
        }

        &.left {
            left: $size_24;
        }

        &.top {
            top: $size_24;
            right: $size_24;
            min-width: $size_180 * 2 + $size_12 * 4;
            height: $size_48;
        }

        &.bottom {
            right: $size_24;
            bottom: $size_24;
            width: calc(100% - #{($size_24 * 3 + ($size_180 * 2 + $size_12 * 4))});
            height: $size_240;
        }
    }
}
</style>