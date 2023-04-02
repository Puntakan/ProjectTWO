import { createRouter, createWebHistory } from 'vue-router'
import CashierView from '../component/Cashier.vue'
import HistoryView from '../component/History.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Cashier',
            component: CashierView       
        },
        {
            path: '/history',
            name: 'History',
            component: HistoryView
        }
    ]
})
export default router