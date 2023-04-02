<script setup>
import { ref, computed, onMounted } from 'vue'
import LucideTrash2 from './icon/LucideTrash2.vue'

const props = defineProps({
    historys: {
        type: Object,
    }
})

defineEmits(['add', 'edit'])

const updated = ref({})


onMounted(() => {
    if (props.historys === undefined) {
        updated.value = {
            numbers: [],
            dateTime: '',
            customer: 'Guest',
            subTotal: '',
            discount: '',
            total: ''
        }
    }
    else {
        updated.value = props.historys
    }
})


const guest = ref(true)
const member = ref(false)
const customerType = (cus) => {
    if (cus === 'Guest') {
        updated.value.customer = 'Guest'
        guest.value = true
        member.value = false
        discount()
        console.log(updated.value.customer)
    }
    if (cus === 'Member') {
        updated.value.customer = 'Member'
        guest.value = false
        member.value = true
        console.log(updated.value.customer)
    }
    }


const numberInput = ref('');
const numbers = ref([]);
const addNumber = () => {
    numbers.value.push(Number(numberInput.value));
    updated.value.numbers = numbers.value
    numberInput.value = '';
    updated.value.subTotal = subtotal()
    updated.value.discount = discount()
    updated.value.total = total()

    console.log(updated.value)
    console.log(typeof(updated.value.total))
};
const subtotal = () => {
    const subtotal = Number(numbers.value.reduce((acc, curr) => acc + curr, 0).toFixed(2))
    updated.value.subTotal = subtotal
    return  subtotal
};

const discount = () => {
    if (updated.value.customer === 'Guest') {
        updated.value.discount = 0
        return updated.value.discount; // ถ้าเป็น Guest ไม่มีส่วนลด
    } else if (subtotal() >= 100 && subtotal() < 500) {
        updated.value.discount = 5
        return  updated.value.discount;
    } else if (subtotal() >= 500 && subtotal() < 1000) {
        updated.value.discount = 10
        return  updated.value.discount;
    } else if (subtotal() >= 1000 && subtotal() < 2500) {
        updated.value.discount = 20
        return  updated.value.discount;
    } else if (subtotal() >= 2500) {
        updated.value.discount = 30
        return  updated.value.discount;
    } else {
        updated.value.discount = 0
        return updated.value.discount;
    }
};


const total = () => {
    const total = Number((updated.value.subTotal * (1 - updated.value.discount / 100)).toFixed(2))
    updated.value.total = total
    return total
}


const minus = (discount) => {
    if (discount == 0) {
        return discount
    }
    else {

        return '-' + discount
    }
}

const comma = (num) => {
    return num.toLocaleString("en")
}


const deleteItem = (index) => {
    updated.value.numbers.splice(index, 1);
}

// const confirm = () => {
//     numberInput.value = ""
//     numbers.value = []
//     customer.value = 'Guest'
// }

const UpdatedValue = () => {
    const date = new Date()
    updated.value.dateTime = date.toLocaleString()
    console.log(updated.value.subTotal)
    console.log(updated.value.discount)
    console.log(updated.value.total)

}
const con = () => {
    console.log(updated.value)
}



</script>
 
