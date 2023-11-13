<script>
import axios from 'axios'
export default {
  name: "Home",
  data() {
    return {
      invoice_list: null,
      product_list: null
    }
  },
  methods: {
    clearInvoices() {
      console.log('clearInvoices')
      axios.delete(axios.defaults.baseURL + '/delete_invoices')
      this.invoice_list = null
    },
  },
  async created() {
    this.product_list = await axios.get(axios.defaults.baseURL + '/get_id_product_name_pair');
    this.invoice_list = await axios.get(axios.defaults.baseURL + '/');
  },
  computed: {
    console: () => console,
    window: () => window,
  }
}
</script>

<template>
    <div id="create-bnt-area" class="text-center">
      <div id="developed_by" class="justify-content-center">
        <h3 class="mb-0 opacity-75">Автор сайту: Олександр Захарчук</h3>
      </div>
        <button id="create_invoice" type="button" class="btn btn-success btn-lg">
            <router-link :to="{ name: 'InvoiceForm'}" class="list-group-item list-group-item-action" aria-current="true">
              Створити накладну
            </router-link>
        </button>
        <button id="clear_invoices" type="button" class="btn btn-danger btn-lg" v-on:click="clearInvoices()">Очистити накладні</button>
    </div>
    <div v-if="invoice_list !== null">
      <div id="invoice-list" class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
          <div class="list-group">
              <div v-for="(invoice, k) in invoice_list.data.json_list" :key="k">
                  <router-link :to="{ name: 'InvoiceFormView', params: { batch_id: invoice[0].batch_id }}" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <svg v-if="invoice[0].invoice_type == 'receipt'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                      </svg>
                      <svg v-if="invoice[0].invoice_type == 'transfer'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                      </svg>
                      <div class="d-flex gap-2 w-100 justify-content-between">
                          <div>
                              <h6 class="mb-0">Накладна №{{ invoice[0].batch_id }}</h6>
                              <p class="mb-0 opacity-75">Партія №{{ invoice[0].batch_id }} | Тип: {{ invoice[0].invoice_type == "receipt" ? 'Прибуткова накладна' : 'Видаткова накладна' }} <span v-for="(v) in invoice"> | {{this.product_list.data.json_list[v.product_id]}}: {{v.quantity}}</span></p>
                          </div>
                          <small class="opacity-50 text-nowrap">{{ invoice[0].date }}</small>
                      </div>
                  </router-link>
              </div>
          </div>
      </div>
    </div>
</template>

<style scoped>
  #invoice-list {
    padding-top: 0px!important;
  }
  #create-bnt-area {
    padding-bottom: 20px;
  }
  #clear_invoices {
    margin-left: 10px;
  }
  #create_invoice {
    margin-right: 10px;
  }
  #developed_by {
    margin-bottom: 30px;
  }
</style>
