import userStore from "../store/user-store";

export const toggleThumbsUpOrDown = (
  id: number,
  thumbs: "thumbUp" | "thumbDown"
) => {
  const user = userStore.getState().user;
  const removeThumbsDownMovie = userStore.getState().removeThumbsDownMovie;
  const removeThumbsUpMovie = userStore.getState().removeThumbsUpMovie;
  const addThumbsUpMovie = userStore.getState().addThumbsUpMovie;
  const addThumbsDownMovie = userStore.getState().addThumbsDownMovie;
  if (thumbs === "thumbUp") {
    if (user.thumbsDownMovies.includes(id)) {
      removeThumbsDownMovie(id);
      addThumbsUpMovie(id);
      return;
    } else if (user.thumbsUpMovies.includes(id)) {
      removeThumbsUpMovie(id);
    } else {
      addThumbsUpMovie(id);
      return;
    }
  } else {
    if (user.thumbsUpMovies.includes(id)) {
      removeThumbsUpMovie(id);
      addThumbsDownMovie(id);
      return;
    } else if (user.thumbsDownMovies.includes(id)) {
      removeThumbsDownMovie(id);
    } else {
      addThumbsDownMovie(id);
      return;
    }
  }
};
