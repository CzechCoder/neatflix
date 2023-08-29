import { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  Box,
  CardContent,
  Collapse,
  Grid,
  Modal,
  Tab,
  Tabs,
  Theme,
  useMediaQuery,
} from "@mui/material";
import requests from "../../utils/requests";
import userStore from "../../store/user-store";
import { shallow } from "zustand/shallow";
import { TRAILERS_DATA } from "../../data/trailers-data";
import { Episode, SEASON_1_DATA } from "../../data/season-data";
import { VideoModal } from "../video-modal";
import { CreditsData, Video } from "../../types/movie-and-tv.types";
import styles from "./index.module.css";
import { TABS } from "../../data/tabs";
import { DetailsTab } from "./tab-panels/details";
import { EpisodesTab } from "./tab-panels/episodes";
import { TrailersTab } from "./tab-panels/trailers";
import { OverviewTab } from "./tab-panels/overview";
import { useQuery } from "react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

interface CollapsibleProps {
  openDetail: boolean;
  openedMovieDetail: any;
  isThisRowOpen: boolean;
  isMyList: boolean;
}

export const Collapsible: FC<CollapsibleProps> = ({
  openDetail,
  openedMovieDetail,
  isThisRowOpen,
  isMyList,
}) => {
  const [favoriteMovies] = userStore(
    (state) => [state.user.favoriteMovies],
    shallow
  );
  // application uses only placeholder data, doesn't use setSeasonData function
  // eslint-disable-next-line
  const [seasonData, setSeasonData] = useState<Episode[]>(SEASON_1_DATA);
  const [tabValue, setTabValue] = useState<number>(0);
  const [openMovieModal, setOpenMovieModal] = useState<boolean>(false);
  const [selectedSeason, setSelectedSeason] = useState<string>("season1");
  const [video, setVideo] = useState<Video>({
    url: "",
    name: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const {
    backdrop_path,
    genres,
    id,
    isTVData,
    name,
    number_of_seasons,
    spoken_languages,
    title,
  } = openedMovieDetail;

  const apiCall: string = `${requests.requestSpecificMovie.url}/${
    isTVData ? "tv" : "movie"
  }/${id}/credits?api_key=${requests.requestSpecificMovie.key}`;

  const zeroFavorites: boolean = favoriteMovies.length === 0 && isMyList;

  const handleOpen = () => setOpenMovieModal(true);
  const handleClose = () => setOpenMovieModal(false);

  const handleChangeTabs = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const playVideo = (name: string, url: string) => {
    setVideo({
      name: name,
      url: url,
    });
    handleOpen();
  };

  useEffect(() => {
    setTabValue(0);
  }, [openedMovieDetail]);

  const getCredits = async () => {
    const response = await axios.get<CreditsData>(apiCall);
    return response.data;
  };

  const { data: credits } = useQuery(
    `get credits for ${name || title}`,
    getCredits,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError: (e) => {
        enqueueSnackbar(`Error downloading credits for ${name || title}`, {
          variant: "error",
        });
      },
    }
  );

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Collapse
      in={openDetail && isThisRowOpen && !zeroFavorites}
      timeout="auto"
      unmountOnExit
    >
      <CardContent
        sx={{
          background: backdrop_path
            ? `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,${
                tabValue === 1 || mobile ? 0.6 : 0.2
              }) 40%, rgba(0,0,0,${
                tabValue === 1 || mobile ? 0.6 : 0.0
              }) 100%), url(https://image.tmdb.org/t/p/original/${backdrop_path})`
            : "",
          backgroundSize: { sm: "70%", xs: "cover" },
          backgroundRepeat: "no-repeat",
          backgroundPosition: { sm: "right", xs: "center" },
          padding: 0,
          marginBottom: "24px",
          "&:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <Box
          // className={styles.collapsibleContainer}
          sx={{ height: { sm: "550px", xs: "100%" }, minHeight: "550px" }}
        >
          <Box className={styles.collapsibleWrapper}>
            <Grid container sx={{ height: "91%" }}>
              <Grid item xs={12} sx={{ height: "100%", minHeight: "500px" }}>
                <OverviewTab
                  tabValue={tabValue}
                  title={title || name}
                  isTVData={isTVData}
                  playVideo={playVideo}
                  openedMovieDetail={openedMovieDetail}
                />
                {!isTVData && (
                  <TrailersTab
                    tabValue={tabValue}
                    title={title}
                    playVideo={playVideo}
                    trailers_data={TRAILERS_DATA}
                  />
                )}
                {isTVData && (
                  <EpisodesTab
                    tabValue={tabValue}
                    title={name}
                    number_of_seasons={number_of_seasons}
                    selectedSeason={selectedSeason}
                    setSelectedSeason={setSelectedSeason}
                    seasonData={seasonData}
                    playVideo={playVideo}
                  />
                )}
                <DetailsTab
                  tabValue={tabValue}
                  title={isTVData ? name : title}
                  credits={credits}
                  genres={genres}
                  spoken_languages={spoken_languages}
                />
              </Grid>
              <Grid item xs={12}>
                <Box className={styles.tabsWrapper}>
                  <Tabs
                    value={tabValue}
                    onChange={handleChangeTabs}
                    aria-label="tabs buttons"
                    centered
                    textColor="inherit"
                    sx={{
                      backgroundImage:
                        "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0) 100%)",
                      ".Mui-selected": {
                        color: `white`,
                        fontWeight: "bold",
                      },
                      ".MuiTabs-scroller": {
                        marginBottom: "1px !important",
                      },
                    }}
                  >
                    {TABS.map((tab, i) => (
                      <Tab
                        disableRipple
                        label={
                          isTVData && tab.name === "TRAILERS"
                            ? "EPISODES"
                            : tab.name
                        }
                        {...a11yProps(i)}
                        sx={{ fontSize: "1.25rem !important" }}
                        key={i}
                      />
                    ))}
                  </Tabs>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>

      <Modal
        open={openMovieModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <VideoModal
            title={video.name}
            video={video.url}
            handleClose={handleClose}
          />
        </>
      </Modal>
    </Collapse>
  );
};
