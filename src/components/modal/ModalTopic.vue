<template>
<div>
  <div class="modalBack">
    <div class="modal">
      
      <!-- delete topic -->
      <div class="deleteBox" v-if="operationModal == 'deletetopic'">
        <span class="deleteTopic">토픽을 삭제하시겠습니까 ?</span>
        <div class="btns">
          <button @click="$store.dispatch('deleteTopic', deleteTopicName), onResultBox(true), topicDeleteSuccess()">Delete</button>
          <button class="btnCancel" @click="modalClose()">Cancel</button>
        </div>
      </div>

      <!-- add partition -->
      <div class="addPartitionBox" v-if="operationModal == 'addpartition'">
        <span class="title">파티션 추가</span>
        <label>현재 파티션 수</label>
        <span class="nowPartition">{{topic.partitionCount}}</span>

        <label>새 파티션 개수</label>
        <input type="number" v-model="addPartitionForm.addCount"><br/>
        
        <div class="btns">
          <button @click="$store.dispatch('addPartitionByTopic', addPartitionForm), onResultBox(true), topicModifyPartitionSuccess()">Add</button>
          <button class="btnCancel" @click="modalClose()">Cancel</button>
        </div>
      </div>

      <!-- modify config -->
      <div class="updateConfig" v-if="operationModal == 'updateconfig'">
        <span class="title">설정 값 변경</span>
        <div class="configsBox" v-for="a, i in boxes" :key="i">
          <select v-model="list[i]" @change="setConfigValue(list[i], i)">
            <option disabled value="">Config</option>
            <option v-for="a, i in configsForm.configs" :key="i">{{a.key}}</option>
          </select>

          <input type="text" placeholder="value" v-model="configsForm.configs[indexValue[i]].value">
          <button class="deleteBoxBtn" @click="deleteBox()" v-if="i > 0">×</button>
        </div>
        <button class="addBoxBtn" @click="addBox()">+</button>

        <div class="btns">
          <button @click="$store.dispatch('modifyTopicConfigs', configsForm), onResultBox(true), topicAlterConfigSuccess()">Update</button>
          <button class="btnCancel" @click="modalClose(), resetConfigs()">Cancel</button>
        </div>
      </div>

      <!-- modify replication factor -->
      <div class="modifyReplication" v-if="operationModal == 'reassignpartition'">
        <span class="title">리플리케이션 팩터 수 변경</span>
        <div class="replicationStatus">
          <label>기존 값</label>
          <span class="valueFrom">{{topic.partitionInfo[0].replicas}}</span>
          <label>브로커</label>
          <span class="valueFrom">{{cluster[1].brokers}}</span>
        </div>

        <div class="reassignReplication">
           <input type="number" class="modifyRepl" placeholder="new replication factor" v-model="replicationForm.replication">
        </div>

        <div class="btns">
          <button @click="$store.dispatch('modifyReplicationFactor', replicationForm), onResultBox(true), topicModifyPartitionSuccess()">Modify</button>
          <button class="btnCancel" @click="modalClose()">Cancel</button>
        </div>
      </div>

      <!-- modify leader -->
      <div class="modifyLeader" v-if="operationModal == 'modifyLeader'">
        <span class="title">파티션 리더 변경</span>
        <div class="partitionBox">
          <div class="partitionsLeader">
            <span>파티션</span>
            <select v-model="leaderVal" @change="setPartition()">
              <option v-for="a, i in topic.partitionCount" :key="i">{{a-1}}</option>
            </select>
            <span>현재 리더 {{topic.partitionInfo[leaderVal].leader}}</span>
          </div>
        </div>

        <div class="modifyLeaderValue">
           <input type="number" class="modifyRepl" placeholder="new leader" v-model="leaderForm.leader">
        </div>

        <div class="btns">
          <button @click="$store.dispatch('modifyLeader', leaderForm), onResultBox(true), topicModifyPartitionSuccess()">Modify</button>
          <button class="btnCancel" @click="modalClose()">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  <ResultBox/>
