export default function Home() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/back.pdf"
        className="w-full h-full border-0"
        title="PDF Viewer"
      />
    </div>
  );
}
