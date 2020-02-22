<template>
  <div>
    <Navbar />
    <v-container>
      <br/>
      <v-card class="mx-auto" width="mx-auto" height="600">
      
          <longdo-map :zoom="10">
            <longdo-map-marker
              v-for="(item, i) in Bins"
              :key="i"
              :location="item.Location"
              :title="item.Name"
              :detail="item.Location.Name"
            />
          </longdo-map>
       
      </v-card>
    </v-container>
  </div>
</template>

<script>
import api from "../API";
import Navbar from "../components/Navbar";
import { LongdoMap, LongdoMapMarker } from "longdo-map-vue";
LongdoMap.init("9222f2dfcde54517065ca4f03aeb88ab");

export default {
  components: {
    Navbar,
    LongdoMap,
    LongdoMapMarker
  },
  data() {
    return {
      Bins: [],
    };
  },
   methods: {
    /* eslint-disable no-console */
    getBin() {
      console.log("getBin");
      api
        .get("/SmartBin")
        .then(response => {
          this.Bins = response.data;
          console.log(this.Bins);
          this.SearchStatus();
        })
        .catch(e => {
          console.log(e);
        });
    },
   },
   mounted() {
    this.getBin();
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>