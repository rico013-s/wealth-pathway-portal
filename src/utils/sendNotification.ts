import { supabase } from "@/integrations/supabase/client";

interface NotificationData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
}

export async function sendLeadNotification(data: NotificationData): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke("send-notification", {
      body: data,
    });
    if (error) {
      console.error("Notification send error:", error);
    }
  } catch (err) {
    console.error("Failed to send notification:", err);
  }
}
