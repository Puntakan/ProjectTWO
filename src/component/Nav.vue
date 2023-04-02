<script setup>
import { RouterLink} from 'vue-router'
</script>
 
<template>
<div>
<RouterLink :to="{name: 'Cashier'}">Cashier</RouterLink>
<RouterLink :to="{name: 'History'}">History</RouterLink>
</div>
</template>
 
<style scoped>
.active {
    color:chartreuse
}
</style>