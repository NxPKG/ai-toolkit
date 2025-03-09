import { createTransformer } from './lib/create-transformer';

export default createTransformer((fileInfo, api, options, context) => {
  const { j, root } = context;

  root.find(j.ImportDeclaration).forEach(path => {
    const sourceValue = path.node.source.value as string;

    // Handle framework imports and streamable imports
    const frameworkMatch = sourceValue.match(
      /^(?:ai\/|ai-toolkit\/)(svelte|vue|solid)(?:\/(.+))?$/,
    );
    const streamableMatch = sourceValue.match(
      /^(?:ai\/|ai-toolkit\/)streamable(?:\/(.+))?$/,
    );
    const rootMatch = sourceValue === 'ai';

    if (frameworkMatch) {
      context.hasChanges = true;
      path.node.source.value = frameworkMatch[2]
        ? `@ai-toolkit/${frameworkMatch[1]}/${frameworkMatch[2]}`
        : `@ai-toolkit/${frameworkMatch[1]}`;
    } else if (streamableMatch) {
      context.hasChanges = true;
      path.node.source.value = streamableMatch[1]
        ? `@ai-toolkit/streamable/${streamableMatch[1]}`
        : '@ai-toolkit/streamable';
    } else if (rootMatch) {
      context.hasChanges = true;
      path.node.source.value = '@ai-toolkit/core';
    }
  });
});
