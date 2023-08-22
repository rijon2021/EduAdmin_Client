import { MandantorySubject } from "./mandantorySubject";

export class SubjectChoice {
    studentId: number;
    optionalSubject:number;
    mandatorySubjects: MandantorySubject[] = new Array<MandantorySubject>();

}
