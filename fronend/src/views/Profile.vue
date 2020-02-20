<template>
  <v-app id="inspire">
    <v-content>
      <div
        class="img-background"
        v-bind:style="{'background-image': 'url(' + require('../assets/Test1.jpg') + ')'}"
      >
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col md="5">
              <v-card class="overflow-hidden" color="#ffff">
                <v-toolbar color="#F4511E" dark>
                  <v-icon>mdi-account</v-icon>
                  <v-toolbar-title class="font-weight-light">User Profile</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn color="#F4511E" fab small @click="isEditing = !isEditing">
                    <v-icon v-if="isEditing">mdi-close</v-icon>
                    <v-icon v-else>mdi-pencil</v-icon>
                  </v-btn>

                  <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                      <v-btn dark icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-card height="mx-auto" width="250" dark>
                      <v-list>
                        <v-list-item @click="$router.push('/Status')">
                          <v-col id="H1" class="8">
                            <v-icon>home</v-icon>
                          </v-col>
                          <v-list-item-title>Home</v-list-item-title>
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
                </v-toolbar>
                <v-card-text>
                  <br />
                  <v-col align="center">
                    <v-avatar size="150">
                      <v-icon size="200">account_circle</v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <v-text-field :disabled="!isEditing" v-model="Ids" label="UserId"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field :disabled="!isEditing" v-model="UserName" label="Username"></v-text-field>
                    <v-col>
                      <v-row>
                        <v-text-field
                          :disabled="!isEditing"
                          v-model="FirstName"
                          label="First Name"
                          id="firstname"
                        ></v-text-field>
                        <v-spacer />
                        <v-text-field :disabled="!isEditing" v-model="SurName" label="Last Names"></v-text-field>
                      </v-row>
                    </v-col>
                    <v-text-field :disabled="!isEditing" v-model="Email" label="Email"></v-text-field>
                    <v-text-field
                      :disabled="!isEditing"
                      color="white"
                      v-model="Phone"
                      label="Telephone number"
                    ></v-text-field>
                  </v-col>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                  <v-col>
                    <v-btn
                      :disabled="!isEditing"
                      rounded
                      large
                      color="success"
                      @click="putStaff()"
                    >Save</v-btn>
                    <v-btn
                      :disabled="!isEditing"
                      color="#4267B2"
                      @click="$router.push('/Navbar')"
                      text
                      large
                    >cancel</v-btn>
                  </v-col>
                </v-card-actions>
                <v-snackbar
                  v-model="hasSaved"
                  :timeout="2000"
                  absolute
                  bottom
                  left
                >Your profile has been updated</v-snackbar>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import api from "../API";
export default {
  data() {
    return {
      hasSaved: false,
      isEditing: null,
      model: null,
      Staffs: [],
      name: "",
      uid: "",
      uids: "",
      Id: "",
      Ids: "",
      UserName: "",
      FirstName: "",
      SurName: "",
      Email: "",
      Phone: "",
      Image: ""
    };
  },

  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.uid = firebase.auth().currentUser.uid;
    }
  },

  methods: {
    /* eslint-disable no-console */
    getStaff() {
      console.log("getStaff");
      api
        .get("/Staff/" + firebase.auth().currentUser.uid)
        .then(response => {
          this.Staffs = response.data;
          console.log(this.Staffs);

          this.Id = this.Staffs._id;
          this.Ids = this.Staffs.Ids;
          this.UserName = this.Staffs.NickName;
          this.FirstName = this.Staffs.FirstName;
          this.SurName = this.Staffs.SurName;
          this.Email = this.Staffs.Email;
          this.Image = this.Staffs.Image;
          this.Phone = this.Staffs.Phone;
        })
        .catch(e => {
          console.log(e);
          this.postStaffByUid();
        });
    },
    postStaffByUid: async () => {
      console.log("PostStaffByUid");
      var data = {
        Uid: firebase.auth().currentUser.uid,
        Email: firebase.auth().currentUser.email,
        Image: firebase.auth().currentUser.photoUrl
      };
      api
        .post("/Staff", data, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then(response => {
          console.log(response);
        });
    },
    putStaff() {
      console.log(this.Ids);
      api
        .put(
          "/Staff/" + this.Id,
          {
            uid: firebase.auth().currentUser.uid,
            id: this.Id,
            ids: this.Ids,
            nickName: this.UserName,
            firstName: this.FirstName,
            surName: this.SurName,
            phone: this.Phone,
            email: this.Email
          },
          {
            headers: {
              "content-type": "application/json"
            }
          }
        )
        .then(response => {
          console.log(response);
        });
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  },

  mounted() {
    this.getStaff();
  }
};
</script>

<style>
.img-background {
  width: 100%;
  height: 100%;
  background-size: cover;
}
</style>