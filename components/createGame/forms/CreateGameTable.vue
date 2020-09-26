<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="games"
          :items-per-page="5"
          class="elevation-1"
          single-select
          @dblclick:row="selectGame"
        >
          <template v-slot:item.activePlayer="{ item }">
            <span v-if="item.activePlayer === '1'"> Blanques </span>
            <span v-if="item.activePlayer === '-1'"> Negres </span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-if="showForm">
      <v-col cols="12">
        <JoinUserForm :item="selectedItem"></JoinUserForm>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import JoinUserForm from '~/components/createGame/forms/JoinUserForm.vue'
export default {
  name: 'CreateGameTable',
  components: {
    JoinUserForm
  },
  data: function () {
    return {
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'White pieces', value: 'wPlayer' },
        { text: 'Black pieces', value: 'bPlayer' },
        { text: 'Start color', value: 'activePlayer' }
      ],
      games: [],
      lastItem: {},
      selectedItem: {},
      showForm: false
    }
  },
  computed: {
    ...mapGetters('game-info', ['getGames']),
    gamesList() {
      return this.getGames()
    }
  },
  watch: {
    gamesList: function (value) {
      console.log('HE MODIFICADO LA LISTA DE PARTIDAS', value)
    }
    /*games: {
      handler(value) {
        console.log('HE MODIFICADO LA LISTA DE PARTIDAS', value)
      },
      deep: true
    }*/
  },
  mounted() {
    this.games = this.getGames()
  },
  methods: {
    ...mapActions('game', [
      'setStatus',
      'setIdGame',
      'setWPlayer',
      'setBPlayer',
      'setActivePlayer'
    ]),
    selectGame(e, item) {
      this.showForm = false
      if (this.lastItem && this.lastItem.select) {
        this.lastItem.select(false)
      }
      item.select(true)
      this.lastItem = item
      console.log('SELECTED ITEM:', item.item)
      if (item.item.wPlayer === '') {
        this.setBPlayer(item.item.bPlayer)
      } else if (item.item.bPlayer === '') {
        this.setBPlayer(item.item.wbPlayer)
      }
      this.setActivePlayer(item.item.activePlayer)
      this.setIdGame(item.item.id)
      this.selectedItem = item.item
      // this.setStatus(2)
      this.showForm = true
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  tr.v-data-table__selected {
    background: #ddd !important;
    td {
      color: #000 !important;
    }
  }
}
</style>
