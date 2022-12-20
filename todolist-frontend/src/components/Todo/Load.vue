<script setup>
import AddList from './AddList.vue';
const showModal = $ref(false);


</script>

<template>
    <button @click="showModal=true">Add list</button>
    <AddList v-if="showModal"  @close="showModal=false"></AddList>
</template>