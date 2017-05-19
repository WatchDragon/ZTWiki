<template>
  <div class="mainView">
    <tree-view @childClick="treeClicked" class="treeView"></tree-view>
    <mark-down-editor ref="editor" class="editor"></mark-down-editor>
  </div>
</template>
<script>
  import TreeView from '../components/TreeView';
  import MarkDownEditor from '@/components/MarkDownEditor';
export default{
  data(){
    return {}
  },
  methods:{
      treeClicked(id){
        this.$refs.editor.loadMarkDown(id);
      }
  },
  components: {
    TreeView,MarkDownEditor
  }
}
</script>
<style scoped lang="scss">
.mainView{
  .treeView{
    width: 20%;
    position: relative;
    float: left;
  }
  .editor{
    width: 79%;
    position: relative;
    float: right;
    padding-right: 1%;
  }
}
</style>
