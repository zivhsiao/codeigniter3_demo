//摺疊選單
function leftNav(){
    var leftNav = $('#leftNav');
    if(leftNav.hasClass('smallNav')){
        leftNav.removeClass('smallNav');
    }else{
        leftNav.addClass('smallNav');
    }
}

//最新商品
//$.get('data/headProduct.json', {}, function(Json) {
//    if ( Json.status == true ) {
//        var $Data = Json.result.list;
//        var $html = '';
//        var $Replace = '';
//        var $headprice='';
//        var $Template = $('#headProduct');
//        var $Content = $('#headProduct').html();
//        $.each( $Data, function(k, v){
//            if(v.headprice){
//                $headprice='$'+v.headprice;
//            }
//            $Replace = $Content.replace(/\{Image\}/i, "<img src=" + v.headImage + " class='img-responsive' />").replace(/\{title\}/i, v.headtitle).replace(/\{text\}/i, v.headtext).replace(/\{price\}/i, $headprice);
//            $html += $Replace;
//        });
//        $Template.html($html);
//    }
//});

//頁面跳轉
function PageJump(url){
    $("#rightcontent").load(url +'.html');
    return false;
}



//分頁
function pageLine($TotalCount, P){

    // 總筆數
    $("#TotalNumber").html($TotalCount);

    // 總頁數
    var $TotalPage = Math.ceil( $TotalCount / PageCount );

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

        if ( $P+5>=$i && $P-5<=$i ) {
            //
            if ($i == $P) $active = ' class="active"';
            $row += '<li' + $active + '><a href="">' + $i + '</a></li>';
            $active = '';
        }
    }

    if ( $P<$TotalPage && $TotalPage >5 ) $row += '<li' + $active + '><a href="" title="'+ $TotalPage +'">»</a></li>';
    $(".pagination").html($row);

    if ( $TotalCount >= 1 )
        $('#PageControl').show();
    else
        $('#PageControl').hide();

}

function search(P){

    $.ajax({
        url: WebSite +'/?a=Admin/Contract&b=Search',
        type: 'post',
        data: $('#idSearchForm').serialize() +'&P='+ P,
        success: function(J){
            var Json = JSON.parse(J);

            if ( Json['Result']==true ) {

                //
                pageLine(Json['TotalCount'], P);

                var $One = '';
                var $DataCount = 0;
                $.each(Json['Data'], function(k,v){

                    $DataCount = k;
                    var BGColor = (k%2==0)? 'bgcolor="#f0f0f0"' : 'bgcolor="#ffffff"';

                    $One += '<tr id="'+ v['id'] +'" '+ BGColor +'>';
                    $One += '<td class="text-center">'+ v['id'] +'</td>';
                    $One += '<td>'+ v['Create_Time'] +'</td>';
                    $One += '<td>'+ v['SalesName'] +'</td>';
                    $One += '<td>'+ v['UserName'] +'</td>';
                    $One += '<td>'+ v['StartTime'].replace(' 00:00:00', '') +'</td>';
                    $One += '<td>'+ v['EndTime'].replace(' 00:00:00', '') +'</td>';
                    $One += '<td>'+ v['Point'] *1 +'</td>';
                    $One += '<td>'+ v['Price'] *1 +'</td>';
                    $One += '<td></td>';
                    $One += '<td></td>';

                    $One += '<td class="text-center">' +
                    '<i class="btn btn-default btn-xs" onclick="editUser('+ v['id'] +')"><i class="fa fa-pencil-square-o fa-fw"></i></i> ' +
                    '<i data-id="'+ v['id'] +'" class="btn btn-default btn-xs"><i class="fa fa-trash fa-fw"></i></i></td>';

                    $DataCount++;
                });

                // 根據資料筆數 顯示
                if ( $DataCount == 0 ) {
                    $("#idUserList").html('<tr><td colspan="10">查無資料</td></tr>');
                }
                else {
                    $("#idUserList").html($One);
                }
            }

            // 查無資料
            else{
                pageLine(0, P);

                $("#idUserList").html('<tr><td colspan="10" class="text-center">查無資料</td></tr>');
            }
        }
    });
}