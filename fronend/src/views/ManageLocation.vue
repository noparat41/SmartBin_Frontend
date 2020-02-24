<template>
  <v-app>
    <Navbar />
    <v-col>
      <v-data-table :headers="headers" :items="Locations" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="#E0E0E0" >
            <v-toolbar-title>Manage Location</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogs" persistent max-width="700">
              <template v-slot:activator="{ on }">
                <v-btn color="success" dark v-on="on" @click="post()">Add Location</v-btn>
              </template>
              <v-card dark>
                <v-card-title v-if="Status">
                  <span class="headline">Add Location</span>
                </v-card-title>
                <v-card-title v-else>
                  <span class="headline">Edit Location</span>
                </v-card-title>
                <v-card-text align="center" justify="center">
                  <v-col>
                    <v-col>
                      <div cols="12" sm="8" md="8">
                        <v-text-field
                          label="Location Name"
                          persistent-hint
                          required
                          v-model="LocationName"
                        ></v-text-field>
                      </div>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8" md="6">
                          <v-text-field label="lon :" required v-model="Locationlon"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8" md="6">
                          <v-text-field label="lat :" v-model="Locationlat"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-col>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-col>
                    <v-row justify="center" v-if="Status">
                      <v-btn rounded color="success" dark @click="postLocation()">Seve</v-btn>
                      <v-btn text color="success" dark @click="dialogs = false">Close</v-btn>
                    </v-row>
                    <v-row justify="center" v-else>
                      <v-btn rounded color="warning" dark @click="EditLocation()">Edit</v-btn>
                      <v-btn text color="warning" dark @click="dialogs = false">Close</v-btn>
                    </v-row>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="Edit(item)" color="warning">edit</v-icon>
          <v-icon small @click="Delete(item._id)" color="error">delete</v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="cancel()">Reset</v-btn>
        </template>
      </v-data-table>
    </v-col>
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
      Status: "",
      LocationName: "",
      Locationlon: "",
      Locationlat: "",
      Locations: [],
      LocationId: "",

      dialogs: false,
      headers: [
        { value: "", sortable: false },
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "Name"
        },
        { text: "lon", value: "lon" },
        { text: "lat", value: "lat" },
        { text: "Manage", value: "action", sortable: false }
      ],

      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    };
  },

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
    post() {
      this.Status = true;
      this.LocationName = "";
      this.Locationlon = "";
      this.Locationlat = "";
    },
    postLocation() {
      console.log("postLocation");

      var data = {
        Name: this.LocationName,
        lon: this.Locationlon,
        lat: this.Locationlat
      };
      console.log(data);
      api
        .post("/Location", data, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then(response => {
          console.log(response);
          this.cancel();
        });
    },
    Delete(Id) {
      console.log("Delete");
      api
        .delete("/Location/" + Id)
        .then(response => {
          console.log(response);
          this.cancel();
        })
        .catch(e => {
          console.log(e);
        });
    },
    Edit(Location) {
      this.LocationId = Location._id;
      this.LocationName = Location.Name;
      this.Locationlon = Location.lon;
      this.Locationlat = Location.lat;
      this.Status = false;
      this.dialogs = true;
    },
    EditLocation() {
      console.log("EditLocation");
      console.log(this.LocationId);
      api
        .put(
          "/Location/" + this.LocationId,
          {
              _id: this.LocationId,
              Name: this.LocationName,
              lat: this.Locationlat,
              lon: this.Locationlon
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
  }
};
</script>