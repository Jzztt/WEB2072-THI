<template>
  <div v-if="student">
    <div>
      <p>{{ student.name }}</p>
    </div>
    <div>
      <p>{{ student.age }}</p>
    </div>
    <div>
      <p>{{ student.email }}</p>
    </div>
    <div>
     <img :src="student.image" alt="">
    </div>
  </div>
</template>

<script setup>
import instanceAxios from '@/ultis/configAxios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id
const student = ref({})

const fetchStudent = async () => {
  const fetchStudentResponse = await instanceAxios.get(`/students/${id}`)
  student.value = fetchStudentResponse.data
}

onMounted(() => {
  fetchStudent()
})
</script>

<style lang="scss" scoped>
</style>