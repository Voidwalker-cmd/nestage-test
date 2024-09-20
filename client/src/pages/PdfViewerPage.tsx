import PdfViewer from "./../components/organisms/PdfViewer";

const PdfViewerPage: React.FC = () => {
  const pdfUrl = `${process.env.PUBLIC_URL}/whitepaper.pdf`;

  return (
    <>
      <h1>PDF Viewer</h1>
      <PdfViewer fileUrl={pdfUrl} />
    </>
  );
};

export default PdfViewerPage;
