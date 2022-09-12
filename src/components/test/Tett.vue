<template>
  <form>
        <div class="mandatoryOptions">
            <label>Cluster Name</label>
            <input type="text" name="clusterName" placeholder="cluster name">

            <label>Cluster Zookeeper Hosts</label>
            <input type="text" name="clusterHosts" placeholder="cluster hosts">

            <label>kafka version</label>
            <select>
							<option selected="selected">your kafka version</option>
							<option class="kafkaversions" v-for="item in kafkaversion" :key="item">{{item}}</option>
            </select>

            <label>Active</label>
            <select>
							<option class="kafkaversions" v-for="item in active" :key="item">{{item}}</option>
            </select>

            
            <!-- 
            <div>
                <label>Broker Skewed Rate</label>
                <span class="valueFrom">90%</span>
                </div>

                <div class="reassignBrokers">
                <span>Brokers</span>

                <div class="brokerSelect">
                    <button @click="onChkAll()">Select All</button>
                    <button @click="onChkNone()">Select None</button>
                </div>

                <div class="brokerChk">
                    <label v-for="item, iter in checkedBroker" :key="iter">
                    <input type="checkbox" :value="item" v-model="checkedFlag[iter]">{{item}}
                    </label>
                </div>
            </div> -->

            <!-- <label>
            <input type="checkbox" class="JMXPollingChk">
            {{ JMXPollingChk }}</label>

            <label>JMX Auth Username</label>
            <input type="text" name="JMXUserName" placeholder="JMX username">

            <label>JMX Auth Password</label>
            <input type="text" name="JMXPassword" placeholder="JMX password"> -->
        </div>

        <!-- <div class="additionalOptions">
            <label>
            <input type="checkbox" class="JMXWithSSLChk">
            {{ JMXWithSSLChk }}</label><br/>
            
            <label>
            <input type="checkbox" class="logKafkaChk">
            {{ logKafkaChk }}</label><br/>
            
            <label>
            <input type="checkbox" class="pollConsumerInfoChk">
            {{ pollConsumerInfoChk }}</label><br/>
            
            <label>
            <input type="checkbox" class="filteringInactiveChk">
            {{ filteringInactiveChk }}</label><br/>

            <label>
            <input type="checkbox" class="activeOffsetCacheChk">
            {{ activeOffsetCacheChk }}</label><br/>

            <label>
            <input type="checkbox" class="displayBrokerTopicSizeChk">
            {{ displayBrokerTopicSizeChk }}</label>
        </div> -->

			<div class="addClusterBtns">
				<button type="submit">Add</button>
				<button @click="$router.push('/')" class="btnCancel">Cancel</button>
			</div>
    
    </form>
</template>

<script>
export default {

}
</script>

<style>

</style>