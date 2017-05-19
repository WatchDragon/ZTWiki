#MarkDown编辑器后台交互
### 数据结构

|键名|说明|类型|
| ------------ | ------------ | ------------ |
|status| 操作结果，1成功，0失败 |整形|
|message| 操作后显示的信息[非必填，部分情况下无效] |字符串|
|data| 保存渲染数据 |对象|
|data.doc| MarkDown数据原文 |字符串|

### 数据示例
``` json
{
    status: 1,
    message: '操作成功!',
    data: {
        doc: '## This is a markdown'
    },
}
```