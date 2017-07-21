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

Pizza.prototype.calculatePrice = function(sizeArray, toppingsArray) {
  var pizzaPrice = 5;

};









// user interface logic
$(document).ready(function() {
  $("form#pizzaOrder").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    var toppings = [];
    $("input:checkbox[name=pizzaTopping]:checked").each(function() {
      toppings.push($(this).val());
    });
    var newPizza = new Pizza(size, toppings);
  });
});
