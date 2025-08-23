import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  debounceDelay?: number;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  debounceDelay = 300,
  placeholder = "Search...",
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== value) {
        onChange(internalValue);
      }
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue, debounceDelay]);

  return (
    <TextField
      size="small"
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
    />
  );
};
