<script setup>
import Mapa from '@/components/Mapa.vue'

</script>

<template>
  <hr class="trazo">
  <div class="contenedor">
    <section class="contenedor nosotros">
      <div class="contenido-nosotros">
        <h2>Biblioteca ITP</h2>
        <p>Bienvenidos a la Biblioteca del <span style="color: var(--primary); font-weight: 700;">Instituto Tecnológico
            del Putumayo</span>, un espacio dedicado al conocimiento, la
          investigación y el enriquecimiento académico de nuestra comunidad educativa. En nuestra biblioteca, nos
          esforzamos por fomentar el acceso a la información y promover la cultura del aprendizaje en todas sus formas.
        </p>
        <img class="icono__home" src="/img/libros.png" alt="">
      </div>
    </section>
    
    <main class="razones">
      <h2 class="razones__heading">
        ¿Por qué leer?
      </h2>
      <div class="razones__contenedor">
        <div class="razones__grid">
          <div class="razones__imagen">
            <img src="/img/img1home.jpg" alt="app cucleus">
          </div>
          <div class="listado">
            <div class="listado__elemento">
              <h2 class="listado__heading">Conocimiento</h2>
              <p class="listado__texto">
                La lectura amplía nuestro conocimiento, permitiéndonos explorar nuevas ideas, culturas y perspectivas, y
                proporcionando acceso a información valiosa.
              </p>
            </div>
            <div class="listado__elemento">
              <h2 class="listado__heading">Desarrollo Personal</h2>
              <p class="listado__texto">
                Leer fortalece la mente y fomenta el desarrollo personal al mejorar la concentración, la empatía y las
                habilidades cognitivas, contribuyendo así al crecimiento individual.
              </p>
            </div>
            <div class="listado__elemento">
              <h2 class="listado__heading">Entretenimiento y Relajación</h2>
              <p class="listado__texto">
                La lectura ofrece una vía única de entretenimiento y relajación, transportándonos a mundos imaginarios,
                reduciendo el estrés y ofreciendo momentos de escape y disfrute.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <section class="devolver">
    <div class="devolver__contenedor">

      <div class="devolver__grid">
        <div class="mapa__seccion">
          <div class="mapa__elemento">
            <h2 class="devolver__heading">¿Dónde devolver?</h2>
            <p class="mapa__texto">
              Todos los libros de devuelven personalmente en nuestra bibilioteca, con esto evitas tener inconvenientes con
              el paz y salvo.
            </p>
          </div>
        </div>
        <div >
          <Mapa/>
        </div>
      </div>
    </div>
  </section>

  <section class="actividades">
    <div class="actividades__contenedor">
      <h2 class="actividades__heading">
        Activiades
      </h2>
      <div class="actividades__grid">
        <div class="actividades__contenido">
          <p class="actividades__titulo">
            El saber como arma de vida
          </p>
          <div class="listado">
            <p class="actividades__texto">La donación de libros es una puerta abierta al conocimiento y la oportunidad.
              Cada libro donado es una
              semilla para el aprendizaje, contribuyendo a construir comunidades educadas y enriquecidas. Donar libros es
              más que regalar páginas impresas; es ofrecer la llave que desbloquea el acceso a la imaginación y el
              crecimiento, especialmente para aquellos con recursos limitados.</p>
          </div>
        </div>
        <!-- .actividades__contenido -->

        <div class="actividades__video">
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/2r0q6WWYzxk?si=O40zgXFDz94nFczz"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </section>

  <section class="testimoniales">
    <div class="testimoniales__contenedor">


      <div class="testimoniales__grid">
        <div class="testimonial">
          <p class="testimonial__texto">
            La lectura es para la mente lo que el ejercicio es para el cuerpo.
          </p>
          <div class="testimonial__autorFecha">
            <p class="testimonial__autor">
              - Joseph Addison
            </p>

          </div>

        </div>
        <div class="testimonial">
          <p class="testimonial__texto">
            Un lector vive mil vidas antes de morir. Aquel que nunca lee vive solo una.
          </p>
          <div class="testimonial__autorFecha">
            <p class="testimonial__autor">
              - George R.R. Martin
            </p>

          </div>

        </div>
        <div class="testimonial">
          <p class="testimonial__texto">
            La lectura es la llave que abre las puertas a muchos buenos y maravillosos mundos.
          </p>
          <div class="testimonial__autorFecha">
            <p class="testimonial__autor">
              - Mary Pope Osborne
            </p>

          </div>

        </div>
        <div class="testimonial">
          <p class="testimonial__texto">
            La lectura es una conversación con los hombres más ilustres de los siglos pasados.
          </p>
          <div class="testimonial__autorFecha">
            <p class="testimonial__autor">
              - René Descartes
            </p>

          </div>

        </div>
        <div class="testimonial">
          <p class="testimonial__texto">
            Un libro abierto es un cerebro que habla; cerrado, un amigo que espera; olvidado, un alma que perdona;
            destruido, un corazón que llora.
          </p>
          <div class="testimonial__autorFecha">
            <p class="testimonial__autor">
              - Proverbio hindú
            </p>

          </div>

        </div>
        <div class="testimonial">
          <p class="testimonial__texto">
            La lectura hace al hombre completo; la conversación, ágil; y el escribir, preciso.
          </p>
          <div class="testimonial__autorFecha">
            <p class="testimonial__autor">
              - Francis Bacon
            </p>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.testimoniales__contenedor {
  margin-top: 5rem;
}

