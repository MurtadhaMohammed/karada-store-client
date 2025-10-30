import InstallmentPageWeb from "./installmentPageWeb/installmentPageWeb";
import InstallmentPage from "./installmentPage/installmentPage";

const Installment = () => {
  return (
    <div className="pb-[100px] h-[100vh] overflow-hidden">
      <div className="md:hidden block h-full overflow-hidden">
        <InstallmentPage />
      </div>
      <div className="md:block hidden">
        <InstallmentPageWeb />
      </div>
    </div>
  );
};
export default Installment;
