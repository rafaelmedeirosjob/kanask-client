<template>
  <div id="app">
    <div class="flex justify-center">
      <div class="min-h-screen flex overflow-x-scroll py-12">
        <button @click="$refs.modal.show()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          +
        </button>
        <t-modal
            wrapper-class="bg-blue-100 border-red-400 text-black-700 rounded shadow-xl flex flex-col"
            overlay-class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-gray-900 opacity-75"
            body-class="text-xl flex flex-col items-center justify-center p-6 flex-grow"
            footerClass="bg-white-400 p-3 flex justify-between"
            show
            ref="modal"
          >
            <h1 class="text-xl">New Task</h1><br>
            <div>
              <t-input-group
                label="Title"
                feedback="Title must be at least 20 characters long"
              >
                <t-input
                  v-model="model.title"
                  type="title"
                />
              </t-input-group>
              <t-input-group
                label="Description"
                feedback="Description must be at least 200 characters long"
              >
              <t-textarea v-model="model.description" name="description"/>
              </t-input-group>
              <t-input-group
                label="Type"
              >
              <t-select
                  v-model="model.type"
                  name="type"
                  :options="[
                    { value: 'Backend', text: 'Backend' },
                    { value: 'Frontend', text: 'Frontend'},
                    { value: 'Design', text: 'Design' }
                  ]"
                />
                </t-input-group>
            </div>
            <template v-slot:footer>
              <t-button
                variant="danger"
                tertiary-class="border block text-white border-transparent hover:text-gray-300"
                @click="$refs.modal.hide()"
              >
             Cancel
              </t-button>	
              <t-button @click="createTask()" variant="success">
                Save
              </t-button>	
            </template>
          </t-modal>
        <div
          v-for="column in columns"
          :key="column.title"
          class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
        >
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{column.title}}</p>
          <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks">
            <task-card
              v-for="(task) in column.tasks"
              :key="task.id"
              :task="task"
              class="mt-3 cursor-move"
            ></task-card>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TModal from 'vue-tailwind/src/components/TModal.vue'
import TInputGroup from 'vue-tailwind/src/components/TInputGroup.vue'
import TTextarea from 'vue-tailwind/src/elements/TTextarea.vue'
import TSelect from 'vue-tailwind/src/elements/TSelect.vue'
import TButton from 'vue-tailwind/src/elements/TButton.vue'
import TInput from 'vue-tailwind/src/elements/TInput.vue'
import api from "../api/request.js";
import draggable from "vuedraggable";
import TaskCard from "../components/Card.vue"

export default {
  name: "Kanban",
  components: {
    TModal,
    TSelect,
    TTextarea,
    TInputGroup,
    TButton,
    TInput,
    TaskCard,
    draggable
  },
  data() {
    return {
      model: {
          title: '',
          type: '',
          description: ''
      },
      columns: [
        {
          title: "Backlog",
          tasks: []
        },
        {
          title: "In Progress",
          tasks: []
        },
        {
          title: "Review",
          tasks: []
        },
        {
          title: "Done",
          tasks: []
        }
      ]
    }
  },
  created() {
    this.getTasks()
  },
  methods: {
    getTasks() {
      api
        .request("get", "/tasks")
        .then(response => {
          response.data.forEach(task => {
              switch (task.status) {
                  
                  case 'In Progress':
                      this.columns[1].tasks.push(task)
                      break;
                  case 'Review':
                      this.columns[2].tasks.push(task)
                      break;
                  case 'Done':
                      this.columns[3].tasks.push(task)
                      break;
                  default:
                      this.columns[0].tasks.push(task)
                      break;
              }
          })
        })
    },
    createTask() {
      api
        .request("post", "/tasks",{
                                   title: this.model.title,
                                   status: 'Backlog',
                                   type: this.model.type,
                                   isConcluded: false                           
        })
        .then(response => {
          this.columns[0].tasks = response.data
          this.$refs.modal.hide()
          window.location.href = '/'
        })
    },
  }
};
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}

.modal {
  transition: opacity 0.25s ease;
}
body.modal-active {
  overflow-x: hidden;
  overflow-y: visible !important;
}
</style>
