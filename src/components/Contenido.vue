<template>
        <div class="wrapper">
            <div class="book-cover" v-if="haveBigTitle">
                <div class="book-cover-inner">
                    <h1 class="book-cover-title">{{bigTitle}}</h1><br>
                    <!-- <div v-if="log">
                        <h2>Bienvenido {{name}}!</h2>
                    </div> -->
                    <div class="info-form">
                        <input type="text" v-model="name" placeholder="INGRESA TU NOMBRE...">
                        <input type="number" v-model="age" placeholder="INGRESA TU EDAD...">
                        
                    </div>
                    
                        <div class="book-cover-buttons">
                            <a class="book-cover-button" @click="empezar">EMPEZAR</a>
                        </div>
                        
                        <div class="book-cover-control">
                                <img :src="this.srcAudioButton" class="btn">
                                <router-link to="/about"><img :src="this.srcCreditsButton" class="btn" @click.stop=""></router-link>
                                <a href="http://www.midi.espol.edu.ec"><img :src="this.srcCloseButton" class="btn"></a>
                            </div>
                </div>
            </div>
            <div class="wrapper-picto">
                <p v-if="change">VER</p>
                    <!-- <span class="tooltip-picto">{{p1.name}}</span> -->
                    <img class="picto" v-for="(p1,index) in p" :key="index" :src="p1.url" />
                
            </div>
           <!--  <div class="wrapper-text"> -->
                <!--  <span v-for="(s,i) in textoarray" v-bind:key="i" class="texto-span">{{s}}</span> -->
               <!--  <p>{{texto}}</p>
            </div> -->
            <audio  class="audio" :src="this.audio"></audio>
            <div v-if="haveMenu" class="buttons">
                 <!-- <div><img :src="this.srcHomeButton" class="btn"></div>  -->
                 <div><img :src="this.srcHomeButton" class="btn" @click.prevent="btnFirst"></div> 
                <div><img :src="this.srcAudioButton" class="btn" @click.stop=" clickpicto(), clickaudio()"></div>
                <div><router-link to="/about"><img :src="this.srcCreditsButton" class="btn" @click.stop=""></router-link></div>
                <div><a href="http://www.midi.espol.edu.ec"><img :src="this.srcCloseButton" class="btn"></a></div>
            </div>

            <Interacion v-if="haveInteracion" :date="this.date" />
        
        </div>
</template>

<script>
import gsap from 'gsap' 
import Interacion from './Interacion'
import Vue from 'vue'
import Toasted from 'vue-toasted';
import axios from 'axios';

Vue.use(Toasted)

