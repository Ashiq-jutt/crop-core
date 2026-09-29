import { MenuListScreen } from '../components/MenuListScreen';
import { legalMenu } from '../data/help';

export function LegalAboutScreen() {
  return <MenuListScreen title="Legal & About" items={legalMenu} />;
}
