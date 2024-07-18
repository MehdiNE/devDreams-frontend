import { logoutAction } from "@/features/auth/actions/userAction";
import React from "react";

function page() {
  return (
    <div>
      <form action={logoutAction}>
        <button type="submit">خروج</button>
      </form>
    </div>
  );
}

export default page;
