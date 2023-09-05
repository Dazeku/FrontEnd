<script setup>
import { RouterLink } from 'vue-router'
import { profilePreview } from '../states/risRicerca'

defineProps({
  users: profilePreview
})
</script>

<template>
  <RouterLink :to="`/profile/${users._id}`">
    <div class="buttonlike">
      <p>
        <b style="font-size: larger; font-weight: bold;"> {{ users.username }} </b> <br>
        {{ users.nome + " " + users.cognome }}
      </p>
    </div>
  </RouterLink>
</template>