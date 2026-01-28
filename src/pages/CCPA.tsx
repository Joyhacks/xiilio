import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CCPA() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Privacy page CCPA section
    navigate("/privacy#ccpa", { replace: true });
  }, [navigate]);

  return null;
}
