<template>
  <div v-if="this.queryResult">
    <result-card :queryResult="this.queryResult" :tabMenu="this.tabMenu" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import { ResultCard } from "@/components";

const store = namespace("Common");

@Component({
  components: { ResultCard }
})
class BasicsQuery extends Vue {
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
    }
  ];
}
export default BasicsQuery;
</script>