import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import { Getter, Action, namespace } from 'vuex-class';

const store = namespace('Common');

import { SketchLayout } from '@/layout';

import { Mapbox, MapDrawTools, SimpleTabCard, CompareTabCard } from '@/components';

import { addCloudQuery, getCloudQueryResult } from '@/api/home-page';

import { guid } from '@/utils/common';

@Component({
    components: { SketchLayout, Mapbox, MapDrawTools, SimpleTabCard, CompareTabCard }
})
class HomePage extends Vue {
    private map?: any = null;

    private queryResult?: any = null;

    private interval?: any;

    private tryAgainTimes = 0;

    private xzqdm = '';

    @Prop({ default: null })
    private appkey!: string;

    @Prop({ default: null })
    private userid!: number;

    @Prop({ default: null })
    private queryid!: string;

    @Prop({ default: null })
    private lon!: number;

    @Prop({ default: null })
    private lat!: number;

    @Prop({ default: null })
    private type!: number;

    @Prop({ default: null })
    private param!: string;

    @store.Getter('status')
    private status!: number;

    @store.Action('set_status')
    private setStatus!: (val: number) => void;

    @Watch('status', { immediate: true, deep: true })
    private onStatusChanged(val: number, oldVal: number) {
        if (val === 0) {
            console.log('绘制');
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

    private beforeDestroy() {}

    private onMapLoaded(event: any) {
        this.map = event.map;
        console.log(event.map);
    }

    private onDrawToolLoaded(event: any) {
        console.log(event.component);
    }

    private addQuery() {
        if (this.lon && this.lat && this.type && this.param) {
            addCloudQuery({
                appkey: this.appkey,
                userid: this.userid,
                lon: this.lon,
                lat: this.lat,
                type: this.type,
                param: this.param,
                relId: guid()
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

    private intervalGetResult(queryid: string) {
        this.queryResult = null;
        this.tryAgainTimes = 0;
        this.interval = setInterval(() => {
            this.getResult(queryid);
            this.tryAgainTimes++;
        }, 3000);
    }

    private getResult(queryid: string) {
        if (queryid) {
            getCloudQueryResult({
                appkey: this.appkey,
                userid: this.userid,
                id: queryid
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
