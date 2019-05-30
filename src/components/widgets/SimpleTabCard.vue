<template>
  <div class="tab" v-if="this.currentTab">
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
            <div v-for="(item, index) in this.toolMenu" :key="index" class="divider">
              <a v-if="item.type === 'action'" :class="[item.on ? 'on' : '', 'button']" @click="toolsHandleClickClick(item)">
                <a-icon :type="item.icon" theme="twoTone" />
              </a>
              <a-divider v-if="item.type === 'split'" type="vertical" />
            </div>
          </div>
          <img v-if="currentQueryResult && !themeSwitch && currentQueryResult.images" :src="currentQueryResult.images">
          <img v-if="currentQueryResult && themeSwitch && currentQueryResult.themeImgs" :src="currentQueryResult.themeImgs">
          <div v-if="!currentQueryResult || (currentQueryResult && (!themeSwitch ? !currentQueryResult.images : !currentQueryResult.themeImgs))" class="no-img">
            <img src="https://gl.landcloud.org.cn/images/no_img.png">
          </div>
          <div v-if="currentQueryResult && (!themeSwitch ? !currentQueryResult.images : !currentQueryResult.themeImgs)" class="content-tips">
            <!-- <p class="secondary center pure">查询范围内不涉及{{this.currentTab.label}}</p> -->
          </div>
          <div v-else-if="this.currentQueryResult && this.currentQueryResult.attributes && this.currentTab.value === 'image_Analyze'" class="content-tips">
            <p class="secondary center left pure">卫星：{{this.currentQueryResult.attributes[0].sjy}} 拍摄时间：{{this.currentQueryResult.attributes[0].sx}}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="radius">
          <div class="info-wapper">
            <a-table v-if="this.propColumns.length > 0 && this.propContent.length > 0" :columns="this.propColumns" :dataSource="this.propContent" bordered :pagination="false" />
            <p v-else class="title center highlight">
              <a-icon type="warning" />该专题暂无属性数据
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

const store = namespace("Common");

@Component({
  components: {}
})
class SimpleTabCard extends Vue {
  @Prop({ default: null })
  private queryResult!: any;

  private tabMenu: any[] = [
    // {
    //     type: 'action',
    //     active: false,
    //     label: '在线影像',
    //     value: 'map',
    //     icon: 'pushpin',
    //     grade: 0,
    //     handle: 0
    // },
    {
      type: "action",
      active: false,
      label: "最新影像",
      value: "image_Analyze",
      icon: "pushpin",
      grade: 0,
      handle: 1
    },
    {
      type: "action",
      active: false,
      label: "土地分类",
      value: "landType_Analyze",
      icon: "pushpin",
      grade: 0,
      handle: 2
    },
    {
      type: "action",
      active: false,
      label: "基本农田",
      value: "primeFarm_Analyze",
      icon: "pushpin",
      grade: 0,
      handle: 3
    },
    {
      type: "action",
      active: false,
      label: "土地归属",
      value: "ownership_Analyze",
      icon: "pushpin",
      grade: 0,
      handle: 7
    },
    {
      type: "action",
      active: false,
      label: "土地规划",
      value: "plan_Analyze",
      icon: "pushpin",
      grade: 0,
      handle: 5
    },
    {
      type: "action",
      active: false,
      label: "耕地等别",
      value: "landGrade_Analyze",
      icon: "trophy",
      grade: 1,
      handle: 4
    },
    {
      type: "action",
      active: false,
      label: "审批备案",
      value: "spba_Analyze",
      icon: "trophy",
      grade: 1,
      handle: 6
    },
    {
      type: "action",
      active: false,
      label: "自然保护区",
      value: "natureReserve_Analyze",
      icon: "trophy",
      grade: 1,
      handle: 8
    }
  ];

  private toolMenu: any[] = [
    {
      type: "action",
      on: false,
      label: "切换专题图",
      icon: "picture",
      handle: "onTheme",
      invork: this.switchTheme
    }
  ];

  private propColumns: any[] = [];

  private propContent: any[] = [];

  private hideTab: any = {
    left: 0,
    right: this.tabMenu.length - 6
  };

  private themeSwitch = false;

  private currentQueryResult: any = null;

  private get hideTabWidth(): number {
    let size = 132;
    let scale = 0.072;
    return -this.hideTab.left * size * scale;
  }

