<script setup>
import { RouterLink } from 'vue-router'
import { operaPreview } from '../states/opere.js'

defineProps({
  book: operaPreview
})
</script>

<template>
  <RouterLink :to="`/opera/${book._id}`">
    <div class="buttonlike">
      <p>
        Autore: {{ book.autore }} <br>
        <b style="font-size: larger; font-weight: bold;"> {{ book.titolo }} </b> <br>
        Generi: <template v-for="i in book.generi"> {{ i + " " }} </template> <br>
        Follower: {{ book.nSeguaci }}
      </p>
    </div>
  </RouterLink>
</template>
  