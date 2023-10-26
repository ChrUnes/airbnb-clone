import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { getFavorites } from "../actions/getFavorites";
import FavoritesPage from "./FavoritesPage";

const Page = async () => {
  const listings = await getFavorites();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings." />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesPage listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Page;
