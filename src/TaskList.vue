<script setup>
    import { ref } from 'vue';
    import Modal from './Modal.vue';
     
    const props = defineProps({
        taskList: Array,
        listName: String
    })
    const defaulttask = {id: 0, text: 'write down your task', done: false, notes: 'add notes'}
    const showModal = ref(false)
    
    
    </script>
    
    <template>
      <div>
        <h1>
          {{listName}}
        </h1>
        <ol>
        <li v-for="(todo, index) in taskList.tasks">
          <input type="checkbox" v-model="todo.done"> 
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
          <button @click="deletetask(index)">x</button>
          <button @click="showModal=true, openNewToDoWindow(todo)">
           _
          </button>
          <br>
          <i>{{todo.notes}}</i>
        </li>
        <button @click="selectedtask = defaulttask, showModal=true">
          Add todo
        </button>
      </ol>
      </div>
      
      
      
        <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false">
          <template #header>
            <input v-model="selectedtask.text"/><br>
                  <input v-model="selectedtask.notes"/><br>
                  <button v-if="selectedtask.id===defaulttask.id" @click='$emit("add-task")'>
                    Add new task
            </button>
            <button v-else @click="showModal=false">
                    Edit task
                  </button>
          </template>
        </modal>
      </Teleport>
      
    </template>
    
    <style>
      .done{
        text-decoration: line-through;
      }
    </style>