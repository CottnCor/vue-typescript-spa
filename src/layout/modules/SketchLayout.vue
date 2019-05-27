<template>
  <div class="container">

    <div v-if="this.status === 0" class="full">
      <slot name="full"></slot>
    </div>

    <div class="top-wapper">
      <div class="top popup radius">
        <div>
          <slot name="top"></slot>
        </div>
      </div>
    </div>

    <div class="layout-wapper">
      <a-spin v-if="this.status === 1" :spinning="this.status === 1" size="large" style="margin:auto;" />
      <div v-if="this.status === 2" class="popup radius">
        <div class="contronl-wapper">
          <slot name="middle"></slot>
        </div>
      </div>
      <div v-if="this.status === 2" class="bottom popup radius">
        <div class="contronl-wapper">
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
    display: flex;
    flex-direction: column;

    .full {
        position: absolute;
        width: 100%;
    }

    .popup {
        padding: $size_12;
        box-shadow: $shadow_power;
        z-index: $zindex_back-top;
        background-color: map-get($default, glass);

        & > div {
            display: flex;
            width: 100%;
        }
    }

    .top-wapper {
        width: 100%;
        display: flex;
        padding: $size_12;

        .top {
            margin: auto;
            padding: $size_6;
            & > div {
                border: 1px dashed map-get($default, grey_4);
            }
        }
    }

    .layout-wapper {
        flex: 1;

        /* Extra small devices (phones, sm and down) */
        @media only screen and (max-width: map-get($breakpoint, sm)) {
            & {
                flex-direction: column;
                background-color: red;
            }

            .contronl-wapper {
                flex-direction: column;
            }
        }

        /* Small devices (portrait tablets and large phones, sm and up) */
        @media only screen and (min-width: map-get($breakpoint, sm)) {
            & {
                flex-direction: column;
                background-color: green;
            }

            .contronl-wapper {
                flex-direction: row;
            }
        }

        /* Medium devices (landscape tablets, md and up) */
        @media only screen and (min-width: map-get($breakpoint, md)) {
            & {
                flex-direction: row;
                background-color: blue;
            }

            .contronl-wapper {
                flex-direction: column;
            }
        }

        /* Large devices (laptops/desktops, lg and up) */
        @media only screen and (min-width: map-get($breakpoint, lg)) {
            & {
                flex-direction: row;
                background-color: orange;
            }

            .contronl-wapper {
                flex-direction: row;
            }
        }

        /* Extra large devices (large laptops and desktops, xl and up) */
        @media only screen and (min-width: map-get($breakpoint, xl)) {
            & {
                flex-direction: column;
                background-color: pink;
            }

            .contronl-wapper {
                flex-direction: row;
            }
        }

        & {
            //background-color: transparent;
        }
    }
}
</style>