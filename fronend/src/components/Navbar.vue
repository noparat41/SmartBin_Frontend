<template>
  <div>
    <v-app-bar app clipped-left color="#F4511E" dark>
      <v-col>
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
 
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        
      />
      <v-btn dark icon  @click="$router.push('/Status')">
        <v-icon size="30">search</v-icon>
      </v-btn>

      <v-spacer />
      <v-btn dark icon small @click="$router.push('/Status')">
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
      <v-avatar size="30" />
      <v-avatar size="20">
        <v-icon size="30">account_circle</v-icon>
      </v-avatar>

      <v-btn dark text small  @click="$router.push('/Profile')">
        <span>{{currentUser}}</span>
      </v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on" >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-card height="mx-auto" width="200" dark>
          <v-list>
            <v-list-item @click="$router.push('/Profile')">
              <v-col id="H1" class="8">
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
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app clipped left dark>
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
          <v-progress-linear color="green " height="25" width="50" reactive :value="PercentGoodBin">
            <strong>{{ PercentGoodBin }}%</strong>
          </v-progress-linear>
          <v-col align="center">
            <span class="white--text">Can't recycle waste</span>
          </v-col>
          <v-progress-linear color="warning" height="25" reactive :value="PercentBadBin ">
            <strong>{{ PercentBadBin }}%</strong>
          </v-progress-linear>
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
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      i: 0,
      status: 0,
      sum: 0,
      GoodBin: 0,
      BadBin: 0,
      PercentGoodBin: 0,
      PercentBadBin: 0,
      messages: 0,
      show: false,
      dialog: false,
      drawerRight: false,
      isLoggedIn: false,
      currentUser: false,

      items: [
        { icon: "dashboard", title: "Trash Status", route: "/Status" },
        { icon: "delete", title: "Manage Trash", route: "/AddBin" },
        { icon: "my_location", title: "Map", route: "/Map" },
        { icon: "bar_chart", title: "Statistics", route: "/Statistics" }
      ],
      Users: [
        {
          Name: "Arm",
          Point: 0,
          Bin: {
            BadBin: 0,
            GoodBin: 0
          }
        },
        {
          Name: "Nopparat",
          Point: 10,
          Bin: {
            BadBin: 1,
            GoodBin: 1
          }
        },
        {
          Name: "Waoram",
          Point: 20,
          Bin: {
            BadBin: 0,
            GoodBin: 1
          }
        }
      ],
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
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    /* eslint-disable no-console */
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },
    CalculateStatus(){
      console.log("Status");
      this.i=0;
      while (this.i < this.Bins.length) {
        if(this.Bins[this.i].Status === 20){
            this.status++;
        }
        this.i++;
      }
      console.log(this.status);
    },

    Calculate() {
      console.log("calculate");
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
      console.log("calculateGoodBin");
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
      console.log(this.PercentGoodBin);
    },

    CalculateBadBin(GoodBin, BadBin) {
      console.log("CalculateBadBin");
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
      console.log(this.PercentBadBin);
    }
  },
  mounted() {
    this.Calculate();
    this.CalculateStatus();
  }
};
</script>