
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const GOOGLE_CLIENT_ID =
  "332631935257-pghucinnoqca6uds323a9ru2norivd2t.apps.googleusercontent.com";

export default function GoogleLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          await handleLogin(response.credential);
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleLogin = async (idToken) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    if (error) {
      console.error("❌ فشل تسجيل الدخول:", error.message);
    } else {
      const user = data.session.user;

      // ✅ حفظ الجلسة يدويًا
      await supabase.auth.setSession(data.session);

      console.log("بيانات المستخدم:", user);

      // التحقق من وجود المستخدم في profiles
      const { data: existing, error: fetchError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!existing && !fetchError) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          full_name: user.user_metadata.name,
          email: user.email,
          avatar_url: user.user_metadata.avatar_url,
        });

        if (insertError) {
          console.error("❌ فشل إدخال المستخدم:", insertError.message);
        } else {
          console.log("✅ تم حفظ المستخدم الجديد");
        }
      } else {
        console.log("🟢 المستخدم موجود مسبقًا");
      }

      navigate("/chat");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">تسجيل الدخول بواسطة Google</h1>
        <div id="googleSignInDiv"></div>
      </div>
    </div>
  );
}
