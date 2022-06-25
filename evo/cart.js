var products = {
    SINGLE:{title: "Caeli Mask - Solo Pack", price: 999}, 
    DUO: {title: "Caeli Mask - Duo Pack", price: 1799}, 
    TRIO: {title: "Caeli Mask - Trio Pack", price: 2499}, 
    MASK: {title: "Caeli Replacement Mask", price: 150}, 
    FILTER:{title: "Replacement Filters Pack", price: 199}
    };

var cur = "Rs. ";
var items, qty, badge=0;
var prices = [999,1799, 2499, 150, 199];

    if(localStorage.items){
        var items = localStorage.items.split(",");
        var qty = localStorage.qty.split(",");
        
    }else{
        var items = [];
        var qty = [];
    }

function additem(item,q){

    let ind = items.indexOf(item);

    if(ind > -1){
        qty[ind] = Number(qty[ind]) + Number(q);     
    }else{
        items.push(item);
        qty.push(q);
    }
    localStorage.items = items.toString();
    localStorage.qty = qty.toString();

    switch(item){
        case "MASK":document.getElementById("maskbt").innerText = "Added";
                    document.getElementById("maskbt").style.backgroundColor = "#66b501";
                    
                    setTimeout(() => {
                        document.getElementById("maskbt").innerText = "Add to Bag";
                        document.getElementById("maskbt").style.backgroundColor = "#007bff";
                    }, 1500);break;

        case "FILTER":  document.getElementById("filtersbt").innerText = "Added";
                        document.getElementById("filtersbt").style.backgroundColor = "#66b501";
                        
                        setTimeout(() => {
                            document.getElementById("filtersbt").innerText = "Add to Bag";
                            document.getElementById("filtersbt").style.backgroundColor = "#007bff";
                        }, 1500);break;
        
        default:document.getElementById("addbt").innerText = "Added";
                document.getElementById("addbt").style.backgroundColor = "#66b501";
                
                setTimeout(() => {
                    document.getElementById("addbt").innerText = "Add to Bag";
                    document.getElementById("addbt").style.backgroundColor = "#007bff";
                }, 1500);
    }
    badgecount();
}

function removeitem(ind){    
    if(ind > -1){
        items.splice(ind,1);
        qty.splice(ind,1);
    }
    localStorage.items = items.toString();
    localStorage.qty = qty.toString();
    cart();
    badgecount();
}

function cart(){
    if(items.length==0){
        document.getElementById("bagstate").innerText = "Empty.";
        document.getElementById("bagmsg").innerText = "Add some items to your shopping bag and then visit here to checkout."
        document.getElementById("subtotalview").style.display = "none";
        document.getElementById("shippingview").style.display = "none";
        document.getElementById("discount").style.display = "none";
        document.getElementById("checkbt").style.display = "none";
    }
    else{
        document.getElementById("bagstate").innerText = "Ready.";
        document.getElementById("bagmsg").innerText = "Your items are available in stock and are ready to ship, click on proceed to enter the shipping details and complete payment."
        document.getElementById("subtotalview").style.display = "block";
        document.getElementById("shippingview").style.display = "block";
        document.getElementById("checkbt").style.display = "block";
        document.getElementById("discount").style.display = "none";
    }
    var subtotal = 0, shipping = 0, total = 0;
    document.getElementById("cart").innerHTML = "";
    for(var x=0; x<items.length; x++){
        document.getElementById("cart").innerHTML = document.getElementById("cart").innerHTML + "<div style='margin-top: 20px;border-bottom: 1px solid #dee2e6;padding-bottom: 20px;'><span style='font-size: 16px;line-height: 16px;'><strong>"+products[items[x]].title+"</strong></span><span style='font-size: 18px;line-height: 50px;float: right;'>"+cur+(products[items[x]].price*qty[x])+"</span><span style='font-size: 12px;line-height: 14px;'><br>( Price "+cur+products[items[x]].price+" x Quantity "+qty[x]+" )<br><span style='font-size: 12px;line-height: 14px;color: rgb(0,123,255);cursor:pointer' onclick='removeitem("+x+")'>Remove<br></span></span></div>";
        subtotal = subtotal + (products[items[x]].price*qty[x]);
    }
    if(subtotal>0){
        shipping = 75;
    }
    document.getElementById("subtotal").innerText = cur+subtotal;
    document.getElementById("shipping").innerText = cur+shipping;
    document.getElementById("total").innerText = cur+(subtotal+shipping);
}

function badgecount(){
    badge = 0;
    if(items.length>0){
        for(var x=0; x<items.length; x++){
            badge = badge + Number(qty[x]);
        }
        document.getElementById("badge").innerText = badge;
        document.getElementById("badge_toggle").innerText = badge;
        $("#badge").fadeIn();
        $("#badge_toggle").fadeIn();
    }else{
        $("#badge").hide();
        $("#badge_toggle").hide();
    }
    
}

function clearcart(){
    localStorage.removeItem("items");
    localStorage.removeItem("qty");
    items = [];
    qty = [];
    badgecount();
}