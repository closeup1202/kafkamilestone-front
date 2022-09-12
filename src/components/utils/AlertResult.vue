<template>
  <div>
    <div class="result" v-if="resultBox == true">
      <p v-if="resultSuccess == true" class="success">Success !</p>
      <p v-else class="fail">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name:'ResultBox',
  methods:{
    ...mapMutations(['onResultBox'])
  },
  computed:{
    ...mapState(['resultBox', 'resultSuccess', 'errorMessage'])
  },
}
</script>

<style scoped>
  .result{
      position:fixed;
      bottom:50px;
      left:0px;
      width:100%;
      margin:40px auto;
      background:#fff;
      padding:10px 20px;
      background:#eee;
    }

  .result p{
    font-size:40px;
    text-align: center;
    margin-top:10px;
    padding:10px;
  }

  .success{
    color:#40795A;
  }

  .fail{
    color:#F4563A;
  }
</style>