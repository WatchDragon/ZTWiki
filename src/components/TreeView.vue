<template>
  <div class="layout-treeview" ref="treeView">
    <ul class="menu-part">
      <template v-for="item in menu">
        <li class="hasChildren"  @click.stop="toggle(item)">
          <span>{{item.text}}</span><i v-if="item.hasChild" :class="{caret: true, rotate: !item.open}"></i>
          <tree-view :mid="item.id" v-if="item.childLoaded" v-show="item.open" :mdata="item.children"></tree-view>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'TreeView',
    props: {
      mid: {
        type: Number,
        default(){
          return 0;
        }
      }
    },
    data() {
      return {
        menu: [],
      }
    },

    mounted() {
      axios.get(MENU_URL, {params: {id: this.mid}}).then(response => {
        if (response.data.status == 1)
          this.menu = response.data.data.menu;
        else
          this.$alert(response.data.message);
      }).catch((error) => {
        console.log(error);
      });
      window.onload = () => this.resize();
      window.onresize = () => this.resize();
    },

    methods: {
      toggle(item) {
        item.childLoaded=true;
        item.open = !item.open;
      },
      resize: function () {
        var height = document.documentElement.clientHeight - 50;
        this.$refs.treeView.style.height = height + 'px';
      }
    }
  }
</script>
<style scoped lang="scss">
  $bgColor: #fff;
  $hoverColor: #e7e7e7;
  $fontColor: #777;
  .layout-treeview {
    overflow: auto;
    width: 200px;
    transition: all .3s;
    box-shadow: 1px 0 3px rgba(0, 0, 0, .1);
    min-height: 100%;
    background: $bgColor;

    //.router-link-active{background:#69c;}
    .caret {
      transition: all .3s;
    }
    .rotate {
      transform: rotate(-90deg);
    }

    ul.menu-part {
      padding-left: 30px;
      text-align: left;
      >li {
        &.hasChildren {
          overflow: hidden;
        }
        a {
          font-size: 13px;
          display: block;
          text-decoration: none;
          color: $fontColor;
          &:hover {
            background: $hoverColor;
            cursor: pointer;
          }

          &.router-link-active{color: #fff;background: #777;}

        }
        >a {
          padding: 5px;
        }
        >ul>li {
          >a {
            padding: 5px 5px;
          }
        }
      }
    }
  }
</style>
