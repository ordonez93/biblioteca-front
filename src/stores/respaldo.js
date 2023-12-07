//guardar un libro
import { ref,computed } from 'vue'
import { collection, addDoc, and } from 'firebase/firestore'
import useLibros from '@/composables/useLibros'
import useImage from '@/composables/useImage'

const {librosCollection,db,seleccionarLibro,editarLibro} = useLibros()

const {url,uploadImage, image} = useImage()




const libro = ref({
    nombre_libro: '',
    autor_libro: '',
    anio_publicacion: '',
    categoria: '',
    cantidad: '',
    imagen:''
})


const error = ref('')

const guardarLibro = async () => {
    if (!libro.value.nombre_libro || !libro.value.autor_libro || !libro.value.anio_publicacion || !libro.value.categoria || !libro.value.cantidad && url.value) {
        error.value = 'Todos lo campos son obligatorios'
        return
    }
    try {
        const { imagen, ...libroSinImagen } = libro.value;

        const docRef = await addDoc(collection(db, "libros"), {
            ...libroSinImagen,
            imagen:url.value
        })
        if(docRef.id){
            console.log('es correcto')
        }
    }catch{
        error.value = 'Algo salio mal recarga la página'
    }
}

//listar libros y seleccionar un libro
import { watch } from 'vue'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useFirestore, useCollection, useDocument } from 'vuefire'
export default function useLibros() {
    const db = useFirestore()
    const librosCollection = useCollection(collection(db, 'libros'))
   

    const seleccionarLibro = (id) => {
        try {
            const docRef = doc(db, 'libros', id)
            const libro = useDocument(docRef)
            console.log(libro)
            watch(libro,(libro)=>{
               
            })

        } catch {
            console.log('no se pudo seleccionar el usuario')
        }
        console.log(id)
    }
    const editarLibro = (id,data) => {
        const docRef = doc(db, 'libros', id)
        
    }

    return {
        librosCollection,
        db,
        editarLibro,
        seleccionarLibro
    }
}

