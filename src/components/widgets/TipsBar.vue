
<template>
  <div class="content">
    <div class="divider" v-if="this.status === 1 || this.status === 2">
      <a v-if="this.status === 1" class="warning primary center simple">
        <a-icon type="loading" />
        <p class="nowrap center right strong">正在加载本次云查询结果，请稍等</p>
      </a>
      <a v-if="this.status === 2" class="success primary center simple">
        <a-icon type="check-circle" theme="filled" />
        <p class="nowrap center right strong">{{this.xzqTag}}</p>
      </a>
      <a-divider v-if="this.status === 2" type="vertical" />
      <a v-if="this.status === 2" class="success primary center simple">
        <a-icon type="tag" theme="filled" />
        <p class="nowrap center right strong">{{this.mj.toFixed(2)}} 亩</p>
      </a>
      <a-divider v-if="this.status === 2" type="vertical" />
      <a v-if="this.status === 2" class="success primary center simple">
        <a-icon type="dashboard" theme="filled" />
        <p class="nowrap center right strong">{{this.currentTime}}</p>
      </a>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import { Getter, Action, namespace } from 'vuex-class';

import { getXzqTag } from '@/api/home-page';

import { formatDate } from '@/utils/common';

const store = namespace('Common');

@Component({})
class TipsBar extends Vue {
  
    private xzqTag = '';

    private get currentTime(): string {
        return formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }

    @Prop({ required: true }) private xzqdm!: string;

    @Prop({ required: true, default: -1 }) private mj!: number;

    @store.Getter('status')
    private status!: number;

    @store.Action('set_status')
    private setStatus!: (val: number) => void;

    @Watch('xzqdm', { immediate: true, deep: true })
    private onXzqdm(val: any, oldVal: any) {
        if (val) {
            getXzqTag({
                xzqdm: val
            }).then((result) => {
                if (result && result.status === 'OK') {
                    this.xzqTag = result.data.xzqmc;
                }
            });
        }
    }

    @Watch('status', { immediate: true, deep: true })
    private onStatusChanged(val: number, oldVal: number) {
        console.log(val);
    }

    @Emit('onLoaded') private mapLoaded() {
        return {
            component: this
        };
    }
}

export default TipsBar;
</script>

<style lang='scss' scoped>
.content {
    margin: auto;
    display: flex;
}
</style>


