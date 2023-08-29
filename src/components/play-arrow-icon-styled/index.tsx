import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export const PlayArrowIconStyled = ({
  playVideo,
  video,
  large,
}: {
  playVideo: (name: string, url: string) => void;
  video?: any;
  large?: boolean;
}) => (
  <PlayArrowIcon
    sx={{
      color: "white",
      fontSize: large ? 120 : 80,
      border: large ? "4px solid white" : "6px solid white",
      borderRadius: "50%",
      padding: large ? 4 : 1,
      cursor: "pointer",
      transition: "all 0.3s ease-out",
      "&:hover": {
        color: "red",
        background: "rgba(0,0,0,0.2)",
        border: large ? "8px solid white" : "6px solid white",
      },
    }}
    onClick={() => playVideo(video.name, video.url)}
  />
);
