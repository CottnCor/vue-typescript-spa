
<template>
  <div class="content">
    <!-- <a class="primary center" href="#"><i class="fa fa-camera-retro"></i>
      <p class="center">&nbsp; {{this.label}}</p>
    </a> -->
    <div v-for="item in this.toolMenu" class="divider">
      <a-popconfirm v-if="item.type === 'action' && item.handle==='onClear'" title="确定清除所有范围或坐标?" placement="bottom" @confirm="clearDraw" okText="是" cancelText="否">
        <a v-if="item.type === 'action'" :class="[item.action ? 'action' : '', 'primary', 'center']" href="#" @click="handleClick(item)">
          <a-icon :type="item.icon" theme="filled" />
          <p class="center">&nbsp; {{item.label}}</p>
        </a>
      </a-popconfirm>
      <a v-if="item.type === 'action' && item.handle!='onClear'" :class="[item.action ? 'action' : '', 'primary', 'center']" href="#" @click="handleClick(item)">
        <a-icon :type="item.icon" theme="filled" />
        <p class="center">&nbsp; {{item.label}}</p>
      </a>
      <a-divider v-if="item.type === 'split'" type="vertical" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Provide, Prop, Vue, Emit, Watch } from 'vue-property-decorator';

import mapboxgl from 'mapbox-gl';

@Component({})
class Mapbox extends Vue {
    @Prop({ required: true, default: undefined }) private map!: mapboxgl.Map;

    @Prop({ required: true, default: '' }) private label!: string;

    @Emit('onLoaded') public mapLoaded() {
        return {
            component: this
        };
    }

    private toolMenu: any = [
        {
            type: 'action',
            action: false,
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
            action: false,
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
            action: false,
            label: '清除',
            icon: 'delete',
            handle: 'onClear',
            invork: this.clearDraw
        }
    ];

    @Emit('onDraw') public onDraw() {
        return {};
    }

    private activated() {}

    private mounted() {
        this.init();
    }

    private beforeDestroy() {}

    private init() {
        console.log(this.label);
        console.log(this.map);
    }

    private startMarker() {
        this.$message.success('startMarker', 3);
    }

    private startDraw() {
        this.$message.success('startDraw', 3);
    }

    private clearDraw() {
        this.$message.success('clearDraw', 3);
    }

    private handleClick(param: any) {
        this.toolMenu.map((item) => {
            item.action = false;
            if (item.handle === param.handle) {
                if (item.handle != 'onClear') {
                    item.invork();
                }
                item.action = true;
            }
        });
    }
}

export default Mapbox;
</script>

<style lang='scss' scoped>
.content {
    margin: auto;
    display: flex;

    a {
        height: 100%;
        padding: 0 $size_12;
        background-color: map-get($default, grey-glass);

        &:hover {
            color: map-get($default, pure);
            background-color: map-get($default, primary);
            i {
                color: map-get($default, pure);
            }
        }
        i {
            width: $size_32;
            height: $size_32;
            display: flex;
            color: map-get($default, primary);
            svg {
                margin: auto;
            }
        }
    }
}
</style>