  private currentTab: any = null;

  @Watch("currentTab", { immediate: true, deep: true })
  private onCurrentTab(val: any, oldVal: any) {
    if (this.queryResult && val) {
      if (val.value === "map") {
        return null;
      } else {
        this.currentQueryResult = this.queryResult[val.value];
        if (this.currentQueryResult && this.currentQueryResult.attributes) {
          let totalMj = 0;
          let attributes: any[] = this.currentQueryResult.attributes.map(
            (item, index) => {
              totalMj += parseFloat(item.mj);
              return {
                name:
                  (item.name ? item.name : "") +
                  (item.grade ? item.grade : "") +
                  (item.code ? "-" + item.code : ""),
                mj: parseFloat(item.mj).toFixed(2)
              };
            }
          );
          attributes.push({
            name: "合计",
            mj: totalMj.toFixed(2)
          });
          this.propContent = attributes;
          this.propColumns = [
            {
              title: "序号",
              dataIndex: "index"
            },
            {
              title: "地类名称",
              dataIndex: "name"
            },
            {
              title: "面积（亩）",
              dataIndex: "mj"
            }
          ];
          switch (val.value) {
            case "image_Analyze":
              this.propColumns = [];
              this.propContent = [];
              break;
            case "landType_Analyze":
              this.propColumns[1].title = "地类名称";
              break;
            case "primeFarm_Analyze":
              this.propColumns[1].title = "类型";
              break;
            case "landGrade_Analyze":
              this.propColumns[1].title = "耕地等别";
              break;
            case "plan_Analyze":
              this.propColumns[1].title = "地类名称";
              break;
            case "spba_Analyze":
              this.propColumns[1].title = "备案情况";
              break;
            case "ownership_Analyze":
              this.propColumns[1].title = "权属单位";
              break;
            case "natureReserve_Analyze":
              this.propColumns[1].title = "功能分区";
              break;
            default:
              break;
          }
        } else {
          this.propColumns = [];
          this.propContent = [];
        }
      }
    }
  }

  @Watch("queryResult", { immediate: true, deep: true })
  private onQueryResult(val: any, oldVal: any) {
    if (val) {
      this.tabMenu[0].active = true;
      this.currentTab = this.tabMenu[0];
    }
  }

  private mounted() {}

  private visibleTab(param: any) {
    if (param === "left") {
      if (this.hideTab.left > 0) {
        this.hideTab.left--;
        this.hideTab.right++;
      } else {
        this.$message.warning("没有了", 3);
      }
    } else if (param === "right") {
      if (this.hideTab.right > 0) {
        this.hideTab.right--;
        this.hideTab.left++;
      } else {
        this.$message.warning("没有了", 3);
      }
    }
  }

  private switchTheme(param: any) {
    param.on = !param.on;
    this.themeSwitch = param.on;
  }

  private handleClick(param: any) {
    this.tabMenu.map(item => {
      item.active = false;
      if (item.handle === param.handle) {
        item.active = true;
        this.currentTab = item;
      }
    });
  }

  private toolsHandleClickClick(param: any) {
    this.toolMenu.map(item => {
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
      width: calc(98vw - #{($size_64) * 2});

      & > div {
        display: inline-block;
        position: relative;
        height: $size_32;
        width: calc(#{($size_120 + $size_12)});
        padding: 0 $size_6;
        transition: left $ease_in;

        &::before {
          content: "";
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
      width: calc(48vw - 1px);
      height: calc((48vw - 1px) * 0.8);

      &:first-child {
        background-image: url(https://gl.landcloud.org.cn/images/pic_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      & > div {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 2vw;

        img,
        .info-wapper,
        .no-img {
          width: 100%;
          height: 100%;
        }

        .content-tools {
          z-index: $zindex_back-top;
          position: absolute;
          top: 2vw;
          right: 2vw;
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
          background-color: map-get($default, grey_1);
          & > a {
            flex: 1;
          }
        }

        .content-tips {
          z-index: $zindex_back-top;
          position: absolute;
          padding: 1vw;
          bottom: 2vw;
          left: 2vw;
          width: calc(100% - 4vw);
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

    .ant-table-tbody > tr > td {
      white-space: nowrap;
    }
  }
}
</style>
