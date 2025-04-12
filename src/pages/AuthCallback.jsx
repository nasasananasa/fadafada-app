
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });

      if (error) {
        console.error('❌ خطأ في استرجاع الجلسة:', error.message);
      } else {
        console.log('✅ تم تسجيل الدخول بنجاح:', data?.session?.user?.email);
        navigate('/chat');
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div className="p-6 text-center text-lg">
      جارٍ تسجيل الدخول... يُرجى الانتظار.
    </div>
  );
}
