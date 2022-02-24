import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


export abstract class PDFGenerator {

    public static async savePdf(doc: Document) {
        let savePdfURL:string = window.location.protocol + '//' + window.location.host + "/savePDF"
        console.log(savePdfURL)
        let newWindow: Window = window.open(savePdfURL)
        newWindow.document.open();
        newWindow.document.write(doc.documentElement.outerHTML);
        newWindow.document.close();
        /*newWindow.addEventListener('load', async ()=>{
            let canvas: HTMLCanvasElement
            try {
                canvas = await html2canvas(newWindow.document.body)
               
    
            } catch (err: any) {
                console.error(err.toString());
                return
    
            }
            const img = canvas.toDataURL('image/jpeg')
            const pdf = new jsPDF()
            pdf.addImage(img, 'JPEG', 0, 0, canvas.width, canvas.height)
            let output:string = pdf.output()
       

        }, true); 
        */
        

    }
}