<template>
  <div id="container">
    <h2>개요</h2>
    <div class="broker">
      <span class="title">브로커</span>
      <div class="box">
        <div class="contents"  v-for="item, iter in broker" :key="iter">
          <span class="value">{{valueList[iter]}}</span>
          <span class="detail">{{item}}</span>
        </div>
      </div>
    </div>

    <div class="topic">
      <span class="title">토픽</span>
      <div class="box">
        <div class="contents" v-for="item, iter in topic" :key="iter">
          <span class="value">{{valueList[iter + 3]}}</span>
          <span class="detail">{{item}}</span>
        </div>
      </div>
    </div>

    <div class="connect">
      <span class="title">매트릭</span>
      <div class="box">
        <div class="contents-m1">
          <span class="value" @mouseover="onMouseOver('clusterStatus')" @mouseout="onMouseLeave('clusterStatus')">{{valueList[6]}}</span>
          <span class="detail">cluster status</span>

          <!-- mouseover -->
          <div v-if="clusterStatusMouse == true" class="clusterStatus">
            <span v-if="valueList[6] == 'UP'">클러스터가 정상적으로 작동합니다</span>
            <span v-else>클러스터가 비정상적인 상태입니다</span>
          </div>
        </div>

        <div class="contents-m2">
          <span class="value" @mouseover="onMouseOver('metricStatus')" @mouseout="onMouseLeave('metricStatus')">{{valueList[7]}}</span>
          <span class="detail">available metrics(producer / consumer)</span>

          <!-- mouseover -->
          <div v-if="metricStatusMouse == true" class="metricStatus">
            <span v-if="valueList[7] == 'both'">Producer와 Consumer의 정보를 수집하고 있습니다</span>
            <span v-if="valueList[7] == 'producer'">Producer의 정보만 수집하고 있습니다</span>
            <span v-if="valueList[7] == 'consumer'">Consumer의 정보만 수집하고 있습니다</span>
            <span v-if="valueList[7] == 'none'">수집하고 있는 정보가 없습니다</span>
          </div>
        </div>

        <div class="contents">
          <span class="value" @click="openGrafana()"><u>Grafana</u></span>
          <span class="detail">metric external link</span>
        </div>
      </div>

    </div>
    
    <div class="btns">
      <button class="btnModify" @click="modalOpen('modify')">클러스터 수정</button>
      <button class="btnDelete" @click="modalOpen('delete')">클러스터 삭제</button>
    </div>

  </div>

  <ModalCluster v-if="modalOn == true" :modalFlag="modalFlag" @modalClose="modalOn = false"/>



</template>

<script>
import ModalCluster from '@/components/modal/ModalCluster.vue';
import { mapState } from 'vuex';

export default {
  name:'ClusterOverview',
  data(){
    return{
      broker : ['total', 'outgoing-byte-rate', 'incoming-byte-rate'],
      topic : ['total', 'partitions', 'out-of-sync replicas'],
      Health : ['status', 'connected', 'metric link'],
      
      valueList : [ ],

      modalOn : false,
      modalFlag : '',

      clusterStatusMouse : false,
      metricStatusMouse : false,
    }
  },
  components:{
    ModalCluster,
  },
  methods:{
    modalOpen(flag){
      this.modalOn = true;
      this.modalFlag = flag;
    },

    onMouseOver(data){
      if(data == 'clusterStatus'){
        this.clusterStatusMouse = true;
      }
      
      if(data == 'metricStatus'){
        this.metricStatusMouse = true;
      }

    },

    onMouseLeave(data){
      if(data == 'clusterStatus'){
        this.clusterStatusMouse = false;
      }

      if(data == 'metricStatus'){
        this.metricStatusMouse = false;
      }
    },

    openGrafana(){
      window.open('http://localhost:3000/d/8_G78tXnz/test?orgId=1')
    },
  },
  computed:{
    ...mapState(['cluster'])
  },
  mounted(){
    this.valueList = [...Object.values(this.cluster[1])];
  },
}
</script>

<style scoped>
  #container{ 
    padding:10px;
  }

  h2{
    margin:0;
  }

  .broker, .topic, .connect{
    width:80%;
    height: 30%;
    border-radius: 10px;
    padding:15px 20px;
    padding-bottom: 40px;
    padding-right:30px;
    margin-top:20px;
    box-shadow: 1px 1px 5px 3px #ddd;  
  }

  .title{
    font-size:25px;
    display:block;
    padding:0 10px;
    margin-left:0px;
    font-weight: 400;
    cursor: auto;
  }

  .box{
    display: flex;
    justify-content: space-between;
    margin-top:20px;
  }

  .contents{
    display:inline-block;
    border-radius: 10px;
    padding-right:30px;
  }

  .value{
    width:100%;
    display:block;
    text-align: center;
    height: 100px;
    font-size:60px;
  }

  .detail{
    width:200px;
    display:inline-block;
    text-align: center;
    font-size:17px;
    letter-spacing: -1px;
  }

  u{
    text-decoration-color: #40795A;
    cursor: pointer;
    text-underline-position: under;
  }

  .btns{
    margin-top:10px;
    width:81%;
    text-align: right;
    padding:20px 2px;
  }

  .btns button{
    padding:10px 30px;
    border-radius: 45px;
    border:1px solid #ddd;
    box-shadow: 1px 1px 3px 1px #ddd;
    margin:0 15px;
    font-size:20px;
    cursor: pointer;
    background:none;
  }

  .btnModify:hover{
    background-color: #40795A;
    color:#fff;
  }
  .btnDelete:hover{
    background-color: #F4563A;
    border:1px solid #F4563A;
    color:#fff;
  }

  /* mouseover */

  .contents-m1{
    position:relative;
    display:inline-block;
    border-radius: 10px;
    padding-right:30px;  
  }

  .clusterStatus{
    display:inline-block;
    position:absolute;
    top:-40px;
    left:100px;
    font-size:18px;
    border-radius: 10px;
    padding:10px;
    background:#fa825870;
    letter-spacing: -1px;
    width:300px;
  }

  .contents-m2{
    position:relative;
    display:inline-block;
    border-radius: 10px;
    padding-right:30px;    
  }

  .metricStatus{
    display:inline-block;
    position:absolute;
    top:-70px;
    left:110px;
    font-size:18px;
    border-radius: 10px;
    padding:10px;
    background:#fa825870;
    letter-spacing: -1px;
    width:300px;
  }

</style>