import { ExceptionCard } from '@/components';

import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import { Getter, Action, namespace } from 'vuex-class';

@Component({
    components: { ExceptionCard }
})
class ErrorTips extends Vue {
    @Prop({ default: 403 })
    private code!: string;

    private activated() {}

    private mounted() {}

    private beforeDestroy() {}
}

export default ErrorTips;