/* nosostros */

.nosotros {
  display: grid;
  background-image: url(/img/itp.png);
  background-repeat: no-repeat;
  background-position: bottom center;
}

@media (min-width: 920px) {
  .nosotros {
    background-image: url(/img/paisajistica.jpg);
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
}

.contenido-nosotros {
  background-color: var(--blanco);
  padding: 2rem;
}

@media (min-width: 920px) {
  .contenido-nosotros {
    grid-column: 2/4;
  }
}

.contenido-nosotros h2,
.contenido-nosotros p {
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: justify;
}

.contenido-nosotros h2 {
  text-align: center;
  font-size: 1rem;
}

@media (min-width: 920px) {
  .contenido-nosotros h2 {
    text-align: left;
    font-size: 1.5rem;
  }
}

/* main */
.razones {
  margin-top: 2rem;
}

.razones__heading {
  text-align: center;
  margin-bottom: 2rem;
}

.razones__grid {
  display: flex;
  flex-direction: column-reverse;
}



@media (min-width: 1400px) {
  .razones {
    margin-top: 8rem;
  }

  .razones__heading {
    margin-bottom: 3rem;
  }

  .razones__grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    align-items: center;
  }
}

.listado__elemento {
  box-shadow: 0px 0px 15px 1px rgb(0 0 0 / .15);
  padding: 1rem;
  margin-bottom: 2rem;
  transition: transform .3s;
  background-color: var(--blanco);
}

.listado__elemento:hover {
  transform: scale(1.05);
}

.listado__heading {
  color: var(--primary);
  font-size: 1.3rem;
  margin: 0;
}

@media (min-width: 768px) {
  .listado__heading {
    font-size: 1.5rem;
  }
}

.listado__texto {
  margin: 5px 0 0 0;
  font-size: .8rem;
  line-height: 1.5;
}

.razones__imagen {
  width: 80%;
  margin: 0 auto;
}

/* mapa */

.devolver {
  background-color: var(--primary);
  padding: 8rem 0;
  position: relative;
  margin: 1rem 0;
  overflow: hidden;
}

@media (min-width: 768px) {
  .devolver {
    padding: 8rem 5rem;
  }
}

.devolver::before,
.devolver::after {
  background-color: var(--blanco);
  content: '';
  height: 15rem;
  width: 120%;
  position: absolute;
}

@media (min-width: 768px) {

  .devolver::before,
  .devolver::after {
    height: 15rem;
  }
}

.devolver::before {
  top: -10rem;
  left: 0;
  transform: rotate(3deg);
}

.devolver::after {
  bottom: -10rem;
  left: 0;
  transform: rotate(-3deg);
}

.devolver__heading {
  color: var(--blanco);
  text-align: center;
  margin-bottom: 2rem;
}

.mapa__texto {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--blanco);
  line-height: 1.5;
}

@media (min-width: 768px) {
  .devolver__grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    align-items: center;
  }
}

/* actividades */

.actividades__heading {
  text-align: center;
  margin: 2rem;
}

.actividades__titulo {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--primary);
}

.actividades__texto {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 992px) {
  .actividades__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    align-items: center;
  }

  .actividades__heading {
    margin: 4rem;
  }

  .actividades__texto {
    font-size: 1.1rem;
    line-height: 1.5;
  }
}

@media (max-width: 768) {
  .actividades__video {
    margin: 0 auto;
  }
}

.actividades__video{
  transition: transform .3s ease;
}
.actividades__video:hover{
  transform: scale(1.05);
}
/* testimoniales */

.testimoniales {
  background-color: var(--blanco);
}

.testimoniales__heading {
  margin: 0;
  color: var(--gris);
  text-align: center;
  margin: 5rem auto 3rem auto;
}

@media (min-width: 768px) {
  .testimoniales__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

}

.testimonial {
  background-color: var(--blanco);
  padding: 2rem;
  margin-bottom: 1.4rem;
  box-shadow: 0px 0px 15px 3px rgb(0 0 0 / .15);
  position: relative;
}

.testimonial:last-of-type {
  margin-bottom: 0;
}

@media (min-width: 768px) {
  .testimonial {
    margin-bottom: 0;
  }
}

.testimonial__texto {
  font-size: 1rem;
  font-weight: 700;
  padding-left: 3rem;
  margin-bottom: 1rem;
}

.testimonial__texto::before {
  content: '';
  background-image: url(/img/comilla.png);
  background-repeat: no-repeat;
  background-size: 1rem;
  background-position: center;
  width: 2rem;
  height: 2rem;
  display: block;
  position: absolute;
  top: 10px;
  left: 10px;
}

.testimonial__autor {
  color: var(--primary);
  font-weight: 400;
}



@media (min-width: 768px) {
  .trazo {
    margin: 4rem;
  }
}

.icono__home {
  margin: 0 auto;
}

@media (min-width: 992px) {
  .icono__home {
    display: none;
  }
}
</style>