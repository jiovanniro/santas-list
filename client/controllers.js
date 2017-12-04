let productArray = [];


var app = angular.module('myStore.controllers', []);

app.controller('productsController', ['$scope', '$location', '$routeParams', 'Products', function($scope, $location, $routeParams, Products){
    let catId = $routeParams.id;
    function getProducts(){
        $scope.products = Products.query({id: catId}, function(success){
            }, function(err){
                console.log('error');
            }
        );
    }
    getProducts();
}]);




app.controller('singleController', ['$scope', '$location', '$routeParams', 'Products', 'Single', 'Cart', function($scope, $location, $routeParams, Products, Single, Cart){
    let itemId = $routeParams.id;
        //get a single product
    function getProduct(){
        $scope.product = Single.get({id: itemId}, function(success){
            }, function(err){
                console.log('error');
            }
        );
    }
    getProduct();

    $scope.PurchaseProduct = function(id, price) {            
        if(localStorage.itemId === undefined){
            let idArray = [];
            idArray.push(id);
            var idStringify = JSON.stringify(id);
            localStorage.setItem('itemId',idStringify);

            var priceStringified = JSON.stringify(price);
            localStorage.setItem('price',priceStringified);
        } else {
            var localStorageItemId = localStorage.getItem('itemId');
            var localStorageItemIdParse = JSON.parse(localStorageItemId);
            productArray = localStorageItemIdParse;
           
            if (typeof productArray === 'number') {
                var twoItems = [productArray, id];
                var twoItemsStringify = JSON.stringify(twoItems);
                localStorage.setItem('itemId', twoItemsStringify);

                var originalPrice = localStorage.getItem('price');
                var originalPriceParse = JSON.parse(originalPrice);
                var newPrice = originalPriceParse + price;
                var newPriceStringified = JSON.stringify(newPrice);        
                localStorage.removeItem('price');
                localStorage.setItem('price',newPriceStringified);
            } else {
                productArray.push(id);
                var productArrayStringify = JSON.stringify(productArray);
                localStorage.setItem('itemId',productArrayStringify);
            
                var originalPrice = localStorage.getItem('price');
                var originalPriceParse = JSON.parse(originalPrice);
                var newPrice = originalPriceParse + price;
                var newPriceStringified = JSON.stringify(newPrice);        
                localStorage.removeItem('price');
                localStorage.setItem('price',newPriceStringified);
            }
        }
    };
}]);




