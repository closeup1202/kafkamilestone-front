<template>
  <div>
    <p>milestone은 <u @click="$router.push('/kafkaSite')">Apache kafka</u> 모니터링 툴입니다</p>
    <p class="p2">나만의 카프카 클러스터를 추가해 보세요</p>
    <button class="startBtn" @click="$router.push('/addCluster'), on">Start !</button>
  </div>
</template>

<script>
export default {
  name:'MainPage',
}
</script>

<style scoped>
  div{
    margin: 0 auto;
    margin-left:-30px;
    margin-top:170px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    text-align: center;
    font-size:50px;
    padding:30px 40px;
    line-height: 130px;
    letter-spacing: -3px;
    position:relative;
  }

  u{
    text-decoration-color: #40795A;
    cursor: pointer;
  }

  .p2{
    font-size:48px;
  }

  .startBtn{
    width:150px;
    padding:10px;
    font-size:23px;
    letter-spacing: 1px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    line-height: 50px;
    border-radius: 20px;
    background:#c6135b;
    color:#fff;
    border:none;
    cursor: pointer;
  }

</style>