<template>
	<div class="container">
		<form class="card" @submit.prevent="submit">
			<h1>Auth</h1>
			
			<div class="form-control" :class="{invalid: !form.email.valid && form.email.touched}">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="form.email.value" @blur="form.email.blur">
				<small v-if="form.email.errors.required && form.email.touched">Email field is required</small>
			</div>
			
			<div class="form-control" :class="{invalid: !form.password.valid && form.password.touched}">
				<label for="password">Password</label>
				<input type="password" id="password" v-model="form.password.value" @blur="form.password.blur">
				<small v-if="form.password.errors.required && form.password.touched">Password field is required</small>
				<small v-else-if="form.password.errors.minLength && form.password.touched">Password length can't be less then 8. Now it's {{ form.password.value.length }}</small>
			</div>
			
			<button class="btn primary" type="submit" :disabled="!form.valid">Submit</button>
		</form>
		
		<Suspense>
			<UsersList v-if="submitted"></UsersList>
		</Suspense>
	</div>
</template>

<script>
import UsersList from "@/components/UsersList";
import {useForm} from "@/use/form";
import {ref} from "vue";

const required = val => !!val;
const minLength = num => val => val.length >= num;

export default {
	components: {UsersList},
	setup() {
		const submitted = ref(false);
		
		const form = useForm({
			email: {
				value: '',
				validators: {required}
			},
			password: {
				value: '',
				validators: {required, minLength: minLength(8)}
			}
		});
		
		const submit = () => {
			console.log('Email:', form.email.value);
			console.log('Password:', form.password.value);
			
			submitted.value = true;
		};
		
		return {form, submit, submitted};
	},
}
</script>