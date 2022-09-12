<template>
  <div id="container">
    <h2>컨슈머</h2>
    <div class="list">
      <div class="search">
        <input type="text" placeholder="검색하기 (그룹명)" @input="search($event.target.value)" @keyup.delete="refresh()">
      </div>

      <table>
        <div class="head">
          <span class="headers" v-for="a of consumersHeaders" :key="a">{{a}}</span>
          <span class="blank"></span>
        </div>
        <div class="body"> 
          <div class="box" v-for="a, i in consumerList" :key="i" @click="$router.push( $route.path + '/detail' ), 
                                                                         $store.dispatch('viewConsumer', a.group)">
            <span class="contents">{{a.group}}</span>
            <span class="contents" v-if="a.type == false">not simple</span>
            <span class="contents" v-else>simple</span>
            <span class="contents" v-if="a.state == null">empty</span>
            <span class="contents" v-else>{{a.state}}</span>
          </div>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'ConsumerList',
  data(){
    return{
      consumersHeaders:['컨슈머 그룹', '타입', '상태'],
    }
  },
  methods:{
    search(data){
      let find = this.consumerListSaved.filter((a)=>{
        return a.group.indexOf(data) != -1;
      });
      this.$store.commit('onSearchSetConsumerList', find);
    },

    refresh(){
      this.$store.commit('onSearchSetConsumerList', this.consumerListSaved);
    },
  },

  computed:{
    ...mapState(['consumerList', 'consumerListSaved']),
  }
}
</script>

<style scoped>
  .list{
    padding:20px;
    max-height: 500px;
    margin-top:20px;
  }

  .search{
    padding-right:10px;
    text-align: right;
  }

  i{
    position:absolute;
    top:110px;
    right:280px;
    cursor: pointer;
  }

  .search input[type="text"]{
    padding:10px;
    outline: none;
    border:none;
    border-bottom:1px solid #aaa;
    width:300px;
    font-size:17px;
  }

/* list table */

  table{
    width:100%;
    margin-top:30px;
  }

  .head {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom:1px solid;
    margin-bottom:-20px;
  }

  .body{
    max-height: 500px;  
    margin-top:30px;
    overflow-y: scroll;
  }

  .headers, .contents{
    width: 20%;
    text-align: center;
    font-size:17px;
    margin:0 auto;
    font-weight: 700;
    display:inline-block;
    letter-spacing: -1px;
  }

  .blank{
    width:19px;
  }

  .box{
    display:flex;
    justify-content: space-between;
    margin-top:10px;
    padding:10px;
  }

  .box:hover{
    background:#40795A;
    color:#fff;
  }

  .contents{
    font-weight: 400;
  }
</style>