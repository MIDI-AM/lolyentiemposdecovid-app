<template>
    <div class="container">
        <!-- <h3>¡Felicidades! has llegado al final del cuento</h3> -->

        
        <div v-if="favSelected" >
            <h3>¡Hurra! Tu personaje favorito es:</h3>
            <div class="character-select">
                <img class="char-select" :src="favorito.url" alt="">
                <p class="name-item">{{favorito.name}}</p>
            </div>
        </div>
       <div v-else>
       <h3>¿Cúal fue tu personaje favorito?</h3>
       <div class="sel-charact">
           <div v-for="(char, index) in characters" v-bind:key="index" class="character" @click.prevent="selectCharacter(index)">
               <img class="fav-char" :src="char.url">
               <p class="name-item">{{char.name}}</p>
           </div>
        </div>   
       </div>
       

       
       <div v-if="actSelected" >
            <h3>¡Genial! lo que harás cuando el virus malvado se vaya es:</h3>
            <div class="character-select">
                <img class="act-select" :src="activitie.url" alt="">
                <p class="name-item">{{activitie.name}}</p>
            </div>
        </div>
       <div v-else>
       <h3>¿Qué harás cuando se vaya el virus malvado?</h3>
       <div class="sel-charact">
           <div v-for="(act, index) in activities" v-bind:key="index" class="character" @click.prevent="selectAct(index)">
               <img class="fav-char" :src="act.url">
               <p class="name-item">{{act.name}}</p>
           </div>
       </div>
       </div>
       
       <div  class="div-btn"><a class="btn-picto" @click.prevent="cambiar">Cambiar Respuestas</a> </div>
       <div class="div-btn"><a class="btn-picto" :href="pdfLink" download="plantilla_pictogramas" >Descargar Pictogramas</a></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Interacion',
    props: {
        date:{
            type: String
        }
    },
    data(){
        return{
            characters: [
                {name: 'Kike', url: require('../assets/images/KIKE-SELE.jpg')},
                {name: 'Gaby', url: require('../assets/images/GABY-SELE.jpg')},
                {name: 'Loly', url: require('../assets/images/LOLY-SELE.jpg')},
                {name: 'Papá de Kike', url: require('../assets/images/PAPAKIKE-SELE.jpg')},
                 {name: 'Mamá de Kike', url: require('../assets/images/MAMAKIKE-SELE.jpg')},
                {name: 'Mamá de Gaby', url: require('../assets/images/MAMAGABY-SELE.jpg')}
            ],
            activities: [
                {name: 'Hacer un vasófono', url: require('../assets/images/VASOFONO-SELE.jpg')},
                {name: 'Ir al parque', url: require('../assets/images/PARQUE-SELE.jpg')},
                {name: 'Leer más historias', url: require('../assets/images/HISTORIA-SELE.jpg')}
            ],
            favSelected: false,
            favorito: {}, 
            actSelected: false,
            activitie: {},
            pdfLink: require("@/assets/plantilla-picto.pdf"),
        }
    },
    mounted(){
        if(!localStorage.getItem('favChar') && !localStorage.getItem('activ')){
            localStorage.setItem('favChar','')
             localStorage.setItem('activ','')
        }
       else{
          // this.favorito = JSON.parse(localStorage.getItem('favChar'))
          // this.activitie = JSON.parse(localStorage.getItem('activ'))
          // this.favSelected = true
          // this.actSelected = true
          localStorage.setItem('favChar','')
             localStorage.setItem('activ','')
       }
    
    },
    methods: {
        selectCharacter( index ){
           if(localStorage.getItem('favChar')===''){
                localStorage.setItem('favChar', JSON.stringify(this.characters[index]))
                this.favSelected = true
                this.favorito = this.characters[index]
                this.updateUser()
                
           }else{
               console.log('REady fav')
           } 
        },
        selectAct( index ){
           if(localStorage.getItem('activ')===''){
                localStorage.setItem('activ',JSON.stringify(this.activities[index]))
                this.actSelected = true
                this.activitie = this.activities[index]
                this.updateUser()
           }else{
               console.log('REady activ')
           } 
        },
        cambiar(){
            localStorage.setItem('activ','')
            localStorage.setItem('favChar','')
             this.favSelected = false
             this.actSelected = false
        }
        ,
        updateUser(){
            axios.put('https://loly-covid-data.herokuapp.com/api/usuarios/'+localStorage.getItem('datereg'),{
                nombre: localStorage.getItem('name'),
            edad: localStorage.getItem('age'), 
            personaje_favorito: this.favorito.name,
            actividad_favorita: this.activitie.name, 
            fecha_registro: localStorage.getItem('datereg'),
            version_cuento: 'larga'
            }). then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    }
}
</script>

<style scoped>


div{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container{
    margin: 0 auto;
}

.sel-charact{
    display: flex;
    justify-content: center;

}
.character{
   width: 16.6%;
}
.char-select{
    width: 100px;
    height: auto;
}
.act-select{
width: 100px;
    height: auto;
}
.fav-char{
    width: 100%;
    height: auto;
}
.fac-act{
     width: 150px;
    height: auto;
}
.name-item{
    margin-top: 0;
}

.btn-picto{
    color: #8D743B;
    background-color: #F4E695;
    padding: 6px;
    border: 3px solid #2EC183;
    border-radius: 15px;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
    font-size: 14pt;
}

.div-btn{
    display: block;
    padding: 10px 0px;
}

@media only screen and (max-width: 1280px){

.btn-picto{
    font-size: 14pt;
}
.name-item{
    font-size: 10pt;
}
}
@media only screen and (max-width: 850px){
h3{
    margin-top: 0;
    margin-bottom: 0;
    font-size: 8pt;
}
.character{
    width: 60px;
   
}
.fav-char{
    width: 100%;
    height: auto;
}
.btn-picto{
    font-size: 10pt;
}
.name-item{
    font-size: 8pt;
}
.char-select{
    width: 60px;
    height: auto;
}
.act-select{
width: 60px;
    height: auto;
}
}
@media only screen and (max-width: 640px){
h3{
    margin-top: 0;
    margin-bottom: 0;
    font-size: 8pt;
}
.fav-char{
    width: 100%;
    height: auto;
}
.div-btn{
    display: block;
    padding: 5px 0px;
}
.btn-picto{
    box-sizing: border-box;
    font-size: 8pt;
    padding: 3px;
}
.name-item{
    font-size: 7pt;   
    margin-top: 0;
}
.char-select{
    width: 50px;
    height: auto;
}
.act-select{
width: 50px;
    height: auto;
}
}
</style>