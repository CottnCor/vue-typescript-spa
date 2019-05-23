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
      <div class="tools-wapper">
        <div v-for="(item, index)  in toolMenu" :key="index" class="divider">
          <a v-if="item.type === 'action'" :class="[item.on ? 'on' : '', 'button']" @click="toolsHandleClickClick(item)">
            <a-icon :type="item.icon" />
          </a>
          <a-divider v-if="item.type === 'split'" type="vertical" />
        </div>
      </div>
    </div>
    <div class="content">
      <a class="button" @click="visibleContent('left')">
        <a-icon type="caret-left" theme="filled" />
      </a>
      <div class="content-wapper">
        <div v-for="(item, index) in queryResult" :key="index" :style="{left: hideContentWidth + 'px'}">
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
              <p class="secondary center pure">查询范围内不涉及XXX</p>
            </div>
          </div>
        </div>
      </div>
      <a class="button" @click="visibleContent('right')">
        <a-icon type="caret-right" theme="filled" />
      </a>
    </div>
    <a-modal title="Basic Modal" v-model="resultFull" width="auto" destroyOnClose>
      <compare-details-card />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { CompareDetailsCard } from '@/components';

@Component({ components: { CompareDetailsCard } })
class CompareTabCard extends Vue {
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

    private toolMenu: any = [
        {
            type: 'action',
            on: false,
            label: '专题图',
            icon: 'heat-map',
            handle: 'onTheme',
            invork: this.switchTheme
        },
        {
            type: 'split'
        },
        {
            type: 'action',
            on: false,
            label: '全屏',
            icon: 'fullscreen',
            handle: 'onFull',
            invork: this.fullResult
        }
    ];

    private queryResult: any = [
        {
            attributes: [
                {
                    sjy: '北京2号',
                    sx: '20180111'
                }
            ],
            images:
                'http://gtdcy-obs.obs.cn-north-1.myhwclouds.com/cloudQueryDbImage/13121/dbimage/976d1438-85ca-4332-9729-b7e5bc6e5a0f.png',
            themeImgs: null,
            date: '20180111'
        },
        {
            attributes: [
                {
                    sjy: '北京2号',
                    sx: '20171024'
                }
            ],
            images:
                'http://gtdcy-obs.obs.cn-north-1.myhwclouds.com/cloudQueryDbImage/13121/dbimage/5fbf1897-2586-40ea-b67e-4a5288986af9.png',
            themeImgs: null,
            date: '20171024'
        },
        {
            attributes: [
                {
                    sjy: '资源-P1卫星',
                    sx: '20150919'
                }
            ],
            images:
                'http://gtdcy-obs.obs.cn-north-1.myhwclouds.com/cloudQueryDbImage/13121/dbimage/316c6c9b-4283-4d32-bb16-46386a435079.png',
            themeImgs: null,
            date: '20150919'
        },
        {
            attributes: [
                {
                    sjy: 'KS3卫星',
                    sx: '20140929'
                }
            ],
            images:
                'http://gtdcy-obs.obs.cn-north-1.myhwclouds.com/cloudQueryDbImage/13121/dbimage/44cbc39a-c595-4b8a-bb82-22b8cb107be3.png',
            themeImgs: null,
            date: '20140929'
        },
        {
            attributes: [
                {
                    sjy: '北京2号',
                    sx: '20180111'
                }
            ],
            images:
                'http://gtdcy-obs.obs.cn-north-1.myhwclouds.com/cloudQueryDbImage/13121/dbimage/976d1438-85ca-4332-9729-b7e5bc6e5a0f.png',
            themeImgs: null,
            date: '20180111'
        },
        {
            attributes: [
                {
                    sjy: '北京2号',
                    sx: '20171024'
                }
            ],
            images:
                'http://gtdcy-obs.obs.cn-north-1.myhwclouds.com/cloudQueryDbImage/13121/dbimage/5fbf1897-2586-40ea-b67e-4a5288986af9.png',
            themeImgs: null,
            date: '20171024'
        },
        {
            attributes: [
                {
                    sjy: '资源-P1卫星',
                    sx: '20150919'
                }
            ],
            images:
                'http://gtdcy-obs.obs.cn-north-1.myhwclouds.com/cloudQueryDbImage/13121/dbimage/316c6c9b-4283-4d32-bb16-46386a435079.png',
            themeImgs: null,
            date: '20150919'
        },
        {
            attributes: [
                {
                    sjy: 'KS3卫星',
                    sx: '20140929'
                }
            ],
            images:
                'http://gtdcy-obs.obs.cn-north-1.myhwclouds.com/cloudQueryDbImage/13121/dbimage/44cbc39a-c595-4b8a-bb82-22b8cb107be3.png',
            themeImgs: null,
            date: '20140929'
        }
    ];

    private hideContent: any = {
        left: 0,
        right: this.queryResult.length - 4
    };

    private themeSwitch: boolean = false;

    private resultFull: boolean = false;

    private get hideContentWidth(): number {
        return -this.hideContent.left * 152;
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
        this.resultFull = true;
    }

    private switchTheme(param: any) {
        this.$message.success('switchTheme', 3);
        param.on = !param.on;
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

            max-width: calc(#{(($size_120 + $size_10 * 2 + $size_5 * 2) * 4 - $size_32 * 2)});

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
                height: calc(#{($size_120 - $size_10 + $size_3 + $size_6 * 2)});
            }
        }

        .content-wapper {
            overflow: hidden;
            flex: 1;
            margin: auto;
            display: flex;
            justify-content: space-between;
            max-width: calc(#{(($size_120 + $size_10 * 2 + $size_6 * 2) * 4)});

            & > div {
                flex: 1;
                position: relative;
                transition: left $ease_in;
                background-image: url(https://gl.landcloud.org.cn/images/pic_bg.png);
                background-size: 100% 100%;
                background-repeat: no-repeat;

                & > div {
                    padding: calc(#{($size_6)});

                    & > img,
                    .no-img {
                        width: calc(#{($size_120 + $size_10 * 2)});
                        height: calc(#{($size_120 - $size_10 + $size_3)});
                    }

                    .content-tips {
                        z-index: $zindex_back-top;
                        position: absolute;
                        bottom: $size_8;
                        left: $size_8;
                        width: calc(100% - #{($size_8 * 2)});
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
