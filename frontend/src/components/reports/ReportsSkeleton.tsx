export default function ReportsSkeleton() {
  return (
    
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 lg:p-8 animate-pulse">
      
     
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-2 flex-1">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="h-4 w-72 rounded-lg bg-gray-200" />
        </div>
        <div className="h-10 w-56 rounded-lg bg-gray-200" />
      </div>

    
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-32 rounded-xl border border-gray-100 bg-gray-50 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-3 w-3 rounded-full bg-gray-200" />
            </div>
            <div className="h-8 w-16 rounded bg-gray-200 mt-2" />
          </div>
        ))}
      </div>

      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 h-96 rounded-xl border border-gray-100 bg-gray-50" />
        <div className="lg:col-span-1 h-96 rounded-xl border border-gray-100 bg-gray-50" />
      </div>

    </div>
  );
}
