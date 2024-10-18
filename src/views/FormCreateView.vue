<template>
  <div>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" type="text" v-model="student.name" />
        <div v-if=" isSubmit && !student.name" class="text-danger">Name is Required</div>
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input class="form-control" type="text" v-model="student.age" />
        <div v-if=" isSubmit && !student.age" class="text-danger">Age is Required</div>
      </div>
      <div class="form-group">
        <label for="email">Age</label>
        <input class="form-control" type="text" v-model="student.email" />
        <div v-if=" isSubmit && !student.email" class="text-danger">Age is Required</div>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input class="form-control" type="text" v-model="student.image" />
        <div v-if=" isSubmit && !student.image" class="text-danger">Image is Required</div>
      </div>
      <button class="btn btn-primary" @click.prevent="handleSubmit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import router from '@/router'
import instanceAxios from '@/ultis/configAxios'
import { reactive, ref } from 'vue'

const student = reactive({
  name: '',
  age: '',
  email: '',
  image: ''
})
const isSubmit = ref(false)

const checkValidate = () => {
  if(!student.name || !student.age || !student.email || !student.image) {
    return false
  }
  return true
}
const handleSubmit = async () => {
  isSubmit.value = true
  if (!checkValidate()) return
  const createStudentResponse = await instanceAxios.post('/students', student)
  router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
</style>