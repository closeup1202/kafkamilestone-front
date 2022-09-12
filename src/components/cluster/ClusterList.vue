<template>
  <div id="container">
    <div class="noneCluster" v-if="clusterList == ''" @click="$router.push('/addCluster')">
      <p>클러스터가 없습니다</p>
      <p>새로운 클러스터를 추가해 보세요!</p>
      <button class="addClusterNone" @click="$router.push('/addCluster')">클러스터 추가</button>
    </div>
    <div class="table" v-else>
      <div class="thead">
        <span>클러스터</span>
        <span>버전</span>
        <span class="serversHeader">서버</span>
        <span>사용 환경</span>
      </div>
      <div class="tbody">
        <div class="item" v-for="item, iter in clusterList" :key="iter" 
             @click="onChangeNavAll(), onSetClusterRoute( '/'+ (item.id)), onSetCluster(item), onChangeMenuBgcOverview(true),
             $store.dispatch('retrieveClusterById', item.id)">
          <div class="box">
            <span class="info">{{item.clusterName}}</span>
          </div>
          <div class="box">
            <span class="info">{{item.version}}</span>
          </div>
          <div class="serverBox">
            <span class="info">{{item.servers}}</span>
          </div>
          <div class="box">
            <span class="info">{{item.active}}</span>
          </div>
        </div> 

        <button class="addCluster" @click="$router.push('/addCluster')">+</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex';

  export default {
    name: 'ListCluster',
    methods:{
      ...mapMutations(['onChangeNavAll', 'onSetClusterRoute', 'onSetCluster', 'onChangeMenuBgcOverview']),
    },
    computed:{
      ...mapState(['clusterList', 'serversList']),
    },
  }
</script>

<style scoped>
  #container{
    padding:10px;
  }

  .table{
    width:100%;
    font-size:20px;
  }

  .thead, .tbody div{
    display: flex;
    justify-content: space-between;
    padding:10px;
  }

  .thead{
    padding:15px 0;
  }

  .thead span{
    margin:0 auto;
    font-weight: 600;
    width:30%;
    text-align: center;
  }

  .thead .serversHeader{
    width:80%;
  }

  .tbody .item{
    border-radius: 5px;
    box-shadow: 1px 1px 6px 2px #ddd;
    margin-top:25px;
    padding:60px 0;
  }

  .tbody div:hover{
    background-color: #40795A;
    cursor: pointer;
    color:#fff;
  }

  .box{
    width:30%;
    border:none;
    box-shadow: none;
    display:inline-block;
    padding:0;
    margin:0;
    text-align: center;
  }
  .serverBox{
    width:80%;
    border:none;
    box-shadow: none;
    display:inline-block;
    padding:0;
    margin:0;
    text-align: center;
  }

  .info{
    margin:0;
    padding:0;
    display:block;
    text-align: center;
    width:100%;
    line-height: 100px;
    letter-spacing: 0px;
    font-size:23px;
  }

  .blank{
    opacity: 0;
    height:32px;
  }

  .addCluster{
    margin-top:40px;
    border-radius: 50px;
    box-shadow: 1px 1px 3px 2px #ddd;
    padding:20px 0;
    background:none;
    border:none;
    display:block;
    width:100%;
    cursor: pointer;
    font-size:90px;
    color:#555;
  }

  .addCluster:hover{
    background-color: #c6134a;
    color:#eee;
  }

  /* none cluster */

  .noneCluster{
    text-align: center;
    padding-top: 30px;
  }

  .noneCluster p{
    text-align: center;
    font-size:50px;
    cursor: pointer;
    margin-top:20px;
  }

  .addClusterNone{
    border:1px solid #c6135b;
    width:50%;
    text-align: center;
    font-size:40px;
    padding:20px;
    border-radius: 30px;
    background: #c6135b;
    color: #eee;
    cursor: pointer;
    margin-top:40px;
  }

  .addClusterNone:hover{
    background: #40795A;
    border:#40795A;
  }

</style>