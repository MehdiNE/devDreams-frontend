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

      <div className="space-y-4">
        <Input />
        <Input />
        <Button>ورود</Button>
      </div>

      <div className="flex"></div>
    </div>
  );
}

export default LoginForm;
