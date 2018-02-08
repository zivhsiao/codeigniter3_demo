$(function(){
  
  $('.iCheck').iCheck({
    checkboxClass:'icheckbox_flat-blue'
  }).on('ifChecked', function(event){

    if( $(this).data('url') ){
      $.ajax({
      	url: $(this).data('url'),type: 'POST',dataType: 'json', timeout: 15000,
      	data:{value:'1'},
      	error: function(){alert('Error on Call.');},
      	success: function(data){
          console.log(data.msg);
      	}
      });
    }
  }).on('ifUnchecked', function(event){
    
    if( $(this).data('url') )
    {
      $.ajax({
      	url: $(this).data('url'),type: 'POST',dataType: 'json', timeout: 15000,
      	data:{value:'0'},
      	error: function(){alert('Error on Call.');},
      	success: function(data){
          console.log(data.msg);
      	}
      });
    }
  });
  
});