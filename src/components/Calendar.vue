<script setup>
    import { ref } from 'vue'
import Day from './Day.vue'
import Day1 from './Day.vue'
import Day2 from './Day.vue'
import Day3 from './Day.vue'
import Day4 from './Day.vue'
import Day5 from './Day.vue'
import Day6 from './Day.vue'
    const dates = ref(["Day", "Monday 3", "Tuesday 4", "Wednesday 5", "Thursday 6", "Friday 7", "Saturday 8", "Saturday 9"])
    const startTime = ref(9);
    const endTime = ref(18)
    const step = ref(0.5)
    const noofrows = ref((endTime-startTime)/step)
    const num = ref(noofrows);
</script>

<template>
    <div class="col-span-4 grid grid-cols-8 auto-rows-min grid-rows-[{{(endTime-startTime)*2}}] bg-red-100">
        <div v-for="itemdate in dates">{{itemdate}}</div>
        <div>
            <div class="bg-red-100 col-start-1" v-for="n in (endTime-startTime)/step+1">
                {{startTime - step + n/2}}
            </div>
        </div>
        <Day></Day>
        <Day1></Day1>
        <Day2/>
        <Day3></Day3>
        <Day4></Day4>
        <Day5></Day5>
        <Day6></Day6>
    </div>
    
</template>

<style>

</style>