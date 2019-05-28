import { ExceptionCard } from '@/components';

import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import { Getter, Action, namespace } from 'vuex-class';

@Component({
    components: { ExceptionCard }
})
class ErrorTips extends Vue {
    @Prop({ default: 403 })
    private code!: number;

    @Prop({ default: '抱歉，访问的页面没有权限' })
    private msg!: string;

    private activated() {}

    private mounted() {}

    private beforeDestroy() {}
}

export default ErrorTips;
