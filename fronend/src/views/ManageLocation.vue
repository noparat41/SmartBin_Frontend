<template>
  <v-app>
    <Navbar />
    <v-col>
      <v-data-table :headers="headers" :items="Locations" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="#E0E0E0">
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
      Location: [],
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
      api
        .get("/Location")
        .then(response => {
          this.Locations = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    Check(Status) {
      if (
        (this.LocationName == null || this.LocationName == "") &&
        (this.Locationlon == null || this.Locationlon == "") &&
        (this.Locationlat == null || this.Locationlat == "")
      ) {
        alert("Please fill out all information before adding location.");
        return true;
      } else if (this.LocationName == null || this.LocationName == "") {
        if (this.Locationlon == null || this.Locationlon == "")
          alert("Please enter your name and lon location.");
        else if (this.Locationlat == null || this.Locationlat == "")
          alert("Please enter your name and lat location.");
        else alert("Please enter your name location.");
        return true;
      } else if (this.Locationlon == null || this.Locationlon == "") {
        if (this.Locationlat == null || this.Locationlat == "")
          alert("Please enter your lon and lat location.");
        else alert("Please enter your lon location.");
        return true;
      } else if (this.Locationlat == null || this.Locationlat == "") {
        alert("Please enter your lat location.");
        return true;
      }
      if (Status) {
        if (
          this.LocationName == this.Location.Name &&
          this.Locationlon == this.Location.lon &&
          this.Locationlat == this.Location.lat
        ) {
          alert("Location data has not changed.");
          return true;
        }
      }
      return false;
    },
    post() {
      this.Status = true;
      this.LocationName = "";
      this.Locationlon = "";
      this.Locationlat = "";
    },
    postLocation() {
      if (this.Check(false)) {
        return;
      }
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
          alert("Successfully add location.");
          this.cancel();
        });
    },
    Delete(Id) {
      api
        .delete("/Location/" + Id)
        .then(response => {
          console.log(response);
          alert("Successfully Delete location.");
          this.cancel();
        })
        .catch(e => {
          console.log(e);
        });
    },
    Edit(Location) {
      this.Location = Location;
      this.LocationId = Location._id;
      this.LocationName = Location.Name;
      this.Locationlon = Location.lon;
      this.Locationlat = Location.lat;
      this.Status = false;
      this.dialogs = true;
    },
    EditLocation() {
      if (this.Check(true)) {
        return;
      }
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
          alert("Successfully edit location.");
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