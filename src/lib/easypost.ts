// src/lib/easypost.ts
import EasyPostClient from '@easypost/api'

const apiKey = process.env.EASYPOST_SECRET_API_KEY

if (!apiKey) {
  throw new Error('Missing EASYPOST_SECRET_API_KEY in environment variables')
}

export const easypostClient = new EasyPostClient(apiKey)
