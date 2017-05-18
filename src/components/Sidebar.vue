<template>
    <div class="layout-sidebar">
        <ul class="menu-part">
            <template v-for="item in menu">
                <!-- 有子菜单 -->
                <li class="hasChildren">
                    <!-- 三角形 -->
                    <span @click="toggle(item)">{{item.text}}</span><i :class="{caret: true, rotate: item.open}"></i>
                    <!-- 菜单 -->
                    <!--<ul class="children" v-show="item.open">-->
                        <!--<li v-for="subItem in item.children">-->
                            <!--<router-link role="a" :to="subItem.route">-->
                                <!--<i :class="['fa', 'fa-'+subItem.icon]"></i> {{subItem.text}}-->
                            <!--</router-link>-->
                        <!--</li>-->
                    <!--</ul>-->
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'sidebar',

    data() {
        return {
            menu: []
        }
    },

    mounted() {
        this.$store.dispatch('getMenusList').then(response => {
            if (1 == response.status) {
                this.menu = response.data.menu;
            }
        });
//        window.onload = () => this.resize();
//        window.onresize = () => this.resize();
    },

    methods: {
        toggle(item) {
            item.open = !item.open;
          console.log(this.menu);
        },
        resize: function (){
            var height = document.documentElement.clientHeight - 50;
            this.$refs.sidebar.style.height = height+'px';
        }
    }
}
</script>
<style scoped lang="scss">
$bgColor: #fff;
$hoverColor: #e7e7e7;
$fontColor: #777;
.layout-sidebar {
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
