<template>
  <div id="container">
    <h2>{{topicName}}</h2>
    <div class="box">
      <div class="summary">
        <h4>토픽 정보</h4>
        <div class="contents">
          <div class="main">
            <span class="summaryHeaders">토픽 내 파티션 수</span>
            <span class="value">{{topic.partitionCount}}</span>
          </div>
          
          <div class="main">
            <span class="summaryHeaders">총 오프셋 수</span>
            <span class="value">{{topic.offsetsSum}}</span><br/>
          </div>

          <div class="main">
            <span class="summaryHeaders">리플리케이션 팩터</span>
            <span class="value">{{topic.partitionInfo[0].replicas}}</span>
          </div>

          <div class="main-c" @click="configToggle()">
            <span class="summaryHeaders">토픽 설정 값</span>
            <span class="value" v-if="configFlag == false">▼</span>
            <span class="value" v-else>▲</span>
          </div>

          <div class="topicConfigs" v-if="configFlag == true"> 
            <div class="configsBox" v-for="a, i in Object.entries(topic.configs)" :key="i">
              <span class="summaryHeaders">{{a[0]}}</span>
              <span class="value">{{a[1]}}</span>
            </div>
          </div>

        </div>
      </div>
      <div class="operation">
        <h4>토픽 변경</h4>
        <button v-for="item, iter in operations" :key="iter"
                @click="modalFlag = true, modalOpen(iter)"
        >{{item}}</button>
      </div>
    </div>

    <div class="partitionList">
      <h4>전체 파티션 목록</h4>
      <div class="listHeaders">
        <span v-for="a, i in partitionListHeaders" :key="i">{{a}}</span>
      </div>

      <div class="listBody">
        <div class="partitionItems" v-for="a, i in topic.partitionInfo" :key="i">
          <span>{{a.partition}}</span>
          <span>{{a.leader}}</span>
          <span>{{a.replicas}}</span>
          <span>{{a.isr}}</span>
        </div>
      </div>
    </div>

  </div>
  
  <transition name="topicModalEffect">
    <Modal v-if="modalFlag == true" :operationModal="operationModal" @modalClose="modalFlag = false"/>
  </transition>

</template>

<script>
import Modal from '@/components/modal/ModalTopic.vue';
import { mapState } from 'vuex';

export default {
  name:'TopicView',
  data(){
    return{
      operations : ['토픽 삭제', '파티션 추가', '설정 값 변경', '리플리케이션 팩터 수 변경', '파티션 리더 변경'], 
      operationModal : '',
      operationFlag : ['deletetopic', 'addpartition', 'updateconfig', 'reassignpartition', 'modifyLeader'],
      modalFlag: false,
      partitionListHeaders : ['파티션', '리더', '리플리케이션', 'ISR'],

      configFlag : false,
   }
  },
  components:{
    Modal,
  },

  methods:{
    modalOpen(i){
        this.operationModal = this.operationFlag[i]
    },

    configToggle(){
      this.configFlag = !this.configFlag;
    },
  },

  computed:{
    ...mapState(['topicName', 'topic']),
  }
}
</script>

<style scoped>
  h2{
    font-size:50px;
  }

  .box{
    display:flex;
    justify-content: space-between;
    margin-top:50px;
  }

  .summary, .operation{
    display:inline-block;
    width:50%;
    margin-right:40px;
  }

  .ex{
    font-size:16px;
  }
  
  h4{
    padding:20px;
    font-size:21px;
    margin:0;
    background:#fa825820;
  }

  .contents{
    width:100%;
    border-bottom:1px solid #ddd;
    font-size:17px;
  }

  .contents .main{
    display:flex;
    justify-content: space-between;
    border-top:1px solid #ddd;
  }

  .contents .main-c{
    display:flex;
    justify-content: space-between;
    border-top:1px solid #ddd;
    cursor: pointer;
  }

  .contents .main-c:hover{
    background: #40795A;
    color:#fff;
  }

  .contents span{
    padding:15px;
  }

  .summaryHeaders{
    width:35%;
  }

  .value{
    width:80%;
    text-align: right;
  }

  .operation button{
    display:block;
    width:100%;
    padding:15px;
    border:1px solid #bbb;
    background:none;
    cursor: pointer;
    border-radius: 5px;
    margin-top:10px;
    font-size:18px;
    box-shadow: 1px 1px 3px 1px #ccc;
    letter-spacing: -1px;
  }

  button:hover{
    background:#40795A;
    color:#fff;
  }

  .topicConfigs{
    border-top:1px solid #aaa;
    border-bottom:1px solid #aaa;
    display: block;
    max-height: 300px;
    overflow-y: auto;
  }

  .configsBox{
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #ccc;
    width:100%;
  }

  .configsBox span{
    font-size:18px;
    letter-spacing: 0px;
    padding-right:30px;
  }

  /* 파티션 리스트 */

  .partitionList{
    width:97%;
    margin-top:50px;
  }

  .listHeaders{
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin:20px 0;
    border-bottom: 1px solid #aaa;
    padding-bottom: 20px;
  }
  
  .listHeaders span{
    width:30%;
  }

  .listBody{
    max-height: 500px;
    overflow-y: auto;
  }

  .partitionItems{
    width:100%;
    font-size:18px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding:10px 0;
    margin-bottom:10px;
  }

  .partitionItems span{
    width:30%;
  }


  /* 모달 효과 */

  .topicModalEffect-enter-from{
    opacity: 0;
  }
  .topicModalEffect-enter-active{
    transition: all 0.5s;
  }
  .topicModalEffect-enter-to{
    opacity: 1;
  }

</style>