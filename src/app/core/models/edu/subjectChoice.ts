export class SubjectChoice {
    studentId: number;
    mandantorySubject: MandantorySubject;
    optionalSubject: OptionalSubject;

    constructor(){
        this.mandantorySubject = new MandantorySubject();
        this.optionalSubject = new OptionalSubject();
    }
}
export class MandantorySubject {
    subjeceId: number;
    subjectName: string;
    isChecked: boolean;
    
}
export class OptionalSubject {
    subjeceId: number;
    subjectName: string;
    
}
