<script setup>
import { ref } from 'vue';
import TaskList from './TaskList.vue';
 
const tasklist = ref({taskList: [{id: 1, text: "do shopping", done: false, notes: "see list"}, {id: 1, text: "do dishes", done: true, notes: "plates"}], listName: "List"});

function addtask(task, list){
      list.value.tasks.push(task);
    }
function openNewToDoWindow(task){
      selectedtask= task
    }
function deletetask(index, list){
      list.value.tasks.splice(index, 1)
    }
</script>

<template>
  <TaskList v-bind="tasklist" @add-task="showModal=false; $addtask({text: selectedtask.text, done: selectedtask.done, notes: selectedtask.notes, id: selectedtask.id}, tasklist.taskList); selectedtask.id =(tasklist.taskList.value.at(-1).id +1);"></TaskList>
</template>

<style>
  .done{
    text-decoration: line-through;
  }
</style>