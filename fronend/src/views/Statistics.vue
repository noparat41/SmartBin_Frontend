<template>
  <v-app>
    <Navbar />
    <v-container class="pa-4 text-center">
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in desserts">
          <v-col :key="i" cols="12" md="4">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                <br />
                <h3>{{item.Name}}</h3>

                <v-avatar size="80">
                  <v-icon size="80">account_circle</v-icon>
                </v-avatar>

                <h5>Point : {{item.Point}}</h5>
                <v-col>
                  <v-progress-linear color="blue-grey" height="25" width="50" reactive>
                    <template v-slot="{ value }">
                      <strong>{{ Math.ceil(value) }}%</strong>
                    </template>
                  </v-progress-linear>

                  <v-progress-linear color="blue-grey" height="25" reactive>
                    <template v-slot="{ value }">
                      <strong>{{ Math.ceil(value) }}%</strong>
                    </template>
                  </v-progress-linear>

                </v-col>
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
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      interval: {},

      desserts: [
        {
          Name: "Arm",
          Point: 0,
          Bin: {
            BadBin: 0,
            GoodBin:0
          }
        },
        {
          Name: "Nopparat",
          Point: 10,
          Bin: {
            BadBin: 1,
            GoodBin:1
          }
        },
        {
          Name: "Waoram",
          Point: 20,
          Bin: {
            BadBin: 1,
            GoodBin: 0
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