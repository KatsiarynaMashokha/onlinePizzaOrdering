// business logic
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = [];
}
var sizeArray = {
    "small": 0,
    "medium": 2,
    "large": 4
};

var toppingsArray = {
    "mushrooms": 1,
    "pepperoni": 1.50,
    "tomatoes": 0.75,
    "olives": 1,
    "onions": 0.50,
    "pineapple": 1.50,
    "ham": 1.25
};

var sizeMap = new Map();
sizeMap.set("small", 0);
sizeMap.set("medium", 2);
sizeMap.set("large", 4);

var toppingsMap = new Map();
toppingsMap.set("mushrooms", 1);
toppingsMap.set("pepperoni", 1.50);
toppingsMap.set("tomatoes", 0.75);
toppingsMap.set("olives", 1);
toppingsMap.set("onions", 0.50);
toppingsMap.set("pineapple", 1.50);
toppingsMap.set("ham", 1.25);




Pizza.prototype.calculatePrice = function() {
  var pizzaPrice = 5;
  var sizePrice = sizeMap.get(String(this.size));
  pizzaPrice += sizePrice;

for (var i = 0; i < this.toppings.length; i++) {
  var topPrice = toppingsMap.get(String(this.toppings[i]));
  pizzaPrice += topPrice;

};
  return pizzaPrice;


};









// user interface logic
$(document).ready(function() {
  // if a radio button for a delivery is clicked, display a form to enter the address
  $(".orderOption").click(function() {
    if ($("input:radio[name=orderOption]:checked").val() === "delivery") {
      $(".deliveryForm").show();
    } else {
      $(".deliveryForm").hide();
    }
  });
  $("form#pizzaOrder").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    var toppings = [];
    // receive the name and the address of the customer
    var customerName = $("#name").val();
    var customerAddress = $("#street").val() + ", " +  $("#city").val() + ", " +  $("#state").val() + ", " +  $("#zip").val();
    $("input:checkbox[name=pizzaTopping]:checked").each(function() {
      toppings.push($(this).val());
    });

    alert(toppings);
    var newPizza = new Pizza(size, toppings);
    alert(newPizza.calculatePrice());
    $(".container").hide();
    alert("Your order is receved and will" + customerName + " " + customerAddress);
  });
});
