$.fn.sider=function(g){var b={step:1,min:0,max:100,quick:[0,5,10,15,30,40,60,80],name:"size",value:"",callback:false};$.extend(b,g);$(this).html('<input type="text" name="'+b.name+'" value="'+b.value+'" class="form-control"><div class="popcontent"><ul></ul><div class="sider"><div class="sider-btn"></div></div></div>');var p,m,h=$(this),l=h.children("input"),a=h.children(".popcontent"),d=a.children(".sider"),e=a.children("ul"),n=d.children(".sider-btn"),j,o,f=(b.max-b.min)/b.step,c;h.click(function(q){q.stopPropagation()});l.focus(function(q){a.show();var r="";var s=e.width()/b.quick.length>40?parseInt(e.width()/b.quick.length)/e.width()*100:100/parseInt(e.width()/40);for(i in b.quick){r+="<li data-num='"+b.quick[i]+"' style='width:"+s+"%'></li>"}e.html($(r));j=d.width()-n.width();c=j/f;e.children(".active").removeClass("active");e.children("li[data-num='"+l.val()+"']").addClass("active");k(l.val(),false,true)});e.on("click","li",function(){k($(this).attr("data-num"),true,true)});n.on("mousedown",function(r){p=true;var s=n.offset();var q=d.offset();m=parseInt(s.left)+(r.pageX-parseInt(s.left))+(q.left-s.left)});$(document).mousemove(function(q){if(p){k(parseInt((q.pageX-m)/c)*b.step)}});$(document).on("mouseup",function(){if(p){k(o,true)}p=false});function k(r,u,t){if(r){console.log(r);var s=j/(b.max-b.min);var q=r*s;q=q>j?j:(q<0?0:q);if(!t){r+=b.min}else{q-=s*b.min}console.log(r);r=r>b.max?b.max:(r<b.min?b.min:r);l.val(r);n.css({left:q})}if(u){a.hide()}if(b.callback){g.callback(h,r,u)}}$(document).click(function(){a.hide()})};