# ZTWiki

### 无极树形菜单

|键名|说明|类型|
| ------------ | ------------ | ------------ |
|status| 操作结果，1成功，0失败 |整形|
|message| 操作后显示的信息[非必填，部分情况下无效] |字符串|
|data| 保存渲染数据 |对象|
|data.menu| 菜单数据 |对象|
|data.menu.text| 菜单标题 |字符串|
|data.menu.hasChild| 菜单是否可以展开 |布尔|
|data.menu.id| 菜单ID |整形|
|data.menu.open| 菜单是否默认展开（展开将会立即发起下一次请求） |布尔|

### 数据示例
``` json
{
    status: 1,
    message: '操作成功!',
    data: {
        menu: [
            {text: '测试标题', hasChild: true, id: 1, open: false},
            {text: '这是个菜单', hasChild: true, id: 2, open: false},
            {text: '这个并没有什么卵用', hasChild: false, id: 3, open: false}
        ]
    },
}
```
