import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [navigate]);

  if (loading) return <p style={{ textAlign: "center" }}>جارٍ التحقق...</p>;

  return children;
}
