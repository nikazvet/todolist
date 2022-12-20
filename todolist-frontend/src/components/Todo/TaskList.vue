<script setup>
    import { ref } from 'vue'
    import { resetTracking } from '@vue/reactivity';
    import TodoDataService from "../../services/TodoDataService";
    import AddTask from './AddTask.vue'
    import ListDataService from "../../services/ListDataService"

    var selectedtask = $ref({});
    var list = $ref([]);
    const lists = $ref([]);
    const listid = $ref(0);
    var showCompleted = $ref(true)
    var showModal = $ref(false);
    var showTask = $ref(false);

    function deletedbtask(task){
      TodoDataService.delete(task.id).catch(e => {
          console.log(e);
        });
    }

    function retrieveLists(){
      ListDataService.getAll()
      .then(response => {
        lists = response.data
        })
      .catch(e => {
          console.log(e);
        });
    }

    function updatetaskdb(todo){
      todo.listId = list.id;
      TodoDataService.update(todo.id, todo).catch(e => {
          console.log(e);
        });
    }
    retrieveLists();

    function retrieveTodos(id) {
      ListDataService.get(id)
        .then(response => {
          list = response.data;
          // console.log(response.data);
        })
        .catch(e => {
          // console.log(e);
        });
    }

    function Refresh(){
      if(listid != null && listid > 0){
        retrieveTodos(listid)
      }
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
      Refresh();
    }
</script>
    
    <template>
      <div class="w-96 grid grid-cols-4 gap-x-8 gap-y-1">

        <div class="col-span-2">Focusing on your</div>
        <select class="col-span-2" v-model="listid" @change="retrieveTodos(listid)">
          <option v-for="l in lists" :value="l.id">
            {{ l.name }}
          </option>
        </select>

        <button @click="Refresh()">Refresh</button>

        <div class="col-span-4">
          <label for="showcompleted" v-if="showCompleted">Showing completed</label> <label for="showcompleted" v-else>Hiding completed</label>  <input class="invisible" id="showcompleted" type="checkbox" v-model="showCompleted">
        </div>

        <div class="w-200 col-span-4">
          <div v-if="list.todos != null && list.todos.length > 0" draggable="true" v-for="(todo) in list.todos">
            <div :class="['grid grid-cols-9 border m-2 px-5']" v-show="!todo.done || showCompleted">
              <input class="col-span-1 mr-4 border rounded-full" type="checkbox" v-model="todo.done" @change="updatetaskdb(todo)"> 
              <span :class="[{ done: todo.done }, 'col-start-2 col-span-4']">{{ todo.text }}</span>

              <div class="col-start-7 col-span-3 grid grid-cols-3 gap-x-2 gap-y-1">
                <div :class="['col-span-3', list.pattern, list.bgcolor, list.maincolor]">
                  <div :class="['text-black']">{{ list.name }}</div>
                </div>
                <button class="col-span-1 border-rounded-sm bg-red-200 hover:bg-red-300 shadow-sm hover:shadow-lg" @click="deletedbtask(todo), Refresh();"><img src="../../assets/delete_forever.svg" /></button>
                <button :class="['col-span-1', 'bg-yellow-200']" @click="AddOrEdit(todo)">Edit</button>
                <button :class="['col-span-1', 'bg-blue-200']">Open</button>
              </div>
              <div class="col-span-4 col-start-2">
                <i>{{todo.notes}}</i>
              </div>
              <div v-if="todo.date != null" class="bg-green-200 col-span-4 col-start-2">
                <i>{{ (new Date(todo.date)).toDateString() }}</i>
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
      <AddTask v-if="showTask" :task="selectedtask" :list="list"  @close="close(), Refresh()"></AddTask>
    </template>
    
    <style>
      .done{
        text-decoration: line-through;
      }
    </style>