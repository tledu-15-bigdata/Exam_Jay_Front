$(function(){

    load();

})

function reLoad(){
    $("#table1").bootstrapTable("refresh");
}

function load(){
    $("#table1").bootstrapTable({
        // url:"http://192.168.43.189:8080/Exam_Jay_SSM/selectEx",
        url:'http://localhost:8080/Exam_Jay_SSM/selectEx',
        method:"POST",
        dataType:"JSON",
        striped : true, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        singleSelect:false,//是否可多选
        sidePagination : "server",//server:服务器端分页|client：前端分页
        pageSize : 10,//单页记录数  告知前端使用者 每页显示多少个
        // showRefresh : true,//刷新按钮
        //查询时携带的参数  data：JSON.stringify()
        queryParams : function(params) {//上传服务器的参数
            var temp = {
                offset :params.offset,// SQL语句起始索引
                pageNumber : params.limit  // 每页显示数量
            };
            return JSON.stringify(temp);
        },


        columns:[
            {
                checkbox:true
            },
            {
                title:'行号',
                align:"center",//水平居中
                halign:"center",//垂直居中
                formatter:function(value,row,index){
                    return index+1;
                }

            },
            // {
            //     title:'行号',
            //     field:'id'
            // },
            {
                title:'题目类型',
                field:'examinationType'

            },
            {
                title:'试题内容',
                field:'examinationTitle',

            },
            {
                title:'难度系数',
                field:'examinationDegree'
             },
            {
                title:'添加时间',
                field:'createtime'
            }
             ,
            {
                title:'操作',
                // field:'createTime', //和后台pojo属性进行对应
                align:'center',//列名称、列数据居中 水平居中
                halign:'center', //垂直居中
                width:'150px',//设置列宽
                formatter:function(value,row,index){
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d='<a href="javascript:void(0);" onclick="removeData(\''+row.examinationTitle+'\')">删除</a>'
                    let m='<a href="javascript:void(0);" onclick="modifyGoods(\''+row.examinationTitle+'\',\''
                        +row.examinationA+'\',\''+row.examinationB+'\',\''+row.examinationC+'\',\''+row.examinationD+'\',\''
                        +row.examinationAnswer+'\',\''+row.examinationScore+'\',\''+row.examinationDegree+'\',\''+row.examinationType+'\',\''+row.examinationId+'\')">修改</a>'
                    // let detail='<a href="javascript:void(0);" onclick="fetchDetail(\''+row.id+'\')">详情</a>'
                    return d+" "+m/*+" "+detail*/
                }
            }
         ]
    })
}


function modifyGoods(examinationTitle,examinationA,examinationB,
                     examinationC,examinationD,examinationAnswer,
                     examinationScore,examinationDegree,examinationType,examinationId){
    // var dataJSON={};
    // dataJSON.examinationId=examinationId;
    // $.ajax({
    //     url:'http://localhost:8080/Exam_Jay_SSM/userLogin',
    //     type:'POST',
    //     data:JSON.stringify(dataJSON),
    //     contentType:'application/json;charset=UTF-8'
    //
    // })
    localStorage.setItem("examinationId",examinationId);
    if (examinationType=="选择题"){
        //打开 选择题弹出层
        layer.open({
            type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
            title:'选择题修改',
            maxmin:false,
            shadeClose:false,
            area:[1000+'px',($(window).height() - 50)+'px'],//弹出层的宽高
            content:'../main/xuanze-update.html',//设置弹出层打开的页面
            //弹出层页面成功打开后，的设置
            success:function(layero,index){
                //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
                //获取子页面HTML对象
                let childBody= layer.getChildFrame('body',index);

                //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
                $(childBody).find('textarea[id=xuanzetitle]').val(examinationTitle);
                $(childBody).find('textarea[id=Atitle]').val(examinationA);
                $(childBody).find('textarea[id=Btitle]').val(examinationB);
                $(childBody).find('textarea[id=Ctitle]').val(examinationC);
                $(childBody).find('textarea[id=Dtitle]').val(examinationD);
                $(childBody).find('input[name=answer][value='+ examinationAnswer +']').checked="checked";
                $(childBody).find('input[id=score]').val(examinationScore);
                $(childBody).find('input[name=degree][value='+examinationDegree+']').checked="checked";
                //获取子页面JS对象
            }
        });
    }else{
        //打开 弹出层
        layer.open({
            type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
            title:'商品修改',
            maxmin:false,
            shadeClose:false,
            area:[1000+'px',($(window).height() - 50)+'px'],//弹出层的宽高
            content:'../main/jianda-update.html',//设置弹出层打开的页面
            //弹出层页面成功打开后，的设置
            success:function(layero,index){
                //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
                //获取子页面HTML对象
                let childBody= layer.getChildFrame('body',index);

                //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
                $(childBody).find('textarea[id=jiandatitle]').val(examinationTitle);
                $(childBody).find('textarea[id=answer]').value=examinationAnswer;
                $(childBody).find('input[id=score]').val(examinationScore);
                $(childBody).find('input[name=degree]').value=examinationDegree;
                //获取子页面JS对象
            }
        });
    }
}



function removeData(examinationTitle){
    if(examinationTitle){
        let url="http://localhost:8080/Exam_Jay_SSM/deleteEx"
        var dataJSON={};

        dataJSON.examinationTitle=examinationTitle;
        $.ajax({
            url:url,
            data:JSON.stringify(dataJSON),
            dataType:'json',
            contentType:'application/json;charset=UTF-8',
            type:'POST',
            success:function(result){
                console.log(result)
                //将返回的result数据，渲染到页面上
                if(result==1){
                    //删除成功-->重新渲染表格的数据
                    reLoad()
                }else{
                    alert("删除失败");
                }
            },
            error:function(result){
            }
        })

    }else{
        alert("数据有问题！无法删除");
    }
}
