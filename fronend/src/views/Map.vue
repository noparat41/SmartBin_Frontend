<template>
  <div>
    <Navbar />
    <v-container>
      <br/>
      <v-card class="mx-auto" width="mx-auto" height="600">
      
          <longdo-map :zoom="10">
            <longdo-map-marker
              v-for="(item, i) in markers"
              :key="i"
              :location="item.location"
              :title="item.title"
              :detail="item.detail"
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
      desserts: [
        {
          name: "Bin 1",
          value: 0
        },
        {
          name: "Bin 2",
          value: 50
        },
        {
          name: "Bin 3",
          value: 100
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