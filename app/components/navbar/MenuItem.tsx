"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-3 py-4 hover:bg-neutral-100 font-semibold transition"
    >
      {label}
    </div>
  );
};

export default MenuItem;
