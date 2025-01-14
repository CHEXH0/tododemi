interface ColorPickerProps {
  activeColor: string;
  setActiveColor: (color: string) => void;
}

export const ColorPicker = ({ activeColor, setActiveColor }: ColorPickerProps) => {
  return (
    <input
      type="color"
      value={activeColor}
      onChange={(e) => setActiveColor(e.target.value)}
      className="w-8 h-8 rounded cursor-pointer"
    />
  );
};