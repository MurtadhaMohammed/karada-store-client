import OrderList from "./OrderList/orderList";
// import HistoryList from "./HistoryList/historyList";

export default async function Orders() {

  return (
    <div className="pb-[100px]">
      <OrderList />
      {/* <HistoryList /> */}
    </div>
  );
}
