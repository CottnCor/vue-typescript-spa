<template>
  <div class="container">
    <div class="full">
      <slot name="full"></slot>
    </div>
    <div class="top-wapper">
      <div class="top popup radius">
        <div class="radius">
          <slot name="top"></slot>
        </div>
      </div>
    </div>
    <div class="main-wapper">
      <div style="flex: 1"></div>
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
    flex-direction: column;

    .full {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .popup {
        padding: $size_12;
        box-shadow: $shadow_power;
        z-index: $zindex_back-top;
        background-color: map-get($default, glass);

        & > div {
            display: flex;
            width: 100%;
            height: 100%;
        }
    }

    .top-wapper,
    .main-wapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: $size_12;
    }

    .top-wapper {
        .top {
            margin: $size_6 auto auto auto;
            padding: $size_6;
            & > div {
                border: 1px dashed map-get($default, grey_4);
            }
        }
    }

    .main-wapper {
        flex: 1;

        .left,
        .bottom {
            margin: auto auto auto 0;
            padding: $size_12;
        }

        .left {
            overflow-y: auto;
        }

        .bottom {
            margin-top: $size_12;
        }
    }
}
</style>