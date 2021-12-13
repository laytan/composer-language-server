import Context from '../../context';
import { HoverResult, HoverResultKind } from '../index.types';
import { fetchDetails } from '../../composer-cli';

export default async function (
  context: Context
): Promise<HoverResult | undefined> {
  // Are we in require or require dev?
  if (!context.isDefiningDependencies()) return;

  const packageName = context.getCurrentKeyValue();
  context.logger.info('searching for ' + packageName);

  // Is the property of adequate length?
  if (!packageName || packageName.length <= 3) return;

  // Fetch details and return them.
  const details = await fetchDetails(packageName);

  return {
    value: details ?? 'Package not found.',
    kind: HoverResultKind.Plain,
  };
}
