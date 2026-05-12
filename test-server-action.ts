import { updateOnboardingStep, getDiagnosticQuestions } from './lib/db/actions';

async function test() {
  console.log(await getDiagnosticQuestions());
}
test();
