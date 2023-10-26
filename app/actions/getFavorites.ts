import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const listing = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });
    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
