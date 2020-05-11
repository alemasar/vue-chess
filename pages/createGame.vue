<template>
  <v-card class="d-inline-block mx-auto">
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <ChessBoard />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ChessBoard from '~/components/ChessBoard.vue'

export default {
  components: {
    ChessBoard
  }
}
</script>
