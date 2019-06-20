<template>
  <div v-if="this.queryResult">
    <result-card :queryResult="this.queryResult" :tabMenu="this.tabMenu" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import { ResultCard } from "@/components";

@Component({ components: { ResultCard } })
class AdvancedQuery extends Vue {
  @Prop({ default: null })
  private queryResult!: any;

  private tabMenu: any = [
    {
      type: "action",
      active: false,
      label: "土地权属",
      value: "ownership_Analyze",
      icon: "pushpin",
      grade: 1,
      handle: 1
    },
    {
      type: "action",
      active: false,
      label: "自然保护区",
      value: "natureReserve_Analyze",
      icon: "trophy",
      grade: 2,
      handle: 2
    },
    {
      type: "action",
      active: false,
      label: "多年影像",
      value: "image_Analyze_History",
      icon: "trophy",
      grade: 3,
      handle: 3,
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
      handle: 4,
      children: [],
      crrentChildren: ""
    }
  ];

  @Watch("queryResult", { immediate: true, deep: true })
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