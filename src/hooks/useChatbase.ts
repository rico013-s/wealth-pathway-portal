import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useChatbase = () => {
  useEffect(() => {
    const initializeChatbase = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.access_token) {
          const { data, error } = await supabase.functions.invoke('generate-chatbot-token', {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });

          if (error) throw error;

          if (data?.token && window.chatbase) {
            window.chatbase('identify', { token: data.token });
          }
        }
      } catch (error) {
        console.error('Error initializing Chatbase:', error);
      }
    };

    initializeChatbase();
  }, []);
};

declare global {
  interface Window {
    chatbase: (command: string, options?: any) => void;
  }
}
