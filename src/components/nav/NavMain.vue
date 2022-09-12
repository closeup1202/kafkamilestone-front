<template>
  <div class="navMain">
    <!-- <div class="navClusterToggle" v-if="toggle == true" @click="onChangeNavAll(false)">
    </div> -->
    <button class="navCluster" @click="togglingComp(), 
                                       $router.push('/clusters'), 
                                       $store.dispatch('retrieveClusterAll')">
    클러스터</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name:'NavMain',
  props:{
    toggle : Boolean,
  },
  methods:{
    togglingComp(){
      this.$emit('togglingComp');
    },

    ...mapMutations(['retrieveClusterAll']),
  },
}
</script>

<style scoped>
  .navMain{
    display:inline-block;
    margin-top:10px;
  }

  button{
    border: none;
    background: none;
    font-size:20px;
    font-weight: 400;
    cursor: pointer;
    letter-spacing: -2px;
  }

  .navClusterToggle{
    display: inline-block;
  }
</style>