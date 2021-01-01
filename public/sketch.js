/* Main file */

//varibles
let token = undefined;
let evaluations = undefined;
let timetable = undefined;

//login on button click
loginB.click(() => {
    //get values
    let pass = passwordI.val();
    let user = usernameI.val();
    let scho = schoolS.val();

    //return if something is empty
    if (pass == "" || user == "" || scho == "none") {
        console.error('please select values!');
        return;
    };

    //send request
    getToken(user, pass, scho, (res) => {
        $('.login-background').hide();
        console.log(res);
    });
});

//poulate schools
getInstitutes((res) => {
    res.forEach((elem) => {
        schoolS.append($(`<option value="${elem.instituteCode}">${elem.name}</option>`));
    });
    $(".chosen-select").trigger("chosen:updated");
});