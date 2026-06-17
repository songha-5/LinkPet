'use server'

import { revalidatePath } from "next/cache"

export async function refreshUserLayout(page: string) {
  revalidatePath(page, 'layout')
}