<script setup>
    import { ref } from 'vue'
    const dates = ref(["Day", "Monday 3", "Tuesday 4", "Wednesday 5", "Thursday 6", "Friday 7", "Saturday 8", "Saturday 9"])
    const startTime = ref(9);
    const endTime = ref(18)
    const step = ref(0.5)
    const noofrows = ref((endTime-startTime)/step)
    const num = ref(noofrows);
</script>

<template>
    <div class="col-span-4 grid grid-cols-8 grid-rows-[{{(endTime-startTime)*2/step}}] grid-flow-row bg-red-100">
        <div v-for="itemdate in dates">{{itemdate}}</div>
        <div class="bg-red-100" v-for="n in (endTime-startTime)*2/step">
            {{startTime + n/2}}
        </div>
        <div class="grid-flow-row bg-yellow-100" v-for="a in (endTime-startTime)*2*7">Hour</div>
    </div>
    
</template>

<style>

</style>