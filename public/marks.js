/* for organizing raw evaluations data to a more readable format */

class Marks {
    /* constructor */
    constructor(eval_) {
        //save it
        this.eval = eval_;

        //get marks
        this.marks = [];
        this.eval.forEach((elem) => {
            //add class if needed
            if (this.marks.filter(elem2 => elem2.name == elem.Tantargy.Nev).length == 0) {
                this.marks.push({
                    name: elem.Tantargy.Nev,
                    teacher: elem.ErtekeloTanarNeve,
                    avrage: undefined,
                    evaluations: [],
                });
            }

            //add evaluation if needed
            if (elem.Tipus.Nev == 'evkozi_jegy_ertekeles') {
                this.marks.filter(elem2 => elem2.name == elem.Tantargy.Nev)[0].evaluations.push({
                    value: elem.SzamErtek,
                    weight: elem.SulySzazalekErteke / 100,
                    date: elem.KeszitesDatuma,
                });
            };
        });

        //calculate avrages
        this.marks.forEach((elem) => {
            elem.avrage = Marks.avrage(elem.evaluations);
        });
    }

    /* get */

    //marks
    // get marks() {
    //     //returna copy
    //     return [...this.marks];
    // }

    //classes
    get classes() {
        //create list
        let classes = [];

        //fill list
        this.marks.forEach((elem) => {
            classes.push({
                name: elem.name,
                teacher: elem.teacher,
            });
        });

        //return
        return classes;
    }

    /* set */

    //protection
    // set marks(x) { console.error('This varible is protected!'); };
    // set classes(x) { console.error('This varible is protected!'); };

    /* static */

    //weighted avrage
    static avrage(arr) {
        //varibles
        let sum = 0;
        let wSum = 0;

        //populate
        arr.forEach((elem_) => {
            sum += elem_.value * elem_.weight;
            wSum += elem_.weight;
        });

        //post provess
        let avr = (sum / wSum).toFixed(2);

        //return
        return avr;
    }
}