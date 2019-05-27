<template>
  <div class="tab">
    <div class="header">
      <div class="tab-wapper">
        <div v-for="(item, index) in this.tabMenu" :key="item.handle" :class="[item.active ? 'active' : '', item.grade === 1 ? 'advanced' : '']" @click="handleClick(item)">
          <a class="tab">
            <a-icon :type="item.icon" theme="filled" />
            <span class="primary center left">{{item.label}}</span>
          </a>
        </div>
      </div>
      <div class="tools-wapper">
        <div v-for="(item, index)  in toolMenu" :key="index" class="divider">
          <a v-if="item.type === 'action'" :class="[item.on ? 'on' : '', 'button']" @click="toolsHandleClickClick(item)">
            <a-icon :type="item.icon" />
          </a>
          <a-divider v-if="item.type === 'split'" type="vertical" />
        </div>
      </div>
    </div>
    <a-spin size='large' :spinning="!this.currentQueryResult">
      <div class="content">
        <a class="button" @click="visibleContent('left')">
          <a-icon type="caret-left" theme="filled" />
        </a>
        <div class="content-wapper" v-if="this.currentQueryResult">
          <div v-for="(item, index) in this.currentQueryResult" :key="index" :style="{left: hideContentWidth + 'px'}">
            <div class="radius">
              <div v-if="!themeSwitch ? item.images : item.themeImgs" class="content-tips">
                <p class="secondary left pure">卫星：{{item.attributes[0].sjy}}</p>
                <p class="secondary left pure">拍摄时间：{{item.attributes[0].sx}}</p>
              </div>
              <img v-if="!themeSwitch && item.images" :src="item.images">
              <img v-if="themeSwitch && item.themeImgs" :src="item.themeImgs">
              <div v-if="!themeSwitch ? !item.images : !item.themeImgs" class="no-img">
                <img src="https://gl.landcloud.org.cn/images/no_img.png">
              </div>
              <div v-if="!themeSwitch ? !item.images : !item.themeImgs" class="content-tips">
                <p class="secondary center pure">查询范围内不涉及{{this.currentTab.label}}</p>
              </div>
            </div>
          </div>
        </div>
        <a class="button" @click="visibleContent('right')">
          <a-icon type="caret-right" theme="filled" />
        </a>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import { Getter, Action, namespace } from 'vuex-class';

@Component({ components: {} })
class CompareTabCard extends Vue {
    @Prop({ default: null })
    private queryResult!: any;

    private currentQueryResult: any = null;

    private tabMenu: any = [
        {
            type: 'action',
            active: false,
            label: '多年影像',
            value: 'image_Analyze_History',
            icon: 'trophy',
            grade: 1,
            handle: 1
        },
        {
            type: 'action',
            active: false,
            label: '多年现状',
            valuee: 'landType_Analyze_History',
            icon: 'trophy',
            grade: 1,
            handle: 2
        }
    ];

    private toolMenu: any = [
        {
            type: 'action',
            on: false,
            label: '截图',
            icon: 'heat-map',
            handle: 'onShot',
            invork: this.switchShot
        },
        {
            type: 'split'
        },
        {
            type: 'action',
            on: false,
            label: '专题图',
            icon: 'heat-map',
            handle: 'onTheme',
            invork: this.switchTheme
        }
    ];

    private hideContent: any = {
        left: 0,
        right: this.currentQueryResult ? this.currentQueryResult.length - 4 : 0
    };

    private get currentTab(): any {
        let tabs = this.tabMenu.filter((item) => item.active);
        if (tabs.length > 0) {
            return tabs[0];
        } else {
            return null;
        }
    }

    private themeSwitch: boolean = false;

    private get hideContentWidth(): number {
        return -this.hideContent.left * 304;
    }

    @Watch('currentTab', { immediate: true, deep: true })
    private onCurrentTab(val: any, oldVal: any) {
        if (this.queryResult) {
            if (val.value === 'map') {
                return null;
            } else {
                this.currentQueryResult = this.queryResult[val.value];
            }
        }
    }

