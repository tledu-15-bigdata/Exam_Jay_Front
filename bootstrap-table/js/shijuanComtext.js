window.onload=function requestData(){
    var a=localStorage.getItem("paperId")
    var dataJSON={}
    dataJSON.paperId=a;

    $.ajax({
        url: "http://101.200.56.184:8080/Exam_Jay_SSM/papercSelect",
        type: "post",
        dataType: "json",
        data:JSON.stringify(dataJSON),
        contentType:'application/json;charset=UTF-8',
        success: function (data) {
            console.log(data[0])
            /*这个方法里是ajax发送请求成功之后执行的代码*/
            showData(data);//我们仅做数据展示
        },
        error: function (msg) {
            alert("ajax连接异常：" + msg);
        }
    });
}



//展示数据
function showData(data) {
    // var str = "";//定义用于拼接的字符串
    for (var i = 0; i < data.length; i++) {
        //拼接表格的行和列
        if (data[i].papercType=="选择题"){
            var s=i+1;
            var str = "<tr><td>"+s+"</td>" + "<td>"+"<b>[</b>"+"<b>"+data[i].papercType+"</b>" +"<b>]</b>"+ "&nbsp;" + data[i].papercTitle+ "&nbsp;"+"("+data[i].papercScore+")"+"<br>"
               +"<font color='gray'size='1'>题目难度:</font>" +"<font color='gray'size='1'>"+data[i].papercDegree+"</font>"+"<br>" +"A:"+data[i].papercA+"<br>"+"B:"+data[i].papercB+"<br>"+"C:"+data[i].papercC+"<br>"+"D:"+data[i].papercD+"<br>"
                +"正确答案:"+data[i].papercRightanswer+"</td>"+"<td>"+"<input type='checkbox' name='ti' >"+"<span hidden>"+data[i].papercId+"</span>"+"</td>"+"</tr>";
            //追加到table中
            $("#tab").append(str);
        }else{
            var s=i+1;
            var str = "<tr><td>"+s+"</td>" + "<td>"+"<b>[</b>"+"<b>"+data[i].papercType+"</b>" +"<b>]</b>"+ "&nbsp;" + data[i].papercTitle+ "&nbsp;"+"("+data[i].papercScore+")"+"<br>"
                +"<font color='gray'size='1'>题目难度:</font>" +"<font color='gray'size='1'>"+data[i].papercDegree+"</font>"+"<br>"
                +"正确答案:"+data[i].papercRightanswer+"</td>"+"<td>"+"<input type='checkbox' name='ti' >"+"<span hidden>"+data[i].papercId+"</span>"+"</td>"+"</tr>";
            //追加到table中
            $("#tab").append(str);

        }

    }
}
