import { CodeBlock } from "./CodeBlock"
import { Library } from "./Library"
import { SubRoutine } from "./SubRoutine"

const { parse, HtmlGenerator } = require('latex.js')

//this class is abstract, meaning it cannot be extansiated, you can just call the functions of it. Via LatexGenerator.xxx
export abstract class LatexGenerator {
    public static testLatex: string = "Hi, this is a line of text"

    private static getPrefix(): string {
        return "\\documentclass[]{article}\n"
            + "\\usepackage[T1]{fontenc}\n"
            + "\\usepackage{setspace}\n"
            + "\\usepackage{xspace}\n"
            + "\\usepackage{graphicx}\n"
            + "\\usepackage{ifxetex,ifluatex}\n"
            + "\\usepackage{amsmath,amssymb}\n"
            + "\\usepackage{xcolor}\n"
    }


    private static getApiGarbage(): string {
        return "\\usepackage{fixltx2e} % provides \\textsubscript\n"
            + "% use microtype if available\n"
            + "\\IfFileExists{microtype.sty}{\\usepackage{microtype}}{}\n"
            + "\\ifnum 0\\ifxetex 1\\fi\\ifluatex 1\\fi=0 % if pdftex\n"
            + "  \\usepackage[utf8]{inputenc}\n"
            + "\\else % if luatex or xelatex\n"
            + "  \\usepackage{fontspec}\n"
            + "  \\ifxetex\n"
            + "    \\usepackage{xltxtra,xunicode}\n"
            + "  \\fi\n"
            + "  \\defaultfontfeatures{Mapping=tex-text,Scale=MatchLowercase}\n"
            + "  \\newcommand{\\euro}{€}\n"
            + "\\fi\n"
            + "\\usepackage[a4paper]{geometry}\n"
            + "\\ifxetex\n"
            + "  \\usepackage[setpagesize=false, % page size defined by xetex\n"
            + "              unicode=false, % unicode breaks when used with xetex\n"
            + "              xetex]{hyperref}\n"
            + "\\else\n"
            + "  \\usepackage[unicode=true]{hyperref}\n"
            + "\\fi\n"
            + "\\hypersetup{breaklinks=true,\n"
            + "            pdfauthor={},\n"
            + "            pdftitle={},\n"
            + "            colorlinks=true,\n"
            + "            urlcolor=blue,\n"
            + "            linkcolor=magenta,\n"
            + "            pdfborder={0 0 0}}\n"
            + "\\setlength{\\parindent}{0pt}\n"
            + "\\setlength{\\parskip}{6pt plus 2pt minus 1pt}\n"
            + "\\setlength{\\emergencystretch}{3em}  % prevent overfull lines\n"
            + "\\setcounter{secnumdepth}{0}\n\n"
    }



    private static postfix: string = "\\end{document}"


    public static generateTitleLatex(title: string): string {
        return `\\title{${title}}\n`
    }
    public static generateAuthorLatex(author: string): string {
        return `\\author{${author}}\n`
    }
    public static generateStartDocumentLatex(): string {
        return `\\begin{document}\n` +
            `\\maketitle\n`
    }

    public static generateDateLatex(): string {
        var today: Date = new Date();
        var dd: string = String(today.getDate()).padStart(2, '0');
        var mm: string = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy: string = String(today.getFullYear());
        var todayString: string = mm + '/' + dd + '/' + yyyy;
        return `\\date{${todayString}}\n`
    }

