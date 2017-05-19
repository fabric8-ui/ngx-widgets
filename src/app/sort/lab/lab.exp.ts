import { experimentOn } from 'component-lab';

export default experimentOn('Component Experiment Name')
  .case('Experiment 1 Name', {
    template: `
      <sort-example></sort-example>
    `
  })
  .case('Experiment 2 Name', {
    template: `
      <sort-example></sort-example>
    `
  });
