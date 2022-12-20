<script setup>
    import { ref } from 'vue'
    import Modal from '../../Modal.vue';
import ListDataService from '../../services/ListDataService';
import TodoDataService from '../../services/TodoDataService';
    const props = defineProps({
      task: Object,
      list: Object,
    })
    const selectedtask = props.task;
    const list = $ref(0)
    list = props.list.id

    const lists = $ref([]);
        
    async function addtask(){ 
      // var task =  { text: selectedtask.text, notes: selectedtask.notes, done: false, date: new Date(selectedtask.date), list: 1, subtasks: []};
      var task =  { text: selectedtask.text, notes: selectedtask.notes, done: false, date: new Date(selectedtask.date), list: list, subtasks: []};

      var data = {task: task}

      await TodoDataService.create(data)
        .then(response => {
          console.log("Response: ", response);
          task.id = response.data.id;
          data.task.id = response.data.id;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("CREATED and LINKING")
      // TodoDataService.link(data).catch(e => {
      //     console.log(e);
      //   });
    }

    function updatetaskdb(todo){
      todo.listId = list;
      TodoDataService.update(todo.id, todo).catch(e => {
          console.log(e);
        });
    }

    function LoadLists(){
      ListDataService.getAll()
      .then(response => {
        lists = response.data
        })
      .catch(e => {
          console.log(e);
        });
    }

    LoadLists();
      
</script>

<template>
  <div>
    <Modal :show="true">
      <template #header>
        <button @click="$emit('close')">x</button>
      </template>
      <template #body>
        <select class="col-span-2" v-model="list">
          <option v-for="l in lists" :value="l.id">
            {{ l.name }}
          </option>
        </select>
        <input v-model="selectedtask.id" hidden/>
        <input class=" w-full border-2 border-gray-500" v-model="selectedtask.text"/><br>
        <input class=" w-full border-2 border-gray-500" v-model="selectedtask.notes"/><br>
        <input type="datetime-local" class=" w-full border-2 border-gray-500" v-model="selectedtask.date"/><br>
      </template>
      <template #footer>
        <button class="border-gray-500 hover:border-gray-400 border-2 px-8 rounded-sm bg-orange-200 hover:bg-orange-300 w-full shadow-sm hover:shadow-lg" v-if="selectedtask.id != null" @click="selectedtask.date = new Date(selectedtask.date); updatetaskdb(selectedtask), $emit('close')">
          Edit task
        </button>
        <button class="w-full rounded-sm border-gray-500 hover:border-gray-400 border-2 bg-green-300 hover:bg-green-400" v-else @click="addtask(), $emit('close')">
          Add new task
        </button>
      </template>
    </Modal>
  </div>
</template>