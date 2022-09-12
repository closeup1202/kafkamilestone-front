<template>
<div>


  <div class="modal">
    <!-- modify -->
    <div class="modify" v-if="modalFlag == 'modify'">
      <h2>클러스터 변경</h2>
      <div class="inputs">
        <label>클러스터 이름</label>
        <input type="text" v-model="clusterForm.clusterName" class="nameInput"><br/>

        <label>주키퍼 서버</label>
        <input type="text" v-model="clusterForm.servers" class="serversInput"><br/>

        <label>카프카 버전</label>
        <select v-model="clusterForm.version">
          <option class="kafkaversions" v-for="item in kafkaversion" :key="item">{{item}}</option>
        </select><br/>

        <label>사용 환경</label>
        <select v-model="clusterForm.active">
          <option class="active" v-for="item in activeVal" :key="item">{{item}}</option>
        </select>
      </div>
      <div class="btns">
        <button @click="$store.dispatch('modifyCluster', clusterForm), onResultBox(true), modalModifySuccess()">Modify</button>
        <button @click="modalCancel()" class="btnCancel">Cancel</button>
      </div>
    </div>

    <!-- delete -->
    <div class="delete" v-if="modalFlag == 'delete'">
      <h2>클러스터 삭제</h2>
      <span class="deleteAnnounce">클러스터를 삭제하시겠습니까 ?</span>
      <div class="btns">
        <button @click="$store.dispatch('deleteCluster', cluster[0].id), onResultBox(true), modalDeleteSuccess()">Delete</button>
        <button @click="modalCancel()" class="btnCancel">Cancel</button>
      </div>
    </div>
  </div>

  <ResultBox/>
</div>
</template>

<script>
import ResultBox from "@/components/utils/AlertResult.vue";
import kafkaversions from "@/assets/data/kafkaversions.js";
import {mapMutations, mapState} from 'vuex';

export default {
  name:'ModalCluster',
  props:{
    modalFlag : String,
  },
  components:{
    ResultBox,
  },
  data(){
    return{
      //form 
      kafkaversion : kafkaversions,
      activeVal : ['dev', 'qa', 'local', 'staging'],

      modalClose : false,
      nameErrorFlag : false,
      serversErrorFlag : false,
      updateClusterResult : false,

      // data form server
      clusterForm : { 
        id: this.$route.path.substring(1, this.$route.path.lastIndexOf('/')),
        clusterName : '',
        servers : '',
        version : '',
        active : '',
      },
    }
  },
  methods:{
    ...mapMutations(['onResultBox']),
    
    modalCancel(){
      this.$emit('modalClose');
    },

    modalModifySuccess(){
      setTimeout(()=>{
        if(this.resultSuccess == true){
          this.$emit('modalClose');
        }
      }, 1000);
    },
    
    modalDeleteSuccess(){
      setTimeout(()=>{
        if(this.resultSuccess == true){
          this.$router.push('/clusters');
          this.$store.dispatch('retrieveClusterAll');
        }
      }, 1000);
    },
    log(data){
      console.log(data);
    },
  },

  computed : {
    ...mapState(['updateClusterSuccess', 'cluster', 'resultSuccess', 'routeDetail']),
  },

  watch:{
    'clusterForm.clusterName'(data){
      console.log(data);
    },

    'clusterForm.servers'(data){
      console.log(data);
    },
  },
  mounted() {
    this.clusterForm.clusterName = this.cluster[0].clusterName;
    this.clusterForm.servers = this.cluster[0].servers;
    this.clusterForm.version = this.cluster[0].version;
    this.clusterForm.active = this.cluster[0].active;
  }
}
</script>

<style scoped>
  .modal{
    background:#fff;
    width:50%;
    position:fixed;
    top:20%;
    left:30%;
    padding:5px 30px;
    border-radius:10px;
    max-height: 700px;
    text-align: center;
    box-sizing: border-box;
    border:1px solid #eee;
    box-shadow: 1px 1px 6px 1px #aaa;
    letter-spacing: -2px;
  }

  h2{
    font-size:25px;
  }

  .inputs{
    margin-top:40px;
    text-align: left;
    margin-right:110px;
  }

  .inputs label, .inputs input, select{
    margin-bottom:10px;
    font-size:20px;
    display: inline-block;
  }

  .inputs label{
    text-align: right;
    width:30%;
    margin-left:15%;
  }

  .inputs input{
    margin-bottom: 30px;
    margin-left:30px;
    outline: none;
    padding:8px;
    border:none;
    border-bottom: 1px solid #aaa;
  }

  .serversInput{
    width:400px;
  }

  select{
    margin-left:30px;
    margin-bottom: 20px;
    outline: none;
    padding:8px;
    border-radius: 5px;
  }

  .inputs .JMXPollingChk{
    display:inline-block;
    width:2%;
    margin-top:20px;
  }

  /* delete */

  .deleteAnnounce{
    font-size:25px;
  }

  /* btns */

  .btns{
    margin:30px 0;
  }

  .btns button{
    margin:10px;
    background-color: white;
    border:1px solid #666;
    padding:5px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size:20px;
  }

  .btns button:hover{
    background-color: #40795A;
    border:1px solid #40795A;
    color:#fff;
  }

  .btns .btnCancel:hover{
    background-color: #F4563A;
    border:1px solid #F4563A;
    color:#fff;
  }

  .btns .btnCancel{
    text-decoration: none;
    color:black;
  }
</style>