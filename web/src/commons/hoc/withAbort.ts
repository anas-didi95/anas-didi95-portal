export async function withAbort<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  options?: { timeout?: number },
): Promise<T> {
  const controller = new AbortController();
  const timeout = options?.timeout ?? 15000;

  const id = setTimeout(() => controller.abort(), timeout);

  try {
    return await fn(controller.signal);
  } finally {
    clearTimeout(id);
  }
}
