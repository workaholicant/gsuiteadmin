import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  data() {
    return {

    }
  },

  methods: {
    clickSignIn() {
      this.$gAuth.signIn()
      .then(googleUser => {
        var access_token = googleUser.Zi.access_token;
        var email = googleUser.w3.U3;
        localStorage.setItem('user', JSON.stringify({'token': access_token, 'email': email}));

        EventBus.$emit('show-success', 'Sign in Success');
        this.$router.push('/summary');
      })
      .catch(error => {
        console.log('Error:');
        console.log(error);
        EventBus.$emit('show-error', 'Sign in Failed');
      });


    }
  }
}