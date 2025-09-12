'use client'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
export default function HomeSubMenu() {
  const items = [
    {
      name: 'item1',
    },
    {
      name: 'item2',
    },
    {
      name: 'item3',
    },
    {
      name: 'item4',
    },
    {
      name: 'item5',
    },
    {
      name: 'item6',
    },
  ]
  return (
    <Menubar className="w-full flex justify-around bg-transparent border-0 shadow-none">
      {items.map((item) => (
        <MenubarMenu key={item.name}>
          <MenubarTrigger>{item.name}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  )
}
