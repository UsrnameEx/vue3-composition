import {useFetch} from "@/use/fetch";
import {ref} from "vue";

export async function useUsers() {
    const {response} = useFetch('https://jsonplaceholder.typicode.com/users', {});

    console.log(response);

    return {response};
}