<template>
  <v-app>
    <Navbar />
    <v-container class="pa-4 text-center">
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in Bins">
          <v-col :key="i" cols="12" md="4">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" >
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

                <v-btn>
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
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      Bins: [
        {
          Name: "Bin 1",
          Status: 1,
          Location: {
            Name: "อาคารเรียนรวม 1"
          }
        },
        {
          Name: "Bin 2",
          Status: 10,
          Location: {
            Name: "อาคารวิชาการ 1"
          }
        },
        {
          Name: "Bin 3",
          Status: 20,
          Location: {
            Name: "อาคารวิชาการ 2"
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