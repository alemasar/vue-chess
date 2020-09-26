<template>
  <v-container fluid>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="gameName"
            :rules="gameNameRules"
            label="Game name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Player name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p>Player color</p>
          <v-radio-group v-model="color">
            <v-radio label="Blanques" value="1"></v-radio>
            <v-radio label="Negres" value="-1"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p>Player start game</p>
          <v-radio-group v-model="activeColor">
            <v-radio label="Blanques" value="1"></v-radio>
            <v-radio label="Negres" value="-1"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="primary" :disabled="!valid" @click="saveNewGame()"
            >Save</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { /*mapGetters,*/ mapActions } from 'vuex'

export default {
  name: 'CreateUserForm',
  data: function () {
    return {
      valid: false,
      gameName: '',
      name: '',
      nameRules: [(v) => !!v || 'Name is required'],
      gameNameRules: [(v) => !!v || 'Game name is required'],
      color: '1',
      activeColor: '1'
    }
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
    saveNewGame() {
      this.setIdGame(this.gameName)
      if (this.color === '1') {
        this.setWPlayer(this.name)
      } else {
        this.setBPlayer(this.name)
      }
      this.setActivePlayer(this.activeColor)
      this.setStatus(2)
    }
  }
}
</script>
