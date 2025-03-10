export default function LoadingScreen({ message = "Carregando..." }: { message?: string }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
          <p className="text-gray-500 mt-2">Por favor, aguarde...</p>
        </div>
      </div>
    );
  }