<template>
  <div id="container">
    <h2>클러스터 등록</h2>
    <div class="inputs">
      <label>클러스터 이름 *</label>
      <input type="text" v-model="clusterForm.clusterName" placeholder="cluster name" class="nameInput"
             @blur="isRequired('name')" ref="nameFocus" :class="{ errorRedBox : nameErrorFlag }">

      <label>주키퍼 서버 *</label>
      <input type="text" v-model="clusterForm.servers" placeholder="cluster hosts" class="serversInput"
             @blur="isRequired('servers')" ref="serversFocus" :class="{ errorRedBox2 : serversErrorFlag }">

      <label>카프카 버전 *</label>
      <select v-model="clusterForm.version">
        <option selected="selected">{{clusterForm.version}}</option>
        <option class="kafkaversions" v-for="item in kafkaversion" :key="item">{{item}}</option>
      </select>

      <label>사용 환경 *</label>
      <select v-model="clusterForm.active">
        <option selected="selected">{{clusterForm.active}}</option>
        <option class="active" v-for="item in activeVal" :key="item">{{item}}</option>
      </select>
    </div>

    <div class="addClusterBtns">
      <button @click="$store.dispatch('createCluster', clusterForm), onResultBox(true), addClusterSuccess()">등록</button>
      <button @click="$router.push('/')" class="btnCancel">취소</button>
    </div>
  </div>

  <ResultBox/>
</template>

<script>
	import kafkaversions from "@/assets/data/kafkaversions.js";
	import {mapMutations, mapState} from 'vuex';
  import ResultBox from "@/components/utils/AlertResult.vue";

  export default {
    name: 'AddCluster',
    components:{
      ResultBox,
    },
    data(){
      return{
        toggle : false,
        
        //form  
        kafkaversion : kafkaversions,
        activeVal : ['dev', 'qa', 'local', 'staging'],

        nameErrorFlag : false,
        serversErrorFlag : false,

        clusterForm : { 
          clusterName : '',
          servers : '',
          version : 'your kafka version',
          active : 'main usage',
        },

        resultBoxFlag : false,
      }
    },

		props:{
      kafkaversions : Array,
		},

    methods:{
      isRequired(flag){
        if(flag == 'name'){
          if(this.clusterForm.clusterName == ''){
            this.$refs.nameFocus.focus();
            this.nameErrorFlag = true;
          } 
        }
        if(flag == 'servers'){
          if(this.clusterForm.servers == ''){
            this.$refs.serversFocus.focus();
            this.serversErrorFlag = true;
          } 
        }
      },

      addClusterSuccess(){
        setTimeout(()=>{
          if(this.resultSuccess == true){
              this.$router.push('/clusters');
              this.$store.dispatch('retrieveClusterAll');
          }
        }, 1000);
      },

      ...mapMutations(['onResultBox']),
    },

    computed:{
      ...mapState(['resultSuccess']),
    },

    watch:{
      'clusterForm.clusterName'(data){
        if(data != ''){
          this.nameErrorFlag = false
        }

        if(data == ' '){
          this.clusterForm.clusterName = '';
        }
      },

      'clusterForm.servers'(data){
        if(data != ''){
          this.serversErrorFlag = false
        }

        if(data == ' '){
          this.clusterForm.servers = '';
        }
      },
    }
  }
	
</script>

<style scoped>
  .inputs{
    margin-top:40px;
  }

  .inputs label, .inputs input, select{
    display:block;
    margin-bottom:10px;
    font-size:20px;
  }

  .inputs input{
    width:30%;
    margin-bottom: 30px;
    margin-left:4px;
    outline: none;
    padding:8px;
  }

  select{
    margin-left:4px;
    margin-bottom: 20px;
    outline: none;
    padding:8px;
    border-radius: 5px;
  }

  .inputs label{
    width:80%;
  }

  .addClusterBtns{
    width:31%;
    margin-top:70px;
    text-align: right;
    padding:0;
  }

  .addClusterBtns button{
    margin-left:15px;
    background-color: white;
    border:1px solid #666;
    padding:5px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size:20px;
  }

  .addClusterBtns button:hover{
    background-color: #40795A;
    color:#fff;
    border:1px solid #40795A;
  }

  .addClusterBtns .btnCancel:hover{
    background-color: #F4563A;
    border:1px solid #F4563A;
    color:#fff;
  }

  .addClusterBtns .btnCancel{
    text-decoration: none;
    color:black;
  }

  /* form detail */

  .nameInput, .serversInput{
    border-radius: 5px;
    border:1px solid #666;
  }

  .errorRedBox, .errorRedBox2{
    border:1px solid #F4563A;
  }
</style>
