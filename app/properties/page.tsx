import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";

import getListings from "../actions/getListings";
import PropertiesPage from "./PropertiesPage";

const Page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No properties found" subtitle="Looks like you haven no properties." />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesPage listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Page;
