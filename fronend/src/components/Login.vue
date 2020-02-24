<template>
  <v-app id="inspire">
    <v-content>
      <div
        class="img-background"
        v-bind:style="{'background-image': 'url(' + require('../assets/background.jpg') + ')'}"
      >
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col md="4">
              <v-card class="elevation-12">
                <v-col class="text-center" md="mx-auto">
                  <v-col cols="12" sm="3"></v-col>
                  <v-row class="justify-center">
                    <v-avatar size="120">
                      <v-img src="../assets/SmartBin.jpg"></v-img>
                    </v-avatar>
                    <v-card-text>
                      <br />
                      <h2>
                        <span>Login</span>
                      </h2>
                      
                      <v-col>
                        <v-col>
                          <v-row class="justify-center">
                            <v-btn color="#f32c25" dark block>
                              <button @click="socialGoogleLogin">Log in with Gmail</button>
                            </v-btn>
                          </v-row>
                        </v-col>
                        <v-col>
                          <v-row class="justify-center">
                            <v-btn color="#4267B2" dark block>
                              <button @click="socialFacecbookLogin">Log in with Facebook</button>
                            </v-btn>
                          </v-row>
                        </v-col>
                      </v-col>
                    </v-card-text>
                  </v-row>
                </v-col>
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
export default {
  props: {
    msg: String
  },
  methods: {
    /* eslint-disable no-console */
    socialGoogleLogin: function() {
      const provide = new firebase.auth.GoogleAuthProvider().addScope("email");
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(result => {
          // create user in db
          let obj = {
            google_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.additionalUserInfo.profile.picture,
            user_type_id: 1
          };
          this.$router.push("/Profile");
          console.log(obj);
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    socialFacecbookLogin: function() {
      const provide = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(result => {
          // create user in db
          let obj = {
            facebook_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.user.photoURL + "?height=500",
            user_type_id: 1
          };
          this.$router.push("/Profile");
          console.log(obj);
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    }
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