</div>  
</template>
<script>
import ResultBox from "@/components/utils/AlertResult.vue";
import { mapMutations, mapState } from 'vuex';
export default {
  name:'ModalBasic',
  props:{
    operationModal : String,
  },
  components:{
    ResultBox,
  },
  data(){
    return{
      checkedFlag:[false, false, false],
      deleteTopicName : '',
      addPartitionForm : {
        topicName : '',
        addCount : 0,
        servers : '',
      },

      configsForm : {
        topicName : '',
        servers : '',
        configs:[
          {
            key: '',
            value: '',
          }
        ],
      },
    
      list : ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],

      indexValue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],

      boxes: 1,

      replicationForm : {
        topicName : '',
        servers : '',
        replication : 1,
      },

      leaderForm : {
        topicName : '',
        servers : '',
        partition : 0,
        leader : 1,
      },

      leaderVal : 0,

    }
  },
  methods:{
    modalClose(){
      this.$emit('modalClose');
    },
    setConfigValue(data, i){
      console.log(data);
      console.log(i);
      for(var n in this.configsForm.configs){
        if(data == this.configsForm.configs[n].key){
          this.indexValue[i] = n;
          console.log(this.indexValue[i]);
        }
      }
    },

    resetConfigs(){
      for(var i in this.configsForm.configs){
        this.configsForm.configs[i].value = '';
      }
      console.log(this.configsForm);
    },

    //변경 성공 시 이벤트
    topicDeleteSuccess(){
      setTimeout(()=>{
        if(this.resultSuccess == true){
          this.$store.dispatch('retrieveTopics', this.cluster[0].servers);
          this.$router.replace( this.routeDetail + '/topics');
        }
      }, 1500);
    },

    topicModifyPartitionSuccess(){
      setTimeout(()=>{
        if(this.resultSuccess == true){
          this.$store.dispatch('viewTopic', this.addPartitionForm.topicName);
          this.$router.replace( this.routeDetail + '/topics/detail');
          this.$emit('modalClose');
        }
      }, 1500);
    },

    topicAlterConfigSuccess(){
      setTimeout(()=>{
        if(this.resultSuccess == true){
          this.$store.dispatch('viewTopic', this.addPartitionForm.topicName);
          this.$router.replace( this.routeDetail + '/topics/detail');
          this.$emit('modalClose');
        }
      }, 1500);
    },

    //config input 박스  추가 & 삭제
    addBox(){
      this.boxes++;
      this.list.push(1);
    },

    deleteBox(){
      this.boxes--;
    },

    setPartition(){
      this.leaderForm.partition = this.leaderVal;
    },

    log(data){
      console.log(data);
    },

    ...mapMutations(['onResultBox']),
  },

  watch:{
    'addPartitionForm.addCount'(data){
      if(data < 0 || data < this.topic.partitionCount ){
        alert("현재 파티션보다 높은 수를 입력해 주세요");
        this.addPartitionForm.addCount = this.topic.partitionCount;
      }
    },

    'replicationForm.replication'(data){
      if(data < 1 || data > this.cluster[1].brokers){
        alert( "1 ~ " + this.cluster[1].brokers + " 중에서 리플리케이션 숫자를 정할 수 있습니다");
        this.replicationForm.replication = 1;
      }
    },

    'leaderForm.leader'(data){
      if(data < 1 || data > this.cluster[1].brokers){
        alert( "1 ~ " + this.cluster[1].brokers + " 중에서 리더를 정할 수 있습니다");
        this.leaderForm.leader = 1;
      }
    },
  },

  computed:{
    ...mapState(['topicName', 'resultSuccess', 'routeDetail', 'topic', 'topicConfigList', 'brokers', 'cluster', 'clusterList']),
  },

  mounted(){
    this.deleteTopicName = this.topicName;
    this.addPartitionForm.topicName = this.topicName;
    this.addPartitionForm.addCount = this.topic.partitionCount;
    this.configsForm.configs = this.topicConfigList;
    this.configsForm.topicName = this.topicName;
    this.replicationForm.topicName = this.topicName;
    this.leaderForm.topicName = this.topicName;

    this.configsForm.servers = this.cluster[0].servers;
    this.replicationForm.servers = this.cluster[0].servers;
    this.leaderForm.servers = this.cluster[0].servers;
    this.addPartitionForm.servers = this.cluster[0].servers;

  },
}
</script>

