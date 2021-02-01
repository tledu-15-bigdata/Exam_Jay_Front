$(function(){

    load();

})

function reLoad(){
    $("#tableshi").bootstrapTable("refresh");
}

function load(){
    $("#tableshi").bootstrapTable({
        // url:"http://192.168.43.189:8080/Exam_Jay_SSM/selectEx",
        url:'http://101.200.56.184:8080/Exam_Jay_SSM/paperSelectMohu',
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
                pageNumber : params.limit, // 每页显示数量
                _title : str1//往后端传数据
            };
            return JSON.stringify(temp);
        },


        columns:[
            {
                checkbox:true
            },
            {
                title:'序号',
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
                title:'试卷类型',
                field:'paperType'

            },
            {
                title:'试卷分组',
                field:'paperClassify',

            },
            {
                title:'试卷名称',
                field:'paperName'
            },
            {
                title:'出题方式',
                field:'questionMethod'
            }
            ,
            {
                title:'试卷状态',
                field:'paperStatus'
            },
            {
                title:'试卷创建时间',
                field:'createtime'
            },
            {
                title:'试卷考试时长',
                field:'paperTime'
            },
            {
                title:'考试开始时间',
                field:'startTime'
            },
            {
                title:'操作',
                // field:'createTime', //和后台pojo属性进行对应
                align:'center',//列名称、列数据居中 水平居中
                halign:'center', //垂直居中
                width:'150px',//设置列宽
                formatter:function(value,row,index){
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d='<a href="javascript:void(0);" onclick="removeData(\''+row.paperName+'\')">删除试卷</a>'
                    let m='<a href="javascript:void(0);" onclick="modifyGoods(\''+row.paperName+'\',\''
                        +row.paperClassify+'\',\''+row.paperType+'\',\''+row.paperTime+'\',\''+row.startTime+'\',\''
                        +row.questionMethod+'\',\''+row.paperId+'\')">修改试卷</a>'
                    let u='<a href="javascript:void(0);" onclick="startPaper(\''+row.paperName+'\')">开启试卷</a>'
                    let n='<a href="javascript:void(0);" onclick="stopPaper(\''+row.paperName+'\')">关闭试卷</a>'

                    return d+" "+m+" "+u+" "+n/*+" "+detail*/
                }
            }
        ]
    })
}

function startPaper(paperName){
    let url="http://101.200.56.184:8080/Exam_Jay_SSM/statusUpdate"
    var dataJSON={};

    dataJSON.paperName=paperName;
    dataJSON.paperStatus="开启";
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

            }
        },
        error:function(result){
        }
    })

}



function stopPaper(paperName){
    let url="http://101.200.56.184:8080/Exam_Jay_SSM/statusUpdate"
    var dataJSON={};

    dataJSON.paperName=paperName;
    dataJSON.paperStatus="关闭";
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

            }
        },
        error:function(result){
        }
    })

}

function modifyGoods(paperName,paperClassify,paperType,
                     paperTime,startTime,questionMethod,
                     paperId){

    localStorage.setItem("paperId",paperId);

    //打开 选择题弹出层
    layer.open({
        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title:'试卷修改',
        maxmin:false,
        shadeClose:false,
        area:[1000+'px',($(window).height() - 50)+'px'],//弹出层的宽高
        content:'../main/shijuan-update.html',//设置弹出层打开的页面
        //弹出层页面成功打开后，的设置
        success:function(layero,index){
            //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
            //获取子页面HTML对象
            let childBody= layer.getChildFrame('body',index);

            //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
            $(childBody).find('textarea[id=shijuanname]').val(paperName);
            $(childBody).find('textarea[id=classify]').val(paperClassify);
            $(childBody).find('textarea[id=biao-time]').val(paperTime);
            $(childBody).find('textarea[id=start-time]').val(startTime);
            // $(childBody).find('input[name=answer][value='+ examinationAnswer +']').checked="checked";
            // $(childBody).find('input[name=degree][value='+examinationDegree+']').checked="checked";
            //获取子页面JS对象
        }
    });


}



function removeData(paperName){
    if(paperName){
        let url="http://101.200.56.184:8080/Exam_Jay_SSM/paperDelete"
        var dataJSON={};

        dataJSON.paperName=paperName;
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
