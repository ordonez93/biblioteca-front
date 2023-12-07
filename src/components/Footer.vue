<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
    <footer class="footer">
        <div class="contenedor_footer">
            <div class="footer__logo">
                <a href="#"><img src="/img/itp.png" alt="logo footer"></a>
            </div>
            <div class="footer__contacto">
                <a href="#">ir a Inicio</a>
                
                <a href="tel:3103310083"> <font-awesome-icon :icon="['fas', 'phone']" /> Cel: 310 331 0083</a>
            </div>
            <div class="redes">
                <a target="_blank" href="https://www.facebook.com/OficialITP?mibextid=ZbWKwL"><img src="/img/fb.png" alt="logo footer"></a>
                <a target="_blank" href="https://www.youtube.com/@ComunicacionesITP"><img src="/img/yt.png" alt="logo footer"></a>
            </div>
        </div>
        <p class="copyright">Todos los derechos reservados &copy;</p>
    </footer>
</template>
<style scoped>
.footer__contacto{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    font-weight: 700;
}
.contenedor_footer{
    margin-top: 5rem;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

@media (min-width: 768px){
    .contenedor_footer{
        flex-direction: row;
        justify-content: space-evenly;
    }
}
.copyright{
    margin-top: 2rem;
    color: var(--blanco);
    background-color: var(--gris);
    padding: 1rem;
    text-align: center;
}
.footer__logo{
    max-width: 5rem;
}

.redes{
    display: flex;
}

</style>