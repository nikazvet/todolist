<script setup>
    import { ref, computed } from 'vue'
    const startTime = ref(9);
    const endTime = ref(18)
    const step = ref(0.5)
    const noofrows = ref((endTime-startTime)/step+1)

    const timeslots = $ref([{time: 10, name: "event"}, {time: 11, name: "event"}])
    const variable = computed(() => {return author.books.length > 0 ? 'Yes' : 'No'})

    function AddSlot(time){
        timeslots.push({time:time, name: "added slot"})
    }
    function DeleteSlot(time){
        let index = timeslots.findIndex(function (item) {
            return item.time === time;
        });
        timeslots.splice(index, 1)
    }
</script>

<template>
    <div class="row-start">
        <div class="bg-yellow-100 row-span-1 w-full h-6 hover:bg-blue-100 border border-dotted border-slate-500" v-for="n in (endTime-startTime)/step+1">
            <div v-on:dragover="AddSlot()" class="bg-blue-200 row-span-1 w-full h-full hover:bg-slate-100" v-if="timeslots.some(timeslot => timeslot.time === n/2+startTime-step)">
                <button class="w-full h-full" @click="DeleteSlot(n/2-step+startTime)">
                    Event
                </button>
            </div>
            <button class="w-full h-full" @click="AddSlot(n/2-step+startTime)" v-else></button>
    </div>
    </div>

</template>

<style>

</style>