<template>
    <!-- Cashier -->
    <div >
        <div class="w-full h-16 flex items-center text-2xl font-medium" style="color: #304477;">
            <div class="mx-40">
                Cashier
            </div>
        </div>

        <!-- Content -->
        <div class="w-4/5 h-4/5 mx-auto rounded-3xl" style="background-color: #BEBEBE;">

            <div class="flex flex-col">
                <div class="flex flex-row mt-7 justify-center">
                    <input v-model="numberInput" type="number" class="w-10/12 h-10 rounded-lg mr-5 text-black"
                        style="background-color: #FFFFFF;" min="0" @input="numberInput = Math.max($event.target.value, 0)">

                    <button @click='addNumber()' class="w-20 h-10 rounded-lg flex items-center justify-center"
                        style="background-color: #4263EB; color: #FFFFFF">Add</button>
                </div>

                <div class="w-11/12 h-48 mx-auto mt-6 bg-white  rounded-lg text-black">
                    <div class="scrollable" ref="scrollable">
                        <div class="content" ref="content">

                            <div class="ml-10 mr-10 flex flex-col" v-for="(number, index) in updated.numbers" :key="index">
                                <div class="flex flex-row items-center mb-1">
                                    <div>
                                        {{ comma(index + 1) }}. {{ comma(number) }} ฿
                                    </div>
                                    <button class="flex items-center ml-auto " @click="deleteItem(index)">
                                        <LucideTrash2 /> &nbsp; &nbsp;
                                    </button>
                                </div>
                                <hr class="w-12/12">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row mt-3 ml-14">
                <div class="text-black">Customer: </div>
                <button class="w-6 h-6 rounded-full border-2 border-white bg-white ml-4 focus:outline-none"
                    :class="{ 'bg-blue-500': updated.customer === 'Guest' }" @click="customerType('Guest')">

                </button>
                <div class="text-black ml-1">Guest</div>

                <button class="w-6 h-6 rounded-full border-2 border-white bg-white ml-4 focus:outline-none"
                    :class="{ 'bg-blue-500': updated.customer === 'Member' }" @click="customerType('Member')"></button>
                <div class="text-black ml-1">Member</div>
            </div>

            <div class="text-black ml-14 mt-3"> Discount ({{ updated.customer }}) :</div>

            <div class="flex flex-row mt-3 ml-14" v-show="guest">
                <div class="w-20 h-11 flex justify-center items-center rounded-lg text-lg bg-gray-300">5%</div>

                <div class="w-20 h-11 flex justify-center items-center rounded-lg ml-2 text-lg bg-gray-300">10%</div>

                <div class="w-20 h-11 flex justify-center items-center rounded-lg ml-2 text-lg bg-gray-300">20%</div>

                <div class="w-20 h-11 flex justify-center items-center rounded-lg ml-2 text-lg bg-gray-300">30%</div>
            </div>

            <div class="flex flex-row mt-3 ml-14" v-show="member">
                <div class="w-20 h-11 flex justify-center items-center rounded-lg text-lg" :class="{
                    'bg-green-500 text-black': updated.subTotal >= 100 && updated.subTotal < 500,
                    'bg-gray-300': updated.subTotal < 100 || updated.subTotal >= 500
                }"> 5%
                </div>
                <div class="w-20 h-11 flex justify-center items-center rounded-lg ml-2 text-lg" :class="{
                    'bg-green-500 text-black': updated.subTotal >= 500 && updated.subTotal < 1000,
                    'bg-gray-300': updated.subTotal < 500 || updated.subTotal >= 1000
                }"> 10%
                </div>
                <div class="w-20 h-11 flex justify-center items-center rounded-lg ml-2 text-lg" :class="{
                    'bg-green-500 text-black': subtotal >= 1000 && updated.subTotal < 2500,
                    'bg-gray-300': updated.subTotal < 1000 || updated.subTotal >= 2500
                }"> 20%
                </div>
                <div class="w-20 h-11 flex justify-center items-center rounded-lg ml-2 text-lg" :class="{
                    'bg-green-500 text-black': updated.subTotal >= 2500,
                    'bg-gray-300': updated.subTotal < 2500
                }">30%
                </div>
            </div>

            <div class="flex flex-row justify-end mr-14 mt-5 font-medium text-gray-500">
                <div class="w-auto flex justify-end items-center ">Sub Total : {{ (updated.subTotal) }} ฿
                </div>
            </div>

            <div class="flex flex-row justify-end mr-14 font-medium text-red-600">
                <div class="w-auto  flex justify-center items-center ">Discount : {{ minus(comma(((subtotal() * discount())
                    / 100).toFixed(2))) }} ฿ </div>
            </div>

            <div class="flex flex-row justify-end mr-14 font-bold text-xl text-green-700">
                <div class="w-auto flex justify-center items-center ">Total : {{ comma((total()).toFixed(2)) }} ฿</div>

            </div>

            <div class="flex flex-row justify-end mr-14 mb-2">
                <button
                    class="w-20 h-10 flex justify-center items-center bg-blue-700 rounded-lg font-sans text-sm text-white mb-5 mt-2"
                    @click="$emit('add', updated, UpdatedValue(), con())">
                    Confirm
                </button>
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