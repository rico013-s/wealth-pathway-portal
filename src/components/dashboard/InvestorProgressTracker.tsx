import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CheckCircle2, Lock, UserCheck, Target, Sparkles, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { sendLeadNotification } from '@/utils/sendNotification';
import SalesFlowApp from '@/components/SalesFlowApp';

interface InvestorProgressTrackerProps {
  userId: string;
  profile: any;
}

interface UserInvestorProfile {
  classification: string;
  score: number;
  qualified_at: string;
  resources_viewed: number;
}

const classificationMap: Record<string, { label: string; emoji: string; color: string; bgColor: string; borderColor: string }> = {
  'INCEPATOR': { label: 'Investitor la Început', emoji: '🟢', color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' },
  'INTERMEDIAR': { label: 'Investitor în Creștere', emoji: '🟡', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' },
  'AVANSAT': { label: 'Investitor Activ', emoji: '🔴', color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' },
};

const InvestorProgressTracker: React.FC<InvestorProgressTrackerProps> = ({ userId, profile }) => {
  const [investorProfile, setInvestorProfile] = useState<UserInvestorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  useEffect(() => {
    fetchInvestorProfile();
  }, [userId]);

  const fetchInvestorProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!error && data) {
        setInvestorProfile(data as UserInvestorProfile);
      }
    } catch (err) {
      console.error('Error fetching investor profile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate steps
  const step1 = true; // Always completed if logged in
  const step2 = !!(profile?.first_name?.trim() && profile?.last_name?.trim() && profile?.phone?.trim() && profile?.email?.trim());
  const step3 = !!investorProfile?.classification;
  const step4 = step3 && (investorProfile?.resources_viewed ?? 0) > 0;

  const completedSteps = [step1, step2, step3, step4].filter(Boolean).length;
  const progressPercent = completedSteps * 25;

  const classInfo = step3 ? classificationMap[investorProfile?.classification || ''] : null;

  // Listen for qualification completion via postMessage or polling
  useEffect(() => {
    if (!chatbotOpen) return;
    
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (data && !investorProfile?.classification) {
        setInvestorProfile(data as UserInvestorProfile);
        setChatbotOpen(false);
        
        // Send email notification
        sendLeadNotification({
          name: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim(),
          email: profile?.email || '',
          phone: profile?.phone || undefined,
          message: `Clasificare: ${data.classification} | Scor: ${data.score}`,
          source: `🎯 Profil identificat — ${data.classification}`,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [chatbotOpen, investorProfile, userId]);

  const handleMarkResourceViewed = async () => {
    if (!investorProfile) return;
    const { error } = await supabase
      .from('user_profiles')
      .update({ resources_viewed: (investorProfile.resources_viewed || 0) + 1 })
      .eq('user_id', userId);
    
    if (!error) {
      setInvestorProfile(prev => prev ? { ...prev, resources_viewed: (prev.resources_viewed || 0) + 1 } : prev);
    }
  };

  const steps = [
    {
      label: 'Cont creat',
      completed: step1,
      icon: UserCheck,
      locked: false,
    },
    {
      label: 'Profil completat',
      completed: step2,
      icon: UserCheck,
      locked: false,
    },
    {
      label: 'Profil investitor identificat',
      completed: step3,
      icon: Target,
      locked: false,
      cta: !step3,
    },
    {
      label: 'Acces personalizat activ',
      completed: step4,
      icon: Sparkles,
      locked: !step3,
    },
  ];

  if (loading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-800 rounded w-1/3" />
            <div className="h-2 bg-gray-800 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Progresul tău</h3>
              <p className="text-sm text-gray-400">
                {progressPercent === 100 
                  ? 'Felicitări! Ai completat toate etapele.' 
                  : 'Completează etapele pentru experiență personalizată'}
              </p>
            </div>
            <span className="text-2xl font-bold" style={{ color: '#CDA144' }}>{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-800 rounded-full mb-6 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #CDA144, #E8C76A)' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    step.completed
                      ? 'bg-green-900/20 border-green-500/30'
                      : step.locked
                      ? 'bg-gray-800/50 border-gray-700/50 opacity-50'
                      : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {step.completed ? (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#CDA144' }} />
                    ) : step.locked ? (
                      <Lock className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <div className="relative h-5 w-5 flex-shrink-0 flex items-center justify-center">
                        <div className="absolute w-3 h-3 rounded-full animate-pulse" style={{ background: '#CDA144' }} />
                        <div className="absolute w-3 h-3 rounded-full opacity-50 animate-ping" style={{ background: '#CDA144' }} />
                      </div>
                    )}
                    <div>
                      <span className={`text-sm font-medium ${step.locked ? 'text-gray-500' : 'text-gray-200'}`}>
                        {step.completed ? '✅' : step.locked ? '🔒' : '⏳'} {step.label}
                      </span>
                      {/* Classification badge after step 3 */}
                      {index === 2 && step.completed && classInfo && (
                        <div className="mt-1">
                          <Badge className={`${classInfo.bgColor} ${classInfo.color} ${classInfo.borderColor} border text-xs`}>
                            {classInfo.emoji} {classInfo.label}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA for Step 3 */}
                  {index === 2 && step.cta && (
                    <Button
                      size="sm"
                      className="text-black font-semibold text-xs"
                      style={{ background: '#CDA144' }}
                      onClick={() => setChatbotOpen(true)}
                    >
                      Identifică-ți profilul <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}

                  {/* CTA for Step 4 when step 3 is done but 4 is not */}
                  {index === 3 && step3 && !step4 && (
                    <Button
                      size="sm"
                      className="text-black font-semibold text-xs"
                      style={{ background: '#CDA144' }}
                      onClick={handleMarkResourceViewed}
                    >
                      Vezi recomandările tale <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Subtext */}
          {!step3 && (
            <p className="text-xs text-gray-500 text-center mt-4">
              Durează 2 minute · Gratuit · Personalizat pentru tine
            </p>
          )}

          {/* Personalized message after classification */}
          {step3 && classInfo && (
            <div className={`mt-4 p-3 rounded-lg border ${classInfo.bgColor} ${classInfo.borderColor}`}>
              <p className={`text-sm ${classInfo.color}`}>
                {investorProfile?.classification === 'INCEPATOR' && '🎓 Ai fost identificat ca investitor la început. Îți recomandăm cursurile de bază pentru a construi o fundație solidă.'}
                {investorProfile?.classification === 'INTERMEDIAR' && '📈 Profilul tău arată potențial de creștere. Explorează strategiile avansate recomandate pentru tine.'}
                {investorProfile?.classification === 'AVANSAT' && '🏆 Ești un investitor experimentat. Accesează instrumentele premium și consultanța personalizată.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SalesFlow Chatbot Modal */}
      <Dialog open={chatbotOpen} onOpenChange={setChatbotOpen}>
        <DialogContent className="max-w-2xl h-[80vh] p-0 bg-white border-none overflow-hidden">
          <SalesFlowApp />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvestorProgressTracker;
