<script setup>
import ModalEdit from '@/components/ModalEdit.vue'
import instanceAxios from '@/ultis/configAxios'
import { onMounted, ref } from 'vue'

const students = ref()

const isShowModalEdit = ref(false)
const studentSelected = ref()

const handleToggleModal = async (studentId) => {
  studentSelected.value = await studentId
  isShowModalEdit.value = true
}
const handleCloseModalEdit = () => {
  isShowModalEdit.value = false
}
const handleUpdateStudents = async (student) => {
  const handleUpdateResposne = await instanceAxios.put(`/students/${student.id}`, student)
  const index = students.value.findIndex((item) => item.id === student.id)
  students.value[index] = student
  handleCloseModalEdit()
}

const handleDelete = async (studentId) => {
  const isConfirm = window.confirm('Are you sure')
  if (!isConfirm) return
  const handleDeleteResponse = await instanceAxios.delete(`/students/${studentId}`)
  // cach 1:  fetchStudents()
  // cach 2 : dung ham filter xu ly js
  students.value = students.value.filter((student) => student.id !== studentId)
}

const fetchStudents = async () => {
  const fetchStudentsResponse = await instanceAxios.get('/students')
  students.value = fetchStudentsResponse.data
}
onMounted(() => {
  fetchStudents()
})
</script>

<template>
  <main>
    <RouterLink to="/create" class="btn btn-primary"> Create </RouterLink>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>AGE</th>
          <th>EMAIL</th>
          <th>IMAGE</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>

          <td>{{ student.age }}</td>

          <td>{{ student.email }}</td>
          <td>
            <img :src="student.image" alt="" />
          </td>
          <td>
            <RouterLink
              :to="{ name: 'student-detail', params: { id: student.id } }"
              class="btn btn-primary"
              >Detail</RouterLink
            >
            <!-- <RouterLink :to="`/student-detail/${student.id}`" class="btn btn-primary">Detail</RouterLink> -->
            <Button class="btn btn-danger" @click="handleDelete(student.id)"> Delete</Button>
            <Button class="btn btn-warning" @click="handleToggleModal(student.id)">Edit</Button>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalEdit
      v-if="isShowModalEdit"
      :isShowModalEdit="isShowModalEdit"
      :handleCloseModalEdit="handleCloseModalEdit"
      :studentSelected="studentSelected"
      @handleUpdateStudents="handleUpdateStudents"
    />
  </main>
</template>
