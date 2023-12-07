import { watch, ref } from 'vue'
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useFirestore, useCollection, useDocument } from 'vuefire'




export default function useModalSolicitud() {
    const modal = ref(false);
    //listar autores
    const db = useFirestore()
    const autoresCollection = useCollection(collection(db, 'autores'))

    //guardar autor
    const guardarAutor = async (data) => {
        try {

            const docRef = await addDoc(collection(db, "autores"), {
                nombre_autor: data
            })
            if (docRef.id) {
                console.log('correcto')
                modal.value = false
            }
        } catch {
            console.log('Algo salio mal recarga la página')
        }
    }

    //seleccionar autor
    const isEdit = ref(false)
    const idAutor = ref('')
    const seleccionarAutor = (id) => {
        if (id) {
            isEdit.value = true
        }
        try {
            const docRef = doc(db, 'autores', id)
            const autor = useDocument(docRef)

            watch(autor, (autor) => {
                document.querySelector('#autor').value = autor.nombre_autor
                idAutor.value = autor.id
            })

        } catch {
            console.log('no se pudo seleccionar el usuario')
        }
    }

    //editar autor
    const editarAutor = async (data) => {

        try {
            const docRef = doc(db, 'autores', idAutor.value)
            await updateDoc(docRef, {nombre_autor:data})
            console.log('Editado..')
            isEdit.value = false
            document.querySelector('#autor').value = ''
            modal.value = false
        } catch {
            console.log('Error al editar')
        }

    }

    //eliminar autor
    const eliminarAutor = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este autor?');
        if (confirmacion) {
            const docRef = doc(db, 'autores', id);

            try {
                await deleteDoc(docRef);
                console.log('autor eliminado');
            } catch (error) {
                console.error('Error al eliminar el autor:', error);
            }
        } else {
            console.log('Eliminación cancelada');
        }
    };


    return {
        autoresCollection,
        db,
        isEdit,
        modal,
        guardarAutor,
        seleccionarAutor,
        editarAutor,
        eliminarAutor,
    }
}