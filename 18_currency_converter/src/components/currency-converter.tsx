"use client"; // Enables client-side rendering

import { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Custom Card components
import { Label } from "@/components/ui/label"; // Custom Label component
import { Input } from "@/components/ui/input"; // Custom Input component
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"; // Custom Select components
import { Button } from "@/components/ui/button"; // Custom Button component
import ClipLoader from "react-spinners/ClipLoader"; // Loader for API fetch state

// API Key for Exchange Rate API
const API_KEY = "baa95354f953ae8e9686ac96";

// Define type for exchange rates
type ExchangeRates = {
  [currency: string]: number;
};

// Currency Converter Component
export default function CurrencyConverter() {
  // State to store the amount entered by the user
  const [amount, setAmount] = useState<number | null>(null);
  // State to store the selected source currency
  const [sourceCurrency, setSourceCurrency] = useState<string>("USD");
  // State to store the selected target currency
  const [targetCurrency, setTargetCurrency] = useState<string>("PKR");
  // State to store the exchange rates
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  // State to store the converted amount result
  const [convertedAmount, setConvertedAmount] = useState<string>("0.00");
  // State to manage loading while fetching exchange rates
  const [loading, setLoading] = useState<boolean>(false);
  // State to manage error messages
  const [error, setError] = useState<string | null>(null);
  // State to store available currency options
  const [currencies, setCurrencies] = useState<string[]>([]);

  // Fetch exchange rates from the API on component mount
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset any previous error
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates.");
        }
        const data = await response.json();
        setExchangeRates(data.conversion_rates); // Store exchange rates
        setCurrencies(Object.keys(data.conversion_rates)); // Get all available currencies
      } catch (error) {
        setError("Error fetching exchange rates. Please try again.");
        console.error("API Error:", error); // Now using the error properly
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchExchangeRates();
  }, []);

  // Handle amount input change
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(parseFloat(e.target.value) || null);
  };

  // Handle currency conversion calculation
  const calculateConvertedAmount = (): void => {
    if (sourceCurrency && targetCurrency && amount && exchangeRates) {
      // Calculate conversion rate
      const rate =
        sourceCurrency === "USD"
          ? exchangeRates[targetCurrency]
          : exchangeRates[targetCurrency] / exchangeRates[sourceCurrency];
      const result = amount * rate;
      setConvertedAmount(result.toFixed(2)); // Format to 2 decimal places
    }
  };

  // JSX rendering
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-6 space-y-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Currency Converter</CardTitle>
          <CardDescription>Convert between different currencies.</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Display loading spinner while fetching data */}
          {loading ? (
            <div className="flex justify-center">
              <ClipLoader className="w-6 h-6 text-blue-500" />
            </div>
          ) : error ? (
            // Display error message if fetching fails
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid gap-4">
              {/* Amount input and source currency selection */}
              <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <Label htmlFor="from">From</Label>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount || ""}
                    onChange={handleAmountChange}
                    className="w-full"
                    id="from"
                  />
                  <Select
                    value={sourceCurrency}
                    onValueChange={setSourceCurrency}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Converted amount display and target currency selection */}
              <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <Label htmlFor="to">To</Label>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <div className="text-2xl font-bold">{convertedAmount}</div>
                  <Select
                    value={targetCurrency}
                    onValueChange={setTargetCurrency}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Convert button */}
        <CardFooter>
          <Button
            type="button"
            className="w-full"
            onClick={calculateConvertedAmount}
            disabled={loading}
          >
            Convert
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
