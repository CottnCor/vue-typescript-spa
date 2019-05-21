import { Component, Vue } from 'vue-property-decorator';

import { SketchLayout } from '@/layout';

import { Mapbox, MapDrawTools } from '@/components';

import { LngLat, LngLatLike } from 'mapbox-gl';

@Component({
    components: { SketchLayout, Mapbox, MapDrawTools }
})
class HomePage extends Vue {
    private map?: mapboxgl.Map = null;

    private fuck = 'fuck';

    private activated() {}

    private mounted() {}

    private beforeDestroy() {}

    private onMapLoaded(event: any) {
        this.map = event.map;
    }

    private onDrawToolLoaded(event: any) {
        console.log(event.component);
    }
}

export default HomePage;
