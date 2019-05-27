
<template>
  <div class="content">
    <div class="divider" v-if="this.status == 1 || this.status == 2">
      <a :class="[this.status == 1 ? 'warning' : 'success', 'primary', 'center', 'simple']">
        <a-icon v-if="this.status == 1" type="loading" />
        <a-icon v-if="this.status == 2" type="check-circle" theme="filled" />
        <p v-if="this.status == 1" class="nowrap center right strong">正在加载本次云查询结果，请稍等</p>
        <p v-if="this.status == 2" class="nowrap center right strong">{{this.xzqTag}}</p>
      </a>
      <a-divider v-if="this.status == 2" type="vertical" />
    </div>
    <div v-for="(item, index) in this.toolMenu" :key="index" class="divider">
      <a-popconfirm v-if="item.type === 'action' && item.handle==='onClear'" title="确定清除所有范围或坐标?" placement="bottom" @confirm="clearDraw" okText="是" cancelText="否">
        <a v-if="item.type === 'action'" class="primary center simple" :class="item.active ? 'active' : ''" href="#" @click="handleClick(item)">
          <a-icon :type="item.icon" theme="filled" />
          <p v-if="item.label" class="nowrap center">{{item.label}}</p>
        </a>
      </a-popconfirm>
      <a-popconfirm v-if="item.type === 'action' && item.handle==='onSwitch'" title="确定退出本次云查询结果页吗?" placement="bottom" @confirm="switchDraw" okText="是" cancelText="否">
        <a v-if="item.type === 'action'" class="primary center simple" :class="item.active ? 'active' : ''" href="#" @click="handleClick(item)">
          <a-icon :type="item.icon" theme="filled" />
          <p v-if="item.label" class="nowrap center">{{item.label}}</p>
        </a>
      </a-popconfirm>
      <a v-if="item.type === 'action' && item.handle!='onClear' && item.handle!='onSwitch'" :class="[item.active ? 'active' : '', 'primary', 'center', 'simple']" href="#" @click="handleClick(item)">
        <a-icon :type="item.icon" theme="filled" />
        <p v-if="item.label" class="nowrap center">{{item.label}}</p>
      </a>
      <a-divider v-if="item.type === 'split'" type="vertical" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import { Getter, Action, namespace } from 'vuex-class';

import { getXzqTag } from '@/api/home-page';

const store = namespace('Common');

import mapboxgl from 'mapbox-gl';

@Component({})
class MapDrawTools extends Vue {
    private xzqTag: string = '';

    @Prop({ required: true }) private map!: mapboxgl.Map;

    @Prop({ required: true }) private xzqdm!: any;

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
    private onStatusChanged(val: number, oldVal: number) {}

    @Emit('onLoaded') private mapLoaded() {
        return {
            component: this
        };
    }

    private get toolMenu(): any[] {
        if (this.status == 0) {
            return [
                {
                    type: 'action',
                    active: false,
                    label: '',
                    icon: 'home',
                    handle: 'onHome',
                    invork: this.flytoHome
                },
                {
                    type: 'split'
                },
                {
                    type: 'action',
                    active: false,
                    label: '坐标查询',
                    icon: 'pushpin',
                    handle: 'onLocation',
                    invork: this.startMarker
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
                    invork: this.startDraw
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
                    invork: this.clearDraw
                }
            ];
        } else if (this.status == 1) {
            return [];
        } else {
            return [
                {
                    type: 'action',
                    active: false,
                    label: '查询',
                    icon: 'edit',
                    handle: 'onSwitch',
                    invork: this.switchDraw
                }
            ];
        }
    }

    @Emit('onDraw') public onDraw() {
        return {};
    }

    private activated() {}

    private mounted() {
        this.init();
    }

    private beforeDestroy() {}

    private init() {}

    private flytoHome() {
        if (this.map) {
            this.map.setZoom(3.9);
            this.map.setCenter({ lng: 105.00769119789561, lat: 77.34152126076046 });
        }
    }

    private startMarker() {}

    private startDraw() {}

    private clearDraw() {}

    private switchDraw() {
        this.setStatus(0);
    }

    private handleClick(param: any) {
        this.toolMenu.map((item) => {
            item.active = false;
            if (item.handle === param.handle) {
                if (item.handle != 'onClear' || item.handle != 'onSwitch') {
                    item.invork(param);
                }
                item.active = true;
            }
        });
    }
}

export default MapDrawTools;
</script>

<style lang='scss' scoped>
.content {
    margin: auto;
    display: flex;
}
</style>


