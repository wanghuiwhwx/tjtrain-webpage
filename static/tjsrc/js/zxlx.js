$(function (param) { 
  $(".selectpicker").selectpicker()
  $(".selectpicker2").selectpicker()
  $(".selectpicker3").selectpicker()
  // $(".widget-sider").sider({
  //   min:0,
  //   max:100 //拖动滑块的最大及最小值
  // })
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 9,
    values: [ 0, 9 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +" - " + $( "#slider-range" ).slider( "values", 1 ) );
  var intervalHandler;
  var sjData;
  var count=0;
  // 生成试卷
  $(".scsj-btn").on("click",function (param) { 
    var type = $(".selectpicker").val() //业务分类value值
    var ny_bottom = $( "#slider-range" ).slider( "values", 0 ) //易程度value值
    var ny_top = $( "#slider-range" ).slider( "values", 1 ) //难程度value值
    var num = $(".nums").val()  //  题目数量vaule值
    console.log(ny_bottom,ny_top)
    $.ajax({
      type: "get",
      url: "../../demoJson/json143.json",
      data: "",
      dataType: "json",
      success: function (res) {
        console.log(res)
        if(res.returnCode == 00) {
          $(".empty").css("display","none")
          $(".lxt").css("display","block")
          $(".times").css("display","block")
          $(".sub-btn").css("display","block")
          var html = ""
          var zfs = 0
          sjData = res.data
          for(var i=0;i<res.data.tmList.length;i++) {
            zfs+=res.data.tmList[i].tmScore
            if(res.data.tmList[i].tmType == "多选题") {
              html += '<li>'
                +'<h3 class="title"><span>'+(i*1+1)+'、</span>【多选题】'+res.data.tmList[i].tmDesc+'【'+res.data.tmList[i].tmScore+'分】</h3>'
                +tplCheckbox(res.data.tmList[i].tmItems,res.data.tmList[i].tmId)
                +'<div class="tm-result" id="tm-result-'+res.data.tmList[i].tmId+'"><span class="zqda"></span><span class="ndda"></span></div>'
              +'</li>'
            }else if(res.data.tmList[i].tmType == "单选题") {
              html += '<li>'
              +'<h3 class="title"><span>'+(i*1+1)+'、</span>【单选题】'+res.data.tmList[i].tmDesc+'【'+res.data.tmList[i].tmScore+'分】</h3>'
              +'</li>'
              +tplRadio(res.data.tmList[i].tmItems,res.data.tmList[i].tmId)
              +'<div class="tm-result" id="tm-result-'+res.data.tmList[i].tmId+'"><span class="zqda"></span><span class="ndda"></span></div>'
            }else if(res.data.tmList[i].tmType == "判断题") {
              html += '<li>'
              +'<h3 class="title"><span>'+(i*1+1)+'、</span>【判断题】'+res.data.tmList[i].tmDesc+'【'+res.data.tmList[i].tmScore+'分】</h3>'
              +'</li>'
              +tplRadio(res.data.tmList[i].tmItems,res.data.tmList[i].tmId)
              +'<div class="tm-result" id="tm-result-'+res.data.tmList[i].tmId+'"><span class="zqda"></span><span class="ndda"></span></div>'
            }
            
          }
          $(".zfs").html(zfs)
          $(".zts").html(res.data.tmList.length)
          $(".topic-list").html(html)
          // 计时开始       
          intervalHandler=window.setInterval(function() {
            count++;
            var s=count%60;
            var tmp=Math.floor(count/60);
            var m=tmp%60;
            tmp=Math.floor(tmp/60);
            var h=tmp%60;
            tmp=((100+h)+"").substring(1)+":"+((100+m)+"").substring(1)+":"+((100+s)+"").substring(1);
            $(".times").html(tmp);
          }, 1000);
        }
      }
    });
   })
   function tplCheckbox(res,tmid) {
     var html = ""
     for(var i = 0;i<res.length;i++) {
      html += '<p><span><input type="checkbox" name="'+tmid+'" value="'+res[i].itemSign+'"></span>'+res[i].itemSign+'、'+res[i].itemDesc+'</p>'
     }   
     return html
   }
   function tplRadio(res,tmid) {
    var html = ""
     for(var i = 0;i<res.length;i++) {
      html += '<p><span><input type="radio" name="'+tmid+'" value="'+res[i].itemSign+'"></span>'+res[i].itemSign+'、'+res[i].itemDesc+'</p>'
     }   
     return html
   }
   // 提交试卷
   $(".sub-btn").on("click",function (param) { 
     if($(this).hasClass("disable")) return;
      clearInterval(intervalHandler)
      count = 0
      $(this).addClass('disable')
      $("input[type='checkbox']").attr("disabled", "disabled");
      $("input[type='radio']").attr("disabled", "disabled");
      console.log(sjData)
      //获取参数
      var _data={};
      _data.id=sjData.id;
      _data.beginTime=sjData.beginTime;
      _data.endTime=new Date();
      _data.resultType=1;
      var allAnswer={};
      
      var tmList = sjData.tmList
      for(var i = 0;i<tmList.length;i++) {
        if (tmList[i].tmType=="判断题" || tmList[i].tmType=="单选题") {
          allAnswer[tmList[i].tmId]=$('input[name="'+tmList[i].tmId+'"]:checked').val();
        }else {
          var answer="";
          allAnswer[tmList[i].tmId]=$('input[name="'+tmList[i].tmId+'"]:checked').val();
          $('input[name="'+tmList[i].tmId+'"]:checked').each(function(){
            answer+=$(this).val()+",";
          });
          answer=answer.substring(0,answer.length-1)
          allAnswer[tmList[i].tmId]=answer
        }
        
        // var oneTm=tmList[i]
        // $("#tm-result-"+oneTm.tmId).find(".zqda").html("正确答案："+oneTm.tmAnswer)
        // $("#tm-result-"+oneTm.tmId).find(".ndda").html("您的答案："+(!allAnswer[oneTm.tmId] ? "未答" : allAnswer[oneTm.tmId]))
      }
      _data.answers=allAnswer
      $.ajax({
        type: "get",
        url: "../../demoJson/json142.json",
        data: "",
        dataType: "json",
        success:function(res) {
          console.log(res)
          var oktm = []
          var total = 0
          for(var i = 0;i<res.data.tmList.length;i++) {
            var oneTm=res.data.tmList[i]
            $("#tm-result-"+oneTm.tmId).find(".zqda").html("正确答案："+oneTm.tmAnswer)
            $("#tm-result-"+oneTm.tmId).find(".ndda").html("您的答案："+(!allAnswer[oneTm.tmId] ? "未答" : allAnswer[oneTm.tmId]))
            if(oneTm.tmAnswer == allAnswer[oneTm.tmId]) {
              oktm.push(oneTm)
            }
          }
          for(var i = 0;i<oktm.length;i++) {
            total += oktm[i].tmScore
          }
          $(".dd").html(oktm.length)  //答对题数
          $(".df").html(total) // 得分
        }
      })
      
    })
 })