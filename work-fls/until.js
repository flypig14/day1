#!/usr/bin/env node

// module.exports=(val)=>{//接收传入的参数
const commander=require("commander");//引入commander包
const inquirer = require("inquirer");//引入inquirer包
const superagent = require("superagent");//引入superagent包
    //   commander.version();//获取当前版本号
let list=[//设置输入命令列表
    {
        type:"input",
        message:"请输入单词:",
        name:'name'
    }
]
commander.action(function(){//执行命令
     inquirer.prompt(list).then(answer=>{//获取列表内容和参数
         
         superagent
         .get('http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1')
         .query({q:answer.name})
         .end((err,res)=>{
             console.log(res.body.translation)
         })
     })
});
commander.parse(process.argv)

// }