import { createLab } from 'component-lab';
import { SortExampleModule } from '../examples/sort-example.module';

import './lab.exp';
import '../../../polyfills';
import '../../../vendor';

createLab({
  /**
   * NgModule to import. All components and pipes must be exported
   * by this module to be useable in your experiments
   */
  ngModule: SortExampleModule,

  /**
   * Function that returns an array of experiments.
   *
   * Here is an example using webpack's `require.context` to
   * load all modules ending in `.exp.ts` and returning thier
   * default exports as an array:
   */
  loadExperiments() {
    const context = (require as any).context('./', true, /\.exp\.ts/);
    return context.keys().map(context).map((mod: any) => mod.default);
  }
});
