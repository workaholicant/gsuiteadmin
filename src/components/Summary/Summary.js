import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  data() {
    return {
      headers: [
        { text: 'Name', align: 'left', value: 'fullName' },
        { text: 'Email', value: 'primaryEmail' },
      ],
      allUsers: [],
      twoSVRate: 0.0,
      userData: {},
    }
  },

  methods: {
    pad (number) {
      return number < 10 ? '0' + number : number;
    },
    toISODate (date) {
      return date.getFullYear() + '-' + this.pad(date.getMonth() + 1) + '-' + this.pad(date.getDate());
    },

    fetchActivityReport () {
      const auth = {
        headers: {Authorization: 'Bearer ' + this.userData.token}
      };

      var url = 'https://www.googleapis.com/admin/reports/v1/activity/users/all/applications/admin';

      EventBus.$emit('show-full-loading');
      Vue.axios.get(url, auth)
      .then( result => {
        EventBus.$emit('hide-full-loading');       
        console.log(result);

      })
      .catch( error => {
        EventBus.$emit('hide-full-loading');
        EventBus.$emit('show-error', 'Error in fetching login reports data');
        console.log(error);
      });
    },

    fetch2StepVerificationRate () {
      const auth = {
        headers: {Authorization: 'Bearer ' + this.userData.token}
      };

      var date = this.toISODate(new Date(Date.now()-3*24*60*60*1000));
      // var date = '2018-11-07';
      console.log(date);
      var url = 'https://www.googleapis.com/admin/reports/v1/usage/users/all/dates/' + date + '?parameters=accounts:is_2sv_enrolled&filters=accounts:is_2sv_enrolled==true';
      // var url = 'https://www.googleapis.com/admin/reports/v1/usage/users/all/dates/' + date + '';
      EventBus.$emit('show-full-loading');
      Vue.axios.get(url, auth)
      .then( result => {
        EventBus.$emit('hide-full-loading');
        
        console.log(result);
        var twoSVCount = 0;
        var twoSVUsers = [];

        if (result.data.usageReports) {
          for (var i = 0; i < result.data.usageReports.length; i++) {
            var duplicate = false;
            for (var j = 0; j < twoSVUsers.length; j++) {
              if (result.data.usageReports[i].entity.userEmail === twoSVUsers[j]) {
                duplicate = true;
                break;
              }
            }

            if (!duplicate) {
              twoSVUsers.push(result.data.usageReports[i].entity.userEmail);
              twoSVCount ++;
            }
          }
        }

        this.twoSVRate = (twoSVCount / this.allUsers.length) * 100;
        console.log(this.twoSVRate);
      })
      .catch( error => {
        EventBus.$emit('hide-full-loading');
        EventBus.$emit('show-error', 'Error in fetching reports data');
        console.log(error);
      });
    },

    getAllUsers () {
      const auth = {
        headers: {Authorization: 'Bearer ' + this.userData.token}
      };

      EventBus.$emit('show-full-loading');
      Vue.axios.get('https://www.googleapis.com/admin/directory/v1/users?customer=my_customer', auth)
      .then( result => {
        EventBus.$emit('hide-full-loading');
        
        if (result.data.users) {
          for (var i = 0; i < result.data.users.length; i++) {
            var primaryEmail = '';
            for (var j = 0; j < result.data.users[i].emails.length; j++) {
              if (result.data.users[i].emails[j].primary) {
                primaryEmail = result.data.users[i].emails[j].address;
              }
            }

            var fullName = result.data.users[i].name.fullName;
            this.allUsers.push({fullName: fullName, primaryEmail: primaryEmail});
          }

          console.log(this.allUsers);
          // this.fetch2StepVerificationRate();

          this.fetchActivityReport();
        }
      })
      .catch( error => {
        EventBus.$emit('hide-full-loading');
        EventBus.$emit('show-error', 'Error in fetching user ccount');
        console.log(error);
      });
    }
  },

  mounted() {
    if (localStorage.getItem('user')) {
      this.userData = JSON.parse(localStorage.getItem('user'));

      const auth = {
        headers: {Authorization: 'Bearer ' + this.userData.token}
      };

      EventBus.$emit('show-full-loading');
      Vue.axios.get('https://www.googleapis.com/admin/directory/v1/users/' + this.userData.email, auth)
      .then( result => {
        EventBus.$emit('hide-full-loading');
        var fullUserData = result.data;
        console.log(fullUserData);

        if (!fullUserData.isAdmin) {
          EventBus.$emit('show-error', 'This user is not an admin');
          return;
        }

        this.getAllUsers();
      })
      .catch( error => {
        EventBus.$emit('hide-full-loading');
        EventBus.$emit('show-error', 'Error in fetching your user data');
        console.log(error);
      });
    }
  }
}