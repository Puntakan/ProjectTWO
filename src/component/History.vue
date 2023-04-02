<script setup>
import { ref, onMounted } from 'vue'
import { getHistory } from '../composable/getHistory'
import LucideTrash2 from './icon/LucideTrash2.vue'
import Edit from './icon/Edit.vue';
import Cashier from './Cashier.vue'

const history = ref([])

onMounted(async () => {
    history.value = await getHistory()
    console.log(history.value)
})

const currentComponent = ref('historyComp')
const setCurrentCashier = (currentCompo) => {
  currentComponent.value =currentCompo
}

const editHistory = ref(undefined)
const setEditMode = (historys) => {
    // console.log(historys)
    editHistory.value = historys
    console.log(editHistory.value)
    setCurrentCashier('AddEditHistory')
}

</script>
 
<template>
    <div class="h-full">
        <div class="w-full h-16 flex items-center text-2xl font-medium" style="color: #304477;" v-if="currentComponent === 'historyComp'">
            <div class="mx-40">
                History
            </div>
        </div>
        <Cashier v-if="currentComponent === 'AddEditHistory'" :historys="editHistory" @edit="editHistory"/>
        <div class="w-5/6 h-4/6 mx-auto rounded-3xl" style="background-color: #BEBEBE;" v-if="currentComponent === 'historyComp'">
            <div class="grid grid-cols-10 gap-2 text-black  font-semibold text-2xl">
                <div class="col-span-1 justify-self-center mt-3 mb-2"></div>
                <div class="col-span-2 justify-self-center mt-3 mb-2 ">Date</div>
                <div class="col-span-2 justify-self-center mt-3 mb-2">Customers</div>
                <div class="col-span-2 justify-self-center mt-3 mb-2">Discount</div>
                <div class="col-span-2 justify-self-center mt-3 mb-2">Purchase</div>
                <div class="col-span-1 justify-self-center mt-3 mb-2"></div>
            </div>
            <div class="w-full">
                <div class="scrollable" ref="scrollable">
                    <div class="content" ref="content">

                        <div class="grid grid-cols-10 gap-2 text-black text-lg" v-for="historys in history">
                            <div class="col-span-1 justify-self-center">
                                <LucideTrash2 />
                            </div>
                            <div class="col-span-2 justify-self-center">{{ historys.dateTime }}</div>
                            <div class="col-span-2 justify-self-center">{{ historys.customer }}</div>
                            <div class="col-span-2 justify-self-center text-red-600">{{ historys.discount }} %</div>
                            <div class="col-span-2 justify-self-center">{{ historys.total }}</div>
                            <div class="col-span-1 justify-self-center">
                                <button> <Edit @click="setEditMode(historys)" /></button>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>
.scrollable {
    overflow: auto;
    height: 80%;
}

.content {
    height: 100%;
}
</style>