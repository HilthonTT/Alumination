import { SongForm } from "./components/song-form";

interface SongIdPageProps {
  params: {
    songId: string;
  };
}

const SongIdPage = ({ params }: SongIdPageProps) => {
  if (params.songId === "create") {
    return <SongForm />;
  }

  return <div></div>;
};

export default SongIdPage;
