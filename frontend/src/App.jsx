import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUp } from "./components/SignUp"
import { SignIn } from "./components/SignIn"
import { Dashboard } from "./pages/Dashboard"
import Authentication from "./pages/Authentication"
import { ProtectedRoute } from "./ProtectedRoute"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>

          }
          />


        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