export default {
    name: 'Contenido',
    components: {Interacion},
    props: {
        haveBigTitle:{
            type: Boolean
        },
        bigTitle:{
            type: String
        },
        texto:{
            type: String
        }, 
        pictogramas:{
            type: Array
        },
        audio: {
            type: String
        },
        btnFirst: {
            type: Function
        }, 
        haveMenu: {
            type: Boolean
        },
        fntNext:{
            type: Function
        } ,
        haveInteracion:{
            type: Boolean
        }
    },
    data(){
        return{
            date: undefined,
            change: false,
            textoarray:"",
            classtext:"visible", 
            created: false,
            p: [],
            name: undefined, 
            age: undefined,
            log: undefined, 
            playingg: false,
            srcAudioButton: require("../assets/audio_button.png"),
            srcHomeButton: require("../assets/home_button.png"),
            srcCreditsButton: require("../assets/creditos_button.png"),
            srcCloseButton: require("../assets/close_button.png")
        }
    },
    mounted(){
        this.p = this.pictogramas
        let res
        let code = "user"
        let d = new Date()
        res = code.concat(d.toJSON())
        console.log(res)

        /* if(!localStorage.getItem('name') && !localStorage.getItem('age')){
            this.log = false
        }else{
            this.log = true
            this.name = localStorage.getItem('name')
            this.age = localStorage.getItem('age')
        } */
    },
    
    methods: {
        empezar(){
            if(!this.name == '' && !this.age == ''){
                 this.log = true
                 localStorage.setItem('name', this.name)
                 localStorage.setItem('age', this.age)
                this.fntNext()
                
                let toast = this.$toasted.show("Hola! "+ this.name + " 👋👋", { 
                theme: "outline", 
                position: "bottom-center", 
                duration : 3000
                });

                if(!this.created){
                //this.date = new Date(Date.now()).toISOString().replace('T',' ').replace('Z','');
                this.date = new Date()
                this.date.toJSON()
                console.log(this.date.toJSON())
                localStorage.setItem('datereg', this.date.toJSON())
                this.createUser(this.name, this.age, '', '', this.date.toJSON(), 'larga')

                this.created = true
                }
               
            }else{
                //alert('Ingresa tu nombre y tu edad')
                localStorage.setItem('name', 'invitado')
                 localStorage.setItem('age', 0)
                 this.fntNext()

                 if(!this.created){
                     this.date = new Date()
                this.date.toJSON()
                console.log(this.date.toJSON())
                localStorage.setItem('datereg', this.date.toJSON())
                this.createUser('Invitado', 0, '', '', this.date.toJSON(), 'larga')

                this.created = true
                 }
            }
            
        },
        click2(){
            let cont=0
            let spans = this.$el.querySelectorAll('.texto-span')
            spans.forEach(element => {
                element.className += " hide"
            });
            let t = setInterval(()=>{
                spans[cont].classList.toggle("hide")
                gsap.from(spans[cont],{duration: 1.5, y:60, opacity: 0, ease: "power3"})
                console.log(cont, this.classtext)     
                cont++
                if(cont===this.textoarray.length){
                    clearInterval(t)
                } 
            },300)            
        }
        , 
        clickpicto(){
            
            if(!this.playingg){
                let cont = 0
                let pictos = this.$el.querySelectorAll('.picto')
                pictos.forEach(element => {
                    element.className += " hide"
                });
            
            let t = setInterval(()=>{
                pictos[cont].classList.toggle("hide")
                gsap.from(pictos[cont], {duration: .5, y: 60, opacity: 0/*, ease:'elastic'*/})
                cont++
                if(cont===pictos.length){
                    clearInterval(t)
                   /*  pictos.forEach(element => {
                    element.className += " hide"
                    });
                    pictos.forEach(element => {
                     element.classList.toggle("hide")
                    });*/
                }
            }, 420)

            }else{
               

            }
            
        }
        ,

        clickaudio(){
                 let a = this.$el.querySelector('audio')
                
               console.log(this.$parent.animating)
               this.playingg = true
               this.$emit('playaudio', this.playingg )
              
               
               a.play()
               a.addEventListener("ended", ()=>{ this.playingg = false; this.$emit('playaudio', this.playingg )}, false);
               // }
        },
        createUser(n, e, p, a, f, v){
            axios.post('https://loly-covid-data.herokuapp.com/api/usuarios', {
            nombre: n,
            edad: e, 
            personaje_favorito: p,
            actividad_favorita: a, 
            fecha_registro: f,
            version_cuento: v
                })
                .then(function (response) {
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

.book-cover{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:10px 30px;
    font-size: 24pt;
    display: flex;
    justify-content: center;
    align-items: center;
}
.book-cover-title{
    margin: 0;
}
.book-cover-control{
   padding-top: 10px;
}
.book-cover-buttons{
    margin: 0 auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
    
}
.book-cover-button{
    display: unset;
    box-sizing: border-box;
    color: #8D743B;
    background-color: #F4E695;
    padding: 10px;
    border: 6px solid #2EC183;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 15px;
}
.info-form input{
    font-weight: bolder;
    color: #8D743B;
    background-color: #F4E695; 
    border: 6px solid #2EC183 ;
    box-sizing: border-box;
    padding: 10px;
    margin: 0px 2px;
    border-radius: 15px;
}
.hide{
  visibility: hidden;
}

.visible{
    visibility: visible;
}
.wrapper{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    border-left: 1px solid rgb(204, 204, 204);
}
.wrapper-picto{
    box-sizing: border-box;
    padding: 0px 25px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-direction: row;
   flex-wrap: wrap;
   /* Or do it all in one line
     with flex flow */
   flex-flow: row wrap;
   /* tweak where items line
      up on the row
      valid values are: flex-start,
      flex-end, space-between,
      space-around, stretch */
   align-content: flex-end;
}
.picto{
    box-sizing: border-box;
    padding: 0px 10px;
    width: 16.6%;
    /*display: flex;
    align-items: flex-start;*/
}
.wrapper-text{
   
    box-sizing: border-box;
    padding-top: 150px;
    font-size: 18pt;
    text-align: left;
}
.buttons{
    position: absolute;
    display: block;
    margin: 0;
    width: 100%;
    bottom: 1%;
    box-sizing: border-box;
}
.buttons div{
    width: 25%;
    float: left;
    display: block;
   text-align: center;
}
.btn{
    width: 70px;
    height: auto;
}
.btn:hover{
   cursor: pointer;
}
.btn:active{
   transform: scale(0.95,0.95);
}
@media only screen and (max-width: 1440px) {
.book-cover{
    font-size: 20pt;
}
.btn{
    width: 60px;
}
}
@media only screen and (max-width: 1200px) {
    .book-cover{
    font-size: 16pt;
}
  .wrapper-text{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14pt;
}
.picto{
    width: 16.6%;
}

.btn{
    width: 40px;
    height: auto;
}
}
@media only screen and (max-width: 1024px) {
.book-cover{
    font-size: 14pt;
    padding:10px 20px;
}
.btn{
    width: 40px;
}
.wrapper-picto{
    padding: 0px 10px;
}
.picto{
    width: 16.6%;
    padding: 0px 5px;
}
.book-cover-button{
    font-size: 10pt;
}
}

@media only screen and (max-width: 820px) {
    .book-cover{
    font-size: 12pt;
}

.info-form input{
    padding: 5px;
    border: 6px solid #2EC183;
    margin-bottom: 3px;
}
  .wrapper-text{
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 10pt;
    padding: 0;
}
.wrapper-picto{
    padding: 0px 5px;
}
.book-cover-button{
    
    padding: 10px;
    border: 6px solid #2EC183;
    border-radius: 15px;
    margin-top: 15px;
}
.picto{
    width: 20%;
}
}

@media only screen and (max-width: 720px) {
    .book-cover{
    font-size: 10pt;
    padding:5px 10px;
}
  .wrapper-text{
    margin-top: 15px;
    margin-bottom: 15px;
   font-size: 10pt;
}
.picto{
    padding: 2px;
}
.btn{
    width: 35px;
    height: auto;
}
.BigTitle{
    font-size: 12pt;
}
.info-form input{
  
    border: 3px solid #2EC183;
    border-radius: 10px;
}
.book-cover-button{
    border: 3pt solid #2EC183;
    border-radius: 15px;
}
.buttons{
    bottom: 0;
}
}

@media only screen and (max-width: 640px) {
.wrapper-text{
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 10pt;
}

.book-cover-button{
    border: 3pt solid #2EC183;
    border-radius: 15px;
}

}

</style>