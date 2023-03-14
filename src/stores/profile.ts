import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type {Posts, UserInfo} from "@/types/types";
import {supabase} from "@/supabase";


export const useProfileStore = defineStore('profile', () => {

    const posts = ref<any>([])
    const user = ref<any>(null)//данные user  с url
    const isLoading = ref(false)
    const errorMessage = ref('')
    const isFollowing = ref(false)

    const userInfo: UserInfo = reactive({followers: 0, following: 0, posts: 0})

    const addNewPost = (post: Posts) => {
        posts.value.unshift(post)
    }


    const fetchFollowing = async (loggedInUser: any) => {

        if (loggedInUser.value && loggedInUser.value.id != user.value.id) {
            const {data} = await supabase
                .from('follower')
                .select()
                .eq('followers_id', loggedInUser.value.id)
                .eq('following_id', user.value.id)
                .single()
            if (data) {
                isFollowing.value = true
            } else {
                isFollowing.value = false
            }

        }

    }

    const fetchPosts = async (username: string | string[], loggedInUser: any) => {


        isLoading.value = true
        const {data: userData, error} = await supabase.from('users')
            .select()
            .eq('username', username)
            .single()
        if (userData) {

            user.value = userData
            const {data: postData} = await supabase
                .from('posts')
                .select()
                .eq('owner_id', user.value.id)

            await fetchFollowing(loggedInUser)
            const countFollower = await fetchFollowerCount()
            const countFollowing = await fetchFollowingCount()
            userInfo.followers = countFollower
            userInfo.following = countFollowing
            userInfo.posts = postData ? postData.length : 0
            posts.value = postData
            errorMessage.value = ''

        } else {

            errorMessage.value = error.message
            user.value = null
        }

        isLoading.value = false
    }

    const updateIsFollowing = (follow: boolean) => {
        isFollowing.value = follow
    }
    const fetchFollowerCount = async () => {
        const {count} = await supabase
            .from('follower')
            .select('*', {count: 'exact'})
            .eq('followers_id', user.value.id)

        return count
    }
    const fetchFollowingCount = async () => {
        const {count} = await supabase
            .from('follower')
            .select('*', {count: 'exact'})
            .eq('following_id', user.value.id)
        return count
    }
    const updateCountPost = () => {
        userInfo.posts += 1
    }


    return {
        user,
        posts,
        userInfo,
        isFollowing,
        isLoading,
        updateCountPost,
        fetchPosts,
        fetchFollowing,
        addNewPost,
        updateIsFollowing
    }
})