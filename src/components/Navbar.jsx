import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold text-blue-600">فضفضة</h1>
      <div className="flex items-center space-x-4">
        <Link to="/chat" className="text-gray-700 hover:text-blue-500 font-medium">
          الدردشة
        </Link>
        <Link to="/users" className="text-gray-700 hover:text-blue-500 font-medium">
          المستخدمون
        </Link>
        {user && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">{user.user_metadata?.full_name}</span>
            <img
              src={user.user_metadata?.avatar_url}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          تسجيل الخروج
        </button>
      </div>
    </nav>
  );
}
