<template>
  <v-app>
    <Navbar />

    <v-container class="pa-4 text-center">
      <v-card-text v-if="Bar==false">
        <v-row>
          <v-spacer />
          <v-btn dark fab color="pink" @click="Bar=true">
            <v-icon size="30">chevron_left</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>

      <v-toolbar color="#aaaaaa" dark v-if="Bar==true">
        <v-spacer />
        <v-col cols="12" sm="8" md="6">
          <v-text-field solo-inverted flat hide-details label="Search" />
        </v-col>
        <v-btn dark icon @click="$router.push('/Status')">
          <v-icon size="30">search</v-icon>
        </v-btn>
        <v-avatar size="20" />
        <v-btn dark fab small color="success" @click="AddDialog=true">
          <v-icon size="30">mdi-plus</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn dark fab @click="Bar=false" icon>
          <v-icon size="30">chevron_right</v-icon>
        </v-btn>
      </v-toolbar>

      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in Bins">
          <v-col :key="i" cols="12" md="4">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                <v-card-text>
                  <v-row>
                    <v-spacer />
                    <v-btn dark fab x-small icon color="warning" @click="Edit(item)" size="15">
                      <v-icon size="20">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn dark fab x-small color="red" icon @click=" Delete(item.Name)" size="15">
                      <v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                    <v-avatar size="20" />
                  </v-row>
                </v-card-text>

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

                <v-btn @click="putBin(item,false)" color="success" v-if="item.Status*5 < 50">
                  <h6>clear</h6>
                </v-btn>
                <v-btn @click="putBin(item,false)" color="warning" v-else-if="item.Status*5 < 100">
                  <h6>clear</h6>
                </v-btn>
                <v-btn @click="putBin(item,false)" color="error" v-else>
                  <h6>clear</h6>
                </v-btn>
                <br />
                <br />
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>

      <v-dialog v-model="AddDialog" max-width="600">
        <v-card align="center" justify="center" dark>
          <br />
          <v-col class="d-flex" cols="12" sm="5">
            <v-text-field label="Name" v-model="Name" :rules="[(v) => !!v || 'Item is required']"></v-text-field>
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

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
            <div class="text-center">
              <v-btn rounded color="success" dark large @click="getLocationByid(true)">Seve</v-btn>
            </div>
            <div class="text-center">
              <v-btn text color="success" dark large @click="AddDialog=false">close</v-btn>
            </div>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="EditDialog" max-width="600">
        <v-card align="center" justify="center" dark>
          <br />
          <br />
          <h3>{{Bin.Name}}</h3>
          <br />
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

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
            <div class="text-center">
              <v-btn rounded color="warning" dark large @click="getLocationByid(false)">Edit</v-btn>
            </div>
            <div class="text-center">
              <v-btn text color="warning" dark large @click="EditDialog=false">close</v-btn>
            </div>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      Bar: false,
      LocationId: "",
      Name: "",
      AddDialog: false,
      EditDialog: false,
      Bins: [],
      Bin: [],
      BinId: "",
      Status: "",
      State: "",

      Locations: [],
      LocationsByid: []
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
      if (Abin.Status != 20) {
        return;
      }
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
          if (!Switch) {
            this.cancel();
          }
        });
    },
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
    getLocationByid(Status) {
      console.log("getLocationByid");
      console.log(this.LocationId);
      api
        .get("/Location/" + this.LocationId)
        .then(response => {
          this.LocationsByid = response.data;
          console.log(response.data);
          if (Status) {
            this.postBin();
          } else {
            this.EditBin();
          }
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
        Location: {
          _id: this.LocationsByid._id,
          Name: this.LocationsByid.Name,
          lat: this.LocationsByid.lat,
          lon: this.LocationsByid.lon
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
    Delete(BinId) {
      console.log("Delete");
      api
        .delete("/SmartBin/" + BinId)
        .then(response => {
          console.log(response);
          this.cancel();
        })
        .catch(e => {
          console.log(e);
        });
    },

    Edit(Bin) {
      this.Bin = Bin;
      this.EditDialog = true;
    },
    EditBin() {
      console.log("EditBin");
      api
        .put(
          "/SmartBin/" + this.Bin.Name,
          {
            Name: this.Bin.Name,
            State: this.Bin.State,
            Status: this.Bin.Status,
            Image: this.Bin.Image,
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
    this.getBin();
    this.getLocation();
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>