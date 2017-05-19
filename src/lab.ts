import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { getModuleForExperiments } from 'component-lab/src/frontend/module-builder';
import { provideExperiments } from 'component-lab/src/frontend/services/experiment-registry';
import { provideResolvedLab } from 'component-lab/src/frontend/services/experiment-factory';
import { ComponentLabModule } from 'component-lab/src/frontend/component-lab.module';

import { AppModule } from './app/app.module';

declare var require: any;

const loadExperiments = () => {
  const context = require.context('./', true, /\.exp\.ts/);
  return context.keys().map(context).map((mod: any) => mod.default);
};

const experiments = loadExperiments();
const resolved = getModuleForExperiments(AppModule, experiments);

platformBrowserDynamic([
  provideExperiments(experiments),
  provideResolvedLab(resolved)
]).bootstrapModule(ComponentLabModule);
