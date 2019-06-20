<template>
  <div class="tab" v-if="this.currentTab">
    <div class="header">
      <a v-if="tabMenu.length > 3" class="button" @click="visibleTab('left')">
        <a-icon type="caret-left" theme="filled" />
      </a>
      <div class="tab-wapper">
        <div v-for="(tab, index) in tabMenu" :key="tab.handle" :class="[tab.active ? 'active' : '', true ? '' : 'advanced']" :style="{left: hideTabWidth + 'rem'}" @click="handleClick(tab)">
          <a-select v-if="tab.children && tab.children.length > 1" class="tab-select" :value="tab.crrentChildren" :notFoundContent="'无' + tab.label" style="width: 100%; margin: auto; padding-left: 6%;" @change="selectChange">
            <a-select-option v-for="(item, i) in tab.children" :key="item.handle" :value="item.tag">{{item.label}}</a-select-option>
            <a-icon slot="suffixIcon" type="caret-down" theme="filled" />
            <a-icon slot="menuItemSelectedIcon" type="schedule" />
          </a-select>
          <a v-else class="tab">
            <a-icon :type="tab.icon" theme="filled" />
            <span class="primary center left">{{tab.label}}</span>
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
            <span v-if="currentTab.grade === 1" class="center pure">查询范围内无{{currentTab.label}}信息</span>
            <span v-else-if="currentTab.grade === 2" class="center pure">查询范围不涉及{{currentTab.label}}</span>
            <span v-else-if="currentTab.grade === 3" class="center pure">查询范围内无当年影像信息</span>
            <span v-else-if="currentTab.grade === 4" class="center pure">查询范围内无当年现状信息</span>
          </div>
          <div v-else-if="this.currentQueryResult && this.currentQueryResult.attributes && (this.currentTab.value === 'image_Analyze' || this.currentTab.value === 'image_Analyze_History')" class="content-tips">
            <span class="center pure">卫星：{{this.currentQueryResult.attributes[0].sjy}} 拍摄时间：{{this.currentQueryResult.attributes[0].sx}}</span>
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
class MultipleResultCard extends Vue {
  @Prop({ default: null })
  private queryResult!: any;

  @Prop({ default: [] })
  private tabMenu!: any;

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

  private currentSelect: any;

  private propColumns: any[] = [];

  private propContent: any[] = [];

  private hideTab: any = {
    left: 0,
    right: this.tabMenu.length - 2
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
        if (Array.isArray(this.queryResult[val.value])) {
          if (this.currentSelect) {
            for (const queryResult of this.queryResult[val.value]) {
              if (queryResult.date === this.currentSelect.label) {
                this.currentQueryResult = queryResult;
              }
            }
          }
        } else {
          this.currentQueryResult = this.queryResult[val.value];
        }
        this.propColumns = [];
        this.propContent = [];
        if (this.currentQueryResult && this.currentQueryResult.attributes) {
          let totalMj = 0;
          let isContinue = true;
          let attributes: any[] = this.currentQueryResult.attributes.map(
            (item, index) => {
              if (item.mj) {
                totalMj += parseFloat(item.mj);
                return {
                  name:
                    (item.name ? item.name : "") +
                    (item.grade ? item.grade : "") +
                    (item.code ? "-" + item.code : ""),
                  mj: parseFloat(item.mj).toFixed(2)
                };
              } else {
                isContinue = false;
              }
            }
          );
          if (isContinue) {
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
              case "landType_Analyze_History":
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
          }
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

  private visibleTab(param: any) {
    if (param === "left") {
      if (this.hideTab.left > 0) {
        this.hideTab.left--;
        this.hideTab.right++;
      } else {
        // this.$message.warning("没有了", 3);
      }
    } else if (param === "right") {
      if (this.hideTab.right > 0) {
        this.hideTab.right--;
        this.hideTab.left++;
      } else {
        // this.$message.warning("没有了", 3);
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

  private selectChange(param: any) {
    this.tabMenu.map(item => {
      item.active = false;
      if (item.handle === param.parent) {
        item.active = true;
        for (const child of item.children) {
          if (child.handle === param.value) {
            this.currentSelect = child;
            item.crrentChildren =
              child.label.substring(0, 4) + item.label.substring(2, 4);
          }
        }
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
export default MultipleResultCard;
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
      display: inline-flex;
      white-space: nowrap;
      overflow: hidden;
      width: calc(45vw - #{($size_4 + $size_64 * 2)});

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
    display: flex;
    flex-direction: column;

    & > div {
      width: calc(45vw - #{($size_4)});

      &:first-child {
        background-image: url(https://gl.landcloud.org.cn/images/pic_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: calc((45vw - #{($size_4)}) * 0.8);
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
          min-height: $size_180;
          max-height: $size_180;
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
          display: flex;
          z-index: $zindex_back-top;
          position: absolute;
          padding: 1vw;
          bottom: 2vw;
          left: 2vw;
          width: calc(100% - 4vw);
          background-color: map-get($default, grey_6);
        }

        .no-img {
          display: flex;
          background-image: map-get($default, linear_primary);
          img {
            width: $size_120;
            height: $size_120;
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

<style scoped>
.tab-wapper >>> .tab-select * {
  color: #fff;
  border: none;
  outline: none;
  box-shadow: none;
  background-color: transparent;
}
</style>


