/* eslint-disable no-undef */
console.log('jhvbk');
document.querySelector('.save').onclick = myClick;
function myClick(){
    console.log('work')
    let a = document.querySelector('.form-styling').value;
    console.log(a);
    document.querySelector('.out').innerHTML += a;
}
$(document).ready(function(){
    $('.b1').click(function() {
        $('.rectangle3').slideToggle();
    });
});