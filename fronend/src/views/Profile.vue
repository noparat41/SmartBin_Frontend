<template>
  <v-app id="inspire">
    <v-content>
      <div
        class="img-background"
        v-bind:style="{'background-image': 'url(' + require('../assets/background.jpg') + ')'}"
      >
        <br />
        <br />
        <br />
        <v-card class="mx-auto" max-width="600">
          <v-toolbar color="#F4511E" dark>
            <v-toolbar-title>Profile</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn color="#F4511E" fab small @click="isEditing = !isEditing">
              <v-icon v-if="isEditing">mdi-close</v-icon>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
            <v-menu bottom left transition="slide-y-transition">
              <template v-slot:activator="{ on }">
                <v-btn dark icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-card height="mx-auto" width="200" dark>
                <v-list>
                  <v-list-item id="H1" @click="$router.push('/ManageTrash')">
                    <v-col class="8">
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
          </v-toolbar>

          <v-container fluid>
            <v-row dense>
              <v-col v-for="card in cards" :key="card.title" :cols="card.flex" align="center">
                <v-card v-show="card.Status == true">
                  <v-card-text>
                    <br />

                    <v-col v-if="status">
                      <v-avatar size="150">
                        <v-img :src="Image"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col v-if="!status">
                      <v-avatar size="150">
                        <v-icon size="180" color="#F4511E">account_circle</v-icon>
                      </v-avatar>
                    </v-col>
                    <v-col>
                      <v-text-field :disabled="!isEditing" v-model="UserName" label="Username"></v-text-field>
                    </v-col>
                  </v-card-text>
                  <br />
                  <br />
                  <br />
                </v-card>
                <v-card v-show="card.Status == false">
                  <v-col>
                    <v-card-text>
                      <v-text-field :disabled="!isEditing" v-model="Ids" label="UserId"></v-text-field>
                      <v-text-field
                        :disabled="!isEditing"
                        v-model="FirstName"
                        label="First Name"
                        id="firstname"
                      ></v-text-field>
                      <v-spacer />
                      <v-text-field :disabled="!isEditing" v-model="SurName" label="Last Names"></v-text-field>
                      <v-text-field :disabled="!isEditing" v-model="Email" label="Email"></v-text-field>
                      <v-text-field :disabled="!isEditing" v-model="Phone" label="Telephone number"></v-text-field>
                    </v-card-text>
                  </v-col>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-col align="center">
              <v-btn :disabled="!isEditing" rounded large color="success" @click="putStaff()">Save</v-btn>
              <v-btn :disabled="!isEditing" color="#4267B2" @click="cancel()" text large>cancel</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
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
      cards: [
        {
          Status: true,
          flex: 6
        },
        {
          Status: false,
          flex: 6
        }
      ],
      isEditing: null,
      Staffs: [],
      Ids: "",
      UserName: "",
      FirstName: "",
      SurName: "",
      Email: "",
      Phone: "",
      Image: "",
      status: false
    };
  },

  methods: {
    /* eslint-disable no-console */
    getStaff() {
      api
        .get("/Staff/" + firebase.auth().currentUser.uid)
        .then(response => {
          this.Staffs = response.data;

          this.Ids = this.Staffs.Ids;
          this.UserName = this.Staffs.NickName;
          this.FirstName = this.Staffs.FirstName;
          this.SurName = this.Staffs.SurName;
          this.Email = this.Staffs.Email;
          this.Image = this.Staffs.Image;
          this.Phone = this.Staffs.Phone;
          if (this.Image.toString() !== "") {
            this.status = true;
          }
    
        })
        .catch(e => {
          console.log(e);
          this.postStaffByUid();
          this.cancel();
        });
    },
    postStaffByUid: async () => {
      var data = {
        Uid: firebase.auth().currentUser.uid,
        Email: firebase.auth().currentUser.email,
        Image: firebase.auth().currentUser.photoURL,
        Ids: null,
        NickName: null,
        FirstName: null,
        SurName: null,
        Phone: null
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
      api
        .put(
          "/Staff/" + firebase.auth().currentUser.uid,
          {
            Uid: firebase.auth().currentUser.uid,
            Image: this.Image,
            Id: this.Id,
            Ids: this.Ids,
            NickName: this.UserName,
            FirstName: this.FirstName,
            SurName: this.SurName,
            Phone: this.Phone,
            Email: this.Email
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
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },
    cancel() {
      window.location.reload();
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