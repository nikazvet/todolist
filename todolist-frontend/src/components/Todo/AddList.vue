    <script setup>
    //imports
    import { ref } from 'vue'
    import ListDataService from "../../services/ListDataService"
    import Modal from '../../Modal.vue';

    //variables
    const props = defineProps({
        name: String,
        id: Number,
        hours: Number, 
        pattern: String,
        bgcolor: String,
        maincolor: String,
    })
    var list = $ref({});
    list = {name: props.name, id: props.id, hours: props.hours, pattern: props.pattern, bgcolor: props.bgcolor, maincolor: props.maincolor}
    const patterns = [
        "pattern-checks-sm",  
        "pattern-checks-md",
        "pattern-grid-sm",
        "pattern-grid-md", 
        "pattern-dots-md",
        "pattern-cross-dots-sm",
        "pattern-cross-dots-md",
        "pattern-diagonal-lines-sm",
        "pattern-diagonal-lines-md",
        "pattern-vertical-lines-sm",  
        "pattern-vertical-lines-md",
        "pattern-horizontal-lines-sm",  
        "pattern-horizontal-lines-md",
        "pattern-diagonal-stripes-sm",
        "pattern-diagonal-stripes-md",
        "pattern-vertical-stripes-sm",  
        "pattern-vertical-stripes-md",
        "pattern-horizontal-stripes-sm",  
        "pattern-horizontal-stripes-md",
        "pattern-triangles-sm",  
        "pattern-triangles-md",
        "pattern-zigzag-sm",  
        "pattern-zigzag-md",
    ]
    const bgcolors = [
        "bg-slate-50",
        "bg-slate-900",
        "bg-slate-500",
        "bg-red-400",
        "bg-orange-300",
        "bg-orange-700",
        "bg-amber-300",
        "bg-lime-200"
    ]
    const maincolors = [
        "text-slate-50",
        "text-slate-900",
        "text-slate-500",
        "text-red-400",
        "text-orange-300",
        "text-orange-700",
        "text-amber-300",
        "text-lime-200"
    ]
    //functions
    function AddList(list){
        ListDataService.create(list);
    }
    function EditList(list){
        ListDataService.update(list)
    }
    function GetList(id){
        list = ListDataService.get(id);
    }
    function Commit(){
        if(list.id != null && list.id > 0){
            EditList(list)
        }
        else{
            AddList(list)
        }
    }
</script>

<template>
    <Modal @close="$emit('close')" :show="true">
        <template #body>
    <input hidden v-model="list.id"/>
    <input v-model="list.name" placeholder="List Name"/>
    <input type="number" v-model="list.hours" placeholder="Hours"/>
    
    <select v-model="list.pattern">
    <option v-for="pattern in patterns" :value="pattern">
        <div :class="pattern"></div>
        <div>{{pattern.toString()}}</div>
    </option>
    </select>
    <select v-model="list.bgcolor">
    <option v-for="color in bgcolors" :value="color">
        <div :class="color"></div>
        <div>{{color}}</div>
    </option>
    </select>
    <select v-model="list.maincolor">
    <option v-for="color in maincolors" :value="color">
        <div :class="color"></div>
        <div>{{color}}</div>
    </option>
    </select>
    <div>
    <div :class="['px-5 py-5', list.pattern, list.bgcolor, list.maincolor]">     
        
    </div>
    <div>{{list.name}}</div>
    </div>
    

    

        </template>
        <template #footer>
            <button @click="Commit(), $emit('close')">Commit</button>
            <button @click="$emit('close')">Close</button>
        </template>
        


</Modal>
</template>