<template>
  <v-container fluid>
    <v-form v-model="joinValid">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="joinGameName"
            label="Game name"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="versusName"
            :rules="nameRules"
            label="Your Player name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="joinName"
            label="Versus player name"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <p>Your pieces color</p>
          <v-radio-group v-model="versusColor" disabled>
            <v-radio label="Blanques" value="1"></v-radio>
            <v-radio label="Negres" value="-1"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="6">
          <p>Player pieces color</p>
          <v-radio-group v-model="joinColor" disabled>
            <v-radio label="Blanques" value="1"></v-radio>
            <v-radio label="Negres" value="-1"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p>Player start game</p>
          <v-radio-group v-model="joinActiveColor" disabled>
            <v-radio label="Blanques" value="1"></v-radio>
            <v-radio label="Negres" value="-1"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="primary" @click="joinGameButton()"
            >Començar partida</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'JoinUserForm',
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {
      joinValid: false,
      joinGameName: '',
      versusName: '',
      joinName: '',
      versusColor: '',
      joinColor: '',
      joinActiveColor: '',
      readyGame: false,
      nameRules: [(v) => !!v || 'Name is required'],
      gameNameRules: [(v) => !!v || 'Game name is required']
    }
  },
  computed: {
    ...mapGetters('game', [
      'getIdGame',
      'getWPlayer',
      'getBPlayer',
      'getActivePlayer'
    ]),
    idGame() {
      return this.getIdGame()
    },
    getItem() {
      return this.item
    }
  },
  watch: {
    getItem(val) {
      console.log(val)
      this.selectGame()
    }
  },
  mounted() {
    this.selectGame()
  },
  methods: {
    ...mapActions('game', [
      'setStatus',
      'setIdGame',
      'setWPlayer',
      'setBPlayer',
      'setActivePlayer'
    ]),
    ...mapActions('game-info', ['setGames']),
    selectGame() {
      console.log(this.item)
      let wPlayer = this.item.wPlayer
      let bPlayer = this.item.bPlayer
      this.joinGameName = this.item.id
      this.joinActiveColor = this.item.activePlayer
      console.log('HOLA QUE HI HA ALGU')
      if (wPlayer && bPlayer && wPlayer !== '' && bPlayer !== '') {
        this.versusName = wPlayer
        this.versusColor = '1'
        this.joinName = bPlayer
        this.joinColor = '-1'
      } else if (wPlayer && wPlayer !== '') {
        this.joinName = wPlayer
        this.joinColor = '1'
        this.versusColor = '-1'
      } else if (bPlayer && bPlayer !== '') {
        this.joinName = bPlayer
        this.joinColor = '-1'
        this.versusColor = '1'
      }
    },
    joinGameButton() {
      /*this.setIdGame(this.gameName)
      if (this.color === '1') {
        this.setWPlayer(this.name)
      } else {
        this.setBPlayer(this.name)
      }
      this.setActivePlayer(this.activeColor)
      this.setStatus(2)*/
    }
  }
}
</script>
