<template>
  <div class="contronl-wapper exception">
    <div class="content-wapper img">
      <img :src="this.config[code].img" />
    </div>
    <div class="content-wapper content">
      <h1 class="content-wapper">{{ this.config[code].title }}</h1>
      <div class="content-wapper desc">{{ msg ? msg : this.config[code].desc }}</div>
      <div class="content-wapper action">
        <a-button type="primary" @click="this.back">返回上一页</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { ROOT_ROUTER, ASSIST_ROUTER } from '@/config';

@Component({})
class ExceptionCard extends Vue {
    @Prop({ type: Number, default: 404 }) public code!: number;

    @Prop({ type: String }) public msg!: string;

    private config: any = {
        403: {
            img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
            title: '403',
            desc: '抱歉，访问的页面没有权限'
        },
        404: {
            img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
            title: '404',
            desc: '抱歉，访问的页面飞走了'
        },
        500: {
            img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
            title: '500',
            desc: '抱歉，服务器似乎提了一个问题'
        }
    };

    private back() {
        this.$router.push({ name: ASSIST_ROUTER.error.name });
    }
}
export default ExceptionCard;
</script>

<style lang="scss" scoped>
.exception {
    align-items: center;
    text-align: center;
    .img {
        zoom: 1;
    }
    .content {
        h1 {
            color: map-get($default, grey_8);
            font-size: $size_72;
            font-weight: 600;
            line-height: $size_72;
        }
        .desc {
            color: map-get($default, grey_6);
            font-size: $size_20;
            line-height: $size_28;
        }
        .action {
            display: flex;
            button {
                margin: auto;
            }
        }
    }
}
</style>
