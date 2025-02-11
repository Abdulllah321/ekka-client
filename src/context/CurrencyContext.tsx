import { createContext, useContext, useState, useEffect } from "react";

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (price: number | string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storedCurrency = localStorage.getItem("selectedCurrency") || "INR";
  const [currency, setCurrency] = useState(storedCurrency);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    USD: 1,
    INR: 83, // Default before fetching real-time rates
  });

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD",
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCurrency", currency);
  }, [currency]);

  const getCurrencySymbol = (curr: string) => (curr === "USD" ? "$" : "₹");

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;

    if (isNaN(numericPrice)) {
      return `${getCurrencySymbol(currency)} 0.00`; // Handle invalid price input
    }

    const convertedPrice =
      currency === "USD"
        ? numericPrice / (exchangeRates["INR"] || 1)
        : numericPrice * (exchangeRates["USD"] || 1);

    return `${getCurrencySymbol(currency)} ${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
