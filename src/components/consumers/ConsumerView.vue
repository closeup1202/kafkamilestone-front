<template>
  <div id="container">
    <h2>{{consumerName}}</h2>
    <div class="list">
      <table>
        <div class="head">
          <span class="blankLeft"></span>
          <span class="headers">파티션</span>
          <span class="headers-o">오프셋</span>
          <span class="headers-l">LAG</span>
          <span class="headers">담당 코디네이터 서버</span>
          <span class="blankRight"></span>
        </div>
        <div class="body"> 
          <div class="box" v-for="a, i in consumer" :key="i">
            <span class="contents" >{{a.partition}}</span>
            <span class="contents-o" >{{a.consumerOffset}}</span>
            <span class="contents-l" v-if="a.lag == null">0</span>
            <span class="contents-l" v-else>{{a.lag}}</span>
            <span class="contents" >{{a.consumerInstanceOwner}}</span>
          </div>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'ConsumerView',
  data(){
    return{
      consumerDetailHeaders:['파티션', '오프셋', 'Lag', '담당 코디네이터 서버'],
    }
  },

  computed:{
    ...mapState(['consumer', 'consumerName']),
  },
}
</script>

<style scoped>
  h2{
    font-size:50px;
  }

 .list{
    padding:20px;
    max-height: 500px;
    margin-top:20px;
  }

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

  .headers{
    width:400px;
    text-align: center;
    font-size:18px;
    margin:0 auto;
    font-weight: 700;
    display:inline-block;
  }

  .headers-o, .headers-l{
    width:50px;
    text-align: center;
    font-size:18px;
    margin:0 auto;
    font-weight: 700;
    display:inline-block;
  }

  .blankLeft{
    width:10px;
  }

  .blankRight{
    width:27px;
  }


  .box{
    display:flex;
    justify-content: space-between;
    margin-top:10px;
    padding:10px;
  }

  .contents{
    width:400px;
    text-align: center;
    font-size:17px;
    margin:0 auto;
    display:inline-block;
    font-weight: 400;
    letter-spacing: -1px;
  }  

  .contents-o, .contents-l{
    width:50px;
    text-align: center;
    font-size:17px;
    margin:0 auto;
    display:inline-block;
    font-weight: 400;
    letter-spacing: -1px;
  }  
</style>