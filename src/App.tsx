import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "./hooks/auth/authContext";
import { ThemeProvider } from "./hooks/theme/themeContext";

import Homepage from "./layout/Homepage";
import MainView from "./layout/Main";
import NotFoundLayout from "./layout/NotFound";

import HexToText from "./packages/hex-to-text";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
    children: [
      { path: "", element: <Homepage /> },
      { path: "hex-to-text", element: <HexToText /> },
      { path: "*", element: <NotFoundLayout /> },
    ],
  },
  // {
  //   path: "/",
  //   element: <ProtectedLayout />,
  //   children: [{ path: "", element: <Dashboard /> }],
  // },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
