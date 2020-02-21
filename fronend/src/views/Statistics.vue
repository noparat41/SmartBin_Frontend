<template>
  <v-app>
    <Navbar />
    <v-container class="pa-4 text-center">
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in Users">
          <v-col :key="i" cols="12" md="4">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" >
                
                <v-col>
                <v-card color="grey lighten-3">
                  <br/>
                <h3>{{item.Name}}</h3>
              
                <v-avatar size="80">
                  <v-icon size="80">account_circle</v-icon>
                </v-avatar>

                <h5>Point : {{item.Point}}</h5>
                <v-col>
                  <v-col>
                    <v-card>
                    <v-progress-linear
                      color="warning "
                      height="25"
                      width="50"
                      reactive
                      :value="CalculateGoodBin(item.Bin.GoodBin, item.Bin.BadBin)"
                    >
                      <strong>{{ CalculateGoodBin(item.Bin.GoodBin, item.Bin.BadBin) }}%</strong>
                    </v-progress-linear>
                    </v-card>
                    <br />
                    <v-card>
                    <v-progress-linear
                      color="yellow darken-1"
                      height="25"
                      reactive
                      :value="CalculateBadBin(item.Bin.GoodBin, item.Bin.BadBin) "
                    >
                      <strong>{{ CalculateBadBin(item.Bin.GoodBin, item.Bin.BadBin) }}%</strong>
                    </v-progress-linear>
                     </v-card>
                  </v-col>
                </v-col>
              </v-card>
                </v-col>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      Users: [
        {
          Name: "Arm",
          Point: 0,
          Bin: {
            BadBin: 0,
            GoodBin: 0
          }
        },
        {
          Name: "Nopparat",
          Point: 10,
          Bin: {
            BadBin: 1,
            GoodBin: 1
          }
        },
        {
          Name: "Waoram",
          Point: 20,
          Bin: {
            BadBin: 0,
            GoodBin: 1
          }
        }
      ]
    };
  },
  methods: {
    /* eslint-disable no-console */

    CalculateGoodBin(GoodBin, BadBin) {
      console.log("calculateGoodBin");
      if (GoodBin + BadBin === 0) {
        return 0;
      }
      if (
        GoodBin < BadBin &&
        parseInt((GoodBin / (GoodBin + BadBin)) * 100) +
          parseInt((BadBin / (GoodBin + BadBin)) * 100) !==
          100
      ) {
        return parseInt((GoodBin / (GoodBin + BadBin)) * 100) + 1;
      }
      return parseInt((GoodBin / (GoodBin + BadBin)) * 100);
    },

    CalculateBadBin(GoodBin, BadBin) {
      console.log("CalculateBadBin");
      if (GoodBin + BadBin === 0) {
        return 0;
      }
      if (
        GoodBin > BadBin &&
        parseInt((GoodBin / (GoodBin + BadBin)) * 100) +
          parseInt((BadBin / (GoodBin + BadBin)) * 100) !==
          100
      ) {
        return parseInt((BadBin / (GoodBin + BadBin)) * 100) + 1;
      }
      return parseInt((BadBin / (GoodBin + BadBin)) * 100);
    }
  },
  mounted() {
    //this.getLocation();
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>