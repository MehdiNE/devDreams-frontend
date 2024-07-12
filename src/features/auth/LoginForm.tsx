import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";

function LoginForm() {
  return (
    <div className="p-10">
      <div className="mb-10 font-medium">
        <h2>خوش اومدی</h2>
        <p className="text-sm">برای ورود فرم زیر رو پر کن</p>
      </div>

      <div className="space-y-5">
        <Input
          label="ایمیل یا نام کاربری"
          placeholder="ایمیل یا نام کاربری خود را وارد کنید"
        />

        <Input label="رمز عبور" placeholder="رمز عبور خود را وارد کنید" />

        <Button size="lg">ورود</Button>
      </div>

      <div className="my-6 -mr-1 flex items-center justify-center gap-3 overflow-clip">
        <Separator />
        <span className="text-sm font-medium">یا</span>
        <Separator />
      </div>

      <div>
        <Button variant="outline">ورود با اکانت گوگل</Button>
      </div>
    </div>
  );
}

export default LoginForm;
