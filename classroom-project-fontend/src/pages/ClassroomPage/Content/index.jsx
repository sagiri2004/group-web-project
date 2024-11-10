import HomePage from "./HomePage";
import AssignmentsPage from "./AssignmentsPage";

function Content({ page }) {
  return (
    <>
      {page === "home" && <HomePage />}
      {page === "assignments" && <AssignmentsPage />}
    </>
  );
}

export default Content;
