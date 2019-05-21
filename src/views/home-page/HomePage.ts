import { Component, Vue } from 'vue-property-decorator';

import { SketchLayout } from '@/layout';

import { Mapbox } from '@/components';

import { APP_PRAMS } from '@/config';

@Component({
    components: { SketchLayout, Mapbox }
    })
class HomePage extends Vue {
    private appInfo = APP_PRAMS;

    private activated() {}

    private mounted() {}

    private beforeDestroy() {}
}

export default HomePage;
