import HomePage from "./HomePage";
import AssignmentsPage from "./AssignmentsPage";
import AdminPage from "./AdminPage";

function Content({ page }) {
  return (
    <>
      {page === "home" && <HomePage />}
      {page === "assignments" && <AssignmentsPage />}
      {page === "admin" && <AdminPage />}
    </>
  );
}

export default Content;
