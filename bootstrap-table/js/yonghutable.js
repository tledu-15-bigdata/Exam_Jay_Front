$(function(){

    load();

})

function reLoad(){
    $("#table1").bootstrapTable("refresh");
}

function load(){
    $("#table1").bootstrapTable({
        // url:"http://192.168.43.189:8080/Exam_Jay_SSM/selectEx",
        url:'http://101.200.56.184:8080/Exam_Jay_SSM/userSelectAll',
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
                title:'用户名',
                field:'userName'

            },
            {
                title:'账号',
                field:'userAcc',

            },
            {
                title:'密码',
                field:'userPwd'
             },
            {
                title:'用户状态',
                field:'userStatus'
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
                    let k='<a href="javascript:void(0);" onclick="startData(\''+row.userAcc+'\')">开启</a>'
                    let g='<a href="javascript:void(0);" onclick="stopData(\''+row.userAcc+'\')">关闭</a>'
                    let d='<a href="javascript:void(0);" onclick="removeData(\''+row.userAcc+'\')">删除</a>'
                    return k+" "+g+" "+d/*+" "+detail*/
                }
            }
         ]
    })
}




function removeData(userAcc){
    if(userAcc){
        let url="http://101.200.56.184:8080/Exam_Jay_SSM/userDelete"
        var dataJSON={};

        dataJSON.userAcc=userAcc;
        $.ajax({
            url:url,
            data:JSON.stringify(dataJSON),
            dataType:'json',
            contentType:'application/json;charset=UTF-8',
            type:'POST',
            success:function(result){
                // console.log(result)
                //将返回的result数据，渲染到页面上

                    reLoad()
                    // alert("fkjhas")

            }
        })

    }
}

function startData(userAcc){
    if(userAcc){
        let url="http://101.200.56.184:8080/Exam_Jay_SSM/startStatus"
        var dataJSON={};

        dataJSON.userAcc=userAcc;
        $.ajax({
            url:url,
            data:JSON.stringify(dataJSON),
            dataType:'json',
            contentType:'application/json;charset=UTF-8',
            type:'POST',
            success:function(result){

                //将返回的result数据，渲染到页面上

                    //删除成功-->重新渲染表格的数据
                    reLoad();
                    // alert("dgsds")


            }
        })

    }
}

function stopData(userAcc){
    if(userAcc){
        let url="http://101.200.56.184:8080/Exam_Jay_SSM/stopStatus"
        var dataJSON={};

        dataJSON.userAcc=userAcc;
        $.ajax({
            url:url,
            data:JSON.stringify(dataJSON),
            dataType:'json',
            contentType:'application/json;charset=UTF-8',
            type:'POST',
            success:function(result){

                //将返回的result数据，渲染到页面上

                //删除成功-->重新渲染表格的数据
                reLoad();
                // alert("sdhf")


            },
            error:function(result){
            }
        })

    }
}
