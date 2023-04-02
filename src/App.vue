<script setup>
import Nav from './component/Nav.vue'

const addNewHistory = async (newHistory) => {
    try {
        const res = await fetch('http://localhost:5000/history', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                numbers: newHistory.numbers,
                customer: newHistory.customer,
                subTotal: newHistory.subTotal,
                discount: newHistory.discount,
                total: newHistory.total,
                dateTime: newHistory.dateTime
            })
        })
        if (res.status === 201) {
            console.log('add successfully')
            // const addedHistory = await res.json()
            // history.value.push(addedHistory)
            // console.log(history.value)
        }
        else throw Error('add Error')
    }
    catch (err) {
        console.log(err)
    }
}


</script>
 
<template>
    <div class="w-full h-screen bg-white">
        <div class="w-full h-full">
            <div class="w-full h-14 bg" style="background: #DFE6F9;">

                <div class="flex flex-row w-full h-full">
                    <div class="w-48 h-full font-bold text-xl flex items-center justify-center"
                        style="background-color: #304477; color: #FFC635;">
                        203 Store
                    </div>
                    <Nav
                        class="w-40 h-full flex items-center justify-center font-sans text-lg text-black ml-16 space-x-16" />
                </div>
            </div>
            <RouterView @add="addNewHistory" />
        </div>
    </div>
</template>
 
<style scoped></style>