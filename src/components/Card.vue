<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{task.title}}</p>
      <button @click="rollbackRow(task.id)" class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex">
        <font-awesome-icon icon="undo" size="sm" />
      </button>
      <button @click="concludedRow(task.id)" class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex">
        <font-awesome-icon icon="check" size="sm" />
      </button>
      <button @click="deleteRow(task.id)" class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex">
        <font-awesome-icon icon="trash" size="sm" />
      </button>
      <img
        class="w-6 h-6 rounded-full ml-3"
        src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        alt="Avatar"
      >
    </div>
    <div class="flex mt-4 justify-between items-center">
      <span class="text-sm text-gray-600">{{task.createdAt}}</span>
      <badge v-if="task.type" :color="badgeColor">{{task.type}}</badge>
    </div>
  </div>
</template>
<script>
import api from "../api/request.js"
import Badge from "./Badge.vue"
export default {
  components: {
    Badge
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    badgeColor() {
      const mappings = {
        Design: "purple",
        "Feature Request": "teal",
        Backend: "blue",
        QA: "green",
        default: "teal"
      };
      return mappings[this.task.type] || mappings.default;
    }
  },
  methods: {
    deleteRow(id) {
      if (confirm("Are you sure you want to remove this task?")) {
        api
          .request("delete", "/tasks/" + id, null)
          .then(response => {
            console.log(response.data)
            window.location.href = '/'
          })   
      }
    },
    concludedRow(id) {
      console.log(this.task.title)
      if (confirm("are you sure that this task is complete?")) {
        api
          .request("put", "/tasks/" + id, 
          {
            title: this.task.title,
            concluded: true,
            status: 'Done'
          })
          .then(response => {
            console.log(response.data)
            window.location.href = '/'
          })   
      }
    },
    rollbackRow(id) {
      if (confirm("are you sure you want to reset this task status?")) {
        api
          .request("put", "/tasks/" + id, 
          {
            title: this.task.title,
            concluded: false,
            status: 'Backlog'
          })
          .then(response => {
            console.log(response.data)
            window.location.href = '/'
          })   
      }
    },
  }
};
</script>
