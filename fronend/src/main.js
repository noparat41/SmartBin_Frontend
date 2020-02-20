import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBvkDZL-AQ1SeH4ktVJSO185fDtrLI8-VU",
  authDomain: "smartbin-95f7a.firebaseapp.com",
  databaseURL: "https://smartbin-95f7a.firebaseio.com",
  projectId: "smartbin-95f7a",
  storageBucket: "smartbin-95f7a.appspot.com",
  messagingSenderId: "311706871587",
  appId: "1:311706871587:web:9e99bb186f391d6f490e96",
  measurementId: "G-GSGE1Q9D9T"
};

firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
});