<template>
  <div class="content">
    <div>
      <div class="radius">
        <div class="content-tools">
          <div v-for="(item, index) in this.toolMenu" :key="index" class="divider">
            <a v-if="item.type === 'action'" :class="[item.on ? 'on' : '', 'button']" @click="toolsHandleClickClick(item)">
              <a-icon :type="item.icon" />
            </a>
            <a-divider v-if="item.type === 'split'" type="vertical" />
          </div>
        </div>
        <img v-if="!themeSwitch && queryResult.images" :src="queryResult.images">
        <img v-if="themeSwitch && queryResult.themeImgs" :src="queryResult.themeImgs">
        <div v-if="!themeSwitch ? !queryResult.images : !queryResult.themeImgs" class="no-img">
          <img src="https://gl.landcloud.org.cn/images/no_img.png">
        </div>
        <div v-if="!themeSwitch ? !queryResult.images : !queryResult.themeImgs" class="content-tips">
          <p class="primary center pure">查询范围内不涉及XXX</p>
        </div>
      </div>
    </div>
    <div>
      <div class="radius">
        <div class="info-wapper">
          <a-table v-if="propColumns && propContent" :columns="propColumns" :dataSource="propContent" bordered :pagination="false" />
          <a v-else class="button warning">
            <a-icon type="warning" theme="filled" />
            <p class="primary center pure">查询范围内不涉及XXX</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
class SimpleDetailsCard extends Vue {
    @Prop({ default: null })
    private queryResult!: any;

    @Prop({ default: null })
    private propColumns!: any;

    @Prop({ default: null })
    private propContent!: any;

    private toolMenu: any = [
        {
            type: 'action',
            on: false,
            label: '专题图',
            icon: 'heat-map',
            handle: 'onTheme',
            invork: this.switchTheme
        }
    ];

    private themeSwitch: boolean = false;

    private switchTheme(param: any) {
        this.$message.success('switchTheme', 3);
        param.on = !param.on;
        this.themeSwitch = param.on;
    }

    private toolsHandleClickClick(param: any) {
        this.toolMenu.map((item) => {
            item.active = false;
            if (item.handle === param.handle) {
                item.invork(item);
                item.active = true;
            }
        });
    }
}
export default SimpleDetailsCard;
</script>

<style lang="scss" scoped>
.content {
    border: 1px dashed map-get($default, primary_light_1);
    overflow: hidden;
    display: flex;

    & > div {
        flex: 1;

        &:first-child {
            background-image: url(https://gl.landcloud.org.cn/images/pic_bg.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }

        & > div {
            position: relative;
            padding: calc(#{($size_24)});

            img,
            .info-wapper,
            .no-img {
                width: calc(#{(($size_240 + $size_20 * 2 + $size_32)) * 2});
                height: calc(#{(($size_240 - $size_20 + $size_6 + $size_24 + $size_2)) * 2});
            }

            .content-tools {
                z-index: $zindex_back-top;
                position: absolute;
                top: $size_24;
                right: $size_24;
                a {
                    box-shadow: none;
                    &.on {
                        background-color: map-get($default, primary);
                        i {
                            color: map-get($default, pure);
                        }
                    }
                }
            }

            .info-wapper {
                overflow-y: auto;
                display: flex;
                position: relative;
                flex-direction: column;
                & > a {
                    flex: 1;
                }
            }

            .content-tips {
                z-index: $zindex_back-top;
                position: absolute;
                bottom: $size_24;
                left: $size_24;
                width: calc(100% - #{($size_24 * 2)});
                background-color: map-get($default, grey_3);
            }

            .no-img {
                display: flex;
                background-image: map-get($default, linear_primary_2);
                img {
                    width: $size_64;
                    height: $size_64;
                    margin: auto;
                }
            }
        }
    }
}
</style>
