<template>
    <i :class="['fa', 'fa-' + value]"></i>
</template>
<script>
export default {
    name: 'Icon',

    props: {
        value: {
            type: String
        }
    },

    mounted(){
    }
}
</script>
<style scoped lang="scss">

</style>
