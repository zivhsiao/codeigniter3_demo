
//修改商品
function modifyProducts(obj){
    var modifyProducts = $('#modifyProducts');
    modifyProducts.find('input[type="file"],input[type="text"],input[type="hidden"],textarea').each(function(){
        $(this).val("");
    })
    var id = $(obj).data("id");
    if(id){
        modifyProducts.find('#hidden').val(id);
        $.ajax({
            url: 'php/baOneData.php?id='+id,
            type: 'get',
            data: {},
            success: function (J) {
                var Json = JSON.parse(J);
                if ( Json.Result == true ) {
                    //var Json = JSON.stringify(J);
                    var $Data = Json.Data;
                    modifyProducts.find('.top p span').text("商品修改");
                    modifyProducts.find('INPUT[type=text],textarea').each(function () {
                        var $name = $(this).attr('name');
                        $("#modify" + $name).val($Data[0][$name]);

                        //if ($Data[$name] != '' && $Data[$name] != undefined) {
                        //
                        //    //if ($Data['status'] == 'N') {
                        //    //    $($("#modifystatus").children('label').get(1)).find('input').get(0).checked = true
                        //    //    return;
                        //    //}
                        //    $("#modify" + $name).val($Data[$name]);
                        //}
                    })
                    if($Data[0].Status =='Y'){
                        modifyProducts.find('#modifystatusN').prop('checked',false);
                        modifyProducts.find('#modifystatusY').prop('checked',true);
                    }else{
                        modifyProducts.find('#modifystatusY').prop('checked',false);
                        modifyProducts.find('#modifystatusN').prop('checked',true);
                    }

                }
            }
        })
    }else{
        modifyProducts.find('.top p span').text("新增商品");
    }
    modifyProducts.show();
    $('#overlay').show();
}

function coverUpload(){
    var fd = new FormData(document.getElementById('modifyProductsForm'));
    var xhr = new XMLHttpRequest();
    xhr.open("POST",'php/baAddData.php',true);
    xhr.onload = function() {
        if (this.status == 200) {
            var Json = JSON.parse(xhr.responseText);
            if(Json.Result == true){
                $('#modifyProducts').hide();
                $('#overlay').hide();
                Read();
            }
        }
    }
    xhr.send(fd);
}
$('#modifyProductsForm').submit(function(){}).validationEngine({
    onValidationComplete: function(form, status) {
        if (status == true) {
            var id = $('#modifyProducts').find('#hidden').val();
            var datapath = $('#modifyProductsForm').serialize();
            if(id){
                $.ajax({
                    url: 'php/baModifyData.php?id='+id,
                    type: 'post',
                    data: datapath,
                    success: function (J) {
                        //var Json = JSON.parse(J);
                        //var Json = JSON.stringify(J);
                    }
                })
            }else{
                coverUpload();
            }
        }
    },
    validationEventTrigger: '',
    promptPosition:"bottomLeft",
    scroll:false
});
function modifyProductsOk(){
    var modifyProducts = $('#modifyProducts');
    var id = modifyProducts.find('#hidden').val();
    var datapath = $('#modifyProductsForm').serialize();
    if(id){
        $.ajax({
            url: 'php/baModifyData.php?id='+id,
            type: 'post',
            data: datapath,
            success: function (J) {
                //var Json = JSON.parse(J);
                //var Json = JSON.stringify(J);
            }
        })
    }else{
        var urlpath = 'php/baAddData.php';
        $.ajax({
            url: 'php/baAddData.php',
            data: formData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            success: function (J) {
                //var Json = JSON.parse(J);
                //var Json = JSON.stringify(J);
            }
        })

    }
}
//刪除商品
function deleteProducts(obj){
    var deleteProducts = $('#deleteProducts');
    var id = $(obj).data("id");
    deleteProducts.find('input').val(id);
    deleteProducts.show();
    $('#overlay').show();
    //deleteProducts.find('#send').click(function(){
    //
    //})
}
function deleteProductsOk(){
    var deleteProducts = $('#deleteProducts');
    var id = deleteProducts.find('input').val();
    $.ajax({
        url: 'php/baDeleteData.php?id='+id,
        type: 'get',
        data: {},
        success: function (J) {
            //Read();
            //var Json = JSON.parse(J);
            //var Json = JSON.stringify(J);
        }
    })
}
//關閉視窗
function closeWindow(obj){
    $('#'+obj).hide();
    $('#overlay').hide();
}
//查詢商品
function productSeach(){
    if ((event.keyCode == 10 || event.keyCode == 13) || (event.ctrlKey || event.metaKey)){
        var productSeach = $('#productSeach');
        var value = productSeach.val();
        $.ajax({
            url: 'baSeachData.php?Seach='+value,
            type: 'get',
            data: {},
            success: function (J) {
                //var Json = JSON.parse(J);
                //var Json = JSON.stringify(J);
                productSeach.val("");
            }
        })
    }
}
//頁面加載
function Read(p){
    $.get('php/baAllData.php', {}, function(Json) {
        if ( Json.Result == true ) {
            var $Data = Json.Data;
            var $html = '';
            var $Replace = '';
            var $status = '';
            var $Template = $('#ProductsContent');
            var $Content = $Template.html();
            $.each( $Data, function(k, v){
                if(v.Status =="Y"){
                    $status = "上架";
                }else{
                    $status = "下架";
                }
                $Replace = $Content.replace(/\{Image\}/i, "<img src='./img/Product" + v['id'] + ".jpg' class='img-responsive' />").replace(/\{order\}/i, v.Porder).replace(/\{time\}/i, v.Create_Time).replace(/\{title\}/i, v.Pname).replace(/\{price\}/i, v.Price).replace(/\{status\}/i, $status).replace(/\{id\}/g, v.id);
                $html += $Replace;
            });
            $Template.html($html);
            pageLine(30, p);
            //if($DataCount==0){
            //    $('#notData').show();
            //}
        }else{
            $('#notData').show();
            pageLine(0, 0);
        }
    }, 'json');
}
//分頁
function pageLine($TotalCount, P){
    // 總筆數
    //$("#TotalNumber").html($TotalCount);

    // 總頁數
    //var $TotalPage = Math.ceil( $TotalCount / PageCount );
    var $TotalPage = 5;

    if ( P ==null || P==undefined ) P = 1;
    if ( P =='Last' ) P = $TotalPage;

    // 分頁列
    var $row = '';
    var $P = parseInt(P);
    var $active = '';

    if ( $P>6 ) {
        $row += '<li' + $active + '><a href="">«</a></li>';
    }

    for( var $i=1; $i<=$TotalPage; $i++) {
        if ( $P+3>=$i && $P-3<=$i ) {
            if ($i == $P) $active = ' class="active"';
            $row += '<li' + $active + '><a href="javascript:Read('+$i+')">' + $i + '</a></li>';
            $active = '';
        }
    }

    if ( $P<$TotalPage && $TotalPage >5 ) $row += '<li' + $active + '><a href="" title="'+ $TotalPage +'">»</a></li>';

    $("#ProductsPage").html($row);

    //if ( $TotalCount >= 1 )
    //    $('#PageControl').show();
    //else
    //    $('#PageControl').hide();

}
//
Read();
