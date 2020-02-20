<template>
  <div>
    <Navbar />

    <v-container>
      <br />
      <br />
      <v-card id="create" align="center" justify="center" dark>
        <v-container fluid>
          <br />
          <br />
        
          <br />
          <v-col class="d-flex" cols="12" sm="4">
            <v-select
              :items="Region"
              label="Name"
              v-model="HospitalName"
              item-text="regionName"
              item-value="id"
              :rules="[(v) => !!v || 'Item is required']"
              solo
            ></v-select>
          </v-col>
          <br />
      
          <v-speed-dial
            v-model="fab"
            top="true"
            :right="right"
            :direction="direction"
            :transition="transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="pink" dark fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-btn fab dark small color="warning" @click="$router.push('/EditBin')">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab dark small color="green" @click="$router.push('/AddBin')">
              <v-icon>restore_from_trash</v-icon>
            </v-btn>
            <v-btn fab dark small color="red" @click="$router.push('/DeleteBin')">
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </v-speed-dial>

          <v-divider></v-divider>
          <br />
          <v-card-actions>
            <v-row justify="center">
              <div class="text-center">
                <v-btn rounded color="red" dark large>Delete</v-btn>
              </div>
              <div class="text-center">
                <v-btn text color="red" dark large>cancel</v-btn>
              </div>
            </v-row>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import api from "../API";
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  },
  data: () => ({
    dialogs: false,
    direction: "left",
    fab: false,
    fling: false,
    tabs: null,
    right: true,
    bottom: true,
    transition: "slide-y-reverse-transition",
    Locations: []
  }),
  methods: {
    /* eslint-disable no-console */
    getLocation() {
      console.log("getLocation");
      api
        .get("/Location")
        .then(response => {
          this.Locations = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getLocation();
  }
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>