<style scoped>
  .modalBack{
    position:fixed;
    top:0px;
    right:0px;
    background:rgba(0,0,0,0.5);
    z-index:5;	
    width:100%;
    height:100%;
  }

  .modal{
    background:#fff;
    width:40%;
    margin:200px auto;
    padding:20px 35px;
    border-radius:10px;
    position:relative;
    max-height: 700px;
    text-align: left;
    box-sizing: border-box;
  }

  .deleteTopic{
    display:block;
    font-size:25px;
    text-align: center;
    margin-top:20px;
  }

  button{
    padding:5px 10px;
    font-size:18px;
    margin:0 10px;
    border-radius: 5px;
    background:none;
    border:1px solid #999;
    cursor: pointer;
  }

  button:hover{
    background:#40795A;
    color:#fff;
  }

  .btnCancel:hover{
    background-color: #F4563A;
    border:1px solid #F4563A;
    color:#fff;
  }

  .title{
    font-size:23px;
    display:block;
    text-align:left;
    width:100%;
    margin-left:0;
  }  

  label{
    font-size:19px;
    display:inline-block;
    width:30%;
    text-align: right;
  }

  input{
    display:inline-block;
    outline: none;
    margin-left:20px;
    margin-top:20px;
    padding:8px;
  }

  .btns{
    margin-top:40px;
    margin-bottom:20px;
    text-align: center;
  }

  /* addPartition */

  .nowPartition{
    font-size:30px; 
    display:inline-block;
    text-align: center;
    margin-left:10px;
    margin-right:45px;
  }

  .addPartitionBox input{
    font-size:20px;
    width:10%;
    border-radius: 5px;
    border:1px solid #aaa;
    text-align: center;
  }

  /* modify replication */

  .replicationStatus{
    background-color:#eee;
    padding:15px 0;
    text-align: center;
    width:100%;
    margin-top:20px;
  }

  .replicationStatus label{
    text-align: center;
    font-size:20px;
    width:20%;
    margin-bottom:10px;
  }

  .valueFrom{
    font-size:33px; 
    display:inline-block;
    text-align: center;
    margin-right:25px;
  }

  .reassignReplication{
    margin-top:15px;
    border:1px solid #40798A;
    width:100%;
    border-radius: 5px;
  }

  .reassignReplication span{
    text-align: center;
    padding:15px 0;
    font-size:19px;
    display:inline-block;
    width:100%;
    background:#95C3BE70;
  }

  .reassignReplication input{
    width:97%;
    margin:10px;
    text-align: center;
    border:none;
    font-size:45px;
  } 

  /* update config */

  .updateConfig label{
    font-size:21px;
    margin-right:20px;
    margin-top:30px;
  }

  .updateConfig .configsBox{
    margin-top:15px;
  }

  .updateConfig select{
    width:40%;
    font-size:21px;
    padding:8px 10px;
    border-radius: 5px;
    outline: none;
    border:1px solid #aaa;
    margin:0;
  }

  .updateConfig input{
    width:40%;
    font-size:21px;
    padding:5px 10px;
    border-radius: 5px;
    outline: none;
    border:1px solid #aaa;
    margin:0;
    margin-left:10px;
  }

  .updateConfig .addBoxBtn{
    margin:0;
    width:100%;
    padding:10px;
    border-radius: 5px;
    outline: none;
    border:1px solid #aaa;
    margin-top:15px;
  }

  .updateConfig .deleteBoxBtn{
    font-size:21px;
    padding:5px 10px;
    outline: none;
    border:1px solid #aaa;
    margin:0;
    margin-left:20px;
    width:7%;
  }

  .updateConfig .deleteBoxBtn:hover{
    background-color: #F4563A;
    border:1px solid #F4563A;
    color:#fff;
  }

  /* modify leader */

  .partitionBox{
    background-color:#eee;
    padding:15px 0;
    text-align: center;
    width:100%;
    margin-top:20px;
  }

  .partitionsLeader{
    text-align: center;
    font-size:20px;
    margin-bottom:10px;
  }

  .partitionsLeader span{
    font-size:23px;
  }

  .partitionsLeader select{
    margin:10px;
    margin-right:30px;
    border-radius: 5px;
    font-size:25px;
    padding:5px 10px;
    outline:none;
  }

  .valueFrom{
    font-size:33px; 
    display:inline-block;
    text-align: center;
    margin-right:25px;
  }

  .modifyLeaderValue{
    margin-top:15px;
    border:1px solid #40798A;
    width:100%;
    border-radius: 5px;
  }

  .modifyLeaderValue input{
    width:97%;
    margin:10px;
    text-align: center;
    border:none;
    font-size:45px;
  } 


</style>