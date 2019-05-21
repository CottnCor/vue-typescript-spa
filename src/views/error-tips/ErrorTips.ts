import { Component, Vue } from 'vue-property-decorator';
import { ExceptionCard } from '@/components';

@Component({
    components: { ExceptionCard }
    })
class ErrorTips extends Vue {
    private type = 404;
}

export default ErrorTips;
