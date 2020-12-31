class Marks {
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