import { db } from "@/lib/prismadb";
import { SongCard } from "@/components/song-card";
import { Songs } from "@/components/songs";

const HomePage = async () => {
  const songs = await db.song.findMany({
    include: {
      profile: true,
    },
  });

  return (
    <div className="max-w-5xl mx-auto h-full">
      <Songs data={songs} />
    </div>
  );
};

export default HomePage;
