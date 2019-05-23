import { Component, Vue } from 'vue-property-decorator';

import { SketchLayout } from '@/layout';

import { Mapbox, MapDrawTools, SimpleTabCard, CompareTabCard } from '@/components';

@Component({
    components: { SketchLayout, Mapbox, MapDrawTools, SimpleTabCard, CompareTabCard }
})
class HomePage extends Vue {
    private map?: any = null;

    private onMapLoaded(event: any) {
        console.log(event.map);
        this.map = event.map;
    }

    private onDrawToolLoaded(event: any) {
        console.log(event.component);
    }
}

export default HomePage;
