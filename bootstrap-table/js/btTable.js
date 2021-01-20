$(function(){

    load();


})

function reLoad(){
    $("#myTable").bootstrapTable("refresh");
}

function load(){

    $("#myTable").bootstrapTable({
        url:"http://localhost:8080/Login/userSelect",
        method:"POST",
        dataType:"JSON",

        striped : true, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : "server",//server:服务器端分页|client：前端分页
        pageSize : 2,//单页记录数  告知前端使用者 每页显示多少个
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
                title:'物品名称',
                field:'name'
            },
            {
                title:'价格',
                field:'price',

            },
            {
                title:'是否贵重',
                field:'isValuable'
             }
             // ,
        //     {
        //         title:'操作',
        //         formatter:function(value,row,index){
        //             var url= 'http://localhost:8080/Login/removeData/'+index;
        //             var deleteRow="<a href='javascript:remove(\'"+url+"\')'>删除</a>";
        //
        //
        //             var update="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:remove(\'"+url+"\')'>修改</a>";
        //
        //             return deleteRow+update;
        //         }
        //     }
        //     ,
        //     {
        //         title:'操作2'
        //     }
         ]
        // onDblClickRow:function(row, $element){
        //         console.log(row)
        //     console.log($element.innerHTML)
        //     // console.log(field)
        // }
    })
}

// function bitMe(content){
//     alert(content);
// }

// function remove(url){
//
//
//   $.ajax({
//       url:url,
//       type:"get",
//       success:function(mark){
//           console.log(mark)
//             if(mark){
//                 reLoad();
//             }
//       }
//
//
//
//   })
//
// }