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
      Bins: [
        {
          Name: "Bin 1",
          Location:{
            Name: "อาคารเรียนรวม 1",
            lon: "102.017166",
            lat: "14.88134"
          }
        },
        {
          Name: "Bin 2",
          Location:{
            Name: "อาคารวิชาการ 1",
            lon: "102.018785",
            lat: "14.879283"
          }
        },
        {
          Name: "Bin 3",
          Location:{
            Name: "อาคารวิชาการ 2",
            lon: "102.019915",
            lat: "14.879978"
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>