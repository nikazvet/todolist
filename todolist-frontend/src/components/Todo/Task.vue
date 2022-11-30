<script setup>
    const task = defineProps({
        simple: Boolean,
        subtasks: Array,
        text: String,
        notes: String,
        done: Boolean,
        list: Number,
        tags: Array,
        date: Date,
    })

</script>

<template>
    <div>
        <p></p>
    </div>
    
</template>