import { createStore } from 'vuex'
import axios from 'axios'
import route from './router.js'
import topicConfigs from '@/assets/data/topicConfigs.js'

axios.defaults.baseURL = 'http://localhost:5959/api/'

const store = createStore({
  state(){
    return {

      // VARIABLE

      // SERVERS
      servers : '',

      // UTILS
      selected : [false, false, false, false],

      routeDetail : '',

      navAllFlag : false,

      resultBox : false,
      resultSuccess : false,

      errorMessage : '',

      spinnerLoading : true,
      
      // CLUSTER

      clusterList : '',
      cluster: [],

      invalidUrlMessage : '',
      invalidUrl : '',

      // BROKER

      brokers : [],


      // TOPIC

      topicList : [
        {
          name:'',
          internal: '',
          cleanupPolicy: '',
          partitionInfo : [
            {
              '': '',
              ' ': ''
            }
          ]
        }
      ],

      topicListSaved: [],

      totalPartition : '',

      topicName : '',

      topic : {
        offsetsSum: '',
        partitionCount: '',
        partitionInfo: [{

        }],
        topicName: ''
      },

      topicConfigList : topicConfigs,

      //CONSUMERS

      consumerList : [
        {},
      ],

      consumerListSaved : [
        {},
      ],

      consumer : {},

      consumerName : '',

    }
  },
  mutations: {  
    onChangeNavAll(state, data){
      state.navAllFlag = data;
    },

    onChangeMenuBgcOverview(state, data){
      for(var i in state.selected){
        state.selected[i] = false;
      }
      
      state.selected[0] = data;
      console.log(state.selected);
    },

    onChangeMenuBgc(state, data){
      for(var i in state.selected){
        state.selected[i] = false;
      }
      state.selected[data] = true;
    },


    // CLUSTER

    onSetClusterRoute(state, data){
      state.routeDetail = data;
    },

    onSetClusterList(state, data){
      state.clusterList = data;
    },
    
    onSetCluster(state, data){
      state.cluster = data;
    },

    onInvalidUrlMessage(state, data){
      state.invalidUrlMessage = data;
    },

    onInvalidUrl(state, data){
      state.invalidUrl = data;   
    },


    // BROKER

    onSetBrokers(state, data){
      state.brokers = data;
    },


    // TOPIC

    onSetTopics(state, data){
      state.topicList = data;
    },

    onSetTotalPartition(state, data){
      state.totalPartition = data.totalPartitionCount;
    },

    onSearchSetTopicList(state, data){
      state.topicList = [...data];
    },

    onSearchSetTopicListSaved(state, data){
      state.topicListSaved = data;
    },

    onSetTopic(state, data){
      state.topic = data;
    },

    onSetTopicName(state, data){
      state.topicName = data;
    },


    //CONSUMERS

    onSetConsumers(state, data){
      state.consumerList = data;
    },

    onSetConsumersSaved(state, data){
      state.consumerListSaved = data;
    },

    onSearchSetConsumerList(state, data){
      state.consumerList = [...data];
    },

    onSetConsumer(state, data){
      state.consumer = data;
    },

    onSetConsumerName(state, data){
      state.consumerName = data;
    },


    // result box - 공통
    
    //결과를 보여주는 창을 띄움
    onResultBox(state, data){
      state.resultBox = data;
      setTimeout(()=>{state.resultBox = false}, 2000);
    },

    //결과가 성공했는지 판단
    onResultSuccess(state, data){
      state.resultSuccess = data;
    },

    onSetErrorMessage(state, data){
      console.log(data);
      console.log(data.startsWith('Validation'));
      if(data.startsWith('Validation')){
        state.errorMessage = 'Please enter a valid value';
      } else {
        state.errorMessage = data;
      }
    },

    onCloseSpinner(state, data){
      state.spinnerLoading = data;
    },
  },

  actions: {

    //AJAX

    //CLUSTER

    retrieveClusterAll(){
      axios.get('cluster')
      .then((result)=>{
        console.log(result.data.datas);
        this.commit('onSetClusterList', result.data.datas);
      })
    },

    retrieveClusterById(context, data){
      console.log(context);
      console.log(data);
      axios.get(data + '/overview')
      .then((result)=>{
        console.log(result.data);
        this.commit('onSetCluster', result.data.datas);
        route.push( '/' + data + '/overview');
      }).catch((error)=>{
        console.log(error.response.data.message);
        route.push( '/' + data + '/invalidUrl');
        this.commit('onInvalidUrlMessage', error.response.data.message);
        this.commit('onInvalidUrl', error.response.data.servers);
      })
    },

    createCluster(context, data){
      console.log(context);
      axios.post('cluster', JSON.stringify(data), 
      {
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
      })
      .then((result)=>{
        console.log(result.data.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
        this.commit('onSetErrorMessage', error.response.data.message);
      })
    },
    
    modifyInvalidUrl(context, data){
      console.log(context);
      console.log(data);
      axios.put('/modifyInvalidUrl', JSON.stringify(data),
      {
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
      })
      .then((result)=>{
        console.log(result.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
        this.commit('onSetErrorMessage', error.response.data.message);
      })
    },

    modifyCluster(context, data){
      console.log(context);
      console.log(data);
      axios.put('/modifyCluster', JSON.stringify(data),
      {
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
      })
      .then((result)=>{
        console.log(result.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
        this.commit('onSetErrorMessage', error.response.data.message);
      })
    },
    
    deleteCluster(context, data){
      console.log(context);
      console.log(data);
      axios.delete( data + '/deleteCluster')
      .then((result)=>{
        console.log(result.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
        this.commit('onSetErrorMessage', error.response.data.message);
      })
    },

    //BROKER

    retrieveBrokers(context, data){
      console.log(context);
      console.log(data);
      axios.get('/brokers', {
        params: {
          servers : data
        },
      })
      .then((result)=>{
        console.log(result.data);
        console.log(result.data.datas);
        this.commit('onSetBrokers', result.data.datas);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onSetErrorMessage', error.response.data.message);

      })
    },


    //TOPIC

    retrieveTopics(context, data){
      console.log(context);
      axios.get('/topics', {
        params: {
          servers : data
        },
      })
      .then((result)=>{
        console.log(result.data);
        console.log(result.data.datas);
        this.commit('onSetTopics', result.data.datas);
        this.commit('onSetTotalPartition', result.data.data);
        this.commit('onSearchSetTopicListSaved', result.data.datas);
        this.commit('onCloseSpinner', false);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onSetErrorMessage', error.response.data.message);
      })
    },

    createTopic(context, data){
      console.log(context);
      console.log(data);
      console.log(JSON.stringify(data));
      axios.post('createTopic', JSON.stringify(data),
      {
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
      })
      .then((result)=>{
        console.log(result.data.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
        this.commit('onSetErrorMessage', error.response.data.message);
      })
    },

    viewTopic(context, data){
      console.log(context);
      console.log(data);
      console.log(this.state.cluster[0].servers);
      axios.get( data + '/viewTopic', {
        params: {
          servers : this.state.cluster[0].servers
        },
      })
      .then((result)=>{
        console.log(result.data);
        this.commit('onSetTopic', result.data.data);
      }).catch((error)=>{
        console.log(error.response.data.message);
      })
    },

    deleteTopic(context, data){
      console.log(context);
      console.log(data);
      axios.delete( data + '/deleteTopic', {
        params: {
          servers : this.state.cluster[0].servers
        },
      })
      .then((result)=>{
        console.log(result.data.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
      })
    },

    addPartitionByTopic(context, data){
      console.log(context);
      console.log(data);
      axios.post('addPartitionByTopic', JSON.stringify(data),
      {
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
      })
      .then((result)=>{
        console.log(result.data.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
        this.commit('onSetErrorMessage', error.response.data.message);

      })
    },
    
    modifyTopicConfigs(context, data){
      console.log(context);
      console.log(data);
      const filteredData = data.configs.filter((a)=>{return a.value.length > 0;});
      const dataObj = {
        topicName : data.topicName,
        keyValueList : filteredData,
      }
      console.log(JSON.stringify(dataObj));
      axios.post('modifyConfigs', JSON.stringify(dataObj),
      {
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
      })
      .then((result)=>{
        console.log(result.data.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
        this.commit('onSetErrorMessage', error.response.data.message);

      })
    },

    modifyReplicationFactor(context, data){
      console.log(context);
      console.log(data);
      axios.post('modifyReplication', JSON.stringify(data),
      {
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
      })
      .then((result)=>{
        console.log(result.data.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
        this.commit('onSetErrorMessage', error.response.data.message);

      })
    },

    modifyLeader(context, data){
      console.log(context);
      console.log(data);
      axios.post('modifyLeader', JSON.stringify(data),
      {
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
      })
      .then((result)=>{
        console.log(result.data.data);
        this.commit('onResultSuccess', true);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onResultSuccess', false);
        this.commit('onSetErrorMessage', error.response.data.message);

      })
    },

    //CONSUMER

    retrieveConsumers(context, data){
      console.log(context);
      axios.get('/consumers',{
        params: {
          servers : data
        },
      })
      .then((result)=>{
        console.log(result.data.datas);
        this.commit('onSetConsumers', result.data.datas);
        this.commit('onSetConsumersSaved', result.data.datas);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onSetErrorMessage', error.response.data.message);
      })
    },

    viewConsumer(context, data){
      console.log(context);
      console.log(data);
      this.commit('onSetConsumerName', data);
      axios.get( data + '/viewConsumer',{
        params: {
          servers : this.state.cluster[0].servers
        },
      })
      .then((result)=>{
        console.log(result.data);
        this.commit('onSetConsumer', result.data.datas);
      }).catch((error)=>{
        console.log(error.response.data.message);
        this.commit('onSetErrorMessage', error.response.data.message);
      })
    },


  },
})

export default store