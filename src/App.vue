<script setup lang="ts">
import moment from 'moment';
import 'moment/locale/ru.js'
import {onMounted, ref} from 'vue';
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios';
moment().locale('ru')
const dt = ref();
const products = ref();
const selectedProducts = ref();
const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

onMounted(async () => {
  const { data } = await axios.get('http://localhost:5173/public/data/data.json')
  console.log(data)
  products.value = data
})
</script>

<template>
  <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
             :paginator="true" :rows="10" :filters="filters"
             paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
             currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
    <template #header>
      <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
        <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
        <h4 class="m-0">Manage Products</h4>
      </div>
    </template>
    <Column field="o_id" header="id" sortable body-style="color: #3683AC; background: #99FF99;"></Column>
    <Column field="client_name" header="Имя" body-style="color: #3683AC;" sortable></Column>
    <Column field="diets" header="Диета" >
      <template #body="slotProps">
        <div v-for="item in slotProps.data.diets">
          <p class="mx-auto">{{item}}</p>
          <div class="line" style="padding: 1px; border-bottom: 1px dotted;"></div>
        </div>
      </template>
    </Column>
    <Column field="tariff" header="Тариф" >
      <template #body="slotProps">
        <div v-for="item in slotProps.data.tariff">
          <p>{{item}}</p>
          <div class="line" style="padding: 1px; border-bottom: 1px dotted;"></div>
        </div>
      </template>
    </Column>
    <Column field="address" header="Адрес" body-style="width: 100px;font-size: 14px;"></Column>
    <Column field="phone" header="Тел." body-style="width: 100px;font-size: 14px;"></Column>
    <Column field="dates" header="Дата" sortable>
      <template #body="slotProps">
        <div>
          {{moment(slotProps.data.dates[0].start_date).locale('ru').format('DD.MMM')}}
          <span>-</span>
        </div>
        <div>
          {{moment(slotProps.data.dates[0].end_date).locale('ru').format('DD.MMM')}}
        </div>
      </template>
    </Column>
    <Column field="discount" header="Скидка" sortable header-style="width: 50px;">
      <template #body="slotProps">
        <small v-if="slotProps.data.discount > 0">{{slotProps.data.discount}}%</small>
      </template>
    </Column>
    <Column header="Оплата" body-style="white-space: nowrap;background: #FF9999;">
      <template #body="slotProps">
        <p><small class="pay">Стоим.: {{ slotProps.data.order_sum }} р</small></p>
        <p><small class="pay">{{slotProps.data.pay_status}}</small></p>
        <p><small class="pay">Долг: {{slotProps.data.order_sum - slotProps.data.order_payed}} р</small></p>
      </template>
    </Column>
    <Column field="courier_comment" header="Курьер комент.">
      <template #body="slotProps">
        <p style="border: 1px dotted; padding: 5px; display: flex;align-items: start">
          <span class="mr-1">
            <img class="car" src="https://cdn-icons-png.flaticon.com/512/1670/1670915.png" alt="доставка">
          </span>
          <small v-if="slotProps.data.courier_comment">{{slotProps.data.courier_comment}}</small>
        </p>
      </template>
    </Column>
    <Column field="inner_comment" header="Внутренный комент.">
      <template #body="slotProps">
        <p style="border: 1px dotted #FF9C95; padding: 5px; display: flex;">
          <span class="mr-1 ">
            <img class="message" src="https://www.svgrepo.com/show/156725/message.svg" alt="comment">
          </span>
          <small v-if="slotProps.data.inner_comment">{{slotProps.data.inner_comment}}</small>
        </p>
      </template>
    </Column>
    <Column field="dates[end_date]" header="Статус" sortable>
      <template #body="slotProps">
        <small>{{moment(slotProps.data.dates[0].end_date).locale('ru').endOf('day').fromNow()}}</small>
      </template>
    </Column>

  </DataTable>
</template>

<style scoped>
.pay{
  font-size: 14px;
}
.car{
  width: 15px;
  transform: rotateY(180deg);
}
.message{
  width: 15px;
  line-height: 0;
}
</style>
