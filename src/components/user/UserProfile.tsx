import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <Menubar className="border-0 p-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent">
      <MenubarMenu>
        <MenubarTrigger>
          <div className="flex -space-x-2 overflow-hidden items-center">
            <img
              src={user?.image}
              alt={user?.name}
              className="inline-block size-8 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5"
            />
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <strong>{t('user_menu.role')}:</strong> {user?.role}
          </MenubarItem>
          <MenubarItem>
            <strong>{t('user_menu.language')}:</strong> {user?.language || 'EN'}
          </MenubarItem>
          <MenubarItem>
            <strong>{t('user_menu.account_settings')}</strong>
          </MenubarItem>
          <MenubarSeparator className="w-full justify-center"/>
          <MenubarItem onClick={logout}>
            <strong>{t('user_menu.sign_out')}</strong>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
