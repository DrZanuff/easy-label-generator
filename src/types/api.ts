export type ValidateAddressResponse =
  | {
      success: true
      fromAddress: { id: string }
      toAddress: { id: string }
    }
  | {
      success: false
      error: string
      details?: unknown
    }
