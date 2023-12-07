<script setup>
import { ref } from 'vue'
import useCategorias from '@/composables/useCategoria'
import useAutores from '@/composables/useAutores'
import useLibros from '@/composables/useLibros'
import useImage from '@/composables/useImage'
import {useModalStore} from '@/composables/modalSolicitud'
import { useAuthStore } from '@/stores/auth'

//componetes
import Spinner from '@/components/Spinner.vue'
import SpinnerRegistro from '@/components/SpinnerRegistro.vue'

const { autoresCollection } = useAutores()
const { categoriasCollection } = useCategorias()

const { librosCollection, guardarLibro, seleccionarLibro, editarLibro, eliminarLibro, imagenEditar, isEdit, resetForm, modal, guardando, solicitando } = useLibros()

const { url, uploadImage, image, cargandoImg } = useImage()

const auth = useAuthStore()
const solicitud = useModalStore()
const error = ref('')



const libro = ref({
    nombre_libro: '',
    autor_libro: '',
    anio_publicacion: '',
    categoria: '',
    cantidad: '',
    imagen: ''
})

const enviarDatos = () => {
    libro.value.nombre_libro = document.querySelector('#nombre-libro').value
    libro.value.autor_libro = document.querySelector('#autor-libro').value
    libro.value.anio_publicacion = document.querySelector('#anio').value
    libro.value.categoria = document.querySelector('#categoria-libro').value
    libro.value.cantidad = document.querySelector('#cantidad').value

    if (!libro.value.nombre_libro || !libro.value.autor_libro || !libro.value.anio_publicacion || !libro.value.categoria || !libro.value.cantidad) {
        error.value = 'Todos lo campos son obligatorios'
        setTimeout(() => {
            error.value = ''
        }, 2500)
        return
    }

    if (isEdit.value) {
        if (url.value) {
            libro.value.imagen = url.value
            console.log(url.value)
        } else {
            libro.value.imagen = imagenEditar.value
        }
        editarLibro(libro.value)
        return
    }

    if (!url.value) {
        error.value = 'Debe elegir una imagen'
        setTimeout(() => {
            error.value = ''
        }, 2500)
        return
    } else {
        guardarLibro(libro.value, url.value)
        return
    }
}


const mostrarModal = () => {
    modal.value = !modal.value;
    imagenEditar.value = ''
    image.value = ''
    url.value = null
}

</script>
<template>
    <ModalSolicitud/>
    <h1 class="vista__heading">Listado de libros</h1>
    <hr>
    <br>
    <div v-if="modal" class="modal" id="modal">
        <div class="modal__contenido">

            <div class="formulario__contenido">

                <form class="formulario" @submit.prevent="enviarDatos" id="formLibro">
                    <div v-if="guardando">
                        <SpinnerRegistro />
                    </div>
                    <div v-if="!guardando">
                        <div class="formulario__encabezado">
                            <div class="logo">
                                <p class="formulario__icono"> <font-awesome-icon class="icono"
                                        :icon="['fas', 'book-bookmark']" /></p>
                            </div>
                            <p> {{ imagenEditar && isEdit ? 'Editar Libro' : 'Nuevo Libro' }}</p>
                        </div>
                        <hr>
                        <div class="formulario__campo">
                            <label class="formulario__label" for="nombre-libro">Nombre</label>
                            <input type="text" class="formulario__input" id="nombre-libro" placeholder="nombre del libro">
                        </div>
                        <div class="formulario__campo">
                            <label class="formulario__label" for="autor-libro">Autor principal</label>
                            <select class="formulario__input" name="autor-libro" id="autor-libro">
                                <option value="">--Seleccione--</option>
                                <option v-for="autor in autoresCollection" :key="autor.id" :value="autor.nombre_autor">{{
                                    autor.nombre_autor }}</option>
                            </select>
                        </div>
                        <div class="formulario__campo">
                            <label class="formulario__label" for="anio">Año de publicación</label>
                            <input class="formulario__input" type="number" id="anio">
                        </div>

                        <div class="formulario__campo">
                            <label class="formulario__label" for="catergoria-libro">Elije una categoria </label>
                            <select class="formulario__input" name="categoria-libro" id="categoria-libro">
                                <option value="">--Seleccione--</option>
                                <option v-for="categoria in categoriasCollection" :value="categoria.nombre_categoria"
                                    :style="{ display: categoria.estado ? 'blok' : 'none' }">{{ categoria.nombre_categoria
                                    }}
                                </option>
                            </select>
                        </div>
                        <!-- cargue de imagen -->
                        <div class="formulario__campo">
                            <label class="formulario__label formulario__label--imagen" for="file-libro">
                                <font-awesome-icon :icon="['fas', 'camera']" />
                                {{ imagenEditar && isEdit ? 'Cambiar imagen' : 'Subir imagen' }}
                            </label>
                            <input class="formulario__btn-imagen" @change="uploadImage" type="file" name="file"
                                id="file-libro" accept=".jpg">
                            <span class="formulario__span" v-if="!image">Ningún archivo seleccionado</span>
                        </div>
                        <div class="formulario__campo">
                            <div class="formulario__imagen">
                                <div class="carga__img" v-if="cargandoImg">
                                    <img class="camera" src="/img/camera.png" alt="">
                                    <Spinner />
                                </div>

                                <img v-if="image" :src="image" alt="imagen-previa-nuevo" id="imagen">
                                <img v-if="imagenEditar" :src="imagenEditar" :style="{ display: image ? 'none' : 'block' }"
                                    alt="imagen-previa-editar" id="imagenEdit">
                            </div>
                        </div>
                        <!-- fin cargue de imagen -->
                        <div class="formulario__campo">
                            <label class="formulario__label" for="cantidad">Cantidad disponible</label>
                            <input class="formulario__input" type="number" id="cantidad">
                        </div>

                        <div>
                            <input class="formulario__btn" type="submit" name="btn-libro" id="btn-libro"
                                :value="imagenEditar && isEdit ? 'Actualizar' : 'Guradar'">

                            <input @click="mostrarModal(), resetForm()" class="formulario__btn formulario__btn--cerrar"
                                type="button" name="btn-cerrar" id="btn-cerrar" value="Cerrar">
                        </div>
                        <div v-if="error" class="error formulario__alerta">
                            <p> {{ error }}</p>
                        </div>
                    </div>


                </form>


            </div>
        </div>
    </div>
    <div class="display__grid">
        <div class="card" v-for="libro in librosCollection" :key="libro.id">
            <div class="card__titulo">
                <div class="card__titulo-flex">
                    <img src="/img/libros.png" alt="icono libro">
                    <div>
                        <h2 class="card__heading" id="card-nombre-libro">{{ libro.nombre_libro }}</h2>
                        <p class="subtitulo">{{ libro.autor_libro }}</p>
                    </div>

                </div>
            </div>
            <div class="card__contenido">
                <div class="card__imagen">
                    <img :src="libro.imagen" alt="imagen libro">
                </div>
                <div class="card__texto">

                    <p class="card__subtitulo">Año: <span class="dato">{{ libro.anio_publicacion }}</span></p>

                    <p class="card__subtitulo">Categoria: <span class="dato">{{ libro.categoria }}</span></p>

                    <p class="card__subtitulo">Disponible: <span class="dato">{{ libro.cantidad }}</span></p>

                    <div>
                        <hr>
                        <div>
                            <input v-model="usuario" v-if="solicitando && Number(libro.cantidad) > 1"
                                class="formulario__input" type="email" name="emial-solicitud" id="email-solicitud"
                                placeholder="correo institucional">
                        </div>
                        <div v-if="auth.isAuth" class="acciones">
                            <button class="formulario__btn"
                                @click="seleccionarLibro(libro.id), mostrarModal()"><font-awesome-icon
                                    :icon="['fas', 'pen-to-square']" /> Editar</button>
                            <button class="formulario__btn formulario__btn--secundario"
                                @click="eliminarLibro(libro.id)"><font-awesome-icon :icon="['fas', 'trash']" />
                                Eliminar</button>
                        </div>
                        <div v-else class="acciones">
                            <button  @click="solicitud.solicitarLibro(libro)" class="formulario__btn"><font-awesome-icon
                                    :icon="['fas', 'paper-plane']" /> Solicitar</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
    <div v-if="auth.isAuth" class="crear__nuevo">
        <p v-if="!modal" @click="mostrarModal" class="nuevo"><font-awesome-icon :icon="['fas', 'square-plus']" /></p>
    </div>
