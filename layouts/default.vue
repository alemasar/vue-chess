<template>
  <v-app dark class="override">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer fixed>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Play Game',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Create Game',
          to: '/createGame'
        }
      ],
      title: 'Vuetify.js'
    }
  }
}
</script>

<style lang="scss">
.v-application--wrap {
  .v-card {
    background-color: white !important;
  }
}
</style>

<style lang="scss" scoped>
.v-footer {
  &.v-footer--fixed {
    z-index: 999;
  }
}
</style>
