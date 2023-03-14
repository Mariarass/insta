import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {Login, Signup, User} from "@/types/types";
import {supabase} from "@/supabase";


export const useUsersStore = defineStore('users', () => {
    const user = ref<User | null>(null)

    const errorMessage = ref({
        auth: '',
        username: '',
        email: '',
        password: ''
    })

    const isLoading = ref(false)
    const isUserLoading = ref(false)

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async (credentials: Login) => {

        const {email, password} = credentials
        errorMessage.value.password = password.length < 6 ? 'Password length too short' : ''

        errorMessage.value.email = !validateEmail(email) ? 'Email is invalid' : ''

        isLoading.value = true

        const {error} = await supabase.auth.signInWithPassword({email, password})
        if (error) {
            errorMessage.value.auth = error.message
            user.value = null

        } else {
            const {data: existUser} = await supabase
                .from('users')
                .select()
                .eq('email', email)
                .single()


            user.value = {
                id: existUser?.id,
                email: existUser?.email,
                username: existUser?.username
            }
            errorMessage.value.auth = ''
        }
        isLoading.value = false


    }

    const handleSignup = async (credentials: Signup) => {

        const {username, email, password} = credentials

        errorMessage.value.password = password.length < 6 ? 'Password length too short' : ''

        errorMessage.value.username = username.length < 3 ? 'Username length too short' : ''

        errorMessage.value.email = !validateEmail(email) ? 'Email is invalid' : ''

        isLoading.value = true

        const {error} = await supabase.auth.signUp({email, password})

        if (error) {
            errorMessage.value.auth = error.message
            user.value = null
        } else {
            await supabase.from('users').insert({username, email})
            const {data: newUser} = await supabase
                .from('users')
                .select()
                .eq('email', email)
                .single()

            user.value = {
                id: newUser?.id,
                email: newUser?.email,
                username: newUser?.username
            }

        }

        isLoading.value = false


    }


    const handleLogout =async () => {
        console.log('helo')
        const res=await supabase.auth.signOut()
        console.log(res)
        user.value=null

    }

    const getUser = async () => {
        console.log(user)
        isUserLoading.value = true
        const {data} = await supabase.auth.getUser()

        if (data.user) {
            const {data: userWithEmail} = await supabase
                .from('users')
                .select()
                .eq('email', data.user?.email)
                .single()

            user.value = {
                id: userWithEmail?.id,
                email: userWithEmail?.email,
                username: userWithEmail?.username
            }
        } else {
            user.value = null
        }
        isUserLoading.value = false

    }

    const clearErrorMessage = () => {
        errorMessage.value.auth = ''
        errorMessage.value.email = ''
        errorMessage.value.password = ''
        errorMessage.value.username = ''


    }

    return {user, errorMessage, handleLogin, handleSignup, handleLogout, getUser, clearErrorMessage, isUserLoading,isLoading}
})
