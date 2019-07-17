<template>
  <div v-if="this.queryResult">
    <result-card-yn :queryResult="this.queryResult" :tabMenu="this.tabMenu" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import { ResultCard_YN } from "@/components";

@Component({ components: { "result-card-yn": ResultCard_YN } })
class AdvancedQuery extends Vue {
  @Prop({ default: null })
  private queryResult!: any;

  private tabMenu: any = [
    {
      type: "action",
      active: true,
      label: "多年影像",
      value: "image_Analyze_History",
      icon: "trophy",
      grade: 3,
      handle: 1,
      children: [],
      crrentChildren: ""
    },
    {
      type: "action",
      active: false,
      label: "多年现状",
      value: "landType_Analyze_History",
      icon: "trophy",
      grade: 4,
      handle: 2,
      children: [],
      crrentChildren: ""
    },
    {
      type: "action",
      active: false,
      label: "土地规划",
      value: "plan_Analyze",
      icon: "pushpin",
      grade: 1,
      handle: 3
    },
    {
      type: "action",
      active: false,
      label: "基本农田",
      value: "primeFarm_Analyze",
      icon: "pushpin",
      grade: 2,
      handle: 4
    },
    {
      type: "action",
      active: false,
      label: "审批备案",
      value: "spba_Analyze",
      icon: "trophy",
      grade: 1,
      handle: 5
    },
    {
      type: "action",
      active: false,
      label: "耕地等别",
      value: "landGrade_Analyze",
      icon: "trophy",
      grade: 1,
      handle: 6
    },
    {
      type: "action",
      active: false,
      label: "土地权属",
      value: "ownership_Analyze",
      icon: "pushpin",
      grade: 1,
      handle: 7
    },
    {
      type: "action",
      active: false,
      label: "自然保护区",
      value: "natureReserve_Analyze",
      icon: "trophy",
      grade: 2,
      handle: 8
    }
  ];

  @Watch("queryResult", { immediate: true, deep: false })
  private onQueryResult(val: any, oldVal: any) {
    if (val) {
      let object = this.queryResult;
      for (let key in object) {
        if (Array.isArray(object[key])) {
          for (const tab of this.tabMenu) {
            if (tab.value === key) {
              tab.children = [];
              object[key].map((item, index) => {
                tab.children.push({
                  handle: index,
                  active: index === 0,
                  tag: {
                    parent: tab.handle,
                    value: index
                  },
                  // label: item.date.substring(0, 4) + tab.label.substring(2, 4),
                  label: item.date,
                  parent: tab.handle
                });
                tab.crrentChildren = tab.label;
              });
            }
          }
        }
      }
    }
  }
}
export default AdvancedQuery;
</script>