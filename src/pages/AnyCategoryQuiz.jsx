import Main from "../components/Main";
import { Outlet } from "react-router-dom";

export default function AnyCategoryQuiz() {
  return (
    <div>
      <section>
        <Main />
      </section>
      <Outlet />
    </div>
  );
}
