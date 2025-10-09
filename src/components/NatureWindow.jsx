export default function NatureWindow() {
  return (
    <div className="relative w-full max-w-[500px] h-[85vh] mx-auto perspective-1000">
      <div className="absolute inset-0 rounded-3xl border-8 border-brown-700 shadow-xl bg-transparent z-0"></div>
      <div className="absolute top-4 left-4 right-4 bottom-4 rounded-2xl border-4 border-brown-500 shadow-inner bg-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-brown-600 rounded-b-xl shadow-md z-20">
      </div>
      <div className="absolute inset-4 z-15">
        <h1>      This Website is Not done!</h1>
        <h1>      This will be a window.... soon</h1>
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-brown-500"></div>
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-brown-500"></div>
      </div>
    </div>
  );
}
