
import { BrowserRouter, Routes, Route, Navigate, RouterProps } from "react-router";
import { Home, LogIn, Profile, Chat, Onboarding } from "@/pages";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, setUserInfo } from "@/state/slices/authSlice";
import { useEffect, useState } from "react";
import { useGetUserInfoQuery } from "@/state/api/authApi";
import PuffLoader from "react-spinners/PuffLoader";

/**
 * redirects to auth page if user is not authenticated
 */
const PrivateRoute = ({ children }: any): any => {
  const userInfo = useSelector(selectUserInfo);
  return userInfo ? children : <Navigate to="/login"/>;
}

/**
 * redirects to chat page if user is already authenticated
 */
const AuthRoute = ({ children }: any): any => {
  const userInfo = useSelector(selectUserInfo);
  return userInfo ? <Navigate to="/chat"/> : children;
}

function App() {
  const { data, error, isLoading } = useGetUserInfoQuery({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data.user));
      setLoading(false);
    } else if (error) {
      setLoading(false);
    }
  }, [data, error, dispatch]);

  if (loading) {
    return (
      <div className="h-full w-full flex place-items-center justify-center">
        <PuffLoader color={"blue"} size={100} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<Onboarding />} />
        <Route path="/login" element={<AuthRoute><LogIn /></AuthRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
