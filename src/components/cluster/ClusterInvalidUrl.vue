<template>
  <div id="container">
    <h2>유효하지 않은 서버 주소 </h2>
    <p>등록하신 서버는 카프카 클러스터를 구성할 수 없습니다</p>
    <div class="inputs">
      <label>기존에 등록한 서버 주소</label>
      <input type="text" :value="invalidUrl" class="invalidServers" readonly><br/>

      <label>카프카 서버에 유효한 새로운 주소 </label>
      <input type="text" v-model="newHostsForm.servers" placeholder="new hosts" class="newServers">
    </div>
    <div class="btns">
      <button @click="$store.dispatch('deleteCluster', newHostsForm.id), onResultBox(true), success()" class="btnDelete">클러스터 삭제</button>
      <div class="btnRight">
        <button @click="$store.dispatch('modifyInvalidUrl', newHostsForm), onResultBox(true), success()" class="btnModify"
                :class="{ validForm : active }">서버 주소 수정</button>
        <button @click="$router.push('/')" class="btnCancel">취소</button>
      </div>
    </div>
  </div>

  <ResultBox/>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import ResultBox from "@/components/utils/AlertResult.vue";

export default {
  name:'clusterInvalidUrl',
  data(){
    return{
      active: false,
      newHostsForm: {
        id: this.$route.path.substring(1, this.$route.path.lastIndexOf('/')),
        servers:'',
      },
    }
  },

  watch:{
    'newHostsForm.servers'(data){
      this.active = (data != '') ? true : false;

      if(data == ' '){
        this.newHostsForm.servers = '';
      }
    },
  },

  methods:{
    success(){
      setTimeout(()=>{
        if(this.resultSuccess == true){
            this.$router.push('/clusters');
            this.$store.dispatch('retrieveClusterAll');
        }
      }, 1000);
    },

    ...mapMutations(['onResultBox']),
  },

  components:{
    ResultBox,
  },

  computed:{
    ...mapState(['invalidUrlMessage','invalidUrl', 'cluster', 'resultSuccess']),
  }
}
</script>

<style scoped>
  h2{
    color:#CF3F3F;
  }

  p{
    font-size:23px;
    margin-top:60px;
    letter-spacing: -2px;
  }

  .inputs{
    margin-top:30px;
    padding:5px;
    width:950px;
    border-top:1px solid;
    border-bottom:1px solid;
    padding-bottom:35px;
  }

  label, input{
    font-size:23px;
    display: inline-block;
  }

  label{
    width:350px;
    margin-top:30px;
    text-align: right;
    letter-spacing: -2px;
    font-size:20px;
  }

  input{
    outline: none;
    border-radius: 5px;
    border:none;
    border:1px solid #777;
    padding:5px 10px;
    margin-left:30px;
  }

  .invalidServers{
    width:500px;
    border:none;
  }

  .newServers{
    width:500px;
    margin-left:35px;
  }

  .btns{
    margin-top:50px;
    margin-left:30px;
    width:925px;
    text-align: right;
    display: flex;
    justify-content: space-between;
  }

  button{
    font-size:20px;
    background:none;
    border:1px solid #666;
    cursor: pointer;
    padding:10px 15px;
    border-radius: 5px;
  }

  .btnDelete{
    display: inline-block;
  }

  .btnRight{
    margin-right:25px;
  }

  .btnCancel{
    margin-left:20px;
    margin-right:15px;
  }

  .btnModify{
    cursor: auto;
    opacity: 0.5;
    pointer-events: none;
  }

  .btnModify:hover{
    background-color: #40795A;
    border:1px solid #40795A;
    color:#fff;
  }

  .btnCancel:hover{
    background-color: #F4563A;
    border:1px solid #F4563A;
    color:#fff;
  }

  .btnDelete:hover{
    background-color: #F4563A;
    border:1px solid #F4563A;
    color:#fff;
  }

  .validForm{
    cursor: pointer;
    opacity: 1;
    pointer-events: all;
  }

</style>