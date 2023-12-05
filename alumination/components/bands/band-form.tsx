"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Band } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Band name is required.",
  }),
  description: z.string().min(1, {
    message: "Band description is required",
  }),
  iconImageUrl: z.string().min(1, {
    message: "Band icon image is required.",
  }),
  bannerImageUrl: z.string().min(1, {
    message: "Band banner image is required.",
  }),
});

interface BandFormProps {
  initialData?: Band;
}

const CURRENT_YEAR = new Date().getFullYear();

export const BandForm = ({ initialData }: BandFormProps) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      iconImageUrl: initialData?.iconImageUrl || "",
      bannerImageUrl: initialData?.bannerImageUrl || "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Please wait until we create your band.");

    try {
      if (initialData) {
        await axios.patch(`/api/bands/${initialData?.id}`, values);
      } else {
        await axios.post(`/api/bands`, values);
      }

      toast.success("Success!");

      router.refresh();
      form.reset();

      window.location.href = initialData
        ? `/bands/${initialData?.id}`
        : `/bands`;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const title = initialData ? "Update your band" : "Create a band";
  const button = initialData ? "Update your band" : "Create your band";

  return (
    <>
      <PageHeader title={title}></PageHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
          <div className="flex items-center justify-center text-center">
            <FormField
              control={form.control}
              name="bannerImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      onChange={field.onChange}
                      disabled={isLoading}
                      value={field.value}
                      isBanner={true}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-center text-center">
            <FormField
              control={form.control}
              name="iconImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      onChange={field.onChange}
                      disabled={isLoading}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-zinc-200 uppercase">
                  Band name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter the band name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Name your band into a memorable name! 🎶
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-zinc-200 uppercase">
                  Band Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={`Bringing you the best tunes in ${CURRENT_YEAR}!`}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your band in few words, say what you all do! 🎵✨
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div
            className={cn(
              "w-full flex",
              initialData ? "justify-between" : "justify-center"
            )}>
            {initialData && (
              <Button
                onClick={() => {}}
                size="lg"
                variant="destructive"
                type="button"
                disabled={isLoading}>
                Delete your band
                <Trash className="h-4 w-4 ml-1" />
              </Button>
            )}
            <Button size="lg" disabled={isLoading}>
              {button}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
