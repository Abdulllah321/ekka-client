import { useCurrency } from "../../context/CurrencyContext.tsx";

const FormatPrice = ({ price }: { price: number }) => {
  const { formatPrice } = useCurrency();
  return <>{formatPrice(price)}</>;
};

export default FormatPrice;
