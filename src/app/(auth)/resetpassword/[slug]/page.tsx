import ResetPassword from "@/features/auth/components/ResetPassword";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <ResetPassword token={params.slug} />
    </div>
  );
}

export default page;
