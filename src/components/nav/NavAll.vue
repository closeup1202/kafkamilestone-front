<template>
  <div>
    <button v-for="item, iter in menus" :key="iter" 
            @click="$router.push( routeDetail + routes[iter]), 
                    onChangeMenuBgc(iter), 
                    onGetKafkaData(item, routeDetail.substring(1), cluster[0].servers)" 
            :class="{ selec : selected[iter] }">
            {{item}}</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name:'NavAll',
  data(){
    return{
      menus : ['개요', '브로커', '토픽', '컨슈머'],
      routes : [ '/overview', `/brokers`, `/topics`, `/consumers`],
    }
  },
  watch:{
    $route(data){
      for(var iter in this.routes){
        if(data.path.endsWith(this.routes[iter])){
          this.onChangeMenuBgc(iter);
        }
      }
    }
  },
  methods:{
    onGetKafkaData(item, id, servers){
      switch(item){
        case '개요':
          console.log(id);
          this.$store.dispatch('retrieveClusterById', id);
          break;
        case '브로커':
          console.log(id);
          console.log(servers);
          this.$store.dispatch('retrieveBrokers', servers);
          break;
        case '토픽':
          console.log(id);
          this.$store.dispatch('retrieveTopics', servers);
          break;
        case '컨슈머':
          console.log(id);
          this.$store.dispatch('retrieveConsumers', servers);
          break;
      }
    },

    ...mapMutations(['onChangeMenuBgc']),
  },
  computed:{
    ...mapState(['routeDetail', 'selected', 'cluster']),
  }
}
</script>

<style scoped>
  button{
    border:none;
    cursor: pointer;
    background: none;
    text-align: right;
    margin-top:20px;
    font-size:20px;
    font-weight: 400;
    display:block;
    width:100%;
    letter-spacing: -2px;
  }

  .selec{
    text-decoration: underline;
    text-underline-position: under;
    text-decoration-color: #40794A;
    text-decoration-thickness: 3px;
  }
</style>