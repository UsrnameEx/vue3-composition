import {ref} from "vue";

export async function useFetch(url, options) {
    const response = ref();

    const res = await fetch(url, options);
    response.value = await res.json();

    return response;
}