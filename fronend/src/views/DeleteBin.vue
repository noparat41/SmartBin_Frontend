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
              :items="Bins"
              label="Name"
              v-model="BinId"
              item-text="Name"
              item-value="Name"
              :rules="[(v) => !!v || 'Item is required']"
              solo
            ></v-select>
          </v-col>
          <br />

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
          <br />
          <br />
          <v-divider></v-divider>
          <br />
          <v-card-actions>
            <v-row justify="center">
              <div class="text-center">
                <v-btn rounded color="red" dark large @click="Delete()">Delete</v-btn>
              </div>
              <div class="text-center">
                <v-btn text color="red" dark large @click="cancel()">cancel</v-btn>
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
    Bins: [],
    BinId: ""
  }),
  methods: {
    /* eslint-disable no-console */
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
    Delete() {
      console.log("Delete");
      api
        .delete("/SmartBin/" + this.BinId)
        .then(response => {
          console.log(response);
          this.cancel();
        })
        .catch(e => {
          console.log(e);
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

<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>