"use client";

import { Slider } from "@/components/ui/slider";

interface SliderPropsProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const VolumeSlider = ({ value = 1, onChange }: SliderPropsProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <Slider
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    />
  );
};
