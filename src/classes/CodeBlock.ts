export class CodeBlock{
    type: number;
    variableName: string;
    variableAssignmentType:number;
    variableAssignment:string;
    key:string;
    constructor(
        type:number,variableName:string,variableAssignmentType:number,variableAssignment:string,key:string
    ){
        this.type = type;
        this.variableName = variableName;
        this.variableAssignmentType = variableAssignmentType;
        this.variableAssignment = variableAssignment;
        this.key = key;
    }

   
}

