<script setup lang="ts">
import Error from '../types/Error';


const props = defineProps<Error>();

const refresh = () => {
    window.location.reload();
};
</script>

<template>
    <section class="w-full h-full flex justify-center items-center">
        <div class="card w-1/2 bg-neutral text-neutral-content">
            <div class="card-body">
                <h2 class="card-title">{{props.title}}</h2>
                <div
                    tabIndex="{0}"
                    class="collapse collapse-arrow bg-secondary border border-base-300"
                >
                    <div class="collapse-title text-xl font-medium">
                        Click to see the console's error message
                    </div>
                    <div class="collapse-content">
                        <p>{{props.message}}</p>
                    </div>
                </div>
                <p>We recommend to follow these steps:</p>
                <div class="px-3">
                    <ul class="list-outside list-decimal">
                        <li>
                            Go into your system's settings, and activate the
                            localization detection functionality
                        </li>
                        <li>
                            Give the browser the ability to access your current
                            position (it is generally in the format of a button
                            somewhere on the search bar, or you can modify it
                            via the browser's settings)
                        </li>
                    </ul>
                </div>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" @click="refresh">
                        Refresh Page
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
