<template>
  <div class="about">
    
    <div>
      <h3>
        Kike y Gaby en Tiempos de Covid <br>
        Proyecto Integrador Multidisciplinario 1S-2020
      </h3>
      <p>
       
<strong>Dirección:</strong>

Nayeth Solorzano <br><br>
<strong>Tutores:</strong>
Nayeth Solorzano,
Da Hee Park Kim <br><br>
<strong>Psicólogos y Psicopedagogos:</strong>

Lenny Párraga,
Genesis Reyes <br><br>
<strong>Programación y desarrollo web:</strong>
 
César Arteaga,
Christian Castro <br><br>
<strong>Diseño de entornos, personajes y línea gráfica:</strong>
 
Hugo Cedeño,
Rebeca De la Cruz <br><br>
<strong>Voz de Loly:</strong>

Diana Macías <br><br>

<strong>Derechos Reservados ESPOL- FADCOM 2020</strong>


      </p>

      <img :src="this.espol" alt="" class="espol">
      <img :src="this.fadcom" alt="" class="fadcom">
      <img :src="this.midi" alt="" class="midi">

    </div>
    <router-link to="/"><img :src="this.srcHomeButton" class="btn"></router-link>
    <br> <button @click.prevent="limpiar">limpiar datos</button>
  </div>
  
</template>

<script>
export default {
  data(){
    return{
      espol: require('../assets/espol.png'),
      fadcom : require('../assets/fadcom.png'),
      midi: require('../assets/logomidi.png'),
       srcHomeButton: require("../assets/home_button.png"),
    }
  }, 
  methods: {
    limpiar(){
      localStorage.clear();
    }
  }
}
</script>

<style scoped>
.btn{
    width: 100px;
    height: auto;
   padding: 7px;
}
.fadcom{
  width: 350px;
}
.espol{
  width: 200px;
}
.midi{
  width: 90px;
}
img{
  
  margin-right: 10px;
}
@media only screen and (max-width: 830px) {
h3{
  font-size: 10pt;
}
p{
  font-size: 10pt;
}
.btn{
    width: 50px;
    height: auto;
   padding: 7px;
}

.fadcom{
  width: 200px;
}
.espol{
  width: 100px;
}
.midi{
  width: 50px;
}
@media only screen and (max-width: 600px) {
  h3{
  font-size: 9pt;
}
p{
  font-size: 8pt;
}
}
}
</style>