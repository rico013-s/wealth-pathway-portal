
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, TrendingUp, DollarSign } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="contact" className="py-20 hero-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Investment Match?</h2>
            <p className="text-lg mb-8 text-gray-100 max-w-xl">
              Our expert consultants will analyze your financial goals, risk tolerance, and resources to connect you with the perfect investment partner.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
                  <p className="text-gray-200">Get customized investment options based on your unique financial situation and goals.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
                  <p className="text-gray-200">Our consultancy service is completely transparent with no hidden costs or obligations.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-6">
                <Tabs defaultValue="consult">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="consult">Request Consultation</TabsTrigger>
                    <TabsTrigger value="match">Quick Match</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="consult" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="First Name" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                      <Input placeholder="Last Name" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                    </div>
                    <Input placeholder="Email Address" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                    <Input placeholder="Phone Number" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                    <Textarea placeholder="Tell us about your investment goals..." className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" rows={4} />
                    <Button className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold">
                      Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="match" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm">Investment Amount</label>
                        <Input placeholder="$1,000" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Risk Tolerance</label>
                        <select className="w-full bg-white/10 border-white/20 text-white rounded-md p-2">
                          <option value="low">Conservative</option>
                          <option value="medium">Moderate</option>
                          <option value="high">Aggressive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Investment Experience</label>
                        <select className="w-full bg-white/10 border-white/20 text-white rounded-md p-2">
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Email Address</label>
                        <Input placeholder="your@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                      </div>
                    </div>
                    <Button className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold">
                      Find My Match <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
