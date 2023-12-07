import { computed ,ref} from 'vue'
import { ref as refStorage } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'
export default function useImage() {
    const cargandoImg = ref(false)
    const storage = useFirebaseStorage()
    const storageRefPath = refStorage(storage, `libros/${uid()}.jpg`)
    const {
        url,
        uploadProgress,
        uploadError,
        uploadTask,
        upload

    } = useStorageFile(storageRefPath)

    async function uploadImage(e) {
        cargandoImg.value = true
        const data = e.target.files[0]
        if (data) {
           await upload(data)
           cargandoImg.value = false
        }

    }

    const image = computed(() => {
        return url.value ? url.value : null
    })
    return {
        uploadImage,
        url,
        image,
        cargandoImg
    }
}