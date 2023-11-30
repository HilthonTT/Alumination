"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Category, Song } from "@prisma/client";

import { useModal } from "@/hooks/use-modal-store";
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
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Song title is required.",
  }),
  description: z.string().min(1, {
    message: "Song description is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Song image is required.",
  }),
  categoryId: z.string().min(1, {
    message: "The category is required.",
  }),
});

interface SongFormProps {
  categories: Category[];
  initialData: Song;
}

export const SongFormUpdate = ({ categories, initialData }: SongFormProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      categoryId: initialData?.categoryId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Please wait until we update your song.");

    try {
      await axios.patch(`/api/songs/${initialData?.id}`, values);

      toast.success("Success!");

      router.refresh();
      form.reset();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <PageHeader title="Update your song" />
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
                  Song Category
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
                  Pick the perfect category to harmonize your song's essence!
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
                  Song title
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Ex: Flower's Wrath"
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
                  Song Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Ex: A catchy tune with upbeat rhythm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your musical masterpiece in a few words, let the
                  melody speak through your words! 🎵✨
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-between">
            <Button
              onClick={() => onOpen("deleteSong", { song: initialData })}
              size="lg"
              type="button"
              variant="destructive"
              disabled={isLoading}>
              Delete the song
            </Button>
            <Button size="lg" disabled={isLoading}>
              Update your song
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
