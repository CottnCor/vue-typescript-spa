<template>
  <div class="tab">
    <div class="header">
      <div>
        <a>
          <a-icon type="pushpin" theme="filled" />
          <span class="title center">坐标朝鲜阅</span>
        </a>
      </div>
      <div>
        <a>
          <a-icon type="pushpin" theme="filled" />
          <span class="title center">坐标朝鲜阅</span>
        </a>
      </div>
      <div>
        <a>
          <a-icon type="pushpin" theme="filled" />
          <span class="title center">坐标朝鲜阅</span>
        </a>
      </div>
      <div>
        <a>
          <a-icon type="pushpin" theme="filled" />
          <span class="title center">坐标朝鲜阅</span>
        </a>
      </div>
    </div>
    <div class="content">
      <div>
        <div class="radius"></div>
      </div>
      <div>
        <div class="radius"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
class TabCard extends Vue {}
export default TabCard;
</script>

<style lang="scss" scoped>
.tab {
    padding: $size_6 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    .header {
        & > div {
            display: inline-block;
            position: relative;
            width: calc(#{($size_120 + $size_12)});
            height: $size_32;
            padding: 0 $size_6;

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: calc(#{($size_16 + $size_1)});
                right: 0;
                bottom: -$size_1;
                transform: perspective(0.5em) rotateX(3deg);
                transform-origin: bottom;
                transform: perspective(0.5em) rotateX(3deg) scale(1.3);
                background-image: map-get($default, linear_primary);
            }

            a {
                display: flex;

                span,
                i {
                    color: map-get($default, pure);
                    z-index: $zindex_affix;
                }

                i {
                    width: $size_32;
                    height: $size_32;
                    display: flex;
                    color: map-get($default, pure);

                    svg {
                        margin: auto;
                    }
                }
            }
        }
    }
    .content {
        border: 1px dashed map-get($default, primary_light_1);

        & > div {
            display: inline-block;

            &:nth-of-type(1) {
                border-right: 1px dashed map-get($default, primary_light_1);
            }

            & > div {
                width: calc(#{($size_240 + $size_20 * 2)});
                height: calc(#{($size_240 - $size_20 + $size_6)});
            }
        }
    }
}
</style>
