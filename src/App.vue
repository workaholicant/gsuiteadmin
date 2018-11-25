<template>
  <div id="app">
    <header>
      <v-layout row wrap>
        <v-flex xs8 class="title-text title">
          GSuite Handler
        </v-flex>
        <v-flex xs4 class="text-xs-right">
          <v-btn v-on:click="clickLogout" v-if="showLogout">Log out</v-btn>
        </v-flex>
      </v-layout>
    </header>
    <main>
      <v-snackbar
        top
        v-model="showNotify"
        :color="notifyColor"
      >
        {{ notifyText }}
      </v-snackbar>
      <loading
        :event-bus="globalEventBus"
        event-show="show-full-loading"
        event-hide="hide-full-loading"
        :label="fullLoadingLabel">
      </loading>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import loading from 'vue-full-loading'
import { EventBus } from '@/event-bus.js'

export default {
  name: 'app',
  data () {
    return {
      showNotify: false,
      notifyColor: '',
      notifyText: '',
      fullLoadingLabel: 'Loading...'
    }
  },
  components: {
    loading
  },
  methods: {
    showSuccess (message) {
      this.showNotify = true
      this.notifyColor = 'success'
      this.notifyText = message
    },
    showError (message) {
      this.showNotify = true
      this.notifyColor = 'error'
      this.notifyText = message
    },
    clickLogout () {
      localStorage.clear()
      this.$router.push('/signin')
    }
  },
  computed: {
    globalEventBus () {
      return EventBus
    },
    showLogout () {
      if (this.$route.name.toLowerCase() === 'signin') {
        return false
      }
      return true
    }
  },
  created () {
    EventBus.$on('show-success', this.showSuccess)
    EventBus.$on('show-error', this.showError)
  },
  destroyed () {
    EventBus.$off('show-success', this.showSuccess)
    EventBus.$off('show-error', this.showError)
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

.title-text {
  line-height: 56px !important;
}
</style>
