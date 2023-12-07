import { ref } from 'vue'

export default function useLocationMap() {

    const zoom = ref(17)
    const center = ref([1.1567529671213617, -76.65182210081227])

    function pin(e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
    }

    return {
        zoom,
        center,
        pin
    }
}