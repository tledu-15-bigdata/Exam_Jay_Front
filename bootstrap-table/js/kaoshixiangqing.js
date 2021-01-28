
$(function () {
    load()
})
function reLoad(){
    $("#table").bootstrapTable("refresh");
}

function load(){
    $("#table").bootstrapTable({
        // url:"http://192.168.43.189:8080/Exam_Jay_SSM/selectEx",
        url:'http://localhost:8080/Exam_Jay_SSM/selectGradeAll',
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
                title:'学号',
                field:'gradeLoginid'

            },
            {
                title:'姓名',
                field:'gradeName',

            },
            {
                title:'得分',
                field:'gradeScore'
             },
            {
                title:'正确率',
                field:'gradeAccuracy'
            }
             ,
            {
                title:'登录时间',
                field:'loginTime'
            }
            ,{
                title:'交卷时间',
                field:'finishTime'
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
                    let d='<a href="javascript:void(0);" onclick="lookData(\''+row.gradeName+'\',\''+row.paperId+'\',\''+row.gradeLoginid+'\',\''+row.gradeScore+'\',\''+row.gradeAccuracy+'\')">阅卷详情</a>'
                    // let m='<a href="javascript:void(0);" onclick="modifyGoods(\''+row.examinationTitle+'\',\''
                    //     +row.examinationA+'\',\''+row.examinationB+'\',\''+row.examinationC+'\',\''+row.examinationD+'\',\''
                    //     +row.examinationAnswer+'\',\''+row.examinationScore+'\',\''+row.examinationDegree+'\',\''+row.examinationType+'\',\''+row.examinationId+'\')">修改</a>'
                    // let detail='<a href="javascript:void(0);" onclick="fetchDetail(\''+row.id+'\')">详情</a>'
                    return d/*+" "+m*//*+" "+detail*/
                }
            }
         ]
    })
}

function lookData(userName,paperId,userId,score,accuracy) {
    localStorage.setItem("yuejuan-username",userName)
    localStorage.setItem("yuejuan-paperId",paperId)
    localStorage.setItem("yuejuan-userid",userId)
    localStorage.setItem("yuejuan-score",score)
    localStorage.setItem("yuejuan-zql",accuracy)
    window.location.href="kaoshi-yuejuan.html"
}
