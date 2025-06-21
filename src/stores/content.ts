import { defineStore } from "pinia";
import { ref, readonly } from "vue";
import { contentSchema, type Content } from "@/models/contentSchema";


const contentUrl = import.meta.env.VITE_CONTENT_URL
export const contentStore = defineStore("content", () => {
  const content = ref<Content>();
  const getContent = async () => {
    try {
      const res = await fetch(contentUrl + 'getContent', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
      });
      const result = await res.json();
      // content.value = contentSchema.parse(result.content);
      content.value = result.content
      return true
    } catch (err) {
      console.log(err);
      return false
    }
  }
  return { content:readonly(content), getContent };
});