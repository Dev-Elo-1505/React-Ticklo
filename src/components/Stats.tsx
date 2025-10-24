

const Stats = () => {
  return (
    <div className="p-4 min-h-[80vh] md:px-12 md:py-6">
        <div className="text-md rounded-full px-3 py-1 backdrop-blur-md border border-white/30 text-primary text-center shadow-sm w-32 bg-primaryLight mx-auto">
        Our Stats
      </div>
      <div className="text-center mt-4 text-2xl font-semibold w-3/4 mx-auto">
        <p>our numbers don't lie</p>
      </div>
      <div>
         
        <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-8 md:justify-between">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow w-48 text-center">
                <h3 className="text-4xl font-bold text-primary">1,250</h3>
                <p className="text-gray-primary mt-2">Total Tickets Created</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow w-48 text-center">
                <h3 className="text-4xl font-bold text-primary">300</h3>
                <p className="text-gray-primary mt-2">Open Tickets</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow w-48 text-center">
                <h3 className="text-4xl font-bold text-primary">900</h3>
                <p className="text-gray-primary mt-2">Resolved Tickets</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Stats