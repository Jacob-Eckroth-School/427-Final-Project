export class CodeBlock{
    type: number;
    variableName: string;
    variableAssignmentType:number;
    variableAssignment:string;
    key:string;
    constructor(
        type,variableName,variableAssignmentType,variableAssignment,key
    ){
        this.type = type;
        this.variableName = variableName;
        this.variableAssignmentType = variableAssignmentType;
        this.variableAssignment = variableAssignment;
        this.key = key;
    }

   
}

