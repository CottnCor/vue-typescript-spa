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
        <div v-for="(item, index) in toolMenu" :key="index" class="divider">
          <a v-if="item.type === 'action'" :class="[item.on ? 'on' : '', 'button']" @click="toolsHandleClickClick(item)">
            <a-icon :type="item.icon" theme="twoTone" />
          </a>
          <a-divider v-if="item.type === 'split'" type="vertical" />
        </div>
      </div>
    </div>
    <div class="content">
      <a :class="[this.currentTab.value === 'image_Analyze_History'? 'fix' : '', 'button']" @click="visibleContent('left')">
        <a-icon type="caret-left" theme="filled" />
      </a>
      <div class="flex-wapper" v-if="this.currentQueryResult">
        <div class="content-wapper" v-if="this.currentTab.value === 'image_Analyze_History'">
          <div v-for="(item, index) in this.currentQueryResult" :key="index" class="background" :style="hideContentWidth">
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
                <!-- <p class="secondary center pure">查询范围内不涉及{{currentTab.label}}</p> -->
              </div>
            </div>
          </div>
        </div>
        <div class="content-wapper" v-if="this.currentTab.value === 'landType_Analyze_History'">
          <div v-for="(item, index) in this.currentQueryResult" :key="index" class="background" :style="hideContentWidth">
            <div class="radius">
              <div v-if="!themeSwitch ? item.images : item.themeImgs" class="content-tips">
                <p class="secondary left pure">时间：{{item.date}}</p>
              </div>
              <img v-if="!themeSwitch && item.images" :src="item.images">
              <img v-if="themeSwitch && item.themeImgs" :src="item.themeImgs">
              <div v-if="!themeSwitch ? !item.images : !item.themeImgs" class="no-img">
                <img src="https://gl.landcloud.org.cn/images/no_img.png">
              </div>
              <div v-if="!themeSwitch ? !item.images : !item.themeImgs" class="content-tips">
                <!-- <p class="secondary center pure">查询范围内不涉及{{currentTab.label}}</p> -->
              </div>
            </div>
          </div>
        </div>
        <div class="content-wapper" v-if="this.currentTab.value === 'landType_Analyze_History'">
          <div v-for="(item, index) in this.propContent" :key="index" :style="hideContentWidth">
            <div class="radius">
              <div class="info-wapper">
                <a-table v-if="propColumns.length > 0 && propContent && propContent.length > 0" :columns="propColumns" :dataSource="item" bordered :pagination="false" />
                <p v-else class="title center highlight">
                  <a-icon type="warning" />该专题暂无属性数据
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a :class="[this.currentTab.value === 'image_Analyze_History'? 'fix' : '', 'button']" @click="visibleContent('right')">
        <a-icon type="caret-right" theme="filled" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

@Component({ components: {} })
class CompareTabCard extends Vue {
  @Prop({ default: null })
  private queryResult!: any;

  private currentQueryResult: any = null;

  private tabMenu: any = [
    {
      type: "action",
      active: false,
      label: "多年影像",
      value: "image_Analyze_History",
      icon: "trophy",
      grade: 1,
      handle: 1
    },
    {
      type: "action",
      active: false,
      label: "多年现状",
      value: "landType_Analyze_History",
      icon: "trophy",
      grade: 1,
      handle: 2
    }
  ];

  private toolMenu: any = [
    {
      type: "action",
      on: false,
      label: "切换专题图",
      icon: "picture",
      handle: "onTheme",
      invork: this.switchTheme
    }
  ];

  private hideContent: any = {
    left: 0,
    right: 0
  };

  private get currentTab(): any {
    let tabs = this.tabMenu.filter(item => item.active);
    if (tabs.length > 0) {
      return tabs[0];
    } else {
      return null;
    }
  }

  private themeSwitch = false;

  private propColumns = [
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

  private propContent: any;

  private get hideContentWidth(): string {
    let style = `left: calc(((44vw - (32 * 0.072rem + 2 * 0.072rem)) / 2 + 2vw) * (-${
      this.hideContent.left
    }))`;
    return style;
  }

  @Watch("currentTab", { immediate: true, deep: true })
  private onCurrentTab(val: any, oldVal: any) {
    if (this.queryResult && val) {
      if (val.value === "map") {
        return null;
      } else {
        this.propContent = [];
        this.currentQueryResult = this.queryResult[val.value];
        this.hideContent = {
          left: 0,
          right: this.currentQueryResult
            ? this.currentQueryResult.length - 4
            : 0
        };
        if (this.currentTab.value === "landType_Analyze_History") {
          this.currentQueryResult.map((item, index: number) => {
            if (item.attributes) {
              let totalMj = 0;
              let attributes: any[] = item.attributes.map((attr, i) => {
                totalMj += parseFloat(attr.mj);
                return {
                  index: i,
                  name: attr.name + (attr.code ? "-" + attr.code : ""),
                  mj: parseFloat(attr.mj).toFixed(2)
                };
              });
              attributes.push({
                name: "合计",
                mj: totalMj.toFixed(2)
              });
              this.propContent.push(attributes);
            }
          });
        }
      }
    }
  }

  @Watch("queryResult", { immediate: true, deep: true })
  private onQueryResult(val: any, oldVal: any) {
    if (val) {
      this.tabMenu[0].active = true;
    }
  }

  private visibleContent(param: any) {
    if (param === "left") {
      if (this.hideContent.left > 0) {
        this.hideContent.left--;
        this.hideContent.right++;
      } else {
        this.$message.warning("没有了", 3);
      }
    } else if (param === "right") {
      if (this.hideContent.right > 0) {
        this.hideContent.right--;
        this.hideContent.left++;
      } else {
        this.$message.warning("没有了", 3);
      }
    }
  }

  private switchTheme(param: any) {
    param.on = !this.themeSwitch;
    this.themeSwitch = param.on;
  }

  private handleClick(param: any) {
    this.tabMenu.map(item => {
      item.active = false;
      if (item.handle === param.handle) {
        item.active = true;
      }
    });
  }

  private toolsHandleClickClick(param: any) {
    this.toolMenu.map(item => {
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
      width: calc(98vw - #{($size_64)});
      padding-left: calc(#{($size_32 + $size_1)});

      & > div {
        display: inline-block;
        position: relative;
        width: calc(#{($size_120 + $size_12)});
        height: $size_32;
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
    display: flex;

    border: 1px dashed map-get($default, primary_light_1);

    & > a {
      i {
        height: calc(((44vw - #{($size_32 + $size_2)}) * 0.4 + 2vw) * 2);
      }
      &.fix i {
        height: calc((44vw - #{($size_32 + $size_2)}) * 0.4 + 2vw);
      }
    }

    .flex-wapper {
      display: flex;
      flex-direction: column;
      .content-wapper {
        flex: 1;
        margin: auto;
        display: flex;
        overflow: hidden;
        max-width: calc((44vw - #{($size_32 + $size_2)}) * 2 + 8vw);

        & > div.background {
          background-image: url(https://gl.landcloud.org.cn/images/pic_bg.png);
        }

        & > div {
          flex: 1;
          position: relative;
          transition: left $ease_in;
          background-size: 100% 100%;
          background-repeat: no-repeat;

          & > div {
            padding: 1vw;

            & > img,
            .no-img,
            .info-wapper {
              width: calc((44vw - #{($size_32 + $size_2)}) / 2);
              height: calc((44vw - #{($size_32 + $size_2)}) * 0.4);
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
              padding: 0.5vw;
              bottom: 1vw;
              left: 1vw;
              width: calc(100% - 2vw);
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
}
</style>
