<template>
    <div class="exception">
        <div class="img">
            <img :src="this.config[type].img" />
        </div>
        <div class="content">
            <h1>{{ this.config[type].title }}</h1>
            <div class="desc">{{ this.config[type].desc }}</div>
            <div class="action">
                <a-button type="primary" @click="this.back">返回上一页</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { ASSIST_ROUTER } from '@/config';

@Component({})
class ExceptionCard extends Vue {
    @Prop({ type: Number, default: 404 }) public type!: number;

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
        this.$router.push({ name: ASSIST_ROUTER.portal.name });
    }
}
export default ExceptionCard;
</script>

<style lang="scss" scoped>
.exception {
    min-height: $size_640;
    height: 80%;
    align-items: center;
    text-align: center;
    margin: auto;
    display: flex;
    .img {
        display: inline-block;
        padding-right: $size_48;
        zoom: 1;
        img {
            height: $size_360;
            max-width: $size_420;
        }
    }
    .content {
        display: inline-block;
        flex: auto;
        h1 {
            color: #434e59;
            font-size: $size_72;
            font-weight: 600;
            line-height: $size_72;
            margin-bottom: $size_24;
        }
        .desc {
            color: rgba(0, 0, 0, 0.45);
            font-size: $size_20;
            line-height: $size_28;
            margin-bottom: $size_16;
        }
    }
    button {
        margin: auto;
    }
}

// media
@media only screen and (max-width: map-get($breakpoint, sm)) {
    .exception {
        margin: auto;
        .img {
            padding-right: unset;

            img {
                height: 40%;
                max-width: 80%;
            }
        }
        button {
            margin: auto;
        }
    }
}
</style>
