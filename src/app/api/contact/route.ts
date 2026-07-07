import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  contact: string;
  message: string;
};

function parsePayload(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const { name, contact, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof contact !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }
  const payload: ContactPayload = {
    name: name.trim(),
    contact: contact.trim(),
    message: message.trim(),
  };
  if (!payload.name || !payload.contact || !payload.message) return null;
  return payload;
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 },
    );
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Preencha nome, contato e mensagem." },
      { status: 400 },
    );
  }

  // Ponto de integração: conectar aqui o envio real (Resend, SendGrid,
  // webhook de CRM etc.). Por enquanto registra no log do servidor.
  console.info("[contato] novo lead:", payload);

  return NextResponse.json({ ok: true });
}
