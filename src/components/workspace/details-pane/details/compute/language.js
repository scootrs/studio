export function detectLanguageFromRuntime(runtime) {
  if (runtime.includes('node') || runtime.includes('javascript')) {
    return 'javascript';
  } else if (runtime.includes('python')) {
    return 'python';
  } else {
    throw new Error('Failed to detect language from runtime ' + runtime);
  }
}
