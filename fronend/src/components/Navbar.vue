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

      <v-avatar size="40">
        <v-icon size="30">account_circle</v-icon>
      </v-avatar>

      <v-btn dark icon>
        <v-icon>notifications</v-icon>
      </v-btn>

      <span>{{currentUser}}</span>

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
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
      <br />
      <v-divider></v-divider>
      <br />

      <v-list>
        <v-list-item v-for="item in items1" :key="item.title" router :to="item.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      messages: 0,
      show: false,
      dialog: false,
      drawerRight: false,
      isLoggedIn: false,
      currentUser: false,
      items: [
        { icon: "people_alt", title: "Profile", route: "/Profile" },
        { icon: "exit_to_app", title: "Sign Out", route: "/" }
      ],
      items1: [
        { icon: "dashboard", title: "Trash Status", route: "/Status" },
        { icon: "delete", title: "Manage Trash", route: "/AddBin" },
        { icon: "my_location", title: "Map", route: "/Map" },
        { icon: "bar_chart", title: "Statistics", route: "/Statistics" }
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
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>