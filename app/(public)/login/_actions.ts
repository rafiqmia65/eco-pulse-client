/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";

import { loginSchema } from "@/zod/auth.validation";
import { LoginPayload, LoginResponse } from "@/types/auth.types";

export const loginAction = async (payload: LoginPayload) => {
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0].message,
    };
  }

  try {
    const response = await httpClient.post<LoginResponse["data"]>(
      "/api/v1/auth/login",
      parsed.data,
    );

    if (!response?.success) {
      return {
        success: false,
        message: response?.message || "Invalid server response",
      };
    }

    if (!response?.data) {
      return {
        success: false,
        message: "Invalid server response",
      };
    }

    const { accessToken, refreshToken, token, user } = response.data;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token);

    return {
      success: true,
      role: user.role,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || "Invalid email or password",
    };
  }
};
