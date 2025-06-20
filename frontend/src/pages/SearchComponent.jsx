import { useEffect, useState } from "react";
import useDebounce from "@/hook/useDebounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SearchComponent = () => {
  const [input, setInput] = useState('');
  const debouncedValue = useDebounce(input, 500);

  useEffect(() => {
    if (debouncedValue) {
      console.log("API call with:", debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100">
      {/* Header */}
      <header className="text-center mb-8 mt-8">
        <h1 className="text-4xl font-bold text-gray-800">🔍 Debounced Search</h1>
        <p className="text-gray-600 mt-2">Type something and watch the debounced output below</p>
      </header>

      {/* Search Input and Button */}
      <div className="flex items-center gap-4 w-full max-w-md">
        <Input
          placeholder="Start typing..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-base bg-white shadow-sm"
        />
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Search
        </Button>
      </div>

      {/* Debounced Result Card */}
      <Card className="mt-10 w-full max-w-md border border-gray-300 shadow-md bg-white rounded-2xl">
        <CardContent className="p-5 space-y-3">
          <p>
            <span className="font-semibold text-gray-700">Current Input:</span>{' '}
            {input || <span className="italic text-gray-400">Empty</span>}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Debounced Value:</span>{' '}
            {debouncedValue || <span className="italic text-gray-400">Waiting...</span>}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchComponent;
