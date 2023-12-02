"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Album, Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Music, Plus, Trash } from "lucide-react";

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
import { useModal } from "@/hooks/use-modal-store";

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

interface AlbumFormProps {
  categories: Category[];
  initialData?: Album;
}

export const AlbumForm = ({ categories, initialData }: AlbumFormProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      categoryId: initialData?.categoryId || "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Please wait until we create your album.");

    try {
      if (initialData) {
        await axios.patch(`/api/albums/${initialData.id}`, values);
      } else {
        await axios.post("/api/albums", values);
      }

      toast.success("Success!");

      router.refresh();
      form.reset();
      window.location.href = initialData
        ? `/albums/${initialData?.id}`
        : "/albums";
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const title = initialData ? "Update your album" : "Create an album";
  const button = initialData ? "Update your album" : "Create your album";

  return (
    <>
      <PageHeader title={title} />
      {initialData && (
        <div className="flex items-center justify-between">
          <Button
            onClick={() =>
              router.push(`/albums/${initialData?.id}/songs/create`)
            }>
            Add a song
            <Plus className="h-4 w-4 ml-1" />
          </Button>
          <Button
            onClick={() => router.push(`/albums/${initialData?.id}/songs`)}>
            View Songs
            <Music className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
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
          <div className="w-full flex justify-between">
            {initialData && (
              <Button
                onClick={() => onOpen("deleteAlbum", { album: initialData })}
                size="lg"
                variant="destructive"
                type="button"
                disabled={isLoading}>
                Delete your album
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