app.controller('cartController', ['$scope', '$location', 'Cart', 'Products', 'Single', 'Checkout', 'Contact', function($scope, $location, Cart, Products, Single, Checkout, Contact){
    var itemId = localStorage.getItem('itemId');
    console.log('item Id ' + itemId);
    var itemIdParse = JSON.parse(itemId);
    var cartArray = [];
    var cartArrayId = []
        //*Listing off all cart products*

    function getCartProducts(){
        if (itemIdParse.length === undefined) {
                Single.get({id: itemIdParse}, function(success){
                        cartArray.push(success);
                    }, function(err){
                        console.log('error');
                    }
            )
        } else {
            for (var i = 0; i < itemIdParse.length; i++) {
                Single.get({id: itemIdParse[i]}, function(success){
                        cartArray.push(success);
                        cartArrayId.push(success.id);
                    }, function(err){
                        console.log('error');
                    }
                ); 
            };
        }
        $scope.CartProducts = cartArray;
        
        console.log(cartArray);
        console.log(cartArrayId);
        console.log('Item Id Parse' + itemIdParse);
    };

    getCartProducts();
    $scope.Total = localStorage.getItem('price');

        //*Removing Product* 

    $scope.remove = function(itemLocation, itemPrice){
        var removeSessionItem = localStorage.getItem('itemId');
        var removeSessionItemParse = JSON.parse(removeSessionItem);
        productArray = removeSessionItemParse


        // if(discountApplied === 1){
        //     var totalPrice = localStorage.getItem('price');
        //     var totalPriceParse = JSON.parse(totalPrice);
        //     var totalPriceParse = totalPriceParse + discountAmount;
        //     var totalPriceParseStringify = JSON.stringify(totalPriceParse);
        //     localStorage.setItem(totalPriceParseStringify);

        //     discountAmount = 0;
        // }

        if(typeof removeSessionItemParse === 'number'){
            localStorage.removeItem('itemId');
        } else {
            cartArrayId.splice(itemLocation, 1); //productArray
            var removeSessionItemStringify = JSON.stringify(cartArrayId); //productArray -> cartArray
            localStorage.setItem('itemId',removeSessionItemStringify);
        }
        
        var originalPrice = localStorage.getItem('price');
        var originalPriceParse = JSON.parse(originalPrice);
        var newPrice = originalPriceParse - itemPrice;
        var newPriceStringified = JSON.stringify(newPrice);
        localStorage.setItem('price',newPriceStringified);        
        location.reload();

        console.log('Item Location is: ' + itemLocation);
        console.log('Item Price is: ' + itemPrice);
    }

        //*Final Purchase and Email*
    
    //     //Post all purchased products to MySQL --> to email function
    // function purchasedItemsListed(priceId, totalPrice) {
    //     if (itemIdParse.length > 1) {
    //         for(i = 0; i < itemIdParse.length; i++){
    //             let purchasedItems = new Checkout({
    //                 productId: itemIdParse[i],
    //             })
    //             purchasedItems.$save({id: priceId}, function(success){
    //                 console.log('success purchasedItems function');
    //                 localStorage.removeItem('price');
    //                 localStorage.removeItem('itemId');
    //             }, function(err){
    //                 console.log('error');
    //             })
    //         }
    //         sendEmail(priceId, totalPrice);
    //     } else {
    //         let purchasedItems = new Checkout({
    //             productId: itemIdParse,
    //         })
    //         purchasedItems.$save({id: priceId}, function(success){
    //             console.log('success purchasedItems function');
    //             localStorage.removeItem('price');
    //             localStorage.removeItem('itemId');
    //         }, function(err){
    //             console.log('error');
    //         })
    //         sendEmail(priceId, totalPrice);
    //     }
    // }
    //     //Email for Purchase
    // function sendEmail(priceId, totalPrice){
    //     $scope.emailPurchase = Cart.query({id: priceId}, function(success){
    //         console.log('success sendEmail function');
    //         function sendEmail() {
    //             let contact = new Contact({
    //                 to: $scope.email,
    //                 message: 'Here are the items that you purchased at the Covalence store: ' + success + ' Total: $' + totalPrice + ' Thank you for shopping at Covalence.'
    //             });
    //             contact.$save({id: priceId}, function(){
    //                 alert('Thank you for shopping with us. You will recieve an email with your proof of purchase.');
    //             }, function (err){
    //                 console.log('error with email')
    //             })
    //         }
    //     }, function(err){
    //         console.log('error');
    //     })
    // }
    //     //Payment added to MySQL --> to add purchased products
    // $scope.sendPayment = function payment(stripeId, totalPrice) {
    //     let payAmount = new Cart({
    //         id: stripeId,
    //         price: totalPrice
    //     });
    //     payAmount.$save(function(success){
    //         Checkout.get({id: stripeId}, function(success){
    //             purchasedItemsListed(success, totalPrice);
    //         }, function(err){
    //             console.log('error')
    //         })
    //     }, function(err){
    //         console.log('error');
    //     })
    // }

        //*Discount Btn* make a discount message scope for html

    // var discountApplied = 0;
    // var discountAmount = 0;

    // $scope.applyDiscount = function(){
    //     if ($scope.discountMessage === 'ThisNavbarHellaFine'){
    //         if (discountApplied < 1) {
    //             var totalPrice = localStorage.getItem('price');
    //             var totalPriceParse = JSON.parse(totalPrice);
    //             console.log('Total Price Parse: ' + totalPriceParse);
    //             var discountAmount = totalPriceParse / 10;
    //             console.log('Discount Amount: ' + discountAmount);
    //             var totalPriceParse = totalPriceParse - discountAmount;
    //             console.log('New Total Price: ' + totalPriceParse);
    //             var totalPriceParseStringify = JSON.stringify(totalPriceParse);
    //             localStorage.setItem(totalPriceParseStringify);
    //             alert('Discount applied! New total $' + totalPriceParse + ' If you are continuing to shop or remove an item from your cart please resubmit discount code.');
    //         } else {
    //             alert('Discount is already applied to final price');
    //         }
    //         discountApplied = 1;
    //     } else {
    //         alert('Incorrect Discount Code');
    //     }
    // }
}]);



app.controller('contactController', ['$scope', '$location', 'Contact', function($scope, $location, Contact){
    $scope.send = function() {
        let contact = new Contact({
            name: $scope.name,
            email: $scope.email,
            message: $scope.message
        });

        console.log(contact);

        contact.$save(function() {
            alert('Thank you for your message. We will get back with you shortly.');
        }, function(err) {
            console.log(err);
        });
    }
}]);