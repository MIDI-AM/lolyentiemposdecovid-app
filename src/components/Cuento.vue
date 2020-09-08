<template>
    <div class="body-cuento">
      <div class="alert"><h1><br>Porfavor Gire La Pantalla <img :src="this.horizontal" width="100%"></h1></div>
      <span v-if="init && end" class="flecha der" @click.prevent="next"><img class="arrow" :src="this.srcNext"></span>
      <span v-if="init " class="flecha izq" @click.prevent="prev"><img class="arrow" :src="this.srcPrev"></span>
      <div class="pasta">
        <book :key="componentKey" class="book"
          :data="pages"
          :turnPageByHand="false"
          :showPageIndex="false"
          ref="book">
      <template slot-scope="prop">
        
        <img v-if="prop.page.cover" :src="prop.page.urlcover">
        <Contenido @playaudio="playing" class="contenido" :haveBigTitle="prop.page.haveBigTitle" :bigTitle="prop.page.bigTitle" :texto="prop.page.title" :pictogramas="prop.page.pictogramas" :audio="prop.page.audio" :btnFirst="goFirst" :fntNext="next" :haveMenu="prop.page.haveMenu" :haveInteracion="prop.page.haveInteracion" ref="cont" />
      </template>
      
    </book>
    </div>
    <br>
    </div>
</template>

<script>
import Contenido from './Contenido'
import book from 'vue-book-component'
import Vue from 'vue'

