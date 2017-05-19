<template>
    <div class="editor" ref="editor">
        <textarea ref="textarea" @keydown.9.prevent="hotKey" :value="rawText" name="rawText" @input="update" class="markRaw"></textarea>
        <div class="marked" v-html="markDownHtml"></div>
    </div>
</template>
<script>
    var _ = require('lodash');
    import VInput from '@/components/Form/Input'

    export default{
        name: 'MarkDownEditor',
        data(){
            return {
                maxHeight:500,
                rawText: '# Type Your MarkDown Here',
                changed:false
            }
        },
        mounted(){
            hljs.initHighlightingOnLoad();
            marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: function (code) {
                    return hljs.highlightAuto(code).value;
                }
            });
            let renderer = new marked.Renderer();
            renderer.table = function (header, body) {
                return '<table class="table table-striped">'+header+body+'</table>'
            }
            window.onload = () => this.resize();
            window.onresize = () => this.resize();
        },
        computed: {
            markDownHtml(){
                let html = marked(this.rawText, {sanitize: true});
                return html;
            }
        },
        methods: {
            update: _.debounce(function (e) {
                this.rawText = e.target.value;
                this.changed = true;
            }, 300),
            resize: function () {
                var height = document.documentElement.clientHeight - 100;
                this.maxSize = height
                this.$refs.editor.style.height = height + 'px';
            },
            hotKey(e){
               if(e.keyCode == 9){
                   let textarea = this.$refs.textarea;
                   let pos = cursor.get(textarea);
                   pos.end = pos.start;
                   pos.text='';
                   cursor.add(textarea,pos,'\t');
               }else{
                   this.$emit('keydown',e);
               }
            },
            loadMarkDown(id){
                if(this.changed){
                    this.$confirm('当前页面的修改并未保存，确定继续么？').then(()=>{
                        axios.get(DOC_URL,{params:{id:id}}).then(response=>{
                            if(response.data.status==1){
                                this.changed=false;
                                this.rawText=response.data.data.doc;
                            }
                        }).catch(error=>{
                            this.$alert('OMG,发生了一些奇怪的问题');
                            console.log(error);
                        });
                    }).catch(() => {});
                }
            }
        },
        components: {
            VInput
        }
    }
</script>
<style scoped lang="scss">
    .editor{
        width: 80%;
        height: 100%;
        .markRaw{
            resize: none;
            border:1px solid #C3C3C3;
            box-shadow: 1px 0 3px rgba(0, 0, 0, .1);
            position: relative;
            float: left;
            width: 50%;
            height: 100%;
        }
        .marked{
            border:1px solid #C3C3C3;
            box-shadow: 1px 0 3px rgba(0, 0, 0, .1);
            margin-left: 1%;
            position: relative;
            float: right;
            width: 49%;
            height: 100%;
            pre code{
                text-align: left;
            }
        }
    }
</style>