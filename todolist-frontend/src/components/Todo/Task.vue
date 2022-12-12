<script setup>
    const props = defineProps({
        simple: Boolean,
        subtasks: Array,
        text: String,
        notes: String,
        done: Boolean,
        list: Number,
        date: Date,
        editing: Boolean,
    })
    const task = $ref(...props);
</script>

<template>
    <div>
        <div>
            <input v-model="done"/>
            <input :disabled="!editing" v-model="task.text"/>
            
            <button @click="(task.simple = !task.simple)">Expand/Hide</button>
        </div>
        <div v-if="!simple">
            <input :readonly="!editing" v-model="list"/>
            <input :readonly="!editing" v-model="task.notes"/>
            <!-- subtasks -->
        </div>
    </div>
</template>