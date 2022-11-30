<script setup>
    //imports
    //variables
    const props = defineProps({
        listname: String,
        listid: Number,
        listhours: Number, 
        listColor: String,
    })
    //functions
    function AddList(list){

    }
    function EditList(list){

    }
    function GetList(id){

    }
    function Commit(){

    }
</script>

<template>
    <input v-model="listName" placeholder="List Name"/>
    <input type="number" v-model="listhours" placeholder="Hours"/>
    <input v-model="listColor" type="color"/>
    
    <button @click="Commit()">Commit</button>
</template>