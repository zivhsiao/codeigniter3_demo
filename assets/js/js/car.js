var vm = new Vue({
    el: '#wrapper',
    data: {
        totalMoney:0,
        productList:[],
        checkedAllFlage:false,
        delFlag:false,
        curProduct:'',
        carContentFlag:false
    },
    //過濾
    filters: {
        formatMoney:function(value){
            //return '$'+value.toFixed(2)價錢加上小數點
            return '$'+value.toFixed(2)
        }
    },
    mounted :function(){
        this.$nextTick(function(){//$nextTick用來指定vm
            vm.cartView();

        })
    },
    methods: {
        //json
        cartView : function(){
            var _this=this;
            this.$http.get('data/head.json',{'id':123}).then(function(res){
                _this.productList = res.body.result.list;
                _this.calcTotalPrice();
                _this.carContentshowFn();
            });
        },
        //數量加減
        changeMoney:function(product,way){
            if(way>0){
                product.productQuentity++;
            }else{
                product.productQuentity--;
                if(product.productQuentity<1){
                    product.productQuentity=1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct:function(item){
            if(typeof item.checked == 'undefined'){
                //Vue.set(item,'checked',true);//全局定意cecked
                this.$set(item,'checked',true);//局部定義cecked
            }else{
                item.checked = !item.checked;
            }
        },
        checkedAll:function(flag){
            this.checkedAllFlage = !this.checkedAllFlage;
            this.checkedAllFlage = flag;
            var _this = this;
            this.productList.forEach(function(item,index){
                if(typeof item.checked == 'undefined'){
                    _this.$set(item,'checked',_this.checkedAllFlage);
                }else{
                    item.checked = _this.checkedAllFlage;
                }
            })
        },
        calcTotalPrice:function(){
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function(item,index){
                _this.totalMoney += item.productPrice*item.productQuentity
            })
        },
        delconfirm:function(item){
            this.delFlag=true;
            this.curProduct=item;
            console.log(item);
        },
        delProduct:function(){
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
        },
        carContentshowFn:function(){
            if(this.productList.length<0){
                this.carContentFlag = false;
            }else{
                this.carContentFlag = true;
            }
        }
        //fetchData: function () {
        //    var xhr = new XMLHttpRequest()
        //    var self = this
        //    xhr.open('GET', apiURL)
        //    xhr.onload = function () {
        //        self.commits = JSON.parse(xhr.responseText)
        //        console.log(self.commits.length)
        //    }
        //    xhr.send()
        //}
    }
})
//全局過濾
//Vue.filter('Money',function(value,type){
//    return '$'+value.toFixed(2) + type;
//})




