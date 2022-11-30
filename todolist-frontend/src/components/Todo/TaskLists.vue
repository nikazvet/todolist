<script setup>
//imports
//variables
const TaskLists = $ref([])
const props = defineProps({
    showHours
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
function DragList(){
    
}
</script>

<template>
    <div v-for="list in TaskLists"></div>
</template>