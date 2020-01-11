export function detectLanguageFromRuntime(runtime) {
  if (runtime.includes('node') || runtime.includes('javascript')) {
    return 'javascript';
  } else {
    throw new Error('Failed to detect language from runtime ' + runtime);
  }
}
