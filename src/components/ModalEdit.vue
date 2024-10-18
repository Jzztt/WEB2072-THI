<template>
  <div>
    <div
      v-if="isShowModalEdit"
      class="modal"
      style="display: block"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control" type="text" v-model="student.name" />
              </div>
              <div class="form-group">
                <label for="age">Age</label>
                <input class="form-control" type="text" v-model="student.age" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input class="form-control" type="text" v-model="student.email" />
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input class="form-control" type="text" v-model="student.image" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="handleCloseModalEdit"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="HandleSaveChange">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import instanceAxios from '@/ultis/configAxios'
import { onMounted, ref } from 'vue'

const props = defineProps({
  isShowModalEdit: Boolean,
  handleCloseModalEdit: Function,
  studentSelected: Number
})

const emit = defineEmits(['handleUpdateStudents'])
const student = ref({})


const HandleSaveChange = () => {
  emit('handleUpdateStudents',student.value)
}
const fetchStudent = async () => {
  const fetchStudentResponse = await instanceAxios.get(`/students/${props.studentSelected}`)
  student.value = fetchStudentResponse.data
}

onMounted(() => {
  fetchStudent()
})
</script>


<style lang="scss" scoped>
</style>