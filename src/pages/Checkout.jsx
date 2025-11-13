export default function Checkout() {
  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10">Completar Compra</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* aca va la informacion de lo que va a comprar */}
        <div className="border-2 border-gray-600 dark:bg-gray-900 rounded-lg shadow-lg p-6 space-y-6">
          {/* aca va la informacion del cliente  */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Informacion de Comprador</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-3 py-2 rounded-md dark:bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-3 py-2 rounded-md dark:bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="mt-4 w-full px-3 py-2 rounded-md dark:bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button className="w-full py-3 mt-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md transition-colors">
            Completar Compra 
          </button>
        </div>

        {/* aca va la info del comprador, hay que remplazar lo blanco con los datos de la api*/}
        <div className="border-2 border-gray-600 dark:bg-gray-900 rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Resumen de compra</h2>
          <div className="border-t border-gray-700 pt-3">
            <p className="font-medium dark:text-gray-300">Festival de perdida del 50/50 en viviane 2025</p>
            <p className="dark:text-gray-400 text-sm">1x VIP</p>
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
            <p className="font-semibold dark:text-gray-300">Total</p>
            <p className="text-xl font-bold dark:text-white">$100000</p>
          </div>
        </div>
      </div>
    </div>
  );
}