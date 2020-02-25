<template>
  <div>
    <v-app-bar app clipped-left color="#F4511E" dark>
      <v-col sm="5">
        <v-col>
          <v-col>
            <h1>
              <span>&nbsp;Smart</span>
              <span class="font-weight-light">&nbsp;Bin</span>
            </h1>
          </v-col>
        </v-col>
      </v-col>
      <v-spacer />

      <v-btn dark icon small @click="$router.push('/ManageTrash')">
        <v-icon size="30">notifications</v-icon>
      </v-btn>

      <td v-if="status != 0">
        <tr>
          <td />
          <v-avatar color="green" size="20">
            <span class="white--text" height="10">{{status}}</span>
          </v-avatar>
        </tr>
        <tr>
          <v-icon></v-icon>
        </tr>
      </td>
      <v-divider class="mx-4" inset vertical></v-divider>

      <v-avatar size="30">
        <v-img :src="Staffs.Image" v-if="shows"></v-img>
        <v-icon size="35" v-if="!shows">account_circle</v-icon>
      </v-avatar>

      <v-btn dark text small @click="$router.push('/Profile')" >
        <span v-if="show">{{Staffs.NickName}}</span>
        <span v-if="!show">{{Staffs.Email}}</span>
      </v-btn>

      <v-menu bottom left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-card height="mx-auto" width="200" dark>
          <v-list>
            <v-list-item id="H1" @click="$router.push('/Profile')">
              <v-col class="8">
                <v-icon>person</v-icon>
              </v-col>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item id="H2" @click="logout()">
              <v-col class="8">
                <v-icon>exit_to_app</v-icon>
              </v-col>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item id="H3" @click="$router.push('/ManageTrash')">
              <v-col class="8">
                <v-icon>delete</v-icon>
              </v-col>
              <v-list-item-title>Manage Trash</v-list-item-title>
            </v-list-item>
            <v-list-item id="H4" @click="$router.push('/ManageLocation')">
              <v-col class="8">
                <v-icon>terrain</v-icon>
              </v-col>
              <v-list-item-title>Manage Location</v-list-item-title>
            </v-list-item>
            <v-list-item id="H3" @click="$router.push('/Map')">
              <v-col class="8">
                <v-icon>my_location</v-icon>
              </v-col>
              <v-list-item-title>Map</v-list-item-title>
            </v-list-item>
            <v-list-item id="H4" @click="$router.push('/Statistics')">
              <v-col class="8">
                <v-icon>bar_chart</v-icon>
              </v-col>
              <v-list-item-title>Statistics</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app clipped left dark color="#616161">
      <v-col>
        <v-col>
          <v-col align="center">
            <span class="white--text">All amount of waste</span>
          </v-col>

          <v-col align="center">
            <span class="white--text">
              <h1>{{sum}}</h1>
            </span>
          </v-col>

          <v-col align="center">
            <span class="white--text">Recycle waste</span>
          </v-col>
          <v-card>
            <v-progress-linear
              color="green "
              height="25"
              width="50"
              reactive
              :value="PercentGoodBin"
            >
              <strong>{{ PercentGoodBin }}%</strong>
            </v-progress-linear>
          </v-card>
          <v-col align="center">
            <span class="white--text">Can't recycle waste</span>
          </v-col>
          <v-card>
            <v-progress-linear color="warning" height="25" reactive :value="PercentBadBin ">
              <strong>{{ PercentBadBin }}%</strong>
            </v-progress-linear>
          </v-card>
        </v-col>
      </v-col>

      <br />
      <v-divider></v-divider>
      <br />

      <v-list>
        <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <br />
      <v-divider></v-divider>
      <br />
    </v-navigation-drawer>
  </div>
</template>

<script>
import api from "../API";
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      items: [
        { icon: "delete", title: "Manage Trash", route: "/ManageTrash" },
        { icon: "terrain", title: "Manage Location", route: "/ManageLocation" },
        { icon: "my_location", title: "Map", route: "/Map" },
        { icon: "bar_chart", title: "Statistics", route: "/Statistics" }
      ],
      i: 0,
      status: 0,
      sum: 0,
      GoodBin: 0,
      BadBin: 0,
      PercentGoodBin: 0,
      PercentBadBin: 0,
      messages: 0,
      show: false,
      shows: false,
      dialog: false,
      drawerRight: false,
      isLoggedIn: false,
      Image: "",
      Staffs: [],
      Users: [],
      Bins: []
    };
  },

  methods: {
    /* eslint-disable no-console */
    getBin() {
      api
        .get("/SmartBin")
        .then(response => {
          this.Bins = response.data;

          this.CalculateStatus();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getUser() {
      api
        .get("/User")
        .then(response => {
          this.Users = response.data;

          this.Calculate();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getStaff() {
      api
        .get("/Staff/" + firebase.auth().currentUser.uid)
        .then(response => {
          this.Staffs = response.data;
          if (this.Staffs.Image.toString() !== "") {
            this.shows = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },

    CalculateStatus() {
      this.i = 0;
      while (this.i < this.Bins.length) {
        if (this.Bins[this.i].Status === 20) {
          this.status++;
        }
        this.i++;
      }
    },

    Calculate() {
      this.i = 0;
      while (this.i < this.Users.length) {
        this.GoodBin = this.GoodBin + this.Users[this.i].Bin.GoodBin;
        this.BadBin = this.BadBin + this.Users[this.i].Bin.BadBin;
        this.i++;
      }
      this.sum = this.GoodBin + this.BadBin;
      this.CalculateGoodBin(this.GoodBin, this.BadBin);
      this.CalculateBadBin(this.GoodBin, this.BadBin);
    },

    CalculateGoodBin(GoodBin, BadBin) {
      if (GoodBin + BadBin === 0) {
        this.PercentGoodBin = 0;
      } else {
        if (
          GoodBin < BadBin &&
          parseInt((GoodBin / (GoodBin + BadBin)) * 100) +
            parseInt((BadBin / (GoodBin + BadBin)) * 100) !==
            100
        ) {
          this.PercentGoodBin =
            parseInt((GoodBin / (GoodBin + BadBin)) * 100) + 1;
        } else {
          this.PercentGoodBin = parseInt((GoodBin / (GoodBin + BadBin)) * 100);
        }
      }
    },

    CalculateBadBin(GoodBin, BadBin) {
      if (GoodBin + BadBin === 0) {
        this.PercentBadBin = 0;
      } else {
        if (
          GoodBin > BadBin &&
          parseInt((GoodBin / (GoodBin + BadBin)) * 100) +
            parseInt((BadBin / (GoodBin + BadBin)) * 100) !==
            100
        ) {
          this.PercentBadBin =
            parseInt((BadBin / (GoodBin + BadBin)) * 100) + 1;
        } else {
          this.PercentBadBin = parseInt((BadBin / (GoodBin + BadBin)) * 100);
        }
      }
    }
  },
  mounted() {
    this.getStaff();
    this.getUser();
    this.getBin();
  }
};
</script>