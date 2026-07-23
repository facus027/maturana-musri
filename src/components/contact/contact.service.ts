import type { ContactFormData } from "./contact.types"

const contactScriptUrl = import.meta.env.VITE_CONTACT_SCRIPT_URL

const REQUEST_TIMEOUT = 15_000

export async function sendContactForm(
  payload: ContactFormData,
): Promise<void> {
  if (!contactScriptUrl) {
    throw new Error(
      "La variable VITE_CONTACT_SCRIPT_URL no está configurada.",
    )
  }

  const controller = new AbortController()

  const timeoutId = window.setTimeout(() => {
    controller.abort()
  }, REQUEST_TIMEOUT)

  try {
    await fetch(contactScriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new Error(
        "La solicitud tardó demasiado. Intentá nuevamente.",
        {
          cause: error,
        },
      )
    }

    throw new Error(
      "No fue posible enviar la consulta. Intentá nuevamente.",
      {
        cause: error,
      },
    )
  } finally {
    window.clearTimeout(timeoutId)
  }
}