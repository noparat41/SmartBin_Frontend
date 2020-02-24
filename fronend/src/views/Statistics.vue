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
          <v-text-field
            solo-inverted
            flat
            hide-details
            label="Search by member name"
            v-model="SearchName"
          />
        </v-col>
        <v-btn dark icon @click="search()">
          <v-icon size="30">search</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn dark fab @click="Bar=false" icon>
          <v-icon size="30">chevron_right</v-icon>
        </v-btn>
      </v-toolbar>

      <v-row class="fill-height" align="center" justify="center" v-if="show ==true">
        <template v-for="(item, i) in Users">
          <v-col :key="i" cols="12" md="4">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                <v-col>
                  <v-card color="grey lighten-3">
                    <br />
                    <h3>{{item.Name}}</h3>

                    <v-avatar size="80" v-if="item.Photo==null || item.Photo ==''">
                      <v-icon size="80">account_circle</v-icon>
                    </v-avatar>
                    <v-avatar size="80" v-else>
                      <v-img :src="item.Photo"></v-img>
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

      <v-row class="fill-height" align="center" justify="center" v-if="show ==false">
        <v-col cols="12" md="4">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-col>
                <v-card color="grey lighten-3">
                  <br />
                  <h3>{{Searchs.Name}}</h3>

                  <v-avatar size="80" v-if="Searchs.Photo==null || Searchs.Photo ==''">
                    <v-icon size="80">account_circle</v-icon>
                  </v-avatar>
                  <v-avatar size="80" v-else>
                    <v-img :src="Searchs.Photo"></v-img>
                  </v-avatar>

                  <h5>Point : {{Searchs.Point}}</h5>
                  <v-col>
                    <v-col>
                      <v-card>
                        <v-progress-linear
                          color="warning "
                          height="25"
                          width="50"
                          reactive
                          :value="CalculateGoodBin(Searchs.Bin.GoodBin, Searchs.Bin.BadBin)"
                        >
                          <strong>{{ CalculateGoodBin(Searchs.Bin.GoodBin, Searchs.Bin.BadBin) }}%</strong>
                        </v-progress-linear>
                      </v-card>
                      <br />
                      <v-card>
                        <v-progress-linear
                          color="yellow darken-1"
                          height="25"
                          reactive
                          :value="CalculateBadBin(Searchs.Bin.GoodBin, Searchs.Bin.BadBin) "
                        >
                          <strong>{{ CalculateBadBin(Searchs.Bin.GoodBin, Searchs.Bin.BadBin) }}%</strong>
                        </v-progress-linear>
                      </v-card>
                    </v-col>
                  </v-col>
                </v-card>
              </v-col>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
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
      show: true,
      Searchs: [],
      SearchName: null,
      Bar: "",
      Users: [],
      Image: "",
      i: 0
    };
  },
  methods: {
    /* eslint-disable no-console */
    getUser() {
      api
        .get("/User")
        .then(response => {
          this.Users = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    CalculateGoodBin(GoodBin, BadBin) {
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
    },
    search() {
      if (this.SearchName == "" || this.SearchName == null) {
        this.show = true;
        this.SearchName = null;
        alert("Please enter your member name");
        return;
      }
      this.i = 0;
      while (this.i < this.Users.length) {
        if (this.Users[this.i].Name == this.SearchName) {
          this.Searchs = this.Users[this.i];
          this.show = false;
          break;
        }
        this.i++;
      }
      if (this.i == this.Users.length) {
        this.show = true;
        this.SearchName = null;
        alert("Not found");
      }
    },
    cancel() {
      window.location.reload();
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>