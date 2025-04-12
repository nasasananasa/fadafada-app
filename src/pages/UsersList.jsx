// src/pages/UsersList.jsx

import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import Navbar from "../components/Navbar";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, avatar_url");

    if (error) {
      console.error("فشل في جلب المستخدمين:", error.message);
    } else {
      setUsers(data);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          قائمة المستخدمين
        </h1>

        {loading ? (
          <p className="text-center">جاري التحميل...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">لا يوجد مستخدمون بعد.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow p-4 text-center"
              >
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h2 className="text-lg font-semibold">{user.full_name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
