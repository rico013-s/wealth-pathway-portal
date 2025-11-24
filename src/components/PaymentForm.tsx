import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe("pk_test_51SWnVJBPMc5iRlarWAzXwLd79H4hqDuRoNG7Liz67kOhpyVw44gvMJJr62vYtYh1EUe08hX44faYa0d4kbtxe900ksMmQQhV");

const CheckoutForm = ({ onSuccess, amount: defaultAmount }: { onSuccess: () => void; amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(defaultAmount);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create Payment Intent
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { amount }
      });

      if (error) throw error;

      const { clientSecret } = data;

      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        }
      });

      if (stripeError) {
        toast({
          title: "Eroare plată",
          description: stripeError.message,
          variant: "destructive"
        });
      } else if (paymentIntent.status === 'succeeded') {
        toast({
          title: "Plată reușită!",
          description: "Investiția ta a fost procesată cu succes.",
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la procesarea plății.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-input rounded-md bg-background">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: 'hsl(var(--foreground))',
                '::placeholder': {
                  color: 'hsl(var(--muted-foreground))',
                },
              },
            },
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Se procesează...
          </>
        ) : (
          `Plătește ${(amount / 100).toFixed(2)} RON`
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Test card: 4242 4242 4242 4242, any future date, any CVC
      </p>
    </form>
  );
};

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  amount: number;
}

export const PaymentForm = ({ open, onOpenChange, planName, amount: initialAmount }: PaymentFormProps) => {
  const handleSuccess = () => {
    setTimeout(() => {
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Plan {planName}</DialogTitle>
          <DialogDescription>
            Introdu detaliile cardului pentru a finaliza plata
          </DialogDescription>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <CheckoutForm onSuccess={handleSuccess} amount={initialAmount} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};
