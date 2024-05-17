import ProfileForm from "@/components/forms/ProfileForm";
import getCurrentUser from "@/lib/User";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import React from "react";
import { db } from "../../../../prisma/db";

type Props = {};

export default async function page({}: Props) {
  const user = await getCurrentUser();
  const userCredits = await db.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      credits: true,
    },
  });
  
  // const subscription = await getUserSubscriptionPlan(user.id);
  return (
    <div>
      <ProfileForm credits={userCredits?.credits!} />
    </div>
  );
}
