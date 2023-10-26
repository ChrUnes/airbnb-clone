"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

import ClientOnly from "./ClientOnly";
import useFavorite from "../hooks/useFavorite";
import { useCallback, useEffect, useMemo, useState } from "react";
import useLoginModel from "../hooks/useLoginModel";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const [inFavorite, setInFavorite] = useState<boolean>();
  const { hasFavorited, toggleFavorite } = useFavorite({ listingId, currentUser });
  const loginModal = useLoginModel();

  useEffect(() => {
    setInFavorite(hasFavorited);
  }, [hasFavorited]);

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        onClick={() => setInFavorite(!inFavorite)}
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart size={24} className={`${inFavorite ? "fill-rose-500" : "fill-neutral-500/70"} `} />
    </div>
  );
};

export default HeartButton;
