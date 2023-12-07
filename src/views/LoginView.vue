<script setup>
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'

const auth = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = () => {
    auth.login({ email: email.value, password: password.value })
}


</script>

<template>
    <div class="formulario__contenido">
        <form class="formulario" @submit.prevent="handleLogin">
            <div class="formulario__encabezado">
                <div class="logo" >
                    <img src="/img/itp.png" alt="Logotipo" />
                </div>
                <p>Bienvenidos</p>
                
            </div>
            <hr>
            <div class="formulario__campo">
                <label class="formulario__label" for="email">Email</label>
                <input class="formulario__input" v-model="email" type="email" name="email" id="email"
                    placeholder="Escribe tu email">
            </div>
            <div class="formulario__campo">
                <label class="formulario__label" for="pass">Contraseña</label>
                <input class="formulario__input" v-model="password" type="password" name="pass" id="pass"
                    placeholder="Escribe tu contraseña">
            </div>
            <div class="formulario__campo">
                <input class="formulario__btn" type="submit" name="ingresar" id="ingresar" value="Ingresar">
            </div>

            <div v-if="auth.errorMsg" class="error formulario__alerta">
                <p>{{ auth.errorMsg }}</p>
            </div>

        </form>
    </div>
</template>
<style scoped>


</style>



