$(function () {
  //调整父窗口，iframe区域大小
//  alert("document.body.scrollHeight="+document.body.scrollHeight);
//  alert("document.body.offsetHeight="+document.body.offsetHeight);
//  alert("document.body.clientHeight="+document.body.clientHeight);
  parent.changeIframHeight(document.body.scrollHeight+"px");
});