<template>
  <div id="container">
    <h2>브로커</h2>
    <table>
      <div class="head">
        <span v-for="a of brokerHeaders" :key="a">{{a}}</span>
      </div>
      <div class="body"> 
        <div class="broker" v-for="a, iter in brokers" :key="iter">
            <span class="box">{{brokers[iter].id}}</span>
            <span class="box">{{brokers[iter].host}}</span>
            <span class="box">{{brokers[iter].port}}</span>
            <span class="box">{{brokers[iter].bytesIn}}</span>
            <span class="box">{{brokers[iter].bytesOut}}</span>
        </div>
      </div>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'BrokerList',
  data(){
    return{
      brokerHeaders : ['Id', 'Host', 'Port', 'Bytes In', 'Bytes Out'],
    }
  },
  computed:{
    ...mapState(['routeDetail', 'brokers']),
  }
}
</script>

<style scoped>
  table{
    width:100%;
    margin-top:30px;
  }

  .head, .broker{
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
  }

  .head {
    border-bottom:1px solid;
    margin-bottom:-20px;
    letter-spacing: 0px;
  }

  .body{
    margin-top:30px;
  }

  .head span{
    width: 20%;
    text-align: center;
    margin:0 auto;
    font-weight: 700;
    font-size:25px;
  }

  .box{
    display:inline-block;
    width: 20%;
    text-align: center;
    font-size:23px;
    margin:0 auto;
    font-weight: 200;
    letter-spacing: 0px;  
  }

  .broker:hover{
    background-color:#eee;
  }

</style>