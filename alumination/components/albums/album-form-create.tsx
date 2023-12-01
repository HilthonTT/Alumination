"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PageHeader } from "@/components/page-header";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Album title is required.",
  }),
  description: z.string().min(1, {
    message: "Album description is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Album image is required.",
  }),
  categoryId: z.string().min(1, {
    message: "The category is required.",
  }),
});

interface AlbumFormCreateProps {
  categories: Category[];
}

export const AlbumFormCreate = ({ categories }: AlbumFormCreateProps) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      categoryId: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Please wait until we create your album.");

    try {
      await axios.post("/api/albums", values);
      toast.success("Success!");

      router.refresh();
      form.reset();
      window.location.href = "/albums";
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <PageHeader title="Create an album" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex items-center justify-center text-center">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      onChange={field.onChange}
                      disabled={isLoading}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-zinc-200 uppercase">
                  Album Category
                </FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Pick the perfect category to harmonize your album's essence!
                  🎵🎶
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-zinc-200 uppercase">
                  Album title
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter the album title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Give us the title that'll make the stars tap their feet! 🎶
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
                  Album Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Catchy tunen with upbeat rhythm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your musical masterpieces in a few words, let the
                  melody speak through your words! 🎵✨
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              Create your album
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
