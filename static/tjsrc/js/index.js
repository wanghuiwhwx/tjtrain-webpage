$(function () { 
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {},
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ["法规类","政策类","收费类","放行类","理货类","出口类","进口类"]
        },
        series: [
            {
                name: '模拟实操分类',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%','60%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value:11,name:"法规类"},
                    {value:22,name:"政策类"},
                    {value:5,name:"收费类"},
                    {value:30,name:"放行类"},
                    {value:36,name:"理货类"},
                    {value:16,name:"出口类"},
                    {value:8,name:"进口类"}
                ]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 右侧柱状图
    var myChart2 = echarts.init(document.getElementById('main2'));

    // 指定图表的配置项和数据
    var option2 = {
        tooltip: {},
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ["法规类","政策类","收费类","放行类","理货类","出口类","进口类"]
        },
        series: [
            {
                name: '模拟实操分类',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value:80,name:"法规类"},
                    {value:35,name:"政策类"},
                    {value:5,name:"收费类"},
                    {value:50,name:"放行类"},
                    {value:20,name:"理货类"},
                    {value:30,name:"出口类"},
                    {value:28,name:"进口类"}
                ]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);


    // 折线图
    var myChart3 = echarts.init(document.getElementById('main3'));
    option3 = {
        title: {
            text: '折线图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['模拟实操','课件']
        },
        grid: {
            left: '1%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["2018-1","2018-2","2018-3","2018-4","2018-5","2018-6","2018-7"]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'法规类',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'政策类',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'收费类',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'放行类',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'理货类',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'出口类',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'进口类',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };

     // 使用刚指定的配置项和数据显示图表。
     myChart3.setOption(option3);

    window.onresize = function(){
        myChart.resize();
        myChart2.resize();
        myChart3.resize();
    }
    $(".tabs input").on("input",function (param) { 
        var val = $(this).val()
        if(val == "fl") {
            console.log(option3)
            option3.series = [
                {
                    name:'法规类',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'政策类',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'收费类',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'放行类',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'理货类',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'出口类',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'进口类',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                }
            ]
            myChart3.setOption(option3,true);
            //myChart3.resize();
        }else {
            option3.series = [
                {
                    name:'总数',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                }
            ]
            //myChart3.resize();
            myChart3.setOption(option3,true);
            
        }
     })
 })