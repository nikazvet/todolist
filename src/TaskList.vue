<script setup>
    import { ref } from 'vue'
    import Modal from './Modal.vue'
    
   
     
    const selectedtask = $ref({id: 0, text: "write down your task", done: true, notes: "add notes"})
    const list = $ref([{id: 1, text: "do shopping", done: false, notes: "see list"}, {id: 1, text: "do dishes", done: true, notes: "plates"}]);
    const defaulttask = {id: 0, text: 'write down your task', done: false, notes: 'add notes'}
    const listName = "List Name"
    const showModal = ref(false)
    
    function addtask(task){
      list.push(task);
    }
    function openNewToDoWindow(task){
      selectedtask= task
    }
    function deletetask(index){
      list.splice(index, 1)
    }
    </script>
    
    <template>
      <div>
        <h1>
          {{listName}}
        </h1>
        <ol>
        <li v-for="(todo, index) in list">
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
                  <button v-if="selectedtask.id===defaulttask.id" @click="showModal=false; addtask({text: selectedtask.text, done: selectedtask.done, notes: selectedtask.notes, id: selectedtask.id}); selectedtask.id =(list.at(-1).id +1);">
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