</template>
<style scoped>
.carga__img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.camera {
    width: 3rem;
}

.card__titulo-flex img {
    width: 5rem;
}

.card__titulo-flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

@media (min-width: 768px) {
    .card__titulo-flex {
        flex-direction: row;
    }

    .card__titulo-flex img {
        width: auto;
    }
}

.nuevo {
    font-size: 3rem;
    color: var(--primary);
    transition: transform .3s ease;
}

.nuevo:hover {
    transform: scale(1.5);
}

.vista__heading {
    margin: 3rem;
}

/* modal */
.modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: auto;

}

/* Botón para crear libro */
.crear__nuevo {
    position: fixed;
    bottom: 1rem;
    right: 1rem;

}

@media (min-width: 992px) {
    .crear__nuevo {
        bottom: 2rem;
        right: 3rem;

    }
}


/* listado de las card */
.display__grid {

    display: grid;
    gap: 2rem;
}

@media (min-width: 992px) {
    .display__grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
}

@media (min-width: 1400px) {
    .display__grid {
        grid-template-columns: repeat(3, 1fr);

    }
}

@media (min-width: 1900px) {
    .display__grid {
        grid-template-columns: repeat(4, 1fr);

    }
}

/* card libro */
.card {
    margin: 0 auto;
    width: 90%;
    max-width: 400px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card__contenido {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

@media (min-width: 768px) {
    .card__contenido {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1rem;
        margin-top: 2rem;
        align-items: center;
    }
}

.subtitulo {
    text-align: center;
    margin-bottom: 1rem;
}

@media (min-width: 768px) {
    .subtitulo {
        margin-bottom: 0;
    }
}

.card__subtitulo {
    margin-top: 10px;
    text-align: left;
}

.card__texto {
    display: flex;
    flex-direction: column;
}

.acciones {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.formulario__btn--secundario {
    background-color: rgb(138, 0, 0);
}

/* modificaciones personalizadas a formulario */
.formulario {
    margin: 1rem;
}

@media (min-width: 768px) {
    .formulario {
        margin: 2rem 0;
    }
}

.formulario__encabezado {
    margin: 0;
    padding: 0;
    gap: 0;
}

.formulario__btn--cerrar {
    background-color: var(--gris);
    margin-top: 1rem;
}

.formulario__contenido {
    margin: 1rem auto;
    text-align: center;

}

.formulario__btn-imagen {
    display: none;

}

.formulario__span {
    display: block;
    font-size: .8rem;
}

.formulario__label--imagen {
    font-size: 1rem;
    background-color: var(--gris);
    color: var(--blanco);
    font-weight: 400;
    border-radius: 5px;
    cursor: pointer;
}

.formulario__label {
    font-size: 1rem;
}

.formulario__imagen {
    width: 5rem;
    margin: 0 auto;
}</style>
