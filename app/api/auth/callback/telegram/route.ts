import { NextResponse } from "next/server";

export async function GET(request:any) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const first_name = searchParams.get("first_name");
  const last_name = searchParams.get("last_name");
  const photo_url = searchParams.get("photo_url");
  const hash = searchParams.get("hash");

  // Проверяй hash для безопасности (используй секретный ключ бота)
  // См. https://core.telegram.org/widgets/login#checking-authorization

  // Перенаправь пользователя на страницу после авторизации
  return NextResponse.redirect("/dashboard");
}