import { HashRouter, Route, Routes } from "react-router-dom";
import { BrowseMovies } from "./pages/browse";
import { HomePage } from "./pages/home";
import { RootLayout } from "./pages/root";
import { ThemeProvider } from "@mui/material/styles";
import { neatflixTheme } from "./theme/index";
import { LoginPage } from "./pages/login";
import { ProfilePage } from "./pages/profile";
import { MyListPage } from "./pages/my-list";
import { PrivateRoute } from "./utils/PrivateRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import "./global.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={neatflixTheme}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          autoHideDuration={3000}
        >
          <HashRouter>
            <Routes>
              <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/browse" element={<BrowseMovies />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route path="/mylist" element={<MyListPage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
