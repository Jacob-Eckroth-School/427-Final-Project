import { typeOfCodeLine, variableAssignmentTypes } from "../constants/variableAssignmentTypes";
import { CodeBlock } from "./CodeBlock";
import { Library } from "./Library";
import { SubRoutine } from "./SubRoutine";




export function getHw2_2Library(): Library {
    var hw2_2Library: Library = new Library(
        "Sigma^2", 1,
        []
    );

    hw2_2Library.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "K", variableAssignmentTypes.VARIABLE, "(Sigma.K)^2", "KeyAssignment"))
    hw2_2Library.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "M", variableAssignmentTypes.VARIABLE, "Sigma.M", "MAssignment"))
    hw2_2Library.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "C", variableAssignmentTypes.VARIABLE, "Sigma.C", "CAssignment"))
    var keyGen: SubRoutine = new SubRoutine("Sigma^2", "KeyGen", [], [])
    keyGen.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "k1", variableAssignmentTypes.USER_INPUTED_VALUE, "Sigma.K", "firstKAssignment"))
    keyGen.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "k2", variableAssignmentTypes.USER_INPUTED_VALUE, "Sigma.K", "secondKAssignment"))
    keyGen.addNewCodeBlock(new CodeBlock(typeOfCodeLine.RETURN_STATEMENT, "", variableAssignmentTypes.VARIABLE, "", "returnSTatementKeyGen",["k1","k2"]))
    hw2_2Library.addSubRoutine(keyGen);

    var enc: SubRoutine = new SubRoutine("Sigma^2", "Enc", [
    ], ["k1", "k2", "m"])
    enc.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "c1", variableAssignmentTypes.USER_INPUTED_VALUE, "Sigma.Enc(k1,m)", "FirstEnc"))
    enc.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "c2", variableAssignmentTypes.USER_INPUTED_VALUE, "Sigma.Enc(k2,m)", "SecondEnc"))
    enc.addNewCodeBlock(new CodeBlock(typeOfCodeLine.RETURN_STATEMENT, "", variableAssignmentTypes.VARIABLE, "", "returnStatementEnc",["c1","c2"]))
    hw2_2Library.addSubRoutine(enc);

    var dec: SubRoutine = new SubRoutine("Sigma^2", "Dec", [
    ], ["k1", "k2", "c1", "c2"])
    dec.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "m1", variableAssignmentTypes.USER_INPUTED_VALUE, "Sigma.Dec(k1,c1)", "FirstDec"))
    dec.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "m2", variableAssignmentTypes.USER_INPUTED_VALUE, "Sigma.Dec(k2,c2)", "SecondDec"))
    dec.addNewCodeBlock(new CodeBlock(typeOfCodeLine.RETURN_STATEMENT, "", variableAssignmentTypes.VARIABLE, "m1", "returnStatementDec",["m1","m2"]))

    hw2_2Library.addSubRoutine(dec)


    return hw2_2Library;
}