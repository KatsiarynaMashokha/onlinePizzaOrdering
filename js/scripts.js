// business logic
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = [];
}

Pizza.prototype.calculatePrice = function() {

};









// user interface logic
$(document).ready(function() {
  $("form#pizzaOrder").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    alert(size);
    var toppings = [];
    $("input:checkbox[name=pizzaTopping]:checked").each(function() {
      toppings.push($(this).val());
    });
    alert(toppings);
  });
});
