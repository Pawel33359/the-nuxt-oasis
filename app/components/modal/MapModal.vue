<script setup lang="ts">
const { lat, lng } = defineProps<{ lat: number; lng: number }>();

const zoom = ref(15);
</script>

<template>
  <div class="cabin__map">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="[lat, lng]"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />

      <LMarker :lat-lng="[lat, lng]" />
    </LMap>
  </div>
</template>

<style scoped>
.cabin__map {
  padding: 0 var(--space-2);
  width: min(calc(100vw - 50px), 800px);
  height: min(calc(100vh - 50px), 600px);
  max-height: 100vh;
  max-width: 100vw;
}
</style>
