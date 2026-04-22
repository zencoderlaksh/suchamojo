import AppRoutes from "./appRoutes/AppRoutes";
import GlobalSpinner from "./components/GlobalSpinner";
import { useAppStore } from "./store/useAppStore";

const App = () => {
  const anyLoading = useAppStore(
    (state) =>
      state.blogs.listLoading ||
      state.blogs.detailLoading ||
      state.settings.loading ||
      Object.values(state.forms).some((f) => f.submitting),
  );
  return (
    <>
      <AppRoutes />
      {anyLoading && <GlobalSpinner />}
    </>
  );
};

export default App;