    public static generateMikeCommandsLatex(): string {
        return '\\newcommand{\\pct}{\\mathbin{\\%}}\n'
            + '% makes ":=" aligned better\n'
            + '\\usepackage{mathtools}\n'
            + '\\mathtoolsset{centercolon}\n'
            + '% indistinguishability operator\n'
            + '% http://tex.stackexchange.com/questions/22168/triple-approx-and-triple-approx-with-a-straight-middle-line\n'

            + "\\newcommand{\\indist}{  \\mathrel{\\vcenter{\\offinterlineskip\n"
            + "  \\hbox{$\\sim$}\\vskip-.35ex\\hbox{$\\sim$}\\vskip-.35ex\\hbox{$\\sim$}}}}\n"
            + "\\renewcommand{\\cong}{\\indist}\n\n\n\n"

            + "\\newcommand{\\K}{\\mathcal{K}}\n"
            + "\\newcommand{\\M}{\\mathcal{M}}\n"
            // + "\\newcommand{\\C}{\\mathcal{C}}\n"
            + "\\newcommand{\\Z}{\\mathbb{Z}}\n\n"

            + "\\newcommand{\\Enc}{\\text{\\sf Enc}}\n"
            + "\\newcommand{\\Dec}{\\text{\\sf Dec}}\n"
            + "\\newcommand{\\KeyGen}{\\text{\\sf KeyGen}}\n\n"
            + "% fancy script L\n"
            + "\\usepackage[mathscr]{euscript}\n"
            + "\\renewcommand{\\L}{\\ensuremath{\\mathscr{L}}\\xspace}\n"
            + "\\newcommand{\\lib}[1]{\\ensuremath{\\L_{\\textsf{#1}}}\\xspace}\n\n\n"

            + "\\newcommand{\\myterm}[1]{\\ensuremath{\\text{#1}}\\xspace}\n"
            + "\\newcommand{\\bias}{\\myterm{bias}}\n"
            + "\\newcommand{\\link}{\\diamond}\n"
            + "\\newcommand{\\subname}[1]{\\ensuremath{\\textsc{#1}}\\xspace}\n\n\n\n"


            + "%% colors\n"
            + "\\definecolor{highlightcolor}{HTML}{F5F5A4}\n"
            + "\\definecolor{highlighttextcolor}{HTML}{000000}\n"
            + "\\definecolor{bitcolor}{HTML}{a91616}\n\n\n"

            + "%%% boxes for writing libraries/constructions\n"
            + "\\usepackage{varwidth}\n\n"
            + "\\newcommand{\\codebox}[1]{%\n"
            + "        \\begin{varwidth}{\\linewidth}%\n"
            + "        \\begin{tabbing}%\n"
            + "            ~~~\\=\\quad\\=\\quad\\=\\quad\\=\\kill % initialize tabstops\n"
            + "            #1\n"
            + "        \\end{tabbing}%\n"
            + "        \\end{varwidth}%\n"
            + "}\n"



            + "\\newcommand{\\titlecodebox}[2]{%\n"
            + "    \\fboxsep=0pt%\n"
            + "    \\fcolorbox{black}{black!10}{%\n"
            + "        \\begin{varwidth}{\\linewidth}%\n"
            + "        \\centering%\n"
            + "        \\fboxsep=3pt%\n"
            + "        \\colorbox{black!10}{#1} \\\\\n"
            + "        \\colorbox{white}{\\codebox{#2}}%\n"
            + "        \\end{varwidth}%\n"
            + "    }\n"
            + "}\n"
            + "\\newcommand{\\fcodebox}[1]{%\n"
            + "    \\framebox{\\codebox{#1}}%\n"
            + "}\n"
            + "\\newcommand{\\hlcodebox}[1]{%\n"
            + "    \\fcolorbox{black}{highlightcolor}{\\codebox{#1}}%\n"
            + "}\n"
            + "\\newcommand{\\hltitlecodebox}[2]{%\n"
            + "    \\fboxsep=0pt%\n"
            + "    \\fcolorbox{black}{black!15!highlightcolor}{%\n"
            + "        \\begin{varwidth}{\\linewidth}%\n"
            + "        \\centering%\n"
            + "        \\fboxsep=3pt%\n"
            + "        \\colorbox{black!15!highlightcolor}{\\color{highlighttextcolor}#1} \\\\\n"
            + "        \\colorbox{highlightcolor}{\\color{highlighttextcolor}\codebox{#2}}%\n"
            + "        \\end{varwidth}%\n"
            + "    }\n"
            + "}\n"
            + "%% highlighting\n"
            + "\\newcommand{\\basehighlight}[1]{\\colorbox{highlightcolor}{\\color{highlighttextcolor}#1}}\n"
            + "\\newcommand{\\mathhighlight}[1]{\\basehighlight{$#1$}}\n"
            + "\\newcommand{\\highlight}[1]{\\raisebox{0pt}[-\\fboxsep][-\\fboxsep]{\\basehighlight{#1}}}\n"
            + "\\newcommand{\\highlightline}[1]{%\\raisebox{0pt}[-\\fboxsep][-\\fboxsep]{\n"
            + "    \\hspace*{-\\fboxsep}\\basehighlight{#1}%\n"
            + "%}\n"
            + "}\n\n"
            + "%% bits\n"
            + "\\newcommand{\\bit}[1]{\\textcolor{bitcolor}{\\texttt{\\upshape #1}}}\n"
            + "\\newcommand{\\bits}{\\{\\bit0,\\bit1\\}}\n\n\n"

    }



    public static createTestLatex(title: string, author: string, library: Library): string {
        let latex: string = LatexGenerator.getPrefix()
            + LatexGenerator.getApiGarbage()
            + LatexGenerator.generateMikeCommandsLatex()
            + LatexGenerator.generateAuthorLatex(author)
            + LatexGenerator.generateDateLatex()
            + LatexGenerator.generateTitleLatex(title)
            + LatexGenerator.generateStartDocumentLatex()
            + LatexGenerator.generateLibraryLatex(library)
            + LatexGenerator.postfix

        return encodeURIComponent(latex);   //encodeURIComponent is to convert the scary characters to friendly characters

    }




    public static generateLibraryLatex(library: Library): string {
        return `    \\[\n`
            + `            \\titlecodebox{$${library.name}$}{\n`
            + `                $k \\gets \\Sigma.\\KeyGen$ \\\\[8pt]\n\n`
            + `                \\underline{$\\subname{challenge}(m_L, m_R)$:} \\\\\n`
            + `                \\> $c := \\Sigma.\\Enc(k,\\mathhighlight{m_L})$ \\\\\n`
            + `                \\> return $c$\n`
            + `            }\n`
            + `    \\]\n`
            + `%\n`


    }
    public static generateSubRoutineLatex(subRoutine: SubRoutine): string {
        return ""
    }
    public static generateCodeBlockLatex(codeBlock: CodeBlock): string {
        return ""
    }
}