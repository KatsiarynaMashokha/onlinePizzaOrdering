// business logic
// Order object that will hold the total price for the pizza order, the address, and array of pizzas
function Order() {
  this.price = 0.0;
  this.address = "";
  this.pizzas = [];
  this.isForDelivery = false;
}

//Function to add a pizza to the total pizza order and to calculate the total order price
Order.prototype.add = function(pizza) {
  this.pizzas.push(pizza);
  this.price += pizza.price;
}

// Method to display to the user the order details
Order.prototype.showOrder = function() {
  var order = "";
  if (this.pizzas.length === 0) {
    order = "You pizza cart is empty. You need to add pizza to your order first.";
  } else {
    order = "Order of " + this.pizzas.length + " pizza(s) for the total of $" + this.price + " is being prepared.";
    var pizzaDetails = "";
    for (var i = 0; i < this.pizzas.length; i++) {
      var pizzaDetails = "Pizza " + " has " + this.pizzas[i].toppings + " topping(s) on it";
      order+= pizzaDetails;
    }
    if (this.isForDelivery) {
      var address = " The order will be delivered soon to the following address: " + this.address;
      order += address;
    }
  }
  return order;
}

function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.price = 5.0;
}

// A map to hold price increases for different pizza sizes
var sizeMap = new Map();
sizeMap.set("small", 0);
sizeMap.set("medium", 2);
sizeMap.set("large", 4);

// A map to hold price of the toppings
var toppingsMap = new Map();
toppingsMap.set("mushrooms", 1);
toppingsMap.set("pepperoni", 1.50);
toppingsMap.set("tomatoes", 0.75);
toppingsMap.set("olives", 1);
toppingsMap.set("onions", 0.50);
toppingsMap.set("pineapple", 1.50);
toppingsMap.set("ham", 1.25);

// Function that calculates a single pizza price
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
  var order = new Order();

  // If a radio button for a delivery is clicked, display a form to enter the address
  $(".orderOption").click(function() {
    if ($("input:radio[name=orderOption]:checked").val() === "delivery") {
      $(".deliveryForm").show();
      order.isForDelivery = true;
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

    // Create a new pizza object
    var newPizza = new Pizza(size, toppings);
    newPizza.price = newPizza.calculatePrice();
    order.add(newPizza);
    $('input[type="checkbox"]:checked').prop('checked',false);
  });

  $("form#pizzaOrder").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    var toppings = [];
    $("input:checkbox[name=pizzaTopping]:checked").each(function() {
      toppings.push($(this).val());
    });

    // Receive the name and the address of the customer
    var customerName = $("#name").val();
    var customerAddress = $("#street").val() + ", " +  $("#city").val() + ", " +  $("#state").val() + ", " +  $("#zip").val() + ".";
    order.address = customerAddress;
    var orderStats = order.showOrder();
    $("p").show();
    $(".orderDetails").text(orderStats);
    order = new Order();
  });
});
