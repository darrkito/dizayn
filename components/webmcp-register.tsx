"use client";

import { useEffect } from "react";
import { registerWebMcpTools } from "@/lib/webmcp";

export function WebMcpRegister() {
  useEffect(() => {
    registerWebMcpTools();
  }, []);
  return null;
}
