
<template>
  <div class="content">
    <div v-once ref="basicMapbox" :style="mapSize"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Provide, Prop, Vue, Emit, Watch } from 'vue-property-decorator';

import { MAPBOX_ACCESSTOKEN } from '@/config';

import mapboxgl from 'mapbox-gl';

@Component({})
class Mapbox extends Vue {
    @Prop({ type: String, default: '100%' })
    public mapWidth!: string;

    @Prop({ type: String, default: '100%' })
    public mapHeight!: string;

    @Prop({ type: String, default: 'img' })
    public basetype!: string;

    @Prop({ type: String, default: 'mapbox://styles/mapbox/streets-v9' })
    private mapStyle!: string;

    @Prop({ default: null }) private mapOptions!: mapboxgl.MapboxOptions;

    private get mapSize(): any {
        return { width: this.mapWidth, height: this.mapHeight };
    }

    private map?: mapboxgl.Map = undefined;

    private accessToken: string = MAPBOX_ACCESSTOKEN;

    private imgLayer: any = null;

    private drawLayer: any = null;

    private sources: any = null;

    @Emit('load') public mapLoaded() {
        return {
            map: this.map,
            component: this
        };
    }

    @Watch('mapStyle')
    public onMapStyleChanged(nextStyle: string, prev: string) {
        if (nextStyle != prev) {
            (this.map as mapboxgl.Map).setStyle(nextStyle);
        }
    }

    @Provide('handleMap')
    public handleMap(found: (map: mapboxgl.Map) => void) {
        let that = this;
        function checkForMap() {
            if (that.map) {
                found(that.map);
            } else {
                setTimeout(checkForMap, 50);
            }
        }
        checkForMap();
    }

    private activated() {}

    private mounted() {
        this.init();
    }

    private beforeDestroy() {}

    private init() {
        debugger;
        mapboxgl.accessToken = this.accessToken;
        let map = new mapboxgl.Map({
            ...this.mapOptions,
            container: this.$refs.basicMapbox,
            style: this.mapStyle,
            zoom: 3.9,
            minZoom: 3,
            maxZoom: 18,
            projection: 'EPSG:4490',
            center: { lng: 105.00769119789561, lat: 77.34152126076046 },
            attributionControl: false
        } as mapboxgl.MapboxOptions);
        map.on('load', () => {
            this.map = map;
            this.mapLoaded();
        });
    }

    public addMarker() {
        let marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat(this.mapOptions.center as mapboxgl.LngLatLike)
            .addTo(<mapboxgl.Map>this.map);
    }

    private zoomIn() {
        if (this.map) this.map.zoomIn();
    }

    private zoomOut() {
        if (this.map) this.map.zoomOut();
    }
}

export default Mapbox;
</script>

<style lang='scss' scoped>
@import url('//api.tiles.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.css');

.content {
    margin: auto;
    width: 100%;
    height: 100%;

    .mapboxgl-map {
        height: 100%;
        width: 100%;
        cursor: move;
        text-align: left;
        background-image: linear-gradient(135deg, rgba(3, 19, 46, 1), rgba(3, 19, 46, 0.8));
    }
}
</style>


