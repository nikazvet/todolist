<script setup>
    import TodoDataService from '../../services/TodoDataService';
    const props = defineProps({
      task: Object,
    })
    const selectedtask = props.task;
        
    function addtask(){ 
      var task =  { text: selectedtask.text, notes: selectedtask.notes, done: false, date: new Date(selectedtask.date), list: 1, subtasks: []};
      var data = {task: task};
      var data = JSON.stringify(data);
      console.log("DATA:")
      console.log(task);

      TodoDataService.create(data)
        .then(response => {
          task.id = response.data.task.id;
          console.log(response.data.task);
        })
        .catch(e => {
          console.log(e);
        });
    }

    function updatetaskdb(todo){
      TodoDataService.update(todo.id, todo).catch(e => {
          console.log(e);
        });
    }
</script>

<template>
  <div>
    <p>Label!</p>
    <input v-model="selectedtask.id" hidden/>
    <input class=" w-full border-2 border-gray-500" v-model="selectedtask.text"/><br>
    <input class=" w-full border-2 border-gray-500" v-model="selectedtask.notes"/><br>
    <input type="datetime-local" class=" w-full border-2 border-gray-500" v-model="selectedtask.date"/><br>
    <button class="border-gray-500 hover:border-gray-400 border-2 px-8 rounded-sm bg-orange-200 hover:bg-orange-300 w-full shadow-sm hover:shadow-lg" v-if="selectedtask.id != null" @click="selectedtask.date = new Date(selectedtask.date); updatetaskdb(selectedtask); $emit('close')">
      Edit task
    </button>
    <button class="w-full rounded-sm border-gray-500 hover:border-gray-400 border-2 bg-green-300 hover:bg-green-400" v-else @click="addtask(); $emit('close')">
      Add new task
    </button>
  </div>
  <button @click="$emit('close');">Close</button>
</template>