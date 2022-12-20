<script setup>
//imports
//variables
const TaskLists = $ref([])
const props = defineProps({
    showHours: Boolean,
})
//methods
function GetLists(){

}
function DeleteList(list)
{

}
function OpenAddList(){

}
function OpenUpdateList(){

}
</script>

<template>
    <div v-for="list in TaskLists">
        <div>{{list.listname}}</div>
        <div :class="list.pattern p-4"></div>
        <div v-if="showHours">{{list.listhours}}</div>
    </div>
    <button>Add list</button>
</template>