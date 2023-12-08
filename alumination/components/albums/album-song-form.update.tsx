"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Album, AlbumSong } from "@prisma/client";
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
});

interface AlbumSongFormProps {
  album: Album;
  initialData: AlbumSong;
}

export const AlbumSongFormUpdate = ({
  album,
  initialData,
}: AlbumSongFormProps) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Please wait until we update your song.");

    try {
      await axios.patch(
        `/api/albums/${album?.id}/songs/${initialData?.id}`,
        values
      );

      toast.success("Success!");

      router.refresh();
      form.reset();
      window.location.href = `/albums/${album?.id}`;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <PageHeader title="Update a song for your album" />
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
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              Update your song
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
