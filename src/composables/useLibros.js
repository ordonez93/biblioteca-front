import { watch, ref } from 'vue'
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useFirestore, useCollection, useDocument } from 'vuefire'


export default function useLibros() {

    const modal = ref(false);
    const guardando = ref(false)
    const exito = ref(false)
    //listar libro
    const db = useFirestore()
    const librosCollection = useCollection(collection(db, 'libros'))

    //guardar libro
    
    const guardarLibro = async (data, url) => {
        try {
            guardando.value = true
            const { imagen, ...libroSinImagen } = data;

            const docRef = await addDoc(collection(db, "libros"), {
                ...libroSinImagen,
                imagen: url
            })
            if (docRef.id) {
                resetForm()
                console.log('es correcto')
                guardando.value = false
                modal.value = false
            }
        } catch {
            console.log('Algo salio mal recarga la página')
        }
    }

    //seleccionar libro
    const imagenEditar = ref('')
    const isEdit = ref(false)
    const idLibro = ref('')
    const seleccionarLibro = (id) => {
        if (id) {
            isEdit.value = true
        }
        try {
            const docRef = doc(db, 'libros', id)
            const libro = useDocument(docRef)

            watch(libro, (libro) => {


                document.querySelector('#nombre-libro').value = libro.nombre_libro
                document.querySelector('#autor-libro').value = libro.autor_libro
                document.querySelector('#anio').value = libro.anio_publicacion
                document.querySelector('#categoria-libro').value = libro.categoria
                document.querySelector('#cantidad').value = libro.cantidad
                imagenEditar.value = libro.imagen
                idLibro.value = libro.id

            })

        } catch {
            console.log('no se pudo seleccionar el usuario')
        }

    }

    //editarLibro
    const editarLibro = async (data) => {
        try {
            guardando.value = true
            const docRef = doc(db, 'libros', idLibro.value)
            await updateDoc(docRef, data)
            resetForm()
            imagenEditar.value = ''
            idLibro.value = ''
            isEdit.value = false
            console.log('Editado..')
            guardando.value = false
            modal.value = false
        } catch {
            console.log('Error al editar')
        }

    }

    const solicitarLibro = async (usuario,data) => {
        try {
            const { nombre_libro, autor_libro, categoria } = data;
            console.log(nombre_libro)
            const docRef = await addDoc(collection(db, "solicitudes"), {

                usuario:usuario.value,
                nombre_libro,
                autor_libro,
                categoria
            })
            if (docRef.id) {
                console.log('es correcto')
                exito.value = true
            }
        } catch {
            console.log('Algo salio mal recarga la página')
        }
    }

    //eliminar libro
    const eliminarLibro = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este libro?');
        if (confirmacion) {
            const docRef = doc(db, 'libros', id);

            try {
                await deleteDoc(docRef);
                console.log('Libro eliminado');
            } catch (error) {
                console.error('Error al eliminar el libro:', error);
            }
        } else {
            console.log('Eliminación cancelada');
        }
    };

    const resetForm = () => {
        document.querySelector('#formLibro').reset();
    };

    return {
        librosCollection,
        db,
        imagenEditar,
        isEdit,
        modal,
        guardando,
        exito,
        guardarLibro,
        seleccionarLibro,
        editarLibro,
        eliminarLibro,
        solicitarLibro,
        resetForm

    }
}