interface ColorPickerControlProps {
  activeColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPickerControl = ({ activeColor, onColorChange }: ColorPickerControlProps) => {
  return (
    <input
      type="color"
      value={activeColor}
      onChange={(e) => onColorChange(e.target.value)}
      className="w-8 h-8 rounded cursor-pointer"
    />
  );
};