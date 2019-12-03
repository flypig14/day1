#!/usr/bin/env node

// module.exports=()=>{
    const blessed = require("blessed");//引入blessed包
    const blessedContrib = require("blessed-contrib");//引入blessed-contrib包
    const currentPro = require("current-processes");//引入current-processes包
    const _ = require("lodash");//引入lodash包

    setInterval(()=>{//设定每秒变换一次

        currentPro.get(function(err,processes){//获取cpu功率
            var sorted = _.sortBy(processes,"cpu");//排序当前cup的使用率
            var top5 = sorted.reverse().splice(0,5);//把当前的使用率中的最高值取出并打印
           var newArr= top5.map((item)=>{
                return item.cpu
            });

            let screen = blessed.screen();
            let line = blessedContrib.line(//设置当前表格的样式
                {
                    style:
                    {line:"yellow",text:"green",baseline:"black"},
                    xLabelPadding:3,//设置当前表格的参数
                    xPadding:5,
                    showLegend:true,
                    wholeNumbersOnly:false,
                    label:"Title"
                }
            );
            let series1={//设置当前坐标
                title:'left',
                x:["t1","t2","t3","t4","t5"],
                y:newArr
            };
            let series2={
                title:'right',
                x:["t1","t2","t3","t4"],
                y:[2,6,8,2]
            }
            screen.append(line);//会长线路
            line.setData(series1,series2);//把坐标设置进表格
            screen.key(['escape','q','C-c'],function(ch,key){
                return process.exit(0);
            });
            screen.render();//把当前表格渲染出来
        });

    },100)
    //.........................................................
   

// }