export default {
    name: 'Cuento',
    components: {book, Contenido},
    data: function(){
        return{
            componentKey: 0,
            playingAud : false,
            initBook:false,
            srcPrev: require('../assets/prev.png'),
            srcNext: require('../assets/next.png'),
            horizontal: require('../assets/horizontal.png'),
            init: false,
            end: false,
            date: undefined,
            pages: [
                {cover: true, urlcover: require('../assets/cover.jpg')},
                {cover:false, haveBigTitle: true ,bigTitle: "Loly en tiempos de Covid con Kike y Gaby", haveMenu: false},
                {cover: true, urlcover: require('../assets/opening.jpg')},
                {cover:false, haveMenu: true, title: '',  pictogramas: [{url: require('../assets/images/HOLA.png')},{url: require('../assets/images/SOY.png')},{url: require('../assets/images/LOLY.png')},{url: require('../assets/images/DE.png')},{url: require('../assets/images/MIDI.png')},{url: require('../assets/images/Y.png')},{url: require('../assets/images/TE.png')},{url: require('../assets/images/ACOMPAÑARE.png')},{url: require('../assets/images/EN.png')},{url: require('../assets/images/ESTA.png')},{url: require('../assets/images/HISTORIA.png')}], audio: require('../assets/audios/opening.mp3')},
                { cover:true,  urlcover: require('../assets/scene_1.jpg'), title: ""},
                { cover:false,haveMenu: true, title: "En una bonita mañana de verano, KIKE sale al parque con sus padres para jugar con GABY, su vecina y mejor amiga. Era su rutina.", pictogramas: [{url:require('../assets/images/EN.png')},{url:require('../assets/images/UNA.png')},{url:require('../assets/images/BONITA.png')},{url:require('../assets/images/MAÑANA.png')},{url:require('../assets/images/DE.png')},{url:require('../assets/images/VERANO.png')},{url:require('../assets/images/KIKE.png')},{url:require('../assets/images/SALE.png')}, {url:require('../assets/images/AL.png')} , {url:require('../assets/images/PARQUE.png')}, {url:require('../assets/images/CON_.png')}, {url:require('../assets/images/SUS_KIKE.png')}, {url:require('../assets/images/PADRES.png')}] ,audio: require("../assets/audios/scene_1.mp3") },
                { cover:true,  urlcover: require('../assets/scene_2.jpg'), title: ""},
                {cover:false,haveMenu: true, title: "En una bonita mañana de verano, KIKE sale al parque con sus padres para jugar con GABY, su vecina y mejor amiga. Era su rutina.", pictogramas: [{url:require('../assets/images/SU_KIKE.png')},{url:require('../assets/images/RUTINA.png')},{url:require('../assets/images/ERA.png')},{url:require('../assets/images/JUGAR.png')},{url:require('../assets/images/CON_.png')}, {url:require('../assets/images/GABY.png')}, {url:require('../assets/images/SU_KIKE.png')},{url:require('../assets/images/VECINA.png')}, {url:require('../assets/images/Y.png')}, {url:require('../assets/images/MEJOR.png')}, {url:require('../assets/images/AMIGA.png')}], audio: require("../assets/audios/scene_2.mp3")},
               { cover:true, urlcover: require('../assets/scene_3.jpg'), title: ""},
                { cover:false,haveMenu: true, title: "Un día los padres muy preocupados le dijeron a KIKE que ya no podría salir a jugar por culpa de un virus malvado.", pictogramas: [{url:require('../assets/images/UN.png')},{url:require('../assets/images/DIA.png')},{url:require('../assets/images/LOS.png')},{url:require('../assets/images/PADRES.png')},{url:require('../assets/images/MUY.png')},{url:require('../assets/images/PREOCUPADOS.png')},{url:require('../assets/images/LE.png')},{url:require('../assets/images/DIJERON.png')},{url:require('../assets/images/A.png')},{url:require('../assets/images/KIKE.png')}, {url:require('../assets/images/QUE.png')} , {url:require('../assets/images/YA.png')}, {url:require('../assets/images/NO.png')}, {url:require('../assets/images/PODRIA.png')}, {url:require('../assets/images/SALIR.png')},{url:require('../assets/images/A.png')},{url:require('../assets/images/JUGAR.png')}] ,audio: require("../assets/audios/scene_3.mp3") },
                { cover:true, urlcover: require('../assets/scene_4.jpg'), title: ""},
                { cover:false,haveMenu: true, title: "Un día los padres muy preocupados le dijeron a KIKE que ya no podría salir a jugar por culpa de un virus malvado.", pictogramas: [{url:require('../assets/images/LA.png')},{url:require('../assets/images/RAZON.png')}, {url:require('../assets/images/ERA.png')}, {url:require('../assets/images/PORQUE.png')},{url:require('../assets/images/UN.png')}, {url:require('../assets/images/VIRUS_MALVADO.png')},  {url:require('../assets/images/HABIA.png')},{url:require('../assets/images/LLEGADO.png')},{url:require('../assets/images/A.png')}, {url:require('../assets/images/LA.png')},{url:require('../assets/images/CIUDAD.png')}] ,audio: require("../assets/audios/scene_4.mp3") },
                { cover:true, urlcover: require('../assets/scene_5.jpg'), title: ""},
                { cover:false, haveMenu: true,  title: "KIKE estaba muy triste porque no podía jugar con GABY.", pictogramas: [{url:require('../assets/images/KIKE.png')},{url:require('../assets/images/ESTABA.png')},{url:require('../assets/images/MUY.png')},{url:require('../assets/images/TRISTE.png')},{url:require('../assets/images/PORQUE.png')},{url:require('../assets/images/NO.png')},{url:require('../assets/images/PODIA.png')}, {url:require('../assets/images/JUGAR.png')} ,{url:require('../assets/images/CON_.png')} , {url:require('../assets/images/GABY.png')}],audio: require("../assets/audios/scene_5.mp3") },
                { cover:true,  urlcover: require('../assets/scene_6.jpg'), title: ""},
                { cover:false,haveMenu: true,   title: "Así que se le ocurrió una maravillosa idea para poder hablar con ella.", pictogramas:[{url:require('../assets/images/ASI.png')},{url:require('../assets/images/QUE.png')},{url:require('../assets/images/SE.png')},{url:require('../assets/images/LE.png')},{url:require('../assets/images/OCURRIO.png')},{url:require('../assets/images/UNA.png')},{url:require('../assets/images/MARAVILLOSA.png')},{url:require('../assets/images/IDEA.png')},{url:require('../assets/images/PARA.png')}, {url:require('../assets/images/PODER.png')} , {url:require('../assets/images/HABLAR_KIKE.png')}, {url:require('../assets/images/CON_.png')},{url:require('../assets/images/ELLA.png')}],audio: require("../assets/audios/scene_6.mp3") },
                { cover:true,  urlcover: require('../assets/scene_7.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/CON_.png')},{url:require('../assets/images/LA.png')},{url:require('../assets/images/AYUDA.png')},{url:require('../assets/images/DE.png')},{url:require('../assets/images/SUS_KIKE.png')},{url:require('../assets/images/PADRES.png')},{url:require('../assets/images/KIKE.png')},{url:require('../assets/images/CONSIGUE.png')},{url:require('../assets/images/UN.png')},{url:require('../assets/images/DOS_DEDO.png')}, {url:require('../assets/images/DE.png')} , {url:require('../assets/images/VASOS.png')},{url:require('../assets/images/Y.png')}, {url:require('../assets/images/UNA_DEDO.png')}, {url:require('../assets/images/CUERDA.png')},{url:require('../assets/images/MUY.png')},{url:require('../assets/images/MUY.png')},{url:require('../assets/images/LARGA.png')}],audio: require("../assets/audios/scene_7.mp3") },
                { cover:true,  urlcover: require('../assets/scene_8.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/Y.png')},{url:require('../assets/images/ASI.png')},{url:require('../assets/images/COMIENZAN.png')},{url:require('../assets/images/A.png')},{url:require('../assets/images/CONSTRUIR.png')},{url:require('../assets/images/UN_DEDO.png')},{url:require('../assets/images/INVENTO.png')},{url:require('../assets/images/PARA.png')},{url:require('../assets/images/HABLAR_KIKE.png')}, {url:require('../assets/images/CON_.png')}, {url:require('../assets/images/GABY.png')}, {url:require('../assets/images/SIN.png')}, {url:require('../assets/images/SALIR.png')}, {url:require('../assets/images/DE.png')}, {url:require('../assets/images/CASA.png')}],audio: require("../assets/audios/scene_8.mp3") },
                { cover:true,  urlcover: require('../assets/scene_9.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/HURRA.png')},{url:require('../assets/images/LO.png')},{url:require('../assets/images/HA.png')},{url:require('../assets/images/LOGRADO.png')},{url:require('../assets/images/CON_.png')},{url:require('../assets/images/LA.png')},{url:require('../assets/images/AYUDA.png')},{url:require('../assets/images/DE.png')},{url:require('../assets/images/SUS_KIKE.png')},{url:require('../assets/images/PADRES.png')},{url:require('../assets/images/KIKE.png')}, {url:require('../assets/images/PUDO.png')}, {url:require('../assets/images/TERMINAR.png')}, {url:require('../assets/images/SU_KIKE.png')},{url:require('../assets/images/INVENTO.png')}],audio: require("../assets/audios/scene_9.mp3") },
                
                { cover:true,  urlcover: require('../assets/scene_10.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/KIKE.png')},{url:require('../assets/images/LLAMO.png')},{url:require('../assets/images/A.png')},{url:require('../assets/images/SU_KIKE.png')},{url:require('../assets/images/INVENTO.png')},{url:require('../assets/images/VASOFONO.png')},{url:require('../assets/images/ES.png')}, {url:require('../assets/images/HORA.png')}, {url:require('../assets/images/PROBARLO.png')}, {url:require('../assets/images/CON_.png')}, {url:require('../assets/images/GABY.png')}],audio: require("../assets/audios/scene_10.mp3") },
                { cover:true,  urlcover: require('../assets/scene_11.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/CON_.png')},{url:require('../assets/images/LA.png')},{url:require('../assets/images/AYUDA.png')},{url:require('../assets/images/DE.png')},{url:require('../assets/images/SUS_KIKE.png')},{url:require('../assets/images/PADRES.png')},{url:require('../assets/images/KIKE.png')}, {url:require('../assets/images/ENVIA.png')}, {url:require('../assets/images/UNO_DEDO.png')},{url:require('../assets/images/DE.png')}, {url:require('../assets/images/LOS.png')}, {url:require('../assets/images/VASOS.png')}, {url:require('../assets/images/DE.png')}, {url:require('../assets/images/SU_KIKE.png')}, {url:require('../assets/images/INVENTO.png')},{url:require('../assets/images/A.png')},{url:require('../assets/images/GABY.png')}],audio: require("../assets/audios/scene_11.mp3") },
                { cover:true,  urlcover: require('../assets/scene_12.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/LA.png')},{url:require('../assets/images/MAMA_GABY.png')},{url:require('../assets/images/LIMPIA.png')},{url:require('../assets/images/EL.png')},{url:require('../assets/images/VASO.png')},{url:require('../assets/images/CON_.png')},{url:require('../assets/images/ALCOHOL.png')}, {url:require('../assets/images/EN_CASO.png')}, {url:require('../assets/images/DE.png')}, {url:require('../assets/images/QUE.png')}, {url:require('../assets/images/EL.png')}, {url:require('../assets/images/VIRUS_MALVADO.png')}, {url:require('../assets/images/SE.png')}, {url:require('../assets/images/HAYA.png')}, {url:require('../assets/images/ESCONDIDO.png')},{url:require('../assets/images/AHI.png')}],audio: require("../assets/audios/scene_12.mp3") },
                { cover:true,  urlcover: require('../assets/scene_13.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/ELLA_MAMA.png')},{url:require('../assets/images/LE.png')},{url:require('../assets/images/DA.png')},{url:require('../assets/images/EL.png')},{url:require('../assets/images/VASO.png')},{url:require('../assets/images/A.png')},{url:require('../assets/images/GABY.png')}, {url:require('../assets/images/Y.png')}, {url:require('../assets/images/LE.png')},{url:require('../assets/images/EXPLICA.png')}, {url:require('../assets/images/QUE.png')},{url:require('../assets/images/A_TRAVES.png')}, {url:require('../assets/images/DE.png')},{url:require('../assets/images/EL_VASO.png')},{url:require('../assets/images/PODRA.png')},{url:require('../assets/images/HABLAR_GABY.png')},{url:require('../assets/images/CON_.png')}, {url:require('../assets/images/KIKE.png')}],audio: require("../assets/audios/scene_13.mp3") },
                { cover:true,  urlcover: require('../assets/scene_14.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/HURRA.png')},{url:require('../assets/images/GABY.png')},{url:require('../assets/images/SI_GABY.png')},{url:require('../assets/images/PUEDE.png')},{url:require('../assets/images/ESCUCHARLO.png')},{url:require('../assets/images/EL.png')},{url:require('../assets/images/INVENTO.png')}, {url:require('../assets/images/DE.png')}, {url:require('../assets/images/KIKE.png')}, {url:require('../assets/images/HA.png')},{url:require('../assets/images/SIDO.png')}, {url:require('../assets/images/TODO.png')},{url:require('../assets/images/UN.png')}, {url:require('../assets/images/EXITO.png')}],audio: require("../assets/audios/scene_14.mp3") },
                { cover:true,  urlcover: require('../assets/scene_15.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/DESDE.png')},{url:require('../assets/images/ESE.png')},{url:require('../assets/images/DIA.png')},{url:require('../assets/images/KIKE.png')},{url:require('../assets/images/Y.png')},{url:require('../assets/images/GABY.png')},{url:require('../assets/images/CONVERSABAN.png')}, {url:require('../assets/images/TODAS.png')},{url:require('../assets/images/LAS.png')}, {url:require('../assets/images/MAÑANAS.png')}],audio: require("../assets/audios/scene_15.mp3") },
                { cover:true,  urlcover: require('../assets/scene_16.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/A.png')},{url:require('../assets/images/KIKE.png')},{url:require('../assets/images/LE.png')},{url:require('../assets/images/ENCANTA.png')},{url:require('../assets/images/HABLAR_KIKE.png')},{url:require('../assets/images/DE.png')},{url:require('../assets/images/SUS_KIKE.png')},{url:require('../assets/images/VIDEOJUEGOS.png')},{url:require('../assets/images/FAVORITOS.png')}],audio: require("../assets/audios/scene_16.mp3") },
                { cover:true,  urlcover: require('../assets/scene_17.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/A.png')},{url:require('../assets/images/GABY.png')},{url:require('../assets/images/LE.png')},{url:require('../assets/images/FASCINA.png')},{url:require('../assets/images/HABLAR_GABY.png')},{url:require('../assets/images/SOBRE.png')},{url:require('../assets/images/PINTAR.png')}],audio: require("../assets/audios/scene_17.mp3") },
                { cover:true,  urlcover: require('../assets/scene_18.jpg'), title: ""},
                { cover:false,haveMenu: true,  title: "Con la ayuda de sus padres, KIKE consigue un par de vasos y una cuerda muy, muy larga para hablar con GABY sin salir de casa.", pictogramas: [{url:require('../assets/images/ELLOS.png')},{url:require('../assets/images/SABEN.png')},{url:require('../assets/images/QUE.png')},{url:require('../assets/images/CUANDO.png')},{url:require('../assets/images/EL.png')},{url:require('../assets/images/VIRUS_MALVADO.png')},{url:require('../assets/images/HAYA.png')},{url:require('../assets/images/SIDO.png')},{url:require('../assets/images/VENCIDO.png')}, {url:require('../assets/images/PODRAN.png')},{url:require('../assets/images/JUGAR.png')}, {url:require('../assets/images/EN.png')}, {url:require('../assets/images/EL.png')}, {url:require('../assets/images/PARQUE.png')}, {url:require('../assets/images/OTRA.png')}, {url:require('../assets/images/VEZ.png')}],audio: require("../assets/audios/scene_18.mp3") },
                
              /*  { cover:true,  urlcover: require('../assets/end.jpg'), title: ""},*/
                {cover:false,haveMenu: true,  title: "", pictogramas: [{url:require('../assets/images/Y.png')},{url:require('../assets/images/COLORIN.png')},{url:require('../assets/images/COLORADO.png')},{url:require('../assets/images/ESTE.png')},{url:require('../assets/images/CUENTO.png')},{url:require('../assets/images/SE.png')},{url:require('../assets/images/HA.png')},{url:require('../assets/images/ACABADO.png')}], audio: require("../assets/audios/end.mp3") },
                {haveInteracion: true}
               
                ]      
        }
    }, mounted: function(){
        
       

    },
    methods: {
      playing(val){
        this.playingAud = val
      }
      ,
        next(){

         console.log(this.playingAud)

          if(!this.$refs.book.animating && !this.playingAud) {
         
          this.init = true
          this.end = true
          if(this.$refs.book.curPage === (this.pages.length/2)-1){
          this.end = false
          }
             this.$refs.book.next()
            this.$refs.book.resetAnimateClass()  
            console.log('page: ', this.$refs.book.curPage)
          }          
        }, 
        prev(){
          
          if(!this.$refs.book.animating && !this.playingAud){
          if(this.$refs.book.curPage === 2){
            this.init = false
          }
          if(this.$refs.book.curPage === (this.pages.length/2)){
          this.end = true
          }
            this.$refs.book.prev()
            this.$refs.book.resetAnimateClass()
          } 
          
        },
        goFirst(){ 
          if(!this.$refs.book.animating && !this.playingAud){
          this.componentKey += 1
          this.init = false
          }
       // window.location.reload()
        }
  }
}
</script>

<style>

.body-cuento{
  /* border: 3px solid blue; */
  box-sizing: border-box;
  width: 100%;
  height: 99vh;
  transition: .5s;
  position: relative;
}
.pasta{
   /*border: 1px solid green; */
   display: flex;
    justify-content: center;
    align-items: center;
  width: 94.5% !important;
  /*height: 99% !important;*/
  height: 100vh;
  background-image: url("../assets/pasta.png") !important;
  background-size:100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
  position: relative;
}
.book{
  position: absolute;
  margin: 0 auto;
  width: 98% !important;
  height: 96% !important;
  border: none !important;
  box-shadow: 0px 0px 20px  #888888;
}
.book img{
  width: 100%;
  height: 100%
}
.bigTitle{
  border: 2px solid black;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  /*display: flex;
    align-items: center;
    justify-content: center;*/
}

.flecha{
  cursor: pointer;
  z-index: 10;
  position: absolute;
}
.der{
  right: 10px;
  top: 45%;
}
.izq{
  left: 10px;
  top: 45%;
}
.arrow{
  width: 55px;
  height: auto;
}
.contenido{
  padding: 20px;
}

.alert{
  display: none;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-color:  rgba(0, 0, 0, 0.7);
}
.alert h1{
  background-color: white;
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 10px 30px;
  margin-top: 70px;
  border-radius: 10px;
}


@media only screen and (max-width: 1280px){
.body-cuento{
  /*height: 700px;*/
}
.arrow{
  width: 45px;
  height: auto;
}
}

@media only screen and (max-width: 1024px){
.body-cuento{
  /*height: 600px;*/
}
}

@media only screen and (max-width: 825px) {
.body-cuento{
  /*height: 375px;*/
}
.contenido{
  padding: 10px;
}
.der{
  right: 3px;
  top: 45%;
}
.izq{
  left: 3px;
  top: 45%;
}
.arrow{
  width: 35px;
}
}

@media only screen and (max-width: 640px) {
.body-cuento{
  /*height: 360px;*/
}

}

@media only screen and (max-width: 568px) {
.body-cuento{
  /*height: 320px;*/
}
}

/* PopUP Cambiar Orientación */
@media only screen and (max-width: 415px) {
  .alert{
    display: block;
  }
}


</style>