
export class ElectedSubject {
    subjectStatus:string;
    subjects: ElectedSubjectList;
    constructor(){
        this.subjects = new ElectedSubjectList;
    }
    
}

export class ElectedSubjectList{
    subId:number;
    subjeceId: number;
    subjectName:string;
    isMandatory:boolean;
}