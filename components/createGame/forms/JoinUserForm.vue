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
          <p>Join as:</p>
          <v-radio-group v-model="joinAsColor">
            <v-radio label="Blanques" value="1"></v-radio>
            <v-radio label="Negres" value="-1"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="versusName"
            :rules="nameRules"
            label="Your Player name"
            :disabled="joinAsColor !== versusColor"
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
      joinAsName: '',
      versusColor: '',
      joinColor: '',
      joinAsColor: '',
      joinActiveColor: '',
      readyGame: false,
      nameRules: [(v) => !!v || 'Name is required']
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
    ...mapActions('game', ['setJoinGame']),
    selectGame() {
      let wPlayer = this.item.wPlayer
      let bPlayer = this.item.bPlayer
      this.joinGameName = this.item.id
      this.joinActiveColor = this.item.activePlayer
      if (wPlayer && bPlayer && wPlayer !== '' && bPlayer !== '') {
        this.versusName = wPlayer
        this.versusColor = '1'
        this.joinName = bPlayer
        this.joinColor = '-1'
      } else if (wPlayer && wPlayer !== '') {
        this.joinName = wPlayer
        this.joinColor = '1'
        this.versusColor = '-1'
        this.joinAsColor = '-1'
      } else if (bPlayer && bPlayer !== '') {
        this.joinName = bPlayer
        this.joinColor = '-1'
        this.versusColor = '1'
        this.joinAsColor = '1'
      }
    },
    async joinGameButton() {
      //TODO: no siempre hay que rellenar el jugador
      this.setIdGame(this.joinGameName)
      this.setActivePlayer(this.joinActiveColor)
      if (this.joinAsColor === this.versusColor) {
        if (this.joinValid) {
          if (this.versusColor === '1') {
            this.setWPlayer(this.versusName)
          } else {
            this.setBPlayer(this.versusName)
          }
          await this.setJoinGame(this.versusColor)
          this.setStatus(3)
        }
      } else {
        if (this.joinColor === '1') {
          this.setWPlayer(this.joinName)
        } else {
          this.setBPlayer(this.joinName)
        }
        this.setStatus(3)
      }
    }
  }
}
</script>
