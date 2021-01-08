/* for collecting all dom elements */

/* login */

//varibles
let loginD = $('.login-background');
let loginB = $('#login-button');
let passwordI = $('#password');
let usernameI = $('#username');
let schoolS = $('#school');
let error1 = $('#login-error-1');
let error2 = $('#login-error-2');

//select2
$(".chosen-select").select2();

//click button on enter
function clickLoginB(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        loginB.click();
    }
}
passwordI.on("keyup", clickLoginB);
usernameI.on("keyup", clickLoginB);

/* content */

//varibles
let contentD = $('.content-background');
let classS = $('#class');
let goalI = $('#goal');
let calculateB = $('#calculate');
let avrageP = $('#avrage');

//navbar
function activate(id) {
    $('.active').removeClass('active');
    $(`#content-navbar-${id}`).addClass('active');
    $('.content').css('display', 'none');
    $(`#content-${id}`).css('display', 'flex');
}