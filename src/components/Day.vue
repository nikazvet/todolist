<script setup>
    import { ref } from 'vue'
    const startTime = ref(9);
    const endTime = ref(18)
    const step = ref(0.5)
    const noofrows = ref((endTime-startTime)/step+1)

    const slots = $ref([{time: 10, name: "event"}, {time: 11, name: "event"}])

    function AddSlot(time){
        slots.push({time:time, name: "added slot"})
    }
</script>

<template>
    <div class="row-start">
        <div class="bg-yellow-100 row-span-1 w-full h-6 hover:bg-blue-100" v-for="n in (endTime-startTime)/step+1">
            <div class="bg-red-100 row-span-1 w-full h-full hover:bg-slate-100" v-if="(n/2 - step +startTime)===10 || (n/2 - step +startTime)===11">
                Event
            </div>
            <button class="w-full h-full" v-else @click="AddSlot(n/2 - step +startTime)"></button>
        </div>
    </div>
</template>

<style>

</style>