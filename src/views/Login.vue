<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { userStore } from '../stores/user'
import { LoginSchema } from '@/models/loginSchema'

const { getToken } = userStore()

const errors = ref<Record<string,string>>({})
const form = useForm({
  validationSchema: toTypedSchema(
    LoginSchema
  ),
  validateOnMount: false,
  initialValues: {
    email: ''
  }
});

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values);
  await getToken(values);
});

const canSubmit = computed(() => {
  try {
    LoginSchema.parse(form.values)
    errors.value = {}
    return true
  } catch(err:any) {
    type Error = {path: string[], message: string}
    err.errors.forEach((error: Error) => {
      errors.value[error.path[0]] = error.message
    })
    return false
  }
})

const handleChange = (key: 'email', val: EventTarget | null) => {
  const value =
    val && 'value' in val && typeof val.value === 'string' ? val.value : '';
  form.setFieldValue(key, value);
};

</script>

<template>
  <div class="h-screen flex items-center justify-center p-2">
    <div class="flex flex-col justify-center w-full max-w-[500px] bg-input rounded-lg p-3 sm:p-10">
      <div class="flex items-center justify-center">
        <img src="@/assets/zoro.png" class="h-[150px] object-contain" alt="">
        <!-- <div class="text-3xl text-primary font-extrabold">XORO</div> -->
      </div>
      <div class="mt-2">
        <form @submit.prevent="onSubmit">
          <input type="text" @input="(e) => handleChange('email', e.target)" placeholder="Email" class="bg-background text-white w-full text-md p-3 border-2 border-background rounded-lg">
          <p v-show="!canSubmit && form.values['email']" class="text-destructive capitalize text-[14px] mt-1 ml-1">{{errors['email']}}</p>
          <button :disabled="!canSubmit" class="cursor-pointer text-lg bg-primary disabled:opacity-60 mt-3 w-full uppercase font-extrabold py-4 rounded-lg text-background ring-none">continue</button>
        </form>
      </div>
    </div>
  </div>
</template>
