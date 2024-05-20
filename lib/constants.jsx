import { User, Music, ListMusic, Library } from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <User />,
    label: "Users",
  },
  {
    url: "/songs",
    icon: <Music />,
    label: "Songs",
  },
  {
    url: "/playlists",
    icon: <ListMusic />,
    label: "Playlist",
  },
  {
    url: "/albums",
    icon: <Library />,
    label: "Album",
  },
];
