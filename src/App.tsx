import Home from "./Pages/Home"
import { Toaster } from 'sonner';

const App = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Toaster richColors position="top-center" />
      <Home/>
    </div>
  )
}

export default App