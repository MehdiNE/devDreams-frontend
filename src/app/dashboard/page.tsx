import React from "react";
import { logoutAction } from "@/features/auth/actions/loginUserAction";

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
