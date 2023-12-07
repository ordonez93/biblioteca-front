<script setup>
import { onMounted, ref } from 'vue'
import useLibros from '@/composables/useLibros'
import { useModalStore } from '@/composables/ModalSolicitud'

import SpinnerRegistro from '@/components/SpinnerRegistro.vue'

const { solicitarLibro, guardando, exito } = useLibros()

const store = useModalStore();

const usuario = ref('')
const error = ref('')

const solicitar = () => {
    if (!validarCorreo(usuario.value)) {
        error.value = 'Ingresa el correo institucional'
        setTimeout(() => {
            error.value = ''
        }, 2500)
        return
    }

    solicitarLibro(usuario, store.libro)
}


function validarCorreo(correo) {
    // Verificar si el correo es institucional
    if (correo.endsWith("@itp.edu.co")) {
        return true;
    } else {
        return false;
    }
}

const cerrarNotificacion = () => {
    usuario.value = ''
    exito.value = false
    store.handleClickModal()
}

</script>

<template>
    <div v-if="store.modal" class="modal" id="modal">
        <div class="modal__contenido">

            <div class="card">
                <SpinnerRegistro v-if="guardando" />
                <div v-else>
                    <!-- mensaje de exito -->
                    <div v-if="exito" class="exito">
                        <div class="exito__imagen">
                            <img src="/img/ok.svg" alt="">
                        </div>
                        <div class="exito__contenido">
                            <p class="exito__titulo">Solicitud realizada</p>
                            <p class="exito__info">Ahora tienes dos días hábiles para reclamar tu libro en nuestra
                                biblioteca</p>
                        </div>
                        <div class="exito__btn">
                            <button v-if="exito" @click="cerrarNotificacion"
                                class="formulario__btn formulario__btn--secundario"><font-awesome-icon
                                    :icon="['fas', 'xmark']" />
                                Cerrar</button>
                        </div>

                    </div>
                    <!-- contenido card -->
                    <div v-if="!exito" class="card__titulo">
                        <div class="card__titulo-flex">
                            <img src="/img/libros.png" alt="icono libro">
                            <div>
                                <h2 class="card__heading" id="card-nombre-libro">{{ store.libro.nombre_libro }}</h2>
                                <p class="subtitulo">{{ store.libro.autor_libro }}</p>
                            </div>

                        </div>

                    </div>
                    <div v-if="!exito" class="card__contenido">

                        <div class="card__imagen">
                            <img :src="store.libro.imagen" alt="imagen libro">
                        </div>
                        <div class="card__texto">

                            <p class="card__subtitulo">Año: <span class="dato">{{ store.libro.anio_publicacion }}</span></p>

                            <p class="card__subtitulo">Categoria: <span class="dato">{{ store.libro.categoria }}</span></p>

                            <p class="card__subtitulo">Disponible: <span class="dato">{{ store.libro.cantidad }}</span></p>

                            <div>
                                <hr>
                                <div>

                                    <input v-model="usuario" v-if="Number(store.libro.cantidad) > 1"
                                        class="formulario__input" type="email" name="emial-solicitud" id="email-solicitud"
                                        
                                        placeholder="correo institucional">


                                </div>

                                <div class="acciones">
                                    <button 
                                        @click="solicitar" :disabled="Number(store.libro.cantidad) === 0"
                                        :class="{ 'formulario__btn--disabled': Number(store.libro.cantidad) === 0 }"
                                        class="formulario__btn"
                                        ><font-awesome-icon :icon="['fas', 'paper-plane']" />
                                        Enviar</button>

                                    <button @click="store.handleClickModal()"
                                        class="formulario__btn formulario__btn--secundario"><font-awesome-icon
                                            :icon="['fas', 'xmark']" />
                                        Cerrar</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div v-if="error" class="error formulario__alerta">
                            <p class="error__msg"> {{ error }}</p>
                        </div>
                </div>
                
            </div>
        </div>

    </div>
</template>
<style scoped>
.exito {
    padding: 1rem;
}

.exito__imagen {
    width: 13rem;
    margin: 0 auto;
}

.exito__titulo {
    text-align: center;
    font-weight: 900;
    color: var(--gris);
    margin: 1rem auto;
}

.exito__info {
    text-align: center;
    margin-bottom: 3rem;
}

.exito__btn {
    display: flex;
    justify-content: center;
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

.card {

    background-color: var(--blanco);
    margin: 3rem auto;
    width: 80%;
    max-width: 400px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
}

.card__contenido {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
}

@media (min-width: 768px) {
    .card {
        margin: 10rem auto;
    }

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

.card__imagen {
    width: 8rem;
    margin: 0 auto;
}

@media (min-width: 768px) {
    .card__imagen {
        width: auto;
        margin: 0 auto;
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
    background-color: var(--gris);
}
.formulario__btn--disabled{
   
    opacity: 0.4;
    cursor: not-allowed;
}
.error__msg{
    text-align: center;
}
</style>