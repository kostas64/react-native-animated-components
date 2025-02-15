import {useRef} from 'react';
import {MenuView, MenuComponentRef} from '@react-native-menu/menu';

import {ConteMenuProps} from './types';

const ContextMenu = ({children, items, onPress}: ConteMenuProps) => {
  const menuRef = useRef<MenuComponentRef>(null);

  return (
    <MenuView
      ref={menuRef}
      actions={items}
      onPressAction={({nativeEvent}) => onPress(nativeEvent)}
      shouldOpenOnLongPress={false}>
      {children}
    </MenuView>
  );
};

export default ContextMenu;
