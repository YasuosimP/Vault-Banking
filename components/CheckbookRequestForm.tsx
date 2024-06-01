"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createCheckbookRequest } from "@/lib/actions/checkbook.actions"; // Update this with the correct action
import { getBank } from "@/lib/actions/user.actions";
import { BankDropdown } from "./BankDropdown";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog"; 

const formSchema = z.object({
  account: z.string(),
  checkbookCount: z.string().min(1, "Veuillez indiquer le nombre de carnets de chèques nécessaires."),
  deliveryAddress: z.string().min(10, "L'adresse est trop courte."),
  notes: z.string().optional(),
});

const CheckbookRequestForm = ({ accounts }: CheckbookRequestProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false); 

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
      checkbookCount: "",
      deliveryAddress: "",
      notes: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const requestParams = {
        bankId: data.account,
        checkbookCount: data.checkbookCount,
        deliveryAddress: data.deliveryAddress,
        notes: data.notes || "", // Ensure that 'notes' is always a string
        createdAt: new Date().toISOString(), // Add the missing 'createdAt' property
      };

      const newRequest = await createCheckbookRequest(requestParams);
      setIsAlertOpen(true); // Show AlertDialog on successful submission
    } catch (error) {
      console.error("Submitting checkbook request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
          <FormField
            control={form.control}
            name="account"
            render={() => (
              <FormItem className="border-t border-gray-200">
                <div className="payment-transfer_form-item pb-6 pt-5">
                  <div className="payment-transfer_form-content">
                    <FormLabel className="text-14 font-medium text-gray-700">
                      Sélectionnez le compte associé
                    </FormLabel>
                    <FormDescription className="text-12 font-normal text-gray-600">
                      Sélectionnez le compte bancaire auquel vous souhaitez associer le chéquier
                    </FormDescription>
                  </div>
                  <FormControl>
                    <BankDropdown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkbookCount"
            render={({ field }) => (
              <FormItem className="border-t border-gray-200">
                <div className="payment-transfer_form-item pb-6 pt-5">
                  <div className="payment-transfer_form-content">
                    <FormLabel className="text-14 font-medium text-gray-700">
                      Nombre de pages
                    </FormLabel>
                    <FormDescription className="text-12 font-normal text-gray-600">
                      Sélectionnez le compte bancaire auquel vous souhaitez associer le chéquier
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="e.g., 2"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryAddress"
            render={({ field }) => (
              <FormItem className="border-t border-gray-200">
                <div className="payment-transfer_form-item pb-6 pt-5">
                  <div className="payment-transfer_form-content">
                    <FormLabel className="text-14 font-medium text-gray-700">
                      Adresse de livraison
                    </FormLabel>
                    <FormDescription className="text-12 font-normal text-gray-600">
                      Sélectionnez le compte bancaire auquel vous souhaitez associer le chéquier
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="merci de saisir votre addresse"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="border-t border-gray-200">
                <div className="payment-transfer_form-item pb-6 pt-5">
                  <div className="payment-transfer_form-content">
                    <FormLabel className="text-14 font-medium text-gray-700">
                      Note de demande (facultative)
                    </FormLabel>
                    <FormDescription className="text-12 font-normal text-gray-600">
                      Sélectionnez le compte bancaire auquel vous souhaitez associer le chéquier
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Veuillez fournir toute information ou instruction supplémentaire concernant le demande."
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </FormItem>
            )}
          />

          <div className="payment-transfer_btn-box">
            <Button type="submit" className="payment-transfer_btn">
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp; Envoi en cours...
                </>
              ) : (
                "Confirmer La Demande"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className=" bg-bank-gradient font-semibold text-white shadow-form ">
          <AlertDialogHeader>
            <AlertDialogTitle>Demande Envoyé</AlertDialogTitle>
            <AlertDialogDescription>
              votre demande a été envoyée avec succès!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setIsAlertOpen(false)} className="bg-white text-red-500">
              Fermer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CheckbookRequestForm;
