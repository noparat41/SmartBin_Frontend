<template>
  <div>
    <Navbar />

    <v-container>
      <br />
      <br />
      <v-card id="create" align="center" justify="center" dark>
        <v-container fluid>
          <br />
          <v-col class="d-flex" cols="12" sm="4">
            <v-select
              :items="Bins"
              label="Name"
              v-model="BinId"
              item-text="Name"
              item-value="Uid"
              :rules="[(v) => !!v || 'Item is required']"
              solo
            ></v-select>
          </v-col>

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
          </v-col>

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
                <v-btn rounded color="warning" dark large @click="getLocationByid()">Edit</v-btn>
              </div>
              <div class="text-center">
                <v-btn text color="warning" dark large @click="cancel() ">cancel</v-btn>
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
    Locations: [],
    LocationId: "",
    Bins: [],
    BinId: "",
    LocationsByid: []
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
    getBin() {
      console.log("getBin");
      api
        .get("/SmartBin")
        .then(response => {
          this.Bins = response.data;
          console.log(this.Bins);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getLocationByid() {
      console.log("getLocationByid");

      api
        .get("/Location/" + this.LocationId)
        .then(response => {
          this.LocationsByid = response.data;
          console.log(response.data);
          this.getBinByid();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getBinByid() {
      console.log("getBinByid");
      console.log(this.BinId);
      api
        .get("/Location/" + this.BinId)
        .then(response => {
          this.BinByid = response.data;
          console.log(response.data);
          //this.putBin();
        })
        .catch(e => {
          console.log(e);
        });
    },
    putBin() {
      console.log(this.Ids);
      api
        .put(
          "/Bin/" + this.BinId,
          {
            Name: this.BinByid.Name,
            State: this.BinByid.State,
            Status: this.BinByid.Status,
            Image: this.BinByid.Image,
            Location: {
              _id: this.LocationsByid._id,
              Name: this.LocationsByid.Name,
              lat: this.LocationsByid.lat,
              lon: this.LocationsByid.lon
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
    this.getLocation();
    this.getBin();
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