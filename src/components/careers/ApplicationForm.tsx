
import React, { useState, useRef } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, FileText, Upload } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Define form schema with validation
const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Numele trebuie să conțină cel puțin 3 caractere.",
  }),
  email: z.string().email({
    message: "Te rugăm să introduci o adresă de email validă.",
  }),
  phone: z.string().min(10, {
    message: "Te rugăm să introduci un număr de telefon valid.",
  }),
  experience: z.string().min(10, {
    message: "Te rugăm să oferi detalii despre experiența ta.",
  }),
  motivation: z.string().min(10, {
    message: "Te rugăm să ne spui de ce dorești să lucrezi cu noi.",
  }),
  cv: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "CV-ul este obligatoriu.")
    .refine(
      (files) => {
        if (files.length === 0) return true;
        const file = files[0];
        const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        return validTypes.includes(file.type);
      },
      "Formatul fișierului trebuie să fie PDF, DOC sau DOCX."
    )
    .refine(
      (files) => {
        if (files.length === 0) return true;
        const file = files[0];
        const maxSize = 10 * 1024 * 1024; // 10MB
        return file.size <= maxSize;
      },
      "Dimensiunea fișierului nu trebuie să depășească 10MB."
    ),
});

type FormValues = z.infer<typeof formSchema>;

// Email receiving the applications
const RECIPIENT_EMAIL = "armancristian96@gmail.com";

const ApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      motivation: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Get CV file information
      const cvFile = values.cv[0];
      const fileName = cvFile.name;
      const fileType = cvFile.type;
      const fileSize = Math.round(cvFile.size / 1024); // Convert to KB
      
      // Create subject line
      const subject = `[Aplicare Job] ${values.fullName}`;
      
      // Create email body with important information
      const body = `
Nume: ${values.fullName}
Email: ${values.email}
Telefon: ${values.phone}

Experiență profesională:
${values.experience}

Motivație:
${values.motivation}

Informații despre CV:
Nume fișier: ${fileName}
Tip: ${fileType}
Dimensiune: ${fileSize} KB

Notă: Acest email a fost generat automat. CV-ul nu este atașat direct din motive de securitate.
Contactați aplicantul la ${values.email} pentru a solicita CV-ul.
`;

      // Create and open mailto link
      const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink);
      
      // Store in local storage for your record (can be checked in admin section)
      saveApplicationToLocalStorage(values, fileName);
      
      toast({
        title: "Aplicare trimisă cu succes!",
        description: "Te vom contacta în curând pentru următoarele etape.",
      });
      
      // Reset form
      form.reset();
      setFileName("");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      
      toast({
        variant: "destructive",
        title: "A apărut o eroare",
        description: "Nu am putut procesa aplicarea ta. Te rugăm să încerci din nou sau să ne contactezi direct.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save application to local storage for admin reference
  const saveApplicationToLocalStorage = (values: FormValues, fileName: string) => {
    const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    
    applications.push({
      id: Date.now(),
      date: new Date().toISOString(),
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      experience: values.experience,
      motivation: values.motivation,
      cvFileName: fileName,
    });
    
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    console.log("Application saved to local storage");
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    } else {
      setFileName("");
    }
  };

  return (
    <div id="apply" className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Aplică pentru o poziție</h2>
      
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gold-500" />
                  Nume complet
                </FormLabel>
                <FormControl>
                  <Input placeholder="Introdu numele tău complet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gold-500" />
                  Adresă de email
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="exemplu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gold-500" />
                  Telefon
                </FormLabel>
                <FormControl>
                  <Input placeholder="07XX XXX XXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gold-500" />
                  Experiență profesională
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descrie pe scurt experiența ta profesională..." 
                    className="min-h-32" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="motivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gold-500" />
                  De ce vrei să lucrezi cu noi?
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Spune-ne de ce dorești să faci parte din echipa noastră..." 
                    className="min-h-32" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cv"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-gold-500" />
                  Încarcă CV-ul tău
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-3">
                    <div className="relative">
                      <Input
                        type="file"
                        className="hidden"
                        id="cv-upload"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleFileChange(e);
                        }}
                        {...field}
                      />
                      <label
                        htmlFor="cv-upload"
                        className="flex items-center justify-center gap-2 h-10 px-4 py-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-md cursor-pointer transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        <span>{fileName || "Alege fișier..."}</span>
                      </label>
                    </div>
                    <FormDescription className="text-xs">
                      Fișiere acceptate: PDF, DOC, DOCX. Dimensiune maximă: 10MB.
                    </FormDescription>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-gold-500 hover:bg-gold-600 text-black font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-black rounded-full"></div>
                Se trimite...
              </>
            ) : (
              "Trimite aplicarea"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
