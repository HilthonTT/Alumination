import { SongForm } from "@/components/songs/song-form";
import { db } from "@/lib/prismadb";

interface SongIdPageProps {
  params: {
    songId: string;
  };
}

const SongIdPage = async ({ params }: SongIdPageProps) => {
  if (params.songId === "create") {
    const categories = await db.category.findMany();

    return <SongForm categories={categories} />;
  }

  return <div></div>;
};

export default SongIdPage;
