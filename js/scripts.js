// business logic
// Order object that will hold the total price for the pizza order, the address, and array of pizzas
function Order() {
  this.price = 0.0;
  this.address = "";
  this.pizzas = [];
}

Order.prototype.add = function(pizza) {
  this.pizzas.push(pizza);
  this.price += pizza.price;
}

function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.price = 5.0;
}

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
  var pizzaPrice = this.price;
  var pizzaPrice = pizzaPrice + sizeMap.get(this.size);

  for (var i = 0; i < this.toppings.length; i++) {
    var topPrice = toppingsMap.get(this.toppings[i]);
    pizzaPrice += topPrice;
  };
  return pizzaPrice;
};

// user interface logic
$(document).ready(function() {
  // if a radio button for a delivery is clicked, display a form to enter the address

  var order = new Order();

  $(".orderOption").click(function() {
    if ($("input:radio[name=orderOption]:checked").val() === "delivery") {
      $(".deliveryForm").show();
    } else {
      $(".deliveryForm").hide();
    }
  });

  $("#addOrder").click(function(event){
    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    var toppings = [];
    $("input:checkbox[name=pizzaTopping]:checked").each(function() {
      toppings.push($(this).val());
    });

    var newPizza = new Pizza(size, toppings);
    newPizza.price = newPizza.calculatePrice();
    order.add(newPizza);
    alert(order.price + " " + order.pizzas);

  });

  $("form#pizzaOrder").submit(function(event){

    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    var toppings = [];
    $("input:checkbox[name=pizzaTopping]:checked").each(function() {
      toppings.push($(this).val());
    });

    // receive the name and the address of the customer
    var customerName = $("#name").val();
    var customerAddress = $("#street").val() + ", " +  $("#city").val() + ", " +  $("#state").val() + ", " +  $("#zip").val();
    order.address = customerAddress;

    alert(order.address);
  });
});
