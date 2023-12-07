<script setup>
import { ref } from 'vue'
import { RouterLink } from "vue-router";
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
//mostrar barra lateral
const navMovil = ref(false);
const mostrarNavMovil = () => {
    navMovil.value = !navMovil.value;
};
const salirSitio = ()=>{
    if(auth.isAuth){
        auth.logout()
    }
}
</script>
<template>
    <header class="header contenedor">
        <div class="header__contenedor">
            <!-- header movil -->
            <div class="Header__movil">
                <div class="navegacion__logo--movil " v-if="!navMovil">
                    <RouterLink :to="{ name: 'home' }">
                        <img src="/img/itp.png" alt="Logotipo" />
                    </RouterLink>
                </div>
                <!-- boton movil  -->

                <button @click="mostrarNavMovil" id="menu__movil" class="menu__movil">
                    <font-awesome-icon v-if="!navMovil" :icon="['fas', 'bars']" />
                    <font-awesome-icon v-else :icon="['fas', 'x']" />
                </button>
                <!-- fin boton movil -->
            </div>
            <!--fin header movil -->
            <div class="navegacion" :class="{ navegacion__show: navMovil }">
                <div class="navegacion__logo">
                    <RouterLink :to="{ name: 'home' }">
                        <img src="/img/itp.png" alt="Logotipo" />
                    </RouterLink>
                </div>

                <nav class="navegacion__barra">

                  
                    <RouterLink @click="mostrarNavMovil" :to="{ name: 'home' }" class="navegacion__link">
                        Inicio
                    </RouterLink>
                    <RouterLink @click="mostrarNavMovil" :to="{ name: 'libros' }" class="navegacion__link">
                        Libros
                    </RouterLink>
                    <RouterLink @click="mostrarNavMovil" :to="{ name: 'autores' }" class="navegacion__link">
                        Autores
                    </RouterLink>

                    <RouterLink @click="mostrarNavMovil" :to="{ name: 'categorias' }" class="navegacion__link">
                        Categoria
                    </RouterLink>

                    <RouterLink @click="mostrarNavMovil, salirSitio()" :to="{ name: 'login' }"
                        class="navegacion__link navegacion__link--loging">
                        <font-awesome-icon :icon="['far', 'circle-user']" />
                        <span>{{ auth.isAuth ?  auth.isAuth.email.split('@')[0] : 'Ingresar'}}</span>
                    </RouterLink>
                    
                </nav>

            </div>


        </div>
    </header>
</template>
<style scoped>
/* header */

.header {
    width: 90%;
}

/* navegacion */
.navegacion {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 2rem;
}

@media (max-width: 992px) {
    .navegacion {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding-top: 2rem;
    }
}

.navegacion__barra {
    display: flex;
    gap: 1rem;
}

.navegacion__link {
    color: var(--gris);
    font-weight: 700;
    font-size: 1rem;
    padding: 0.3rem;
    text-transform: uppercase;
    transition: background-color 0.3s;
}

.navegacion__link:hover {
    background-color: var(--primary-hover);
    color: var(--blanco);
    border-radius: 0.5rem;
}

.navegacion__link--loging {
    background-color: var(--primary);
    border-radius: 5px;
    color: white;
    font-size: 1rem;
}

@media (max-width: 992px) {
    .navegacion__barra {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
}

@media (max-width: 992px) {
    .navegacion__barra {
        gap: 0.4rem;

    }

    .navegacion {
        margin-left: 1rem;
        height: 180rem;
        position: absolute;
        top: 0;
        left: 0;
        background: #2f3640;
        height: 100%;
        transform: translateX(-200px);
        padding: 30px;

        opacity: 0.9;
        justify-content: start;
        font-size: 1rem;
        transition: transform 0.8s ease-in-out;
        z-index: 1;
    }

    .navegacion__show {
        transform: translateX(-20px);
    }

    .item__show {
        display: block;
    }

    .navegacion__link:first-child {
        margin-top: 3rem;
    }

    .navegacion__link:last-child {
        margin-top: 3rem;
    }

    .navegacion__link {
        color: var(--blanco);
    }

    .navegacion__link:hover {
        border-bottom: 2px solid #fff;
    }
}







.navegacion__logo {
    max-width: 3rem;
}

@media (min-width: 768px) {
    .navegacion__logo {
        max-width: 4rem;
    }
}

/* movil responsive */

.Header__movil {
    padding: 0.4rem;
    display: none;
}

@media (max-width: 992px) {
    .Header__movil {
        display: block;
    }
}

.navegacion__logo--movil {
    max-width: 3rem;
    margin: .5rem 0;
}

.menu__movil {
    position: absolute;
    cursor: pointer;
    top: 2rem;
    right: 3rem;
    font-size: 2rem;
    border: none;
    background: transparent;
    transition-property: color;
    transition-duration: 0.3s;
}

.menu__movil:hover {
    color: var(--primary-hover);
}</style>