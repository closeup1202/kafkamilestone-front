import { createWebHistory, createRouter } from "vue-router";
import MainPage from "./components/MainPage.vue";
import ListCluster from "./components/cluster/ClusterList.vue";
import AddCluster from "./components/cluster/ClusterAdd.vue";
import InvalidUrlCluster from "./components/cluster/ClusterInvalidUrl.vue";
import Overview from "./components/overview/Overview.vue";
import BrokerList from "./components/broker/BrokerList.vue";
// import BrokerView from "./components/test/BrokerView.vue";
import TopicList from "./components/topic/TopicList.vue";
import TopicView from "./components/topic/TopicView.vue";
import TopicAdd from "./components/topic/TopicAdd.vue";
import ConsumerList from "./components/consumers/ConsumerList.vue";
import ConsumerView from "./components/consumers/ConsumerView.vue";

const routes = [
  {
    path:"/",
    component: MainPage,
  },
  {
    path: "/clusters",
    component: ListCluster,
  },
  {
    path: "/addCluster",
    component: AddCluster,
  },
  {
    path: "/:id/overview",
    component: Overview,
  },
  {
    path: "/:id/invalidUrl",
    component: InvalidUrlCluster,
  },
  {
    path: "/:id/brokers",
    component: BrokerList,
  },
  // {
  //   path: "/:id/brokers/:host",
  //   component: BrokerView,
  // },
  {
    path: "/:id/topics",
    component: TopicList,
  },
  {
    path: "/:id/topics/detail",
    component: TopicView,
  },
  {
    path: "/:id/createTopic",
    component: TopicAdd,
  },
  {
    path: "/:id/consumers",
    component: ConsumerList,
  },
  {
    path: "/:id/consumers/detail",
    component: ConsumerView,
  },

  {
    path: '/kafkaSite',
    beforeEnter() {
      location.href = 'https://kafka.apache.org/'
    },
  },

  { 
    path: "/:anything(.*)",
    redirect: '/'
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;                  