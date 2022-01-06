import { esbuildPlugin } from '@web/dev-server-esbuild';
export default (/** @type{import('@web/test-runner').TestRunnerConfig}*/({
  nodeResolve: true,
  files: '*.test.ts',
  plugins: [esbuildPlugin({ ts: true })],
}));