    @Watch('queryResult', { immediate: true, deep: true })
    private onQueryResult(val: any, oldVal: any) {
        if (val) {
            this.tabMenu[0].active = true;
        }
    }

    private visibleContent(param: any) {
        if (param === 'left') {
            if (this.hideContent.left > 0) {
                this.hideContent.left--;
                this.hideContent.right++;
            } else {
                this.$message.warning('没有了', 3);
            }
        } else if (param === 'right') {
            if (this.hideContent.right > 0) {
                this.hideContent.right--;
                this.hideContent.left++;
            } else {
                this.$message.warning('没有了', 3);
            }
        }
    }

    private switchTheme(param: any) {
        param.on = this.themeSwitch;
        this.themeSwitch = param.on;
    }

    private switchShot(param: any) {
        param.on = !this.themeSwitch;
        this.themeSwitch = param.on;
    }

    private handleClick(param: any) {
        this.tabMenu.map((item) => {
            item.active = false;
            if (item.handle === param.handle) {
                item.active = true;
            }
        });
    }

    private toolsHandleClickClick(param: any) {
        this.toolMenu.map((item) => {
            item.active = false;
            if (item.handle === param.handle) {
                item.invork(param);
                item.active = true;
            }
        });
    }
}
export default CompareTabCard;
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
        display: flex;

        .tools-wapper a {
            box-shadow: none;
            &.on {
                background-color: map-get($default, primary);
                i {
                    color: map-get($default, pure);
                }
            }
        }

        .tab-wapper {
            flex: 1;
            margin: auto;
            display: inline-block;
            white-space: nowrap;
            overflow-x: hidden;
            justify-content: space-between;

            max-width: calc(#{(($size_240 + $size_20 * 2 + $size_10 * 2) * 4 - $size_32 * 2)});

            & > div {
                display: inline-block;
                position: relative;
                width: calc(#{($size_120 + $size_12)});
                height: $size_32;
                padding: 0 $size_6;
                transition: left $ease_in;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: calc(#{($size_16 + $size_1)});
                    right: 0;
                    bottom: 0;
                    transform: perspective(0.5em) rotateX(3deg);
                    transform-origin: bottom;
                    transform: perspective(0.5em) rotateX(3deg) scale(1.3);
                    background-image: map-get($default, linear_primary);
                }

                &.active {
                    &::before {
                        background-image: map-get($default, linear_primary_2);
                    }
                }

                &.advanced {
                    &::before {
                        background-image: map-get($default, linear_strong);
                    }
                    &.active {
                        &::before {
                            background-image: map-get($default, linear_primary_2);
                        }
                    }
                }
            }
        }
    }

    .content {
        display: flex;
        border: 1px dashed map-get($default, primary_light_1);

        & > a {
            i {
                height: calc(#{($size_240 - $size_20 + $size_6 + $size_12 * 2)});
            }
        }

        .content-wapper {
            overflow: hidden;
            flex: 1;
            margin: auto;
            display: flex;
            justify-content: space-between;
            max-width: calc(#{(($size_240 + $size_20 * 2 + $size_12 * 2) * 4)});

            & > div {
                flex: 1;
                position: relative;
                transition: left $ease_in;
                background-image: url(https://gl.landcloud.org.cn/images/pic_bg.png);
                background-size: 100% 100%;
                background-repeat: no-repeat;

                & > div {
                    padding: calc(#{($size_12)});

                    & > img,
                    .no-img {
                        width: calc(#{($size_240 + $size_20 * 2)});
                        height: calc(#{($size_240 - $size_20 + $size_6)});
                    }

                    .content-tips {
                        z-index: $zindex_back-top;
                        position: absolute;
                        bottom: $size_12;
                        left: $size_12;
                        width: calc(100% - #{($size_12 * 2)});
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
    }
}
</style>
