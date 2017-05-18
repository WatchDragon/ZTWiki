<template>
    <textarea :value="rowText" name="rowText" @inpu="update"></textarea>
    <div v-html="getMarkDown"></div>
</template>
<script>
    export defalut{
        name:'MarkDownEditor'
    }
</script>
<style>
    
</style>