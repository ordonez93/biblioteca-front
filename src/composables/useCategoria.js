import { watch, ref } from 'vue'
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useFirestore, useCollection, useDocument } from 'vuefire'
import { faL } from '@fortawesome/free-solid-svg-icons';



export default function useCategorias() {
    const modal = ref(false);
    //listar Categorias
    const db = useFirestore()
    const categoriasCollection = useCollection(collection(db, 'categorias'))

    //guardar categoria
    const guardarCategoria = async (data,estado) => {
        try {
            const docRef = await addDoc(collection(db, "categorias"), {
                nombre_categoria: data,
                estado:estado
            })
            if (docRef.id) {
                console.log('correcto')
                modal.value = false
            }
        } catch {
            console.log('Algo salio mal recarga la página')
        }
    }

    //seleccionar categoria
    const isEdit = ref(false)
    const idCategoria = ref('')
    const seleccionarCategoria = (id) => {
        if (id) {
            isEdit.value = true
        }
        try {
            const docRef = doc(db, 'categorias', id)
            const categoria = useDocument(docRef)

            watch(categoria, (categoria) => {
                document.querySelector('#categoria').value = categoria.nombre_categoria
                document.querySelector('#estado').checked= categoria.estado
                idCategoria.value = categoria.id
            })

        } catch {
            console.log('no se pudo seleccionar el usuario')
        }
    }

    //editar categoria
    const editarCategoria = async (data,estado) => {

        try {
            const docRef = doc(db, 'categorias', idCategoria.value)
            await updateDoc(docRef, {estado:estado,nombre_categoria:data})
            console.log('Editado..')
            isEdit.value = false
            document.querySelector('#categoria').value = ''
            modal.value = false
        } catch {
            console.log('Error al editar')
        }

    }

    //eliminar categoria
    const eliminarCategoria = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este categoria?');
        if (confirmacion) {
            const docRef = doc(db, 'categorias', id);

            try {
                await deleteDoc(docRef);
                console.log('categoria eliminada');
            } catch (error) {
                console.error('Error al eliminar el categoria:', error);
            }
        } else {
            console.log('Eliminación cancelada');
        }
    };

    return {
        categoriasCollection,
        db,
        isEdit,
        modal,
        guardarCategoria,
        seleccionarCategoria,
        editarCategoria,
        eliminarCategoria,
    }
}