import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function UserProfile() {
  const { user, logout } = useAuth();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <div className="flex -space-x-2 overflow-hidden">
            <span>{user?.name}</span>
            <img
              src={user?.image}
              alt={user?.name}
              className="inline-block size-4 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5"
            />
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <div>Hola Mundo</div>
          <MenubarSeparator />
          <Button className="m-2" onClick={logout}>
            Logout
          </Button>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
