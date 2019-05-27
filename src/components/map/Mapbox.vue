
<template>
  <div class="content">
    <div v-once ref="basicMapbox" :style="mapSize"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Provide, Prop, Vue, Emit, Watch } from 'vue-property-decorator';

import { MAPBOX_ACCESSTOKEN, MAP_IMG_URL, MAP_VEC_URL, MAP_CVA_URL, MAP_WAP_URL } from '@/config';

import mapboxgl from 'mapbox-gl';

@Component({})
class Mapbox extends Vue {
    @Prop({ default: '100%' })
    private mapWidth!: string;

    @Prop({ default: '100%' })
    private mapHeight!: string;

    @Prop({ default: null }) private mapOptions!: mapboxgl.MapboxOptions;

    @Prop({ default: 'mapbox://styles/mapbox/streets-v9' })
    private defaultStyle!: string;

    private get mapSize(): any {
        return { width: this.mapWidth, height: this.mapHeight };
    }

    private map?: mapboxgl.Map = undefined;

    private accessToken: string = MAPBOX_ACCESSTOKEN;

    @Emit('onLoaded') public mapLoaded() {
        return {
            map: this.map,
            component: this
        };
    }

    private activated() {}

    private mounted() {
        this.init();
    }

    private beforeDestroy() {}

    private init() {
        mapboxgl.accessToken = this.accessToken;

        let imgLayer = {
            type: 'raster',
            tiles: [MAP_IMG_URL],
            tileSize: 256
        };
        let cvaLayer = {
            type: 'raster',
            tiles: [MAP_CVA_URL],
            tileSize: 256
        };
        let wapLayer = {
            type: 'raster',
            tiles: [MAP_WAP_URL],
            tileSize: 256
        };
        let sources = {
            imgLayer: imgLayer,
            cvaLayer: cvaLayer,
            wapLayer: wapLayer
        };

        let style = {
            version: 8,
            sources: sources,
            layers: [
                {
                    type: 'raster',
                    id: 'img-layer',
                    source: 'imgLayer'
                },
                {
                    type: 'raster',
                    id: 'cva-layer',
                    source: 'cvaLayer'
                },
                {
                    type: 'raster',
                    id: 'wap-layer',
                    source: 'wapLayer'
                }
            ]
        };

        let map = new mapboxgl.Map({
            ...this.mapOptions,
            container: this.$refs.basicMapbox,
            style: style,
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

        map.on('moveend', (e) => {
            console.log(map.getZoom());
            console.log(map.getCenter());
            console.log(map.getBounds());
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

    .mapboxgl-map {
        width: 100%;
        cursor: move;
        text-align: left;
        background-color: transparent;
    }
}
</style>


