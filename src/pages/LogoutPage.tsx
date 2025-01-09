import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { logoutUser } from "../slices/authSlice";
import Loader from "../components/common/Loader";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(-1) || navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) return <Loader />;

  return null;
};

export default LogoutPage;
