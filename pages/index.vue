<template>
    <div>
        <MainSection title="Home" :loading="loading">

            <head>
                <Title>Home / Twitter</Title>
            </head>
            <div class="border-b" :class="twitterBorderColor">
                <TweetForm :user="user" @on-success="handleFormSuccess" />
            </div>
            <TweetListFeed :tweets="HomeTweets" />
        </MainSection>
    </div>
</template>
<script setup>
    const { twitterBorderColor } = useTailwindConfig();
    const { getTweets } = useTweets();
    const loading = ref(false);
    const HomeTweets = ref([]);
    const { useAuthUser } = useAuth();
    const user = useAuthUser();

    onBeforeMount(async () => {
        loading.value = true;
        try {
            const { tweets } = await getTweets();
            HomeTweets.value = tweets;
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false;
        }

    });
    function handleFormSuccess(tweet) {
        navigateTo({
            path: `/status/${tweet.id}`
        })
    }
</script>