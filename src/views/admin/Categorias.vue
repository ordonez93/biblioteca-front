<script setup>
import { ref } from 'vue'
import useCategorias from '@/composables/useCategoria'
import { useAuthStore } from '@/stores/auth'

const { categoriasCollection, guardarCategoria, seleccionarCategoria, editarCategoria, eliminarCategoria, isEdit,modal } = useCategorias()


const auth = useAuthStore()
const categoria = ref('')
const estado = ref(true)
const error = ref('')


const enviarDatos = async () => {
  categoria.value = document.querySelector('#categoria').value

  if (!categoria.value) {
    error.value = 'Ingresa el nombre de la categoria'
    setTimeout(() => {
      error.value = ''
    }, 2500)
    return
  }
  if (isEdit.value) {
    editarCategoria(categoria.value, estado.value)
    return
  } else {
    guardarCategoria(categoria.value, estado.value)
  }

}

const mostrarModal = () => {
  modal.value = !modal.value;
}

const nuevo = () => {
  isEdit.value = false
}
</script>
<template>
  <h1 class="vista__heading">Listado de Categorías</h1>

  <hr>
  <br>
  <div class="contenedor">
    <div v-if="modal" class="modal" id="modal">
      <div class="formulario__contenido">
      <form class="formulario" @submit.prevent="enviarDatos">
        <h2>{{ isEdit ? 'Editar categoría' : 'Nueva categoria' }}</h2>
        <div class="formulario__campo">
          <label class="formulario__label" for="categoria">Categoria</label>
          <input type="text" class="formulario__input" id="categoria" placeholder="nombre de la cotegoria">
        </div>
        <div v-if="isEdit">
          <input v-model="estado" type="checkbox" id="estado">
        </div>
        <div>
          <input class="formulario__btn" type="submit" name="btn-categoria" id="btn-categoria"
            :value="isEdit ? 'Actualizar' : 'Guardar'">
            <input @click="mostrarModal()" class="formulario__btn formulario__btn--cerrar" type="button" name="btn-cerrar" id="btn-cerrar"
                    value="Cerrar">
        </div>
        <div v-if="error" class="error formulario__alerta">
          <p> {{ error }}</p>
        </div>
      </form>

    </div>
    </div>
   
      <!-- listado de categorias -->
    <div class="display__grid">
      <div class="card" v-for="categoria in categoriasCollection" :key="categoria.id">
      
      
        <div class="card__titulo">
          <div class="card__imagen">
              <img src="/img/categorias.svg" alt="">
            </div>
          <h2 class="card__heading" id="card-nombre-libro">{{ categoria.nombre_categoria }}</h2>
        </div>

        <div v-if="auth.isAuth" class="acciones">
          <button class="formulario__btn" @click="seleccionarCategoria(categoria.id),mostrarModal()"><font-awesome-icon :icon="['fas', 'pen-to-square']" /> Editar</button>
          <button class="formulario__btn formulario__btn--secundario" @click="eliminarCategoria(categoria.id)"><font-awesome-icon :icon="['fas', 'trash']" /> Eliminar</button>
        </div>
      
    </div>
    </div>
   
  </div>
  <div v-if="auth.isAuth" class="crear__nuevo">
    <p v-if="!modal" @click="mostrarModal(),nuevo()" class="nuevo"><font-awesome-icon :icon="['fas', 'square-plus']" /></p>
  </div>
</template>
<style scoped>

.nuevo{
    font-size: 3rem;
    color: var(--primary);
    transition: transform .3s ease;
}
.nuevo:hover{
    transform: scale(1.5) ;
}
.vista__heading{
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
@media (min-width: 992px){
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

.card {
    margin: 0 auto;
    width: 90%;
    max-width: 400px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.card__heading{
  font-size: 1rem;
}
@media (min-width: 768px) {
  .card__heading{
  font-size: 1.3rem;
}
}

.card__imagen{
  width: 3rem;
}


.card__titulo{
  display: flex;
  justify-content: center;
}




.acciones{
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
}
.formulario__btn--secundario{
    background-color: rgb(138, 0, 0);
}
/* modificaciones personalizadas a formulario */
.formulario{
    margin: 1rem;
}
@media (min-width: 768px) {
    .formulario{
    margin: 2rem 0;
}
}

.formulario__btn--cerrar{
    background-color: var(--gris);
    margin-top: 1rem;
}

.formulario__contenido {
    margin: 50% auto;
    text-align: center;
    
}

@media (min-width: 768px) {
  .formulario__contenido {
    margin: 10rem auto;
    
    
}
}


.formulario__label {
    font-size: 1rem;
}

</style>
