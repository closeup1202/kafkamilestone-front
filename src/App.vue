<template>
  <header> 
    <svg class="m-blob2" id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(420.81188635397893 376.59935285017445)"><path d="M198.6 -133.7C224 -70.7 188.2 8.7 144.9 48.7C101.6 88.7 50.8 89.3 14.6 80.9C-21.7 72.5 -43.3 55 -77.4 20.3C-111.4 -14.3 -157.9 -66.2 -147.1 -120.7C-136.3 -175.3 -68.1 -232.7 9.2 -238C86.6 -243.3 173.2 -196.7 198.6 -133.7" fill="#40795a"></path></g></svg>
    <svg class="s-blob1" id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(437 292.65)"><path d="M100 3.7C100 32.3 50 64.7 6.5 64.7C-37 64.7 -74 32.3 -74 3.7C-74 -25 -37 -50 6.5 -50C50 -50 100 -25 100 3.7" fill="#c6135b"></path></g></svg>
    <span class="title" @click="$router.push('/')">kafka milestone</span>
  </header>
  <div class="display">
    <nav>
      <NavMainToggle :toggle="toggle" @togglingComp="toggling"/>
      <NavAll v-if="navAllFlag == true"/>
    </nav>
    <section> 
      <router-view></router-view>
    </section>
  </div>
</template> 


<script>
//component
import NavMainToggle from "@/components/nav/NavMain.vue";
import NavAll from "@/components/nav/NavAll.vue";
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'App',
  data(){
    return{
      toggle : false,
    }
  },
  components:{
    NavMainToggle,
    NavAll,
  },
  methods:{
    toggling(){
      this.toggle = (!this.toggle);
    },
    ...mapMutations(['getData', 'onChangeNavAll']),
  },
  computed:{
    ...mapState(['more', 'navAllFlag']),
  },
  watch:{
    $route(data){
      if(data.path == '/' || data.path == '/clusters' || data.path == '/addCluster' || data.path.endsWith('invalidUrl')){
        this.onChangeNavAll(false);
      } else {
        this.onChangeNavAll(true);
      }
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding:0;
    margin:0;
    margin-top:-10px;
    box-sizing: border-box;
    letter-spacing: -2px;
  }

  header{
    text-align: left;
    border-bottom:1px solid #ddd;
    padding-left:20px;
  }

  .m-blob2{
    position: absolute;
    top:-400px;
    left:-450px;
    z-index: -5;
  }

  .s-blob1{
    position: absolute;
    top:-290px;
    left:-470px;
    z-index: -5;
  }

  .title{
    font-size:30px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom:10px;
    margin-top:10px;
    padding:10px;
    display:inline-block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-left:100px;
  }
  
  /* main display : side nav + section */

  .display{
    height:800px;
    position:relative;
  }

  nav{
    position:absolute;
    top:0px;
    left:0px;
    width:300px;
    text-align: right;
    padding-top:20px;
    padding-right:25px;
    display:inline-block;
    height: 127%;
    border-right:1px solid #ddd;
  }

  section{
    position:absolute;
    width:70%;
    top:0px;
    left:340px;
    display:inline-block;
    height: 100%;
    padding-left:7%;
    padding-top:10px;
  }

  section h2{
    margin:0;
    margin-top:10px;
    text-align: left;
    letter-spacing: -2px;
    font-size:35px;
    font-weight: 500;
  }

  section #container{
    padding:0;
    text-align: left;
    width:100%;
  }
</style>

