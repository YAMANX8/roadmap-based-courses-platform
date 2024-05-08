import { Logo, Button } from "../../components";
import { paths } from "../../routes/paths";
import UnauthenticatedUserSection from "../components/unauthenticated-user-section";
import SearchForm from "../components/search-form";
import { useOffSetTop } from "../../hooks/use-off-set-top";

const Header = () => {
  const hasScrolledPastHeight = useOffSetTop(100);
  return (
    <nav
      className={`sticky top-0 z-50 flex w-full justify-between bg-light px-20 py-4 text-dark shadow-lg transition-all duration-1000 ease-in-out-back
       ${hasScrolledPastHeight && "mb-4 bg-light/80 !py-2 duration-300"}`}
    >
      <div>
        <Logo className="w-[150px]" />
      </div>
      <div className="flex items-center gap-[16px]">
        <SearchForm />
        <Button variant="text" page={paths.roadmaps} className="!text-dark">
          Roadmaps
        </Button>
        <Button variant="text" page={paths.main.others} className="!text-dark">
          Become part of Academic compass
        </Button>

        <UnauthenticatedUserSection
          loginPath={paths.auth.student.login}
          registerPath={paths.auth.student.register}
        />
      </div>
    </nav>
  );
};

export default Header;
