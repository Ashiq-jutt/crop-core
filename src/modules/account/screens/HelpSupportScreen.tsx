import { MenuListScreen } from '../components/MenuListScreen';
import { helpMenu } from '../data/help';

export function HelpSupportScreen() {
  return <MenuListScreen title="Help & Support" items={helpMenu} />;
}
