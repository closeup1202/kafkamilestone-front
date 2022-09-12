<template>
  <div id="container">
    <div class="summary">
      <h2>Summary</h2>
      <div class="box">
        <div class="contents" v-for="item, iter in BrokerInfo" :key="iter">
          <span class="value">1</span>
          <span class="detail">{{item}}</span>
        </div>
      </div>
    </div>

    <div class="metrics">
      <h2>Metrics</h2>
      <table>
        <div class="head">
          <label class="row">Rate (second) </label>
          <span v-for="a, i in MetricsHeaders" :key="i">{{a}}</span>
        </div>
        <div class="body">
          <div class="column" v-for="a, i in MetricsFields" :key="i">
            <label class="row">{{a}}</label>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name:'BrokerView',
  data(){
    return{
      BrokerInfo : ['TOPICS', 'PARTITIONS', 'MESSAGES', 'INCOMING', 'OUTCOMING'],
      MetricsHeaders : ['Mean', '1min', '5min', '15min'],
      MetricsFields : ['Messages in', 'Bytes in', 'Bytes out', 'Bytes rejected', 'Failed fetch request', 'Failed produce request'],
    }
  },
}
</script>

<style scoped>
  #container{
    padding:0;
    text-align: left;
    width:80%;
  }

  .box{
    display: flex;
    justify-content: space-between;
    margin-top:60px;
  }

  .contents{
    display:inline-block;
    border-radius: 10px;
  }

  .value{
    width: 100%;
    display:block;
    text-align: center;
    height: 100px;
    font-size:40px;
  }

  .detail{
    width:200px;
    display:inline-block;
    text-align: center;
  }

  /* metrics */

  .metrics{
    margin-top:60px;
  }

  table{
    width:100%;
    margin-top:30px;
    margin-left:80px;
  }  

  .head, .column{
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    margin-bottom:-20px;
  }

  .body{
    margin-top:20px;
  }

  .column{
    margin-top:30px;
  }

  .head span, .column span{
    width: 20%;
    text-align: center;
    font-size:17px;
    margin:0 auto;
  }

  .head{
    font-weight: 700;
  }

  .row{
    width: 20%;
    font-size:17px;
    margin:0 auto;
    text-align: left;
  }

</style>