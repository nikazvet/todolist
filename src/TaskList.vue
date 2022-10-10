<script setup>
    import { ref } from 'vue'
    import Modal from './Modal.vue'

    const selectedtask = ref({id: 0, text: "write down your task", done: true, notes: "add notes", date: new Date()})
    const list = $ref([]);
    const listHome = $ref([{id: 1, text: "do shopping", done: false, notes: "see list", date: new Date(2022, 10, 14)}, {id: 1, text: "do dishes", done: true, notes: "plates", date: new Date(2022, 10, 6)}]);
    const listUni = $ref([{id: 1, text: "update competence document", done: false, notes: "sprint retrospective and assignments", date: new Date(2022, 10, 14)}, {id: 2, text: "prepare for demo", done: false, notes: "", date: new Date(2022, 10, 6)}, {id: 3, text: "finish assignment", done: true, notes: "layout for vue website", date: new Date(2022, 10, 6)}]);
    const listName = "List Name"
    const showModal = $ref(false)
    const showCompleted = $ref(true)
    
    function addtask(){
      showModal=false; 
      var task = {text: selectedtask.value.text, done: false, notes: selectedtask.value.notes, id: 0, date: new Date(selectedtask.value.date)};
      task.id = (list.at(-1).id +1);
      list.push(task);
    }
    function openNewToDoWindow(task){
      showModal = true;
      selectedtask.value = task;
    }
    function deletetask(index){
      list.splice(index, 1)
    }
    function resetselectedtask(){
      showModal = true;
      selectedtask.value = {id: 0, text: 'write down your task', done: false, notes: 'add notes', date: new Date()};
    }
    </script>
    
    <template>
      <div class="w-96 grid grid-cols-4 gap-x-8 gap-y-1">
        <select class="col-span-4" v-model="list">
        <option :value="listHome">Home tasks</option>
        <option :value="listUni">Uni tasks</option>
        </select>
        <div class="col-span-4">
          <label for="showcompleted" v-if="showCompleted">Showing completed</label> <label for="showcompleted" v-else>Hiding completed</label>  <input class="invisible" id="showcompleted" type="checkbox" v-model="showCompleted">
        </div>
        <div class="w-100 col-span-4">
          <div draggable="true" v-for="(todo, index) in list">
            <div class="grid grid-cols-4 border m-2" v-show="!todo.done || showCompleted">
              <div class="col-span-2">
                <input type="checkbox" v-model="todo.done"> 
              <span :class="{ done: todo.done }">{{ todo.text }}</span>
              </div>
              <button class="min-w-150 rounded-sm bg-red-200 hover:bg-red-300 shadow-sm hover:shadow-lg" @click="deletetask(index)">delete</button>
              <button class="rounded-sm bg-orange-200 hover:bg-orange-300 shadow-sm hover:shadow-lg" @click="openNewToDoWindow(todo)">
              edit
              </button>
              <div class="col-span-4">
                <i>{{todo.notes}}</i>
              </div>
              <div class="col-span-4">
                <i>{{todo.date.toDateString()}}</i>
              </div>
            </div>
          </div>
        </div>
        
        <button class="w-96 rounded-sm shadow-sm border-gray-500 hover:border-gray-400 border-2 bg-green-300 hover:bg-green-400 hover:shadow-md" @click="resetselectedtask()">
          Add todo
        </button>
      </div>
      
      
      
        <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false">
          <template #header>
            <input class=" w-full border-2 border-gray-500" v-model="selectedtask.text"/><br>
                  <input class=" w-full border-2 border-gray-500" v-model="selectedtask.notes"/><br>
                  <input type="datetime-local" class=" w-full border-2 border-gray-500" v-model="selectedtask.date"/><br>
                  <button class="w-full rounded-sm border-gray-500 hover:border-gray-400 border-2 bg-green-300 hover:bg-green-400" v-if="selectedtask.id===0" @click="addtask()">
                    Add new task
            </button>
            <button class="border-gray-500 hover:border-gray-400 border-2 px-8 rounded-sm bg-orange-200 hover:bg-orange-300 w-full shadow-sm hover:shadow-lg" v-else @click="showModal=false; selectedtask.date = new Date(selectedtask.date)">
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