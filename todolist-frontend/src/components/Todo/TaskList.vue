<script setup>
    import { ref } from 'vue'
    import { resetTracking } from '@vue/reactivity';
    import Modal from '../../Modal.vue'
    import TodoDataService from "../../services/TodoDataService";
    import AddTask from './AddTask.vue'

    const selectedtask = $ref({});
    const list = $ref([]);
    //const listExternal = $ref([{id: 1, text: "do shopping", done: false, notes: "see list", date: new Date(2022, 10, 14)}, {id: 1, text: "do dishes", done: true, notes: "plates", date: new Date(2022, 10, 6)}]);
    const listExternal = $ref([]);
    const listUni = $ref([{id: 1, text: "update competence document", done: false, notes: "sprint retrospective and assignments", date: new Date(2022, 10, 14)}, {id: 2, text: "prepare for demo", done: false, notes: "", date: new Date(2022, 10, 6)}, {id: 3, text: "finish assignment", done: true, notes: "layout for vue website", date: new Date(2022, 10, 6)}]);
    const showCompleted = $ref(true)
    const showModal = $ref(false);
    const showTask = $ref(false);

    function deletetask(index){
      list.splice(index, 1)
    }

    function deletedbtask(task){
      TodoDataService.delete(task.id).catch(e => {
          console.log(e);
        });
    }

    function retrieveTodos() {
      TodoDataService.getAll()
        .then(response => {
          listExternal = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    function AddOrEdit(todo){
      if(todo == null){
        selectedtask = {}
      }
      else{
        selectedtask = todo;
      }
      showModal = true;
      showTask = true;
    }

    function close(){
      showTask = false;
    }
</script>
    
    <template>
      <div class="w-96 grid grid-cols-4 gap-x-8 gap-y-1">
        <div class="col-span-2">Focusing on your</div>
        <select class="col-span-2" v-model="list" @change="retrieveTodos">
        <option :value="listUni">Uni tasks</option>
        <option :value="listExternal">Db tasks</option>
        </select>
        <div class="col-span-4">
          <label for="showcompleted" v-if="showCompleted">Showing completed</label> <label for="showcompleted" v-else>Hiding completed</label>  <input class="invisible" id="showcompleted" type="checkbox" v-model="showCompleted">
        </div>
        <div class="w-100 col-span-4">
          <div draggable="true" v-for="(todo, index) in list" @click="AddOrEdit(todo)">
            <div class="grid grid-cols-4 border m-2" v-show="!todo.done || showCompleted">
              <div class="col-span-2">
                <input type="checkbox" v-model="todo.done"> 
              <span :class="{ done: todo.done }">{{ todo.text }}</span>
              </div>
              <button class="start-col-4 -rounded-sm bg-red-200 hover:bg-red-300 shadow-sm hover:shadow-lg" @click="deletetask(index); deletedbtask(todo)"><img src="../../assets/delete_forever.svg" /></button>
              <div class="col-span-4">
                <i>{{todo.notes}}</i>
              </div>
              <div class="col-span-4">
                <i>{{todo.date}}</i>
              </div>
            </div>
          </div>
        </div>
        
        <button class="w-96 rounded-sm shadow-sm border-gray-500 hover:border-gray-400 border-2 bg-green-300 hover:bg-green-400 hover:shadow-md" @click="AddOrEdit()">
          Add todo
        </button>
        <!-- <Teleport to="body"> -->
        <!-- use the modal component, pass in the prop -->
        <!-- <modal :show="showModal" @close="showModal = false"> -->

        

      <!-- </modal>
      </Teleport> -->
      </div>
      <AddTask v-if="showTask" :task="selectedtask"  @close="close()"></AddTask>
    </template>
    
    <style>
      .done{
        text-decoration: line-through;
      }
    </style>