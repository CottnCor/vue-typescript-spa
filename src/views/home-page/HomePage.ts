import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import { Getter, Action, namespace } from 'vuex-class';

const store = namespace('Common');

import { SketchLayout } from '@/layout';

import { ROOT_PATH, ASSIST_ROUTER } from '@/config';

import { Mapbox, TipsBar, SimpleTabCard, CompareTabCard } from '@/components';

import { addCloudQuery, getCloudQueryResult } from '@/api/home-page';

import { guid } from '@/utils/common';

import * as wellknown from 'wellknown';

import * as turf from '@turf/turf';

@Component({
    components: { SketchLayout, Mapbox, TipsBar, SimpleTabCard, CompareTabCard }
})
class HomePage extends Vue {
    private map?: any = null;

    private queryResult?: any = null;

    private interval?: any;

    private tryAgainTimes = 0;

    private xzqdm = '';

    private mj = -1;

    @Prop({ default: null })
    private appkey!: string;

    @Prop({ default: null })
    private userId!: number;

    @Prop({ default: null })
    private queryId!: string;

    @Prop({ default: null })
    private wkt!: string;

    @store.Getter('status')
    private status!: number;

    @store.Action('set_status')
    private setStatus!: (val: number) => void;

    @Watch('status', { immediate: true, deep: true })
    private onStatusChanged(val: number, oldVal: number) {
        if (val === 0) {
            console.log(ASSIST_ROUTER.error.title);
            debugger;
            this.$router.push({
                path: ROOT_PATH + ASSIST_ROUTER.error.name,
                query: { code: '500', msg: '检查请求参数是否合法' }
            });
        } else if (val === 1) {
            console.log('加载');
        } else if (val === 2) {
            console.log('展示');
            this.xzqdm = this.queryResult.data.xzqdm;
        } else {
            console.log('无权限');
        }
    }

    @Watch('tryAgainTimes', { immediate: true, deep: true })
    private onTryAgainTimes(val: number, oldVal: number) {
        console.log('开始第' + val + '次尝试请求本次云查询结果');
        if (this.queryResult) {
            this.$notification.success({
                message: '返回云查询结果成功',
                description: ''
            });
            this.setStatus(2);
            if (this.interval) {
                clearInterval(this.interval);
            }
        } else if (val > 20 && !this.queryResult) {
            this.$notification.error({
                message: '返回云查询结果失败',
                description: ''
            });
            this.setStatus(0);
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }

    private activated() {}

    private mounted() {
        this.addQuery();
    }

    private beforeDestroy() {
        if (this.intervalGetResult) {
            clearInterval(this.interval);
        }
    }

    private onMapLoaded(event: any) {
        this.map = event.map;
        console.log(event.map);
    }

    private addQuery() {
        let lon = -1;
        let lat = -1;
        try {
            let geoJson = wellknown.parse(this.wkt);
            let polygon = turf.polygon(geoJson.coordinates);
            let center = turf.center(polygon);
            lon = center.geometry ? center.geometry.coordinates[0] : -1;
            lat = center.geometry ? center.geometry.coordinates[1] : -1;
            this.mj = turf.area(polygon) / 666.667;
        } catch (error) {
            console.log(error);
        }
        if (lon !== -1 && lat !== -1 && this.mj !== -1) {
            addCloudQuery({
                appkey: this.appkey,
                userId: this.userId,
                lon,
                lat,
                type: 0,
                param: JSON.stringify({ mj: this.mj, width: 530, height: 426, range: this.wkt })
            })
                .then((result) => {
                    if (result && result.status === 'OK' && result.message === 'SUCCESS') {
                        this.$notification.success({
                            message: '添加云查询成功',
                            description: '请稍等，等待返回结果.'
                        });
                        this.setStatus(1);
                        console.log(result);
                        this.intervalGetResult(result.data);
                    } else {
                        this.$notification.error({
                            message: '添加云查询失败',
                            description: ''
                        });
                        this.setStatus(0);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.$notification.error({
                        message: '添加云查询失败',
                        description: ''
                    });
                    this.setStatus(0);
                });
        } else {
            this.setStatus(0);
        }
    }

    private intervalGetResult(queryId: string) {
        this.queryResult = null;
        this.tryAgainTimes = 0;
        this.interval = setInterval(() => {
            this.getResult(queryId);
            this.tryAgainTimes++;
        }, 3000);
    }

    private getResult(queryId: string) {
        if (queryId) {
            getCloudQueryResult({
                appkey: this.appkey,
                userId: this.userId,
                id: queryId
            }).then((result) => {
                if (result && result.status === 'OK') {
                    this.queryResult = result.data;
                }
            });
        } else {
            this.$notification.error({
                message: '返回云查询结果失败',
                description: '云查询id为空'
            });
            this.setStatus(0);
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }
}

export default HomePage;
