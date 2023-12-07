<script setup>

import { RouterView } from "vue-router";
import ModalSolicitud from '@/components/ModalSolicitud.vue'

//componentes
import Footer from "@/components/Footer.vue";
import navBar from "@/components/navBar.vue";

</script>

<template>
  <navBar/>
  <main >
    <router-view />
  </main>
   <Footer/>
   <ModalSolicitud/>
</template>
<style >
/* Estilos generales del formulario */
.formulario__encabezado {
    color: var(--gris);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
}
.logo{
    width: 3rem;
}

.formulario__contenido {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6rem auto;
    text-align: center;
}

@media (min-width: 992px) {
    .formulario__contenido {
        margin: 8rem auto;
    }
}

.formulario {
    width: 90%;
    max-width: 400px;
    padding: 1rem;
    border: 1px solid #ccc;
    background-color: var(--blanco);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.formulario__campo {
    margin-bottom: 20px;
}

.formulario__label {
    display: block;
    margin: 10px auto 5px auto;
    font-weight: bold;
    color: var(--gris);
}

.formulario__input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;

    border-radius: 4px;
}

.formulario__btn {
    width: 90%;
    font-size: 1rem;
    font-weight: 700;
    padding: 7px;
    background-color: var(--primary);
    color: var(--blanco);
    border: none;
    border-radius: 10px;
    cursor: pointer;
}

.formulario__alerta {
    margin-top: 1rem;
    font-size: 1rem;
    color: var(--blanco);
    font-weight: 700;
}

.error {
    background-color: rgb(167, 10, 10);
}
.formulario__icono{
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
}
.card{
    transition: transform .3s ease;
}
.card:hover{
    transform: scale(1.03);
}

.footer a{
    transition: transform .3s ease;    
}
.footer a:hover{
    transform: scale(1.1);
}
</style>

