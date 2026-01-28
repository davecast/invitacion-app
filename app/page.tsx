export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        src="/back.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
        className="w-full h-full border-0"
        title="PDF Viewer"
      />
    </div>
  );
}
