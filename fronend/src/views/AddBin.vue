<template>
  <div>
    <Navbar />

    <v-container>
      <br />
      <br />
      <v-card id="create" align="center" justify="center" dark>
        <v-container fluid>
          <br />
          <v-col class="d-flex" cols="12" sm="5">
            <v-text-field label="Name" v-model="Name" :rules="[(v) => !!v || 'Item is required']"></v-text-field>
          </v-col>
          <v-row justify="center">
            <v-col class="d-flex" cols="12" sm="4">
              <v-select
                :items="Locations"
                label="Location"
                v-model="LocationId"
                item-text="Name"
                item-value="_id"
                :rules="[(v) => !!v || 'Item is required']"
                solo
              ></v-select>

              <v-dialog v-model="dialogs" persistent max-width="700">
                <template v-slot:activator="{ on }">
                  <v-btn color="success" dark v-on="on" icon>
                    <v-icon size="40">add_location</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Manage Location</span>
                  </v-card-title>
                  <v-card-text align="center" justify="center">
                    <v-col>
                      <v-col>
                        <div cols="12" sm="8" md="8">
                          <v-text-field label="Location Name" persistent-hint required></v-text-field>
                        </div>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8" md="6">
                            <v-text-field label="lon :" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8" md="6">
                            <v-text-field label="lat :"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-col>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-col>
                      <v-row justify="center">
                        <v-btn rounded color="success" dark @click="dialogs = false">Seve</v-btn>
                        <v-btn text color="success" dark @click="dialogs = false">Close</v-btn>
                      </v-row>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-col>
          </v-row>
          <v-speed-dial
            v-model="fab"
            :top="top"
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
                <v-btn rounded color="success" dark large @click="getLocationByid()">Seve</v-btn>
              </div>
              <div class="text-center">
                <v-btn text color="success" dark large @click="cancel()">cancel</v-btn>
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
    direction: "bottom",
    fab: false,
    fling: false,
    tabs: null,
    top: true,
    left: true,
    right: true,
    bottom: true,
    transition: "slide-y-reverse-transition",
    Name: "",
    LocationId: "",
    Locations: [],
    LocationsByid: [],
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
    },
    getLocationByid() {
      console.log("getLocationByid");
      console.log(this.LocationId);
      api
        .get("/Location/"+this.LocationId)
        .then(response => {
          this.LocationsByid = response.data;
          console.log(response.data);
          this.postBin();
        })
        .catch(e => {
          console.log(e);
        });
    },
    postBin() {
      console.log("postBin");

      var data = {
        Name: this.Name,
        State: 0,
        Status: 0,
        Location:{
            _id: this.LocationsByid._id,
            Name: this.LocationsByid.Name,
            lat: this.LocationsByid.lat,
            lon: this.LocationsByid.lon,
        }
      };
      console.log(data);
      api
        .post("/SmartBin", data, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then(response => {
          console.log(response);
           this.cancel();
        });
    },
    cancel() {
      window.location.reload();
    },
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