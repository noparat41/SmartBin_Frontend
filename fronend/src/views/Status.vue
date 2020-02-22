<template>
  <v-app>
    <Navbar />
    <v-container class="pa-4 text-center">
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in Bins">
          <v-col :key="i" cols="12" md="4">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                <br />
                <h3>{{item.Name}}</h3>

                <v-progress-circular
                  v-if="item.Status*5 < 50"
                  :rotate="-90"
                  :size="100"
                  :width="20"
                  :value="item.Status*5"
                  color="success"
                >{{ item.Status*5 }}%</v-progress-circular>

                <v-progress-circular
                  v-else-if="item.Status*5 < 100"
                  :rotate="-90"
                  :size="100"
                  :width="20"
                  :value="item.Status*5"
                  color="warning"
                >{{ item.Status*5 }}%</v-progress-circular>

                <v-progress-circular
                  v-else
                  :rotate="-90"
                  :size="100"
                  :width="20"
                  :value="item.Status*5"
                  color="error"
                >{{ item.Status*5 }}%</v-progress-circular>

                <h5>Location : {{item.Location.Name}}</h5>
                <br />

                <v-btn @click="putBin(item,false)">
                  <h6>clear</h6>
                </v-btn>
                <br />
                <br />
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import api from "../API";
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      Bins: [],
      BinId: "",
      Status: "",
      State: "",
      BinByid: []
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
    SearchStatus() {
      console.log("SearchStatus");
      this.i = 0;
      while (this.i < this.Bins.length) {
        if (this.Bins[this.i].Status === 20 && this.Bins[this.i].State != 0) {
          this.putBin(this.Bins[this.i], true);
        }
        this.i++;
      }
    },
    putBin(Abin, Switch) {
      console.log("putBin");

      console.log(Abin.Name);
      if (Switch) {
        this.State = 0;
        this.Status = Abin.Status;
      } else {
        this.State = Abin.Status;
        this.Status = 0;
      }
      api
        .put(
          "/SmartBin/" + Abin.Name,
          {
            Name: Abin.Name,
            State: this.State,
            Status: this.Status,
            Image: Abin.Image,
            Location: {
              _id: Abin.Location._id,
              Name: Abin.Location.Name,
              lat: Abin.Location.lat,
              lon: Abin.Location.lon
            }
          },
          {
            headers: {
              "content-type": "application/json"
            }
          }
        )
        .then(response => {
          console.log(response);
          this.cancel();
        });
    },

    cancel() {
      window.location.reload();
    }
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