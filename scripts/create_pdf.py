import sys, os
from datetime import date, timedelta
from PyQt5.QtWidgets import QApplication
from PyQt5 import QtCore, QtWidgets, QtWebEngineWidgets
from PyQt5.QtCore import QMarginsF
from PyQt5.QtPrintSupport import QPrinter
from PyQt5.QtGui import QPageLayout, QPageSize
from PyPDF2 import PdfFileMerger


root = "https://shici.store/poetry-calendar"

def log(msg):
    print("+ " + msg);


def printPDF(url, margins):
    app = QtWidgets.QApplication(sys.argv)
    loader = QtWebEngineWidgets.QWebEngineView()
    loader.setZoomFactor(1)
    loader.load(QtCore.QUrl(url))
    
    layout = QPageLayout(
        QPageSize(QPageSize.A4),
        QPageLayout.Portrait, QMarginsF(margins[0], margins[1], margins[2], margins[3])
    )
    
    def printFinished():
        page = loader.page()
        page.profile().clearHttpCache()
        log("%s Printing Finished!" % page.title())
        app.exit()
    
    def printToPDF(finished):
        loader.show()
        page = loader.page()
        page.printToPdf("./pdfs/%s.pdf" % page.title(), layout)
    
    
    loader.page().pdfPrintingFinished.connect(printFinished)
    loader.loadFinished.connect(printToPDF)

    app.exec_()


if __name__ == '__main__':
    year = 2019

    d = date(year, 01, 01)

    if not os.path.exists('./pdfs'):
        os.makedirs('./pdfs')
        log("+ Created directory './pdfs';")

    # cover of book
    margins = [0, 0, 0, 0]
    printPDF(root + '/first.html', margins)
    printPDF(root + '/end.html', margins)

    margins = [16, 32, 16, 32]
    while True:
        if d.year > year:
            break    

        url = root + '/?d=' + str(d)
        printPDF(url, margins)
        
        d = d + timedelta(days=7)



    log("+ Merging PDF files;")

    pdfs = [ os.path.join('./pdfs', x) for x in os.listdir('./pdfs') if x.endswith(".pdf") ]

    merger = PdfFileMerger()

    for pdf in pdfs:
        print pdf
        merger.append(open(pdf, 'rb'))

    with open("%s.pdf" % year, "wb") as fout:
        merger.write(fout)

    log("+ Merged! Save as '%s.pdf'" % year)
