import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import Button from "primevue/button";
import Toast from "primevue/toast";
import InputText from 'primevue/inputtext';

const app = createApp(App);
app.use(PrimeVue);
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Button', Button)
app.component('Toast', Toast)
app.component('InputText', InputText)

app.mount('#app')
