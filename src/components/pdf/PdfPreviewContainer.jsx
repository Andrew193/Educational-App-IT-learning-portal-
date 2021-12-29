import React, {useState} from "react";
import {Box, Pagination, Paper} from "@mui/material";
import {Document, Page, pdfjs} from "react-pdf";
import style from "./style.module.css"
import Spinner from "../loader/Spinner"


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

function PdfPreviewContainer(props) {
    const {
        pdfFileSrc
    } = props;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    return (
        <Box
            m={3}
            p={3}
        >
            <Paper
                elevation={3}
                variant={"outlined"}
            >
                <Document
                    loading={<Spinner/>}
                    className={style.pdfBasicContainer}
                    file={pdfFileSrc}
                    options={options}
                    onLoadError={(error) => {
                        console.error(error)
                    }}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber || 1} variant="outlined" shape="rounded"/>
                </Document>
                <Box
                    m={1}
                    p={2}
                >
                    <Pagination
                        className={style.pdfBasicContainer}
                        onChange={(event, pageNumber) => {
                            setPageNumber(pageNumber)
                        }}
                        count={numPages}/>
                </Box>
            </Paper>
        </Box>
    )
}

export default PdfPreviewContainer;