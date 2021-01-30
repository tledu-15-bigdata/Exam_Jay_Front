
$(function () {
    load()
})
function reLoad(){
    $("#table3").bootstrapTable("refresh");
}

function load(){
    $("#table3").bootstrapTable({
        // url:"http://192.168.43.189:8080/Exam_Jay_SSM/selectEx",
        url:'http://localhost:8080/Exam_Jay_SSM/selectJian',
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
            // {
            //     checkbox:true
            // },
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
                    let t='<a href="javascript:void(0);" onclick="addData(\''+row.examinationTitle+'\',\''
                        +row.examinationA+'\',\''+row.examinationB+'\',\''+row.examinationC+'\',\''+row.examinationD+'\',\''
                        +row.examinationAnswer+'\',\''+row.examinationScore+'\',\''+row.examinationDegree+'\',\''
                        +row.examinationType+'\',\''+row.examinationId+'\')">添加</a>'
                    return t/*+" "+detail*/
                }
            }
         ]
    })
}



function addData(examinationTitle,examinationA,examinationB,
                 examinationC,examinationD,examinationAnswer,
                 examinationScore,examinationDegree,examinationType){
    let  url="http://localhost:8080/Exam_Jay_SSM/papercAdd"
    var b=localStorage.getItem("paperId");
    var dataJSON={};
    dataJSON.paperId=b;
    dataJSON.papercTitle=examinationTitle;
    dataJSON.papercA=examinationA;
    dataJSON.papercB=examinationB;
    dataJSON.papercC=examinationC;
    dataJSON.papercD=examinationD;
    dataJSON.papercType=examinationType;
    dataJSON.papercRightanswer=examinationAnswer;
    dataJSON.papercScore=examinationScore;
    dataJSON.papercDegree=examinationDegree;


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
                layer.msg("添加成功")

                reLoad()
            }else{
                alert("删除失败");
            }
        },
        error:function(result){
        }
    })





}