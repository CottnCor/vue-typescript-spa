<template>
  <div class="tab">
    <div class="header">
      <div class="tab-wapper">
        <div v-for="(item, index) in tabMenu" :key="item.handle" :class="[item.active ? 'active' : '', item.grade === 1 ? 'advanced' : '']" @click="handleClick(item)">
          <a class="tab">
            <a-icon :type="item.icon" theme="filled" />
            <span class="primary center left">{{item.label}}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="content">
      <a class="button" @click="visibleContent('left')">
        <a-icon type="caret-left" theme="filled" />
      </a>
      <div class="content-wapper">
        <div>
          <div v-for="(item, index) in contents" :key="item.handle" :style="{left: hideContentWidth + 'rem'}">
            <div class="radius">
              <div class="content-tools">
                <div v-for="item in toolMenu" class="divider">
                  <a v-if="item.type === 'action'" :class="[item.active ? 'active' : '', 'button']" @click="toolsHandleClickClick(item)">
                    <a-icon :type="item.icon" theme="filled" />
                  </a>
                  <a-divider v-if="item.type === 'split'" type="vertical" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="button" @click="visibleContent('right')">
        <a-icon type="caret-right" theme="filled" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { hasKey } from '../../utils/common';

@Component({})
class TabCard extends Vue {
    private tabMenu: any = [
        {
            type: 'action',
            active: false,
            label: '多年影像',
            icon: 'delete',
            grade: 0,
            handle: 1
        },
        {
            type: 'action',
            active: false,
            label: '多年现状',
            icon: 'delete',
            grade: 0,
            handle: 2
        }
    ];

    private contents: any = [
        {
            type: 'action',
            active: false,
            label: '多年影像',
            icon: 'delete',
            grade: 0,
            handle: 1
        },
        {
            type: 'action',
            active: false,
            label: '多年现状',
            icon: 'delete',
            grade: 0,
            handle: 2
        },
        {
            type: 'action',
            active: false,
            label: '多年本草',
            icon: 'delete',
            grade: 0,
            handle: 3
        },
        {
            type: 'action',
            active: false,
            label: '多年影像',
            icon: 'delete',
            grade: 0,
            handle: 4
        },
        {
            type: 'action',
            active: false,
            label: '多年现状',
            icon: 'delete',
            grade: 0,
            handle: 5
        },
        {
            type: 'action',
            active: false,
            label: '多年本草',
            icon: 'delete',
            grade: 0,
            handle: 6
        }
    ];

    private toolMenu: any = [
        {
            type: 'action',
            active: false,
            label: '范围查询',
            icon: 'edit',
            handle: 'onDraw',
            invork: this.fullResult
        },
        {
            type: 'split'
        },
        {
            type: 'action',
            active: false,
            label: '范围查询',
            icon: 'edit',
            handle: 'onDraw',
            invork: this.fullResult
        },
        {
            type: 'split'
        },
        {
            type: 'action',
            active: false,
            label: '清除',
            icon: 'delete',
            handle: 'onClear',
            invork: this.switchTheme
        }
    ];

    private hideContent: any = {
        left: 0,
        right: this.contents.length - 3
    };

    private get hideContentWidth(): number {
        return -this.hideContent.left * 280 * 0.072;
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

    private fullResult(param: any) {
        this.$message.success('fullResult', 3);
    }

    private switchTheme(param: any) {
        this.$message.success('switchTheme', 3);
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
        display: flex;

        .tab-wapper {
            flex: 1;
            margin: auto;
            display: inline-block;
            white-space: nowrap;
            overflow-x: hidden;
            justify-content: space-between;
            max-width: calc(#{(($size_240 + $size_20 * 2) * 3)});

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
                height: calc(#{($size_240 - $size_20 + $size_6)});
            }
        }

        .content-wapper {
            overflow: hidden;
            flex: 1;
            margin: auto;
            display: inline-block;
            white-space: nowrap;
            overflow-x: hidden;
            justify-content: space-between;
            max-width: calc(#{(($size_240 + $size_20 * 2) * 3)});

            & > div {
                width: $size_max;
                & > div {
                    float: left;
                    position: relative;
                    transition: left $ease_in;
                    background-image: url(https://gl.landcloud.org.cn/images/pic_bg.png);
                    background-size: 100% 100%;
                    background-repeat: no-repeat;

                    & > div {
                        width: calc(#{($size_240 + $size_20 * 2)});
                        height: calc(#{($size_240 - $size_20 + $size_6)});

                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                        }

                        .content-tools {
                            z-index: $zindex_back-top;
                            position: absolute;
                            top: $size_12;
                            right: $size_12;
                            a {
                                box-shadow: none;
                                border: 1px dashed map-get($default, primary);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
