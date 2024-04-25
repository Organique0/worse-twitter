<template>
    <div class="flex flex-col">
        <div class="relative m-2">
            <div class="flex items-center h-full pl-4 text-gray-600 dark:text-white cursor-pointer absolute">
                <div class="w-6 h-6">
                    <v-icon name="hi-search" @click="handleSearch" />
                </div>
            </div>
            <input v-model="search" type="text" placeholder="Search"
                class="flex items-center w-full pl-12 text-sm font-normal text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border-blue-200 h-9">
        </div>
        <SidebarRightPreviewCard title="What's happening">
            <SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappening">
                <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-white">
                        {{ whatsHappening.title }}
                    </h2>

                    <p class="text-xs text-gray-400">
                        {{ whatsHappening.count }}
                    </p>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <SidebarRightPreviewCard title="Who to follow">
            <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollow">
                <div class="flex flex-row justify-between p-2 items-center">
                    <div class="flex flex-row">
                        <img class="w-10 h-10 rounded-full" :src="whoToFollow.image" :alt="whoToFollow.name">
                    </div>
                    <div class="flex flex-col ml-2">
                        <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
                        <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
                    </div>
                    <div class="flex h-full">
                        <button
                            class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full">Follow</button>
                    </div>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

    </div>
</template>
<script setup>
    const search = defineModel();

    function handleSearch() {
        useRouter().push({
            path: '/search',
            query: {
                query: search.value
            }
        });
    };

    const whatsHappening = ref([
        {
            title: "SpaceX",
            count: "18.8k Tweets"
        },
        {
            title: "#CodingIsFun",
            count: "18.8k Tweets"
        },
        {
            title: "#ArtForAll",
            count: "18.8k Tweets"
        },
    ]);

    const whoToFollow = ref([
        {
            name: "Joe Biden",
            handle: "@joebiden",
            image: "https://picsum.photos/200/200"
        },
        {
            name: "Joe Biden",
            handle: "@joebiden",
            image: "https://picsum.photos/200/200"
        },
        {
            name: "Joe Biden",
            handle: "@joebiden",
            image: "https://picsum.photos/200/200"
        },

    ])
</script>