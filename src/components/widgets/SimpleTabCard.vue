<template>
  <div class="tab">
    <div class="header">
      <a v-if="tabMenu.length > 3" class="button" @click="visibleTab('left')">
        <a-icon type="caret-left" theme="filled" />
      </a>
      <div class="tab-wapper">
        <div v-for="(item, index) in tabMenu" :key="item.handle" :class="[item.active ? 'active' : '', item.grade === 1 ? 'advanced' : '']" :style="{left: hideTabWidth + 'rem'}" @click="handleClick(item)">
          <a class="tab">
            <a-icon :type="item.icon" theme="filled" />
            <span class="primary center left">{{item.label}}</span>
          </a>
        </div>
      </div>
      <a v-if="tabMenu.length > 3" class="button" @click="visibleTab('right')">
        <a-icon type="caret-right" theme="filled" />
      </a>
    </div>
    <div class="content">
      <div>
        <div class="radius">
          <div class="content-tools">
            <div v-for="(item, index)  in this.toolMenu" :key="index" class="divider">
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
            <p class="secondary center pure">查询范围内不涉及XXX</p>
          </div>
        </div>
      </div>
      <div>
        <div class="radius">
          <div class="info-wapper">
            <a-table v-if="propColumns && propContent" :columns="propColumns" :dataSource="propContent" bordered :pagination="false" />
            <p v-else class="title center highlight">
              <a-icon type="warning" />查询范围内不涉及XXX</p>
          </div>
        </div>
      </div>
    </div>
    <a-modal title="Basic Modal" v-model="resultFull" width="auto" destroyOnClose>
      <!-- <simple-detail-card :queryResult="queryResult" :propColumns="propColumns" :propContent="propContent" /> -->
      <search-tool :queryResult="queryResult" :propColumns="propColumns" :propContent="propContent" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { SimpleDetailCard, SearchTool } from '@/components';

@Component({
    components: { SimpleDetailCard, SearchTool }
})
class SimpleTabCard extends Vue {
    private tabMenu: any = [
        {
            type: 'action',
            active: false,
            label: '最新影像',
            icon: 'pushpin',
            grade: 0,
            handle: 1
        },
        {
            type: 'action',
            active: false,
            label: '土地分类',
            icon: 'edit',
            grade: 0,
            handle: 2
        },
        {
            type: 'action',
            active: false,
            label: '自然保护区',
            icon: 'delete',
            grade: 0,
            handle: 3
        },
        {
            type: 'action',
            active: false,
            label: '耕地等别',
            icon: 'delete',
            grade: 0,
            handle: 4
        },
        {
            type: 'action',
            active: false,
            label: '耕地等别',
            icon: 'delete',
            grade: 0,
            handle: 5
        },
        {
            type: 'action',
            active: false,
            label: '土地规划',
            icon: 'delete',
            grade: 0,
            handle: 6
        },
        {
            type: 'action',
            active: false,
            label: '审批备案',
            icon: 'delete',
            grade: 0,
            handle: 7
        },
        {
            type: 'action',
            active: false,
            label: '土地归属',
            icon: 'delete',
            grade: 1,
            handle: 8
        },
        {
            type: 'action',
            active: false,
            label: '自然保护区',
            icon: 'delete',
            grade: 1,
            handle: 9
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

    private queryResult: any = {
        attributes: [
            {
                code: '201',
                name: '城市',
                mj: '186.812531134901',
                percent: '1.0000000033045'
            }
        ],
        images:
            'http://gtdcy-obs.obs.cn-north-1.myhwclouds.com/cloudQueryDbImage/14089/dbimage/c0296e18-ab4a-4ac1-b963-9f2633f349e3.png',
        themeImgs: null,
        date: null
    };

    private propColumns: any = [
        {
            title: '序号',
            className: 'index',
            dataIndex: 'index'
        },
        {
            title: '备案情况',
            className: 'content',
            dataIndex: 'content'
        },
        {
            title: '面积（亩）',
            dataIndex: 'area'
        }
    ];

    private propContent: any = [
        {
            key: 1,
            index: 1,
            content: '无备案信息',
            area: 3.55
        },
        {
            key: 2,
            index: 2,
            content: '已备案',
            area: 1.25
        },
        {
            key: 3,
            content: '合计',
            area: 4.8
        }
    ];

    private hideTab: any = {
        left: 0,
        right: this.tabMenu.length - 3
    };

    private themeSwitch: boolean = false;

    private resultFull: boolean = false;

    private get hideTabWidth(): number {
        return -this.hideTab.left * 132 * 0.072;
    }

    private visibleTab(param: any) {
        if (param === 'left') {
            if (this.hideTab.left > 0) {
                this.hideTab.left--;
                this.hideTab.right++;
            } else {
                this.$message.warning('没有了', 3);
            }
        } else if (param === 'right') {
            if (this.hideTab.right > 0) {
                this.hideTab.right--;
                this.hideTab.left++;
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
                item.invork(item);
                item.active = true;
            }
        });
    }
}
export default SimpleTabCard;
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
            max-width: calc(
                #{(($size_240 + $size_20 * 2 + $size_32) * 2 + $size_12 * 4 - $size_64)}
            );

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
        border: 1px dashed map-get($default, primary_light_1);
        overflow: hidden;

        & > div {
            float: left;

            &:first-child {
                background-image: url(https://gl.landcloud.org.cn/images/pic_bg.png);
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }

            & > div {
                position: relative;
                padding: calc(#{($size_12)});

                img,
                .info-wapper,
                .no-img {
                    width: calc(#{($size_240 + $size_20 * 2 + $size_32)});
                    height: calc(#{($size_240 - $size_20 + $size_6 + $size_24 + $size_2)});
                }

                .content-tools {
                    z-index: $zindex_back-top;
                    position: absolute;
                    top: $size_12;
                    right: $size_12;
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
</style>
