const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector(".header");

const toggleNavbar = () => {
  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());

// const dnum = (incdec, price) => {
//   var itemval = document.getElementById(incdec);
//   var price = document.getElementById(price);
//   if (itemval.value <= 0) {
//     itemval.value = 0;
//   } else {
//     itemval.value = parseInt(itemval.value) - 1;
//     price.innerHTML = psrdeInt(price.value) - 900;
//     // price.innerHTML = parseInt(price.innerHTML)-parseInt(iprice.innerHTML);
//   }
// }
const dnum = (incdec, price,itemprice,total) => {
  var itemval = document.getElementById(incdec);
  var price = document.getElementById(price);
  var itemprice = document.getElementById(itemprice);
  var total = document.getElementById(total)
  if (itemval.value <= 0 ) {
    itemval.value = 0;
  } else {
    itemval.value = parseInt(itemval.value) - 1;
    // console.log(parseInt(price.innerHTML) - 1);
    price.innerHTML = parseInt(price.innerHTML) - parseInt(itemprice.innerHTML);
    total.innerHTML=parseInt(total.innerHTML)-parseInt(itemprice.innerHTML)
    // parseInt(price.innerHTML)=psreInt(price.value)+900;
    // price.innerHTML = parseInt(price.innerHTML)+parseInt(iprice.innerHTML);
    // itemval.value= parseInt(itemval.value) +1; 
  }
}
const inum = (incdec, price,itemprice,total) => {
  var itemval = document.getElementById(incdec);
  var price = document.getElementById(price);
  var itemprice = document.getElementById(itemprice);
  var total = document.getElementById(total)
  if (itemval.value >= 1000) {
    itemval.value = 1000;
  } else {
    itemval.value = parseInt(itemval.value) + 1;
    // console.log(parseInt(price.innerHTML) + 1);
    price.innerHTML = parseInt(price.innerHTML) + parseInt(itemprice.innerHTML);
    total.innerHTML=parseInt(total.innerHTML)+parseInt(itemprice.innerHTML)
    // parseInt(price.innerHTML)=psreInt(price.value)+900;
    // price.innerHTML = parseInt(price.innerHTML)+parseInt(iprice.innerHTML);
    // itemval.value= parseInt(itemval.value) +1; 
  }
}