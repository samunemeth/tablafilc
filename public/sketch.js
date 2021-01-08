/* Main file */

//varibles
let token = undefined;
let evaluations = undefined;
let marks = undefined;
let timetable = undefined;


/* setting up site */

//autofill username
let user = localStorage.getItem('username');
if (user) { usernameI.val(user); }

//schools select
getInstitutes((res) => {
    //populate
    res.forEach((elem) => {
        schoolS.append($(`<option value="${elem.instituteCode}">${elem.name}</option>`));
    });

    //delete placeloder
    $('#login-placeholder').remove();

    //autofill school if saved
    let scho = localStorage.getItem('school');
    if (scho) {
        schoolS.val(null).val(scho);
    }

    //update
    schoolS.trigger("chosen:updated");
});

//login on button click
loginB.click(() => {
    //reset errors
    error1.css('display', 'none');
    error2.css('display', 'none');

    //get values
    let pass = passwordI.val();
    let user = usernameI.val();
    let scho = schoolS.val();

    //return if something is empty
    if (pass == "" || user == "" || scho == "none") {
        error2.css('display', 'unset');
        return;
    };

    //send request
    getToken(user, pass, scho, () => {
        //save school and username
        localStorage.setItem('username', usernameI.val());
        localStorage.setItem('school', schoolS.val());

        //hide login page, show real page
        loginD.css('display', 'none');
        contentD.css('display', 'flex');

        //get evaluations
        getEvaluations(token, () => {
            //create marks
            marks = new Marks(evaluations);

            //populate
            marks.classes.forEach((elem) => {
                classS.append($(`<option value="${elem.name}">${elem.name}</option>`));
            });

            //delete placeloder
            $('#class-placeholder').remove();
            
            //update
            classS.trigger("chosen:updated");
            updateAvrage();
        });
    });
});

//update
function updateAvrage() {
    if (evaluations) {
        avrageP.text(marks.marks.filter(elem => elem.name == classS.val())[0].avrage);
    } else {
        avrageP.text('Betöltés...');
    }
}

//calculate
calculateB.click(() => {
    //varibles
    let now = marks.marks.filter(elem => elem.name == classS.val())[0].avrage;
    let goal = parseFloat(goalI.val()).toFixed(2);
    let grades = marks.marks.filter(elem => elem.name == classS.val())[0].evaluations;

    //clear errors
    $('#content-1-error-1').css('display', 'none');
    $('#content-1-error-2').css('display', 'none');
    $('#content-1-error-3').css('display', 'none');
    
    //errors
    if (goal <= 1) {
        $('#content-1-error-2').css('display', 'unset');
        return;
    }
    if (goal <= now) {
        $('#content-1-error-3').css('display', 'unset');
        return;
    }
    if (goal >= 5) {
        $('#content-1-error-1').css('display', 'unset');
        return;
    }
    
    //loop throu grades
    for (let i = 1; i <= 5; i++) {
        if (i <= goal) {
            $(`#content-grades-${i}`).css('display', 'none');
            continue;
        }

        let grades_ = [...grades];
        let count = 0;

        while (Marks.avrage(grades_) < goal) {
            grades_.push({
                value: i,
                weight: 1,
            });
            count++;
        }
        
        $(`#content-grades-${i}`).css('display', 'unset');
        $(`#content-grades-${i}-n`).text(count);
    }
});
                                                