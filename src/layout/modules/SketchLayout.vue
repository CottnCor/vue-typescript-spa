<template>
  <div class="container">
    <div v-if="this.status === 0" class="full">
      <slot name="full"></slot>
    </div>
    <div class="top-wapper">
      <div class="top popup radius">
        <div class="radius">
          <slot name="top"></slot>
        </div>
      </div>
    </div>
    <div v-if="this.status === 1 || this.status === 2" class="main-wapper">
      <div class="middle popup radius">
        <div class="radius">
          <slot name="middle"></slot>
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
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import { Getter, Action, namespace } from 'vuex-class';

const store = namespace('Common');

@Component({})
class SketchLayout extends Vue {
    @store.Getter('status')
    private status!: number;

    @Watch('status', { immediate: true, deep: true })
    private onStatusChanged(val: number, oldVal: number) {}
}
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
            margin: auto;
            padding: $size_6;
            & > div {
                border: 1px dashed map-get($default, grey_4);
            }
        }
    }

    .main-wapper {
        flex: 1;

        .middle,
        .bottom {
            margin: auto;
            padding: $size_12;
        }
    }
}
</style>