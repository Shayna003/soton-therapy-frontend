
import { BrowserRouter, Routes, Route } from "react-router";
import { Home, LogIn } from "@/pages";
import { Onboarding } from "@/pages";

/**
 * redirects to auth page if user is not authenticated
 */
const PrivateRoute = () => {

}

/**
 * redirects to chat page if user is already authenticated
 */
const AuthRoute = () => {

}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<Onboarding />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
