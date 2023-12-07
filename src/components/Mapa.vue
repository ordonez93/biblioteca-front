<script setup>
import "leaflet/dist/leaflet.css";
import useLocationMap from '@/composables/useLocationMap'
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
const { zoom, center, pin } = useLocationMap()
</script>

<template>
    
    <div style="height:600px">
        <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
        </LMap>
    </div>
    
</template>