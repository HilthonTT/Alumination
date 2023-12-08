"use client";

import { AlbumSong } from "@prisma/client";
import { Album as AlbumIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";
import { PageHeader } from "@/components/page-header";
import { SongCardGlobal } from "@/components/song-card-global";
import { SearchInput } from "@/components/search-input";
import { NoResults } from "@/components/no-results";

interface AlbumSongDetailsProps {
  songs: AlbumSong[];
}

export const AlbumSongDetails = ({ songs }: AlbumSongDetailsProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const onClick = (song: AlbumSong) => {
    router.push(`/albums/${song.albumId}/songs/${song.id}/update`);
  };

  const onDetails = (song: AlbumSong) => {
    router.push(`/albums/${song.albumId}`);
  };

  const onDelete = (song: AlbumSong) => {
    onOpen("deleteAlbumSong", { albumSong: song });
  };

  return (
    <>
      <PageHeader title="My albums's songs" icon={AlbumIcon} />
      <SearchInput parameter="albumSongName" />
      {songs?.length === 0 && (
        <NoResults
          src="/empty-box.png"
          title="No songs for this album has been found."
        />
      )}
      {songs.map((song) => (
        <SongCardGlobal
          key={song.id}
          song={song}
          onDelete={() => onDelete(song)}
          onClick={() => onClick(song)}
          onDetails={() => onDetails(song)}
        />
      ))}
    </>
  );
};
