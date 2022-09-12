<template>
  <div id="container">
    <h2>토픽 만들기</h2>
    <div class="box">
      <div class="inputs">
          <label>토픽 이름 *</label>
          <input type="text" placeholder="topic name" v-model="topicForm.topicName">

          <label>파티션 수 *</label>
          <input type="number" placeholder="partitions" v-model="topicForm.partitions">

          <label>리플리케이션 팩터 *</label>
          <input type="number" placeholder="replication" v-model="topicForm.replication">

          <button @click="$store.dispatch('createTopic', topicForm), onResultBox(true), topicAddSuccess()">생성</button>
          <button class="btnCancel" @click="$router.go(-1)">취소</button>
      </div>
      <div class="options">
          <label>cleanup policy</label>
          <input type="text" v-model="topicForm.cleanupPolicy">

          <label>compression.type</label>
          <input type="text" v-model="topicForm.compressionType">
          
          <label>delete.retention.ms</label>
          <input type="number" v-model="topicForm.deleteRetention">
          
          <label>file.delete.delay.ms</label>
          <input type="number" v-model="topicForm.fileDeleteDelay">

          <label>max.message.bytes</label>
          <input type="number" v-model="topicForm.maxMessage">

          <label>segment.bytes</label>
          <input type="number" v-model="topicForm.segment">

          <label>min.insync.replicas (in related to your producer 'ack' value)</label>
          <input type="number" v-model="topicForm.minIsr">
      </div>
    </div>
  </div>

  <ResultBox/>
</template>

<script>
import ResultBox from "@/components/utils/AlertResult.vue";
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'TopicAdd',
  data(){
    return{
      topicForm:{
        topicName : '',
        partitions : 1,
        replication : 1,  
        cleanupPolicy : 'delete',
        compressionType : 'producer',
        deleteRetention : '86400000',
        fileDeleteDelay : '60000',
        maxMessage : '1048588',
        segment : '1073741824',
        minIsr : '1',
        servers : '',
      },
    }
  },
  methods:{
    ...mapMutations(['onResultBox']),

    topicAddSuccess(){
      setTimeout(()=>{
        if(this.resultSuccess == true){
          this.$store.dispatch('retrieveTopics', this.cluster[0].servers);
          this.$router.replace( this.routeDetail + '/topics');
        }
      }, 1000);
    },

    log(data){
      console.log(data);
    }
  },

  computed:{
    ...mapState(['resultSuccess', 'routeDetail', 'cluster']),
  },

  watch:{
    'topicForm.partitions'(data){
      if(data < 1){
        alert('1 이상 입력해야 합니다');
        this.topicForm.partitions = 1;
      }
    },

    'topicForm.replication'(data){
      if(data < 1){
        alert('1 이상 입력해야 합니다');
        this.topicForm.replication = 1;
        console.log(this.cluster[1].brokers);
      }

      if(data > 3){
        alert('현재 브로커 수(' + this.cluster[1].brokers + ') 보다 높게 설정할 수 없습니다');
        this.topicForm.replication = 3;
      }
    }
  },

  components:{
    ResultBox,
  },

  mounted(){
    this.topicForm.servers = this.cluster[0].servers;
  },
}
</script>

<style scoped>
  .box{
    display:flex;
    justify-content: flex-start;
  }

  .inputs, .options{
    width:20%;
    display:inline-block;
    margin-top:40px;
  }

  .inputs label, .inputs input, .options label, .options input{
    display:block;
    margin-bottom:10px;
    font-size:20px;
  }

  .options{
    width:40%;
    margin-left:100px;
  }

  .inputs input, .options input{
    margin-bottom: 30px;
    margin-left:4px;
    outline: none;
    padding:5px;
    border:1px solid #aaa;
    border-radius: 4px;
  }

  .inputs label{
    width:100%;
  }

  .options label{
    width:100%;
    letter-spacing: -1px;
  }

  .options input{
    color:#777;
    letter-spacing: -1px;
  }

  .addTopicBtns{
    margin-top:30px;
    text-align: left;
    padding:0;
  }

  button{
    margin-top:40px;
    margin-left:5px;
    margin-right:20px;
    background-color: white;
    border:1px solid #999;
    padding:5px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size:20px;
  }

  button:hover{
    background-color: #40795A;
    border:1px solid #40795A;
    color:#fff;
  }

  .btnCancel:hover{
    background-color: #F4563A;
    border:1px solid #F4563A;
    color:#fff;
  }

  .btnCancel{
    text-decoration: none;
    color:black;
  }
</style>