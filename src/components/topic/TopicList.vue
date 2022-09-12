<template>
  <div id="container">
    <h2>토픽</h2>
    <div class="total">
      <span class="totalHead">총 토픽 수</span>
      <span class="totalBody">{{topicList.length}}</span>
      <span class="totalHead">총 파티션 수</span>
      <span class="totalBody">{{totalPartition}}</span>
    </div>

    <div class="list"> 
      <div class="search">
        <div>
          <input type="text" class="search" @input="search($event.target.value)" placeholder="검색하기 (토픽 이름)" @keyup.delete="refresh()">
        </div>
        <button @click="$router.push(routeDetail + '/createTopic')">토픽 생성</button>
      </div>

      <table>
        <div class="head">
          <span class="headers">토픽</span>
          <span class="headers">cleanup policy</span>
          <span class="headers-p" @click="sortPartition(sortPartitionFlag)">파티션 수 
            <span v-if="sortPartitionFlag == true">▼</span>
            <span v-else>▲</span>
          </span>
          <span class="headers-r" @click="sortReplication(sortReplicationFlag)">리플리케이션 팩터 
            <span v-if="sortReplicationFlag == true">▼</span>
            <span v-else>▲</span>
          </span>
          <span class="blank"></span>
        </div>
        <div class="body"> 
          <div class="box" v-for="topic, i in topicList" :key="i" @click="$router.push( $route.path + '/detail' ), 
                                                                      $store.dispatch('viewTopic', topic.name),
                                                                      onSetTopicName(topic.name)">
            <span class="contents">{{topic.name}}</span>
            <span class="contents">{{topic.cleanupPolicy}}</span>
            <span class="contents">{{topic.partitionCount}}</span>
            <span class="contents">{{topic.partitionInfo[0].replicas}}</span>

            <div class="spinner" v-if="spinnerLoading">
                <q-spinner color="primary" size="3em" :thickness="10"/>
            </div>
          </div>
        </div>
      </table>
    </div>
  </div>


</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'TopicList',
  data(){
    return{
      sortPartitionFlag : false,
      sortReplicationFlag : false,
    }
  },

  computed:{
    ...mapState(['routeDetail', 'topicList', 'topicName', 'totalPartition', 'spinnerLoading', 'topicListSaved']),
  },

  methods:{
    ...mapMutations(['onSetTopicName']),

    search(data){
      let find = this.topicListSaved.filter((a)=>{
        return a.name.indexOf(data) != -1;
      });
      this.$store.commit('onSearchSetTopicList', find);
    },

    refresh(){
      this.$store.commit('onSearchSetTopicList', this.topicListSaved);
    },

    sortPartition(flag){
      if(flag == false){
        this.topicList.sort(function(a,b){
          return a.partitionCount - b.partitionCount;
        });
        this.sortPartitionFlag = true;
        console.log("aa");
      }

      if(flag == true){
        this.topicList.sort(function(a,b){
          return b.partitionCount - a.partitionCount;
        });
        this.sortPartitionFlag = false;
        console.log("dd");
      }
    },

    sortReplication(flag){
      if(flag == false){
        this.topicList.sort(function(a,b){
          return a.partitionInfo[0].replicas - b.partitionInfo[0].replicas;
        });
        this.sortReplicationFlag = true;
        console.log("aa");
      }

      if(flag == true){
        this.topicList.sort(function(a,b){
          return b.partitionInfo[0].replicas - a.partitionInfo[0].replicas;
        });
        this.sortReplicationFlag = false;
        console.log("dd");
      }

    },

    log(data){
      console.log(typeof data);
    },
  },

  mounted(){
    this.sortPartitionFlag = true;
    this.sortReplicationFlag = true;
  },
}
</script>

<style scoped>
 #container{
    letter-spacing: -1px;
  }

  .total, .list{
    width:100%;
    border-radius: 8px;
  }


/* total */
  .total{
    text-align: right;
    padding-left:25px;
  }

  .totalHead{
    display:inline-block;
    margin-right:20px;
    color:#000;
    text-align: right;
  }

  .totalBody{
    display:inline-block;
    font-size:20px;
    margin-right:20px;
    text-align: left;
  }

/* list */

  .list{
    padding:20px;
    max-height: 500px;
    margin-top:20px;
  }

  .search{
    display:flex;
    justify-content: space-between;
    padding:10px 0;
    padding-right:10px;
  }

  .btnSearch{
    cursor: pointer;
    border:none;
    padding:6px;
    margin-left:-90px;
  }

  .search input[type="text"]{
    padding:10px;
    outline: none;
    border:none;
    border-bottom:1px solid #aaa;
    width:300px;
    font-size:17px;
  }

  label{
    padding:10px;
    border-radius: 5px;
    outline: none;
    width:200px;
    font-size:16px;
    margin-top:5px;
    display:inline-block;
  }

  .hide{
    margin-left:20px;
  }

  button{
    background: #c6135b;
    font-size:19px;
    border:1px solid #c6135b;
    border-radius: 0px;
    padding:0px 5px;
    width:100px;
    color:#fff;
    cursor: pointer;
  }

  button:hover{
    background:#40795A;
    color:#fff;
    border:#40795A;
  }

/* list table */

  table{
    width:100%;
    margin-top:30px;
  }

  .head, .box{
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
  }

  .head {
    border-bottom:1px solid;
    margin-bottom:-20px;
  }

  .body{
    max-height: 500px;  
    margin-top:40px;
    overflow-y: scroll;
  }

  .headers, .contents{
    width: 20%;
    text-align: center;
    font-size:17px;
    margin:0 auto;
    font-weight: 700;
    display:inline-block;
  }

  .headers-p, .headers-r{
    width: 20%;
    text-align: center;
    font-size:17px;
    margin:0 auto;
    font-weight: 700;
    display:inline-block;
    cursor: pointer;
  }

  .blank{
    width:17px;
  }

  .box{
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

  .spinner{
    margin:0;
    padding:0;
    box-sizing: 0;
    margin:200px 50%;
  }
</style>