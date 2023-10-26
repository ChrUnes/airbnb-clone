"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { useMemo } from "react";
import { categories } from "../navbar/Categories";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  listingCategory: string;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ user, description, guestCount, roomCount, bathroomCount, listingCategory, locationValue }) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  const category = useMemo(() => {
    return categories.find((item) => item.label === listingCategory);
  }, [listingCategory]);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex- flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-400">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathroom</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory icon={category.icon} label={category?.label} description={category?.description} />}
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
