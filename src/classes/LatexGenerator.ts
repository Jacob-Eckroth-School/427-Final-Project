import { CodeBlock } from "./CodeBlock"
import { Library } from "./Library"
import { SubRoutine } from "./SubRoutine"

const { parse, HtmlGenerator } = require('latex.js')

//this class is abstract, meaning it cannot be extansiated, you can just call the functions of it. Via LatexGenerator.xxx
export abstract class LatexGenerator {
    public static testLatex: string = "Hi, this is a line of text"

    private static prefix: string = "\\documentclass[a4paper,12pt]{article}\n"
    + ""//"\\usepackage[utf8]{inputenc,setspace,xspace,graphicx,amsmath,amssymb,xcolor}\n" 
  
    private static postfix: string="\\end{document}"


    public static generateTitleLatex(title:string):string{
        return `\\title{${title}}\n`
    }
    public static generateAuthorLatex(author:string):string{
        return `\\author{${author}}\n`
    }
    public static generateStartDocumentLatex():string{
        return `\\begin{document}\n`+
        `\\maketitle\n`
    }
    public static generateDateLatex(): string {
        var today: Date = new Date();
        var dd: string = String(today.getDate()).padStart(2, '0');
        var mm: string = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy:string  = String(today.getFullYear());
        var todayString:string = mm + '/' + dd + '/' + yyyy;
        return `\\date{${todayString}}\n`
    }

    public static generateNewCommandsLatex(): string{
        return ''
    }



    public static createTestLatex(title:string,author:string,library:Library): string {
        let latex = LatexGenerator.prefix + 
        LatexGenerator.generateTitleLatex(title) 
        + LatexGenerator.generateAuthorLatex(author)
        + LatexGenerator.generateDateLatex()
        + LatexGenerator.generateStartDocumentLatex()

        + LatexGenerator.generateLibraryLatex(library)
        +LatexGenerator.postfix
        return latex;

    }

    public static createTestDocument(title:string,author:string,library:Library):Document{
        let latex = LatexGenerator.createTestLatex(title,author,library)
        let generator = new HtmlGenerator({ hyphenate: false })

        let doc = parse(latex, { generator: generator }).htmlDocument()
        doc.head.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js@0.12.4/dist/"))
        doc.head.appendChild(generator.stylesAndScripts(""))
        doc.body.appendChild(generator.domFragment())
     

        return doc
    }


    public static generateLibraryLatex(library:Library):string{
        return `\\begin{tabbing}\n`
        +`${library.name}\n`
        + `\\end{tabbing}\n`
    }
    public static generateSubRoutineLatex(subRoutine:SubRoutine):string{
        return ""
    }
    public static generateCodeBlockLatex(codeBlock:CodeBlock):string{
        return ""